import axios from 'axios';

// Backend URL - update this to your backend URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = Bearer ${token};
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Departments API
export const departmentsAPI = {
  getAll: () => api.get('/departments'),
  getById: (id) => api.get(/departments/${id}),
  create: (data) => api.post('/departments', data),
  update: (id, data) => api.put(/departments/${id}, data),
  delete: (id) => api.delete(/departments/${id}),
};

// Services API
export const servicesAPI = {
  getAll: () => api.get('/services'),
  getById: (id) => api.get(/services/${id}),
  getByDepartment: (departmentId) => api.get(/services?department=${departmentId}),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(/services/${id}, data),
  delete: (id) => api.delete(/services/${id}),
};

// Requests API
export const requestsAPI = {
  getAll: (filters) => api.get('/requests', { params: filters }),
  getById: (id) => api.get(/requests/${id}),
  create: (data) => api.post('/requests', data),
  updateStatus: (id, data) => api.patch(/requests/${id}/status, data),
  delete: (id) => api.delete(/requests/${id}),
};

// Payments API
export const paymentsAPI = {
  simulate: (data) => api.post('/payments/simulate', data),
  getAll: () => api.get('/payments'),
};

// Reports API
export const reportsAPI = {
  getDashboard: () => api.get('/reports/dashboard'),
  getStats: () => api.get('/reports/stats'),
};

// Notifications API (Mock - implement if backend supports)
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.patch(/notifications/${id}/read),
};

// Users API (Admin)
export const usersAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(/users/${id}),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(/users/${id}, data),
  delete: (id) => api.delete(/users/${id}),
};

export default api;