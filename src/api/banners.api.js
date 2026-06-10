import client from './client';

export const bannersApi = {
  getAll:  () => client.get('/banners/all'),
  create:  (data) => client.post('/banners', data),
  remove:  (id) => client.delete(`/banners/${id}`),
  toggle:  (id, active) => client.patch(`/banners/${id}`, { active }),
};