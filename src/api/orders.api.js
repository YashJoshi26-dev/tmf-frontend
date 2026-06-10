import client from './client';

export const ordersApi = {
  getCart:        ()          => client.get('/cart'),
  saveCart:       (products)  => client.post('/cart', { products }),
  clearCart:      ()          => client.delete('/cart'),

  applyCoupon:    (code)      => client.post('/coupons/apply', { coupon: code }),

  create:         (payload)   => client.post('/orders', payload),
  mine:           (params)    => client.get('/orders/mine', { params }),
  byId:           (id)        => client.get(`/orders/${id}`),
  verifyRazorpay: (id, body)  => client.post(`/orders/${id}/verify-razorpay`, body),
};
