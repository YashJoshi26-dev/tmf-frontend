/**
 * Razorpay client-side helper.
 * 1. Lazy-loads the checkout.js script.
 * 2. Opens the modal with the server-created order details.
 * 3. Returns the success payload so the caller can POST it to /orders/:id/verify-razorpay.
 */

let scriptPromise = null;

const loadScript = () => {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => { scriptPromise = null; reject(new Error('Failed to load Razorpay')); };
    document.body.appendChild(s);
  });
  return scriptPromise;
};

export const openRazorpay = async ({ payment, order, user, onSuccess, onFailure }) => {
  await loadScript();

  const opts = {
    key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:      payment.amount,                 // already in paise from backend
    currency:    payment.currency || 'INR',
    name:        'Saree Showroom',
    description: `Order ${order._id}`,
    order_id:    payment.id,
    prefill: {
      name:  user?.name  || '',
      email: user?.email || '',
      contact: order.shippingAddress?.phoneNumber || '',
    },
    notes: { orderId: order._id },
    theme: { color: '#7B1E2B' },
    handler: (response) => onSuccess?.(response),
    modal: { ondismiss: () => onFailure?.(new Error('Payment cancelled')) },
  };

  const rzp = new window.Razorpay(opts);
  rzp.on('payment.failed', (err) => onFailure?.(err.error));
  rzp.open();
};
