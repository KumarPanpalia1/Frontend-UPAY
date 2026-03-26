import api from './api';

export const fetchDonations = () => api.get('/donations');
export const createDonation = (data) => api.post('/donations', data);
export const createManyDonations = (data) => api.post('/donations/bulk', data);
