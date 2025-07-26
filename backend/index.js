require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generateToken, verifyToken, isAdmin } = require('./auth');
const pool = require('./db');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|mp4|mp3|pdf|doc|docx|ppt|pptx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: File upload only supports the following filetypes - ' + filetypes);
  }
});

// Middleware untuk koneksi DB (PostgreSQL)
app.use((req, res, next) => {
  req.db = pool; // PostgreSQL pool doesn't need getConnection
  next();
});

// Serve static files
app.use('/uploads', express.static('uploads'));

// ==================== AUTH ENDPOINTS ====================

// Login user
app.post('/api/login', async (req, res) => {
  const { email, password, isAdmin } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }
  try {
    const result = await req.db.query('SELECT * FROM users WHERE email = $1', [email]);
    const rows = result.rows;
    if (rows.length === 0) {
      return res.status(401).json({ error: 'User tidak ditemukan' });
    }
    const user = rows[0];
    if (isAdmin && user.role !== 'admin') {
      return res.status(403).json({ error: 'Akses admin ditolak' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: 'Password salah' });
    }
    const token = generateToken(user);
    delete user.password;
    res.json({ user, token });
  } catch (error) {
    console.error('Error login:', error);
    res.status(500).json({ error: 'Gagal login' });
  }
});

// Register user
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nama, email, dan password harus diisi' });
  }
  try {
    const existingResult = await req.db.query('SELECT * FROM users WHERE email = $1', [email]);
    const existing = existingResult.rows;
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email sudah terdaftar' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await req.db.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id', [name, email, hashedPassword, 'user']);
    const newUser = { id: result.rows[0].id, name, email, role: 'user' };
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error register:', error);
    res.status(500).json({ error: 'Gagal registrasi' });
  }
});

// Update user profile
app.put('/api/users/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { name, email, avatar } = req.body;

  if (req.user.id !== parseInt(id) && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Anda tidak punya hak untuk mengupdate profil ini' });
  }
  
  try {
    const result = await req.db.query(
      'UPDATE users SET name = $1, email = $2, avatar = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4',
      [name, email, avatar, id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }
    
    const updatedUserResult = await req.db.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [id]);
    const updatedUser = updatedUserResult.rows;
    res.json(updatedUser[0]);
  } catch (error) {
    console.error('Error update profile:', error);
    res.status(500).json({ error: 'Gagal update profil' });
  }
});

// ==================== COURSES ENDPOINTS ====================

const { getCourses, getComments } = require('./queries');

// Get all published courses
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await getCourses(req.db, true);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Gagal mengambil data courses' });
  }
});

// Get pending courses (for admin)
app.get('/api/courses/pending', verifyToken, isAdmin, async (req, res) => {
  try {
    const courses = await getCourses(req.db, false);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching pending courses:', error);
    res.status(500).json({ error: 'Gagal mengambil data pending courses' });
  }
});

// Get single course with comments
app.get('/api/courses/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const courseResult = await req.db.query(`
      SELECT c.*, u.name as author_name, u.id as author_id 
      FROM courses c 
      JOIN users u ON c.author_id = u.id 
      WHERE c.id = $1
    `, [id]);
    const courseRows = courseResult.rows;
    
    if (courseRows.length === 0) {
      return res.status(404).json({ error: 'Course tidak ditemukan' });
    }
    
    const course = courseRows[0];
    const comments = await getComments(req.db, id);
    
    const courseData = {
      id: course.id,
      title: course.title,
      description: course.description,
      content: course.content,
      contentType: course.contentType,
      thumbnailUrl: course.thumbnailUrl,
      author: {
        id: course.author_id,
        name: course.author_name
      },
      isPublished: course.isPublished,
      fileName: course.fileName,
      fileSize: course.fileSize,
      fileType: course.fileType,
      filePath: course.filePath,
      comments: comments,
      created_at: course.created_at
    };
    
    res.json(courseData);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Gagal mengambil data course' });
  }
});

// Submit new course
app.post('/api/courses', verifyToken, upload.single('file'), async (req, res) => {
  const { title, description, contentType, content, thumbnailUrl } = req.body;
  const authorId = req.user.id;
  
  if (!title || !description || !contentType) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }
  
  try {
    let filePath = null;
    let fileName = null;
    let fileSize = null;
    let fileType = null;
    
    if (req.file) {
      filePath = `/uploads/${req.file.filename}`;
      fileName = req.file.originalname;
      fileSize = req.file.size;
      fileType = req.file.mimetype;
    }
    
    const result = await req.db.query(`
      INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, fileName, fileSize, fileType, filePath, isPublished) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, FALSE) RETURNING id
    `, [title, description, content, contentType, thumbnailUrl || 'https://picsum.photos/seed/course/600/400', authorId, fileName, fileSize, fileType, filePath]);
    
    res.status(201).json({ 
      id: result.rows[0].id, 
      message: 'Course berhasil disubmit untuk review' 
    });
  } catch (error) {
    console.error('Error submitting course:', error);
    res.status(500).json({ error: 'Gagal submit course' });
  }
});

// Approve course (admin only)
app.put('/api/courses/:id/approve', verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await req.db.query(
      'UPDATE courses SET isPublished = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
      [id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Course tidak ditemukan' });
    }
    
    res.json({ message: 'Course berhasil diapprove' });
  } catch (error) {
    console.error('Error approving course:', error);
    res.status(500).json({ error: 'Gagal approve course' });
  }
});

// ==================== COMMENTS ENDPOINTS ====================

// Add comment
app.post('/api/courses/:courseId/comments', verifyToken, async (req, res) => {
  const { courseId } = req.params;
  const { text, parentId } = req.body;
  const authorId = req.user.id;
  
  if (!text) {
    return res.status(400).json({ error: 'Text wajib diisi' });
  }
  
  try {
    const result = await req.db.query(
      'INSERT INTO comments (course_id, author_id, text, parent_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [courseId, authorId, text, parentId || null]
    );
    
    // Get the created comment with author info
    const commentResult = await req.db.query(`
      SELECT c.*, u.name as author_name, u.id as author_id 
      FROM comments c 
      JOIN users u ON c.author_id = u.id 
      WHERE c.id = $1
    `, [result.rows[0].id]);
    const commentRows = commentResult.rows;
    
    const comment = {
      id: commentRows[0].id,
      text: commentRows[0].text,
      timestamp: commentRows[0].created_at,
      author: {
        id: commentRows[0].author_id,
        name: commentRows[0].author_name
      },
      replies: []
    };
    
    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Gagal menambah komentar' });
  }
});

// Get comments for a course
app.get('/api/courses/:courseId/comments', async (req, res) => {
  const { courseId } = req.params;
  
  try {
    const commentsResult = await req.db.query(`
      SELECT c.*, u.name as author_name, u.id as author_id 
      FROM comments c 
      JOIN users u ON c.author_id = u.id 
      WHERE c.course_id = $1 
      ORDER BY c.created_at ASC
    `, [courseId]);
    const rows = commentsResult.rows;
    
    // Transform to nested structure
    const comments = rows
      .filter(comment => !comment.parent_id)
      .map(comment => ({
        id: comment.id,
        text: comment.text,
        timestamp: comment.created_at,
        author: {
          id: comment.author_id,
          name: comment.author_name
        },
        replies: rows
          .filter(reply => reply.parent_id === comment.id)
          .map(reply => ({
            id: reply.id,
            text: reply.text,
            timestamp: reply.created_at,
            author: {
              id: reply.author_id,
              name: reply.author_name
            },
            replies: []
          }))
      }));
    
    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Gagal mengambil komentar' });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`🚀 Backend server berjalan di http://localhost:${port}`);
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`);
});

