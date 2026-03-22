import api from './api';\nexport const fetchDonations=()=>api.get('/donations');\nexport const createDonation=data=>api.post('/donations',data);
