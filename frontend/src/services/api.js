import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log('Token in interceptor:', token);
  if (token) {
    config.headers['Authorization'] =
            `Bearer ${token}`;
  }
  return config;
});

export const register = (data) =>
  api.post('/auth/register', data);

export const login = (data) =>
  api.post('/auth/login', data);

export const addJob = (data) =>
  api.post('/jobs/add', data);

export const getAllJobs = () =>
  api.get('/jobs/all');

export const updateJobStatus = (id, status) =>
  api.put(`/jobs/update/${id}?status=${status}`);

export const deleteJob = (id) =>
  api.delete(`/jobs/delete/${id}`);

export const getDashboard = () =>
  api.get('/jobs/dashboard');