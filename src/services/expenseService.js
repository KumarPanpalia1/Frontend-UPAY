import api from './api';\nexport const fetchExpenses=()=>api.get('/expenses');\nexport const createExpense=data=>api.post('/expenses',data);
