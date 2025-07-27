-- =====================================================
-- StillLearning Mock Data
-- Database: stilllearning_db
-- =====================================================

-- Gunakan database
USE web_db;

-- =====================================================
-- Insert Users
-- =====================================================
INSERT INTO users (name, email, password, role, avatar) VALUES 
('Admin Ali', 'admin@stilllearning.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'https://randomuser.me/api/portraits/men/32.jpg')
ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar);

INSERT INTO users (name, email, password, role, avatar) VALUES 
('Student Siti', 'siti@stilllearning.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'https://randomuser.me/api/portraits/women/44.jpg')
ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar);

INSERT INTO users (name, email, password, role, avatar) VALUES 
('Creator Chandra', 'chandra@stilllearning.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'https://randomuser.me/api/portraits/men/65.jpg')
ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar);

INSERT INTO users (name, email, password, role, avatar) VALUES 
('Audio Expert Aulia', 'aulia@stilllearning.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'user', 'https://randomuser.me/api/portraits/women/68.jpg')
ON DUPLICATE KEY UPDATE name = VALUES(name), avatar = VALUES(avatar);

-- =====================================================
-- Insert Courses
-- =====================================================

-- Modern Web Development Courses
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Full Stack JavaScript Development', 
 'Learn to build complete web applications using Node.js, Express, React, and MongoDB. From backend APIs to frontend interfaces.', 
 '# Full Stack JavaScript Development\n\n## Course Overview\nThis comprehensive course covers:\n\n### Backend Development\n- Node.js fundamentals\n- Express.js server creation\n- RESTful API design\n- Database integration with MongoDB\n- Authentication with JWT\n\n### Frontend Development\n- React fundamentals and hooks\n- State management\n- API integration\n- Modern CSS with Tailwind\n\n### Project: Build a Task Management App\nWe will create a complete task management application with user authentication, CRUD operations, and real-time updates.',
 'ARTICLE', 
 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'admin@stilllearning.com'), 
 TRUE, NULL, NULL, NULL, NULL);

INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Python for Data Science', 
 'Master data analysis, visualization, and machine learning with Python. Learn pandas, matplotlib, and scikit-learn through real projects.', 
 '# Python for Data Science\n\n## What You will Learn\n\n### Data Manipulation\n- Pandas library for data cleaning\n- NumPy for numerical computing\n- Working with CSV, JSON, and databases\n\n### Data Visualization\n- Matplotlib for basic plotting\n- Seaborn for statistical visualizations\n- Interactive plots with Plotly\n\n### Machine Learning\n- Scikit-learn fundamentals\n- Supervised learning algorithms\n- Model evaluation and validation\n\n### Real Projects\n1. Sales data analysis\n2. Stock price prediction\n3. Customer segmentation\n4. Movie recommendation system',
 'ARTICLE', 
 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 TRUE, NULL, NULL, NULL, NULL);

INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Digital Marketing Mastery', 
 'Complete guide to modern digital marketing strategies including SEO, social media, content marketing, and paid advertising.', 
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
 'VIDEO', 
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 TRUE, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', NULL, NULL, NULL);

-- Design and Creative Courses
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('UI/UX Design Fundamentals', 
 'Learn user interface and experience design principles, wireframing, prototyping, and design tools like Figma.', 
 '',
 'PDF', 
 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 TRUE, 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'ui-ux-guide.pdf', 'application/pdf', 2048000);

INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Photography Composition Techniques', 
 'Master the art of composition in photography. Learn rule of thirds, leading lines, framing, and advanced techniques.', 
 '',
 'IMAGE', 
 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 TRUE, 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=1200&h=800&fit=crop', NULL, NULL, NULL);

-- Business and Entrepreneurship
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Startup Business Plan Workshop', 
 'Learn to create compelling business plans, pitch decks, and financial projections for your startup idea.', 
 '',
 'PPT', 
 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'admin@stilllearning.com'), 
 TRUE, 'https://file-examples.com/wp-content/uploads/2017/08/file_example_PPT_500kB.ppt', 'business-plan-template.ppt', 'application/vnd.ms-powerpoint', 1536000);

-- Language Learning
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('English Conversation Practice', 
 'Improve your English speaking skills through practical conversations, pronunciation tips, and real-world scenarios.', 
 '',
 'AUDIO', 
 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 TRUE, 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', 'english-conversation.mp3', 'audio/mp3', 3072000);

-- Personal Development
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Personal Finance Management', 
 'Learn budgeting, investing, debt management, and building wealth. Practical strategies for financial independence.', 
 '',
 'WORD', 
 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 TRUE, 'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc', 'finance-workbook.doc', 'application/msword', 204800);

-- Technology Trends
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Artificial Intelligence for Beginners', 
 'Understand AI concepts, machine learning basics, and how AI is transforming industries. No coding required.', 
 '# Artificial Intelligence for Beginners\n\n## Introduction to AI\nArtificial Intelligence is revolutionizing how we work, communicate, and solve problems.\n\n## Key Concepts\n\n### Machine Learning\n- Supervised learning\n- Unsupervised learning\n- Reinforcement learning\n\n### Deep Learning\n- Neural networks basics\n- Computer vision\n- Natural language processing\n\n### AI Applications\n- Healthcare diagnostics\n- Autonomous vehicles\n- Recommendation systems\n- Virtual assistants\n\n### Ethical AI\n- Bias in AI systems\n- Privacy concerns\n- Future implications\n\n## Hands-on Examples\nWe will explore real AI tools and see how they work without writing code.',
 'ARTICLE', 
 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'admin@stilllearning.com'), 
 TRUE, NULL, NULL, NULL, NULL);

-- Health and Wellness
INSERT INTO courses (title, description, content, contentType, thumbnailUrl, author_id, isPublished, filePath, fileName, fileType, fileSize) VALUES 
('Mindfulness and Stress Management', 
 'Learn meditation techniques, breathing exercises, and mindfulness practices to reduce stress and improve mental well-being.', 
 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
 'VIDEO', 
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop', 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 TRUE, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', NULL, NULL, NULL);

-- =====================================================
-- Insert Comments
-- =====================================================

-- Comments for Full Stack JavaScript Development
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Full Stack JavaScript Development' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 'This course is exactly what I needed! The project-based approach really helps me understand how everything connects together.');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Full Stack JavaScript Development' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'The JWT authentication section was particularly helpful. Can you cover deployment strategies in the next module?');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Full Stack JavaScript Development' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'admin@stilllearning.com'), 
 'Great suggestion! I''ll add a deployment section covering Vercel, Netlify, and Docker in the next update.');

-- Make the deployment comment a reply to the JWT comment
UPDATE comments
SET parent_id = (SELECT id FROM comments WHERE text LIKE '%JWT authentication%' LIMIT 1)
WHERE text LIKE '%deployment section%'
  AND course_id = (SELECT id FROM courses WHERE title = 'Full Stack JavaScript Development' LIMIT 1);

-- Comments for Python for Data Science
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Python for Data Science' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 'The pandas section saved me hours of work! The movie recommendation project was challenging but so rewarding.');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Python for Data Science' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 'Love the real-world datasets used in examples. Much better than generic iris datasets!');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Python for Data Science' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'admin@stilllearning.com'), 
 'Could you add a section on handling missing data? That''s something I struggle with in my daily work.');

-- Comments for Digital Marketing Mastery
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'The SEO strategies in this course helped me increase my website traffic by 300% in just 2 months!');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 'Amazing results! Which specific technique worked best for you? I''m just starting out.');

-- Make the question a reply to the SEO success comment
UPDATE comments
SET parent_id = (SELECT id FROM comments WHERE text LIKE '%300% in just 2 months%' LIMIT 1)
WHERE text LIKE '%Which specific technique%'
  AND course_id = (SELECT id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1);

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'Long-tail keyword optimization and consistent content creation were game changers for me!');

-- Make this a reply to the previous question
UPDATE comments
SET parent_id = (SELECT id FROM comments WHERE text LIKE '%Which specific technique%' LIMIT 1)
WHERE text LIKE '%Long-tail keyword optimization%'
  AND course_id = (SELECT id FROM courses WHERE title = 'Digital Marketing Mastery' LIMIT 1);

-- Comments for AI for Beginners
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Artificial Intelligence for Beginners' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 'Finally an AI course that doesn''t require a PhD in mathematics! The ethical considerations section was eye-opening.');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Artificial Intelligence for Beginners' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 'The hands-on examples with ChatGPT and image generators really demystified AI for me. When will you cover AI in business applications?');

-- Comments for UI/UX Design Fundamentals
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'UI/UX Design Fundamentals' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'The Figma tutorials are gold! I went from complete beginner to creating my first mobile app prototype.');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'UI/UX Design Fundamentals' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 'User research methodologies section needs more depth. Could you add interviews and usability testing techniques?');

-- Comments for Photography Composition
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Photography Composition Techniques' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 'My Instagram engagement doubled after applying these composition rules! The leading lines technique is my favorite.');

-- Comments for Personal Finance Management
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Personal Finance Management' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'This course literally changed my financial life. I paid off $15k in debt using the strategies taught here!');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Personal Finance Management' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'siti@stilllearning.com'), 
 'The investment section is great, but could you add more about cryptocurrency and modern investment platforms?');

-- Comments for Mindfulness and Stress Management
INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Mindfulness and Stress Management' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'aulia@stilllearning.com'), 
 'The breathing exercises have become part of my daily routine. My anxiety levels have significantly decreased.');

INSERT INTO comments (course_id, author_id, text) VALUES 
((SELECT id FROM courses WHERE title = 'Mindfulness and Stress Management' LIMIT 1), 
 (SELECT id FROM users WHERE email = 'chandra@stilllearning.com'), 
 'Perfect for busy professionals! The 5-minute meditation sessions fit perfectly into my lunch breaks.'); 