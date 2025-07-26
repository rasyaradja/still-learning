import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext initializing...'); // Debug log
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        setCurrentUser(JSON.parse(user));
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    console.log('Setting loading to false'); // Debug log
    setLoading(false);
  }, []);

  const fetchCourses = async () => {
    try {
      console.log('Fetching courses...'); // Debug log
      const [published, pending] = await Promise.all([
        api.getCourses(),
        currentUser?.role === 'admin' ? api.getPendingCourses() : Promise.resolve([]),
      ]);
      console.log('Courses fetched:', published.length); // Debug log
      setCourses(published);
      setPendingCourses(pending);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      // Set empty arrays on error so app doesn't stay stuck
      setCourses([]);
      setPendingCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const login = async (credentials) => {
    try {
      const { user, token } = await api.login(credentials);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const register = async (userData) => {
    try {
      const user = await api.register(userData);
      // Log the user in after registration
      const { token } = await api.login(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    if (!currentUser) return;
    try {
      const updatedUser = await api.updateProfile(currentUser.id, updates);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      if (updates.name) {
        setCourses(prev => prev.map(course =>
          course.author.id === updatedUser.id
            ? { ...course, author: { ...course.author, name: updatedUser.name } }
            : course
        ));
        setPendingCourses(prev => prev.map(course =>
          course.author.id === updatedUser.id
            ? { ...course, author: { ...course.author, name: updatedUser.name } }
            : course
        ));
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const addCourseForApproval = async (courseData) => {
    if (!currentUser) return;
    try {
      await api.submitCourse(courseData);
      await fetchCourses();
    } catch (error) {
      console.error('Add course error:', error);
      throw error;
    }
  };

  const approveCourse = async (courseId) => {
    try {
      await api.approveCourse(courseId);
      await fetchCourses();
    } catch (error) {
      console.error('Approve course error:', error);
      throw error;
    }
  };

  const addComment = async (courseId, text, parentCommentId) => {
    if (!currentUser) return;
    try {
      const newComment = await api.addComment(courseId, text, parentCommentId);
      const updateCourseComments = (courseList) => courseList.map(course => {
        if (course.id === courseId) {
          if (parentCommentId) {
            return {
              ...course,
              comments: course.comments.map(comment => {
                if (comment.id === parentCommentId) {
                  return { ...comment, replies: [...comment.replies, newComment] };
                }
                return comment;
              })
            };
          } else {
            return { ...course, comments: [...course.comments, newComment] };
          }
        }
        return course;
      });
      setCourses(updateCourseComments);
      setPendingCourses(updateCourseComments);
    } catch (error) {
      console.error('Add comment error:', error);
      throw error;
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated, 
      isAdmin, 
      login, 
      logout, 
      register, 
      courses, 
      pendingCourses, 
      addCourseForApproval, 
      approveCourse, 
      addComment, 
      updateProfile,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};