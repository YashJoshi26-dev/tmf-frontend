import client from './client';

export const productsApi = {
  list:        (params)        => client.get('/products', { params }),
  byId:        (id)            => client.get(`/products/${id}`),
  bySlug:      (slug)          => client.get(`/products/slug/${slug}`),
  addReview:   (id, payload)   => client.post(`/products/${id}/reviews`, payload),
  categories:  ()              => client.get('/catalog/categories'),
  subcategories: (parent)      => client.get('/catalog/sub-categories', { params: { parent } }),
};
