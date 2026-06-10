import client from './client';

export const categoriesApi = {
  getTree:  () => client.get('/categories/tree'),
  getAll:   () => client.get('/categories'),
  create:   (data) => client.post('/categories', data),
  remove:   (id) => client.delete(`/categories/${id}`),
};