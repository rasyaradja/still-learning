# StillLearning - Open Learning Platform

A modern full-stack educational platform that enables users to share knowledge through courses, engage in discussions, and learn collaboratively.

## 🚀 Features

### For Learners
- **Browse Courses**: Explore diverse educational content across multiple categories
- **Multiple Content Types**: Support for articles, videos, audio, PDFs, presentations, and images
- **Interactive Comments**: Engage with instructors and peers through nested comment discussions
- **User Profiles**: Personalize your learning experience

### For Instructors
- **Course Creation**: Submit courses with rich content and file uploads
- **Content Management**: Upload various file formats (images, videos, audio, documents)
- **Community Interaction**: Respond to student questions and feedback

### For Administrators
- **Course Moderation**: Review and approve submitted courses before publication
- **User Management**: Oversee platform users and content quality
- **Dashboard Analytics**: Monitor platform activity and engagement

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

## 🚀 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd pw2
```

### 2. Install frontend dependencies
```bash
npm install
```

### 3. Install backend dependencies
```bash
cd backend
npm install
```

### 4. Database setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE stilllearning_db;

# Run schema
mysql -u root -p stilllearning_db < database_schema.sql

# Insert mock data (optional)
mysql -u root -p stilllearning_db < mock_database_data.sql
```

### 5. Environment configuration
Create `backend/.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=stilllearning_db
JWT_SECRET=your_jwt_secret_key
PORT=4000
```

## 🎯 Usage

### Development Mode

1. **Start the backend server**:
```bash
cd backend
npm run dev
# Server runs on http://localhost:4000
```

2. **Start the frontend development server**:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

### Production Mode

1. **Build the frontend**:
```bash
npm run build
```

2. **Start the backend**:
```bash
cd backend
npm start
```

## 📁 Project Structure

```
pw2/
├── backend/                 # Backend API server
│   ├── auth.js             # JWT authentication middleware
│   ├── db.js               # Database connection
│   ├── index.js            # Main server file
│   ├── queries.js          # Database queries
│   ├── uploads/            # Uploaded files storage
│   └── package.json        # Backend dependencies
├── components/             # React components
│   ├── Header.js           # Navigation header
│   ├── Footer.js           # Page footer
│   ├── CourseCard.js       # Course display card
│   ├── CommentSection.js   # Comments functionality
│   └── ProtectedRoute.js   # Route authentication
├── pages/                  # Page components
│   ├── HomePage.jsx        # Main course listing
│   ├── CourseDetailPage.jsx # Individual course view
│   ├── LoginPage.jsx       # User authentication
│   ├── RegisterPage.jsx    # User registration
│   ├── SubmitCoursePage.jsx # Course submission
│   ├── AdminDashboardPage.jsx # Admin panel
│   └── ProfilePage.jsx     # User profile
├── context/               # React context
│   └── AuthContext.js     # Authentication state
├── services/              # API services
│   └── api.js             # Frontend API calls
├── database_schema.sql    # Database structure
├── mock_database_data.sql # Sample data
└── README.md              # This file
```

## 🎨 Course Content Types

The platform supports various content formats:

- **📄 ARTICLE** - Rich text content with markdown support
- **🎥 VIDEO** - Video lessons and tutorials
- **🎵 AUDIO** - Podcasts and audio content
- **📱 IMAGE** - Visual content and infographics
- **📋 PDF** - Document-based learning materials
- **📊 PPT** - Presentation slides
- **📝 WORD** - Text documents and worksheets

## 🔐 Authentication

The platform uses JWT-based authentication with:
- User registration and login
- Role-based access control (User/Admin)
- Protected routes for authenticated content
- Secure password hashing with bcrypt

## 📚 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration

### Courses
- `GET /api/courses` - Get published courses
- `GET /api/courses/pending` - Get pending courses (admin only)
- `GET /api/courses/:id` - Get single course with comments
- `POST /api/courses` - Submit new course
- `PUT /api/courses/:id/approve` - Approve course (admin only)

### Comments
- `GET /api/courses/:courseId/comments` - Get course comments
- `POST /api/courses/:courseId/comments` - Add comment

### Users
- `PUT /api/users/:id` - Update user profile

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- [ ] Real-time notifications
- [ ] Course progress tracking
- [ ] Video streaming optimization
- [ ] Mobile app development
- [ ] Advanced search and filtering
- [ ] Course ratings and reviews
- [ ] Payment integration for premium courses
- [ ] Social learning features
- [ ] AI-powered course recommendations