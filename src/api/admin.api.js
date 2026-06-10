import client from './client';

export const adminApi = {
  // Orders
  listOrders:   (params)            => client.get('/orders', { params }),
  updateStatus: (id, status, note)  => client.patch(`/orders/${id}/status`, { status, note }),

  // Sync (CSV / Google Sheets)
triggerSync:  ()  => client.post('/inventory/sync'),
syncLogs:     ()  => client.get('/inventory/logs'),
  // Coupons
  listCoupons:  ()                  => client.get('/coupons'),
  createCoupon: (payload)           => client.post('/coupons', payload),
  updateCoupon: (id, payload)       => client.patch(`/coupons/${id}`, payload),
  deleteCoupon: (id)                => client.delete(`/coupons/${id}`),

  // Users
  listUsers:    (params)            => client.get('/admin/users', { params }),
};
