const getCourses = async (db, isPublished) => {
  const result = await db.query(`
    SELECT c.*, u.name as author_name, u.id as author_id 
    FROM courses c 
    JOIN users u ON c.author_id = u.id 
    WHERE c."isPublished" = $1 
    ORDER BY c.created_at DESC
  `, [isPublished]);

  const rows = result.rows;
  return rows.map(course => ({
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
    comments: [], // Akan diisi terpisah
    created_at: course.created_at
  }));
};

const getComments = async (db, courseId) => {
  const result = await db.query(`
    SELECT c.*, u.name as author_name, u.id as author_id 
    FROM comments c 
    JOIN users u ON c.author_id = u.id 
    WHERE c.course_id = $1 
    ORDER BY c.created_at ASC
  `, [courseId]);

  const rows = result.rows;
  // Transform to nested structure
  return rows
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
};

module.exports = {
  getCourses,
  getComments,
};
