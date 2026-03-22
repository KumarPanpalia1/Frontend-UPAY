import api from './api';

export const getFunds        = ()       => api.get('/funds').then(r => r.data);
export const getTransactions = ()       => api.get('/funds/transactions').then(r => r.data);
export const allocate        = (data)   => api.post('/funds/allocate', data).then(r => r.data);
export const getFundById     = (id)     => api.get(`/funds/${id}`).then(r => r.data);