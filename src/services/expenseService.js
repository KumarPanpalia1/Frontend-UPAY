import api from './api';

export const getAll       = ()           => api.get('/expenses').then(r => r.data);
export const create       = (data)       => api.post('/expenses', data).then(r => r.data);
export const updateStatus = (id, status) => api.patch(`/expenses/${id}/status`, { status }).then(r => r.data);
export const getById      = (id)         => api.get(`/expenses/${id}`).then(r => r.data);
