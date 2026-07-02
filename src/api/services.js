import api from './axiosInstance';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authService = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  logout: () => api.post('/api/auth/logout'),
  me: () => api.get('/api/auth/me'),
};

// ─── Posts ────────────────────────────────────────────────────────────────────
export const postService = {
  getAll: (params) => api.get('/api/posts', { params }),
  getById: (id) => api.get(`/api/posts/${id}`),
  create: (data) => api.post('/api/posts', data),
  update: (id, data) => api.put(`/api/posts/${id}`, data),
  delete: (id) => api.delete(`/api/posts/${id}`),
  like: (postId) => api.post(`/api/posts/${postId}/like`),
};

// ─── Categories ───────────────────────────────────────────────────────────────
export const categoryService = {
  getAll: (params) => api.get('/api/categories', { params }),
  getById: (id) => api.get(`/api/categories/${id}`),
  create: (data) => api.post('/api/categories', data),
  update: (id, data) => api.put(`/api/categories/${id}`, data),
  delete: (id) => api.delete(`/api/categories/${id}`),
};

// ─── Tags ─────────────────────────────────────────────────────────────────────
export const tagService = {
  getAll: (params) => api.get('/api/tags', { params }),
  getById: (id) => api.get(`/api/tags/${id}`),
  create: (data) => api.post('/api/tags', data),
  update: (id, data) => api.put(`/api/tags/${id}`, data),
  delete: (id) => api.delete(`/api/tags/${id}`),
};

// ─── Comments ─────────────────────────────────────────────────────────────────
export const commentService = {
  create: (postId, data) => api.post(`/api/posts/${postId}/comments`, data),
  update: (id, data) => api.put(`/api/comments/${id}`, data),
  hide: (id) => api.post(`/api/comments/${id}/hide`),
  delete: (id) => api.delete(`/api/comments/${id}`),
};

// ─── Media ────────────────────────────────────────────────────────────────────
export const mediaService = {
  upload: (formData) => api.post('/api/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// ─── AI Assistant ─────────────────────────────────────────────────────────────
export const aiService = {
  generateTitle: (data) => api.post('/api/ai/generate-title', data),
  generateSummary: (data) => api.post('/api/ai/generate-summary', data),
  improveText: (data) => api.post('/api/ai/improve-text', data),
};

// ─── Post Stats ───────────────────────────────────────────────────────────────
export const postStatsService = {
  getStats: () => api.get('/api/post-stats'),
};
