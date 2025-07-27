-- =====================================================
-- StillLearning Database Schema
-- Database: stilllearning_db
-- =====================================================

-- =====================================================
-- Tabel users
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    avatar TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- Tabel courses
-- =====================================================
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    contentType VARCHAR(255) NOT NULL CHECK (contentType IN ('ARTICLE', 'VIDEO', 'AUDIO', 'IMAGE', 'PDF', 'WORD', 'PPT')),
    thumbnailUrl TEXT,
    author_id INT NOT NULL,
    isPublished BOOLEAN DEFAULT FALSE,
    fileName VARCHAR(255),
    fileSize INT,
    fileType VARCHAR(100),
    filePath TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =====================================================
-- Tabel comments
-- =====================================================
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    course_id INT NOT NULL,
    author_id INT NOT NULL,
    text TEXT NOT NULL,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

-- =====================================================
-- Triggers for updated_at columns
-- =====================================================

-- Trigger for users table
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger for courses table
CREATE TRIGGER set_courses_updated_at
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();