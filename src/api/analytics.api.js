import client from './client';

export const analyticsApi = {
  getSummary:         () => client.get('/analytics/summary'),
  getSales:           () => client.get('/analytics/sales'),
  getTopProducts:     () => client.get('/analytics/top-products'),
  getStatusBreakdown: () => client.get('/analytics/status-breakdown'),
};