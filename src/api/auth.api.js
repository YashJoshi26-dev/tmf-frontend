import client from './client';

export const authApi = {
  register:       (payload) => client.post('/auth/register', payload),
  login:          (payload) => client.post('/auth/login', payload),
  refresh:        ()        => client.post('/auth/refresh'),
  logout:         ()        => client.post('/auth/logout'),
  me:             ()        => client.get('/users/me'),
  updateProfile:  (payload) => client.patch('/users/me', payload),

  // OTP (if/when you wire it up in backend)
  otpSend:        (phone)              => client.post('/auth/otp/send', { phone }),
  otpVerify:      (phone, code)        => client.post('/auth/otp/verify', { phone, code }),

  forgotPassword: (email)              => client.post('/auth/forgot-password', { email }),
  resetPassword:  (token, newPassword) => client.post('/auth/reset-password', { token, newPassword }),

  // Addresses
  addAddress:    (a)         => client.post('/users/me/addresses', a),
  updateAddress: (id, a)     => client.patch(`/users/me/addresses/${id}`, a),
  removeAddress: (id)        => client.delete(`/users/me/addresses/${id}`),

  // Wishlist
  getWishlist:   ()          => client.get('/users/me/wishlist'),
  toggleWishlist:(productId) => client.post(`/users/me/wishlist/${productId}`),
};
