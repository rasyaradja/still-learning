const API_BASE_URL = 'http://localhost:4000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const login = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Login gagal');
  }
  return res.json();
};

export const register = async (userData) => {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Registrasi gagal');
  }
  return res.json();
};

export const getCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/courses`);
  if (!res.ok) {
    throw new Error('Gagal mengambil data courses');
  }
  return res.json();
};

export const getPendingCourses = async () => {
  const res = await fetch(`${API_BASE_URL}/courses/pending`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Gagal mengambil data pending courses');
  }
  return res.json();
};

export const approveCourse = async (courseId) => {
  const res = await fetch(`${API_BASE_URL}/courses/${courseId}/approve`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Gagal approve course');
  }
  return res.json();
};

export const submitCourse = async (courseData) => {
  const formData = new FormData();
  formData.append('title', courseData.title);
  formData.append('description', courseData.description);
  formData.append('contentType', courseData.contentType);
  formData.append('content', courseData.content || '');
  if (courseData.thumbnailUrl) {
    formData.append('thumbnailUrl', courseData.thumbnailUrl);
  }
  if (courseData.uploadedFile) {
    formData.append('file', courseData.uploadedFile);
  }

  const res = await fetch(`${API_BASE_URL}/courses`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Gagal submit course');
  }
  return res.json();
};

export const addComment = async (courseId, text, parentCommentId) => {
  const res = await fetch(`${API_BASE_URL}/courses/${courseId}/comments`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, parentId: parentCommentId || null }),
  });
  if (!res.ok) {
    throw new Error('Gagal menambah komentar');
  }
  return res.json();
};

export const updateProfile = async (userId, updates) => {
  const res = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    throw new Error('Gagal update profil');
  }
  return res.json();
};
