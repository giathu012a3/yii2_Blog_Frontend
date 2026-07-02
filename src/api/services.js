import api from './axiosInstance';

export const productService = {
  getAll: (params) => api.get('/api/products', { params }),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (data) => api.post('/api/products', data),
  update: (id, data) => api.post(`/api/products/${id}`, data),
  delete: (id) => api.delete(`/api/products/${id}`),
};

export const categoryService = {
  getAll: () => api.get('/api/categories'),
  getById: (id) => api.get(`/api/categories/${id}`),
  create: (data) => api.post('/api/categories', data),
  update: (id, data) => api.put(`/api/categories/${id}`, data),
  delete: (id) => api.delete(`/api/categories/${id}`),
};

export const articleService = {
  getAll: (params) => api.get('/api/articles', { params }),
  getById: (id) => api.get(`/api/articles/${id}`),
  create: (data) => api.post('/api/articles', data),
  update: (id, data) => api.post(`/api/articles/${id}`, data),
  delete: (id) => api.delete(`/api/articles/${id}`),
};

export const cartService = {
  getAll: () => api.get('/api/carts'),
  addItem: (data) => api.post('/api/carts', data),
  updateItem: (id, data) => api.put(`/api/carts/${id}`, data),
  removeItem: (id) => api.delete(`/api/carts/${id}`),
  clearCart: () => api.delete('/api/carts'),
};

export const orderService = {
  getAll: (params) => api.get('/api/orders', { params }),
  getById: (id) => api.get(`/api/orders/${id}`),
  create: (data) => api.post('/api/orders', data),
};

export const tagService = {
  getAll: () => api.get('/api/tags'),
};
