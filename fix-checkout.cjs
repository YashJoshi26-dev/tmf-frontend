const fs = require('fs');
const filePath = '/var/www/tmf-frontend/src/pages/Checkout.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '// Razorpay flow';
const uniqueAnchor = 'Could not place order';

const startIdx = content.indexOf(startMarker);
const anchorIdx = content.indexOf(uniqueAnchor);
if (startIdx === -1 || anchorIdx === -1) { console.error('Markers not found! Aborting.'); process.exit(1); }

const realCatchIdx = content.lastIndexOf('} catch (e) {', anchorIdx);
if (realCatchIdx === -1 || realCatchIdx < startIdx) { console.error('Catch marker not found correctly. Aborting.'); process.exit(1); }

const newBlock = `// Razorpay flow
      if (!payment) throw new Error('Payment session not created');
      await openRazorpay({
        payment,
        order,
        user,
        onSuccess: async (rzpResponse) => {
          try {
            await ordersApi.verifyRazorpay(order._id, {
              razorpay_order_id:   rzpResponse.razorpay_order_id,
              razorpay_payment_id: rzpResponse.razorpay_payment_id,
              razorpay_signature:  rzpResponse.razorpay_signature,
            });
            dispatch(clearCart());
            navigate(\`/order/success/\${order._id}\`);
          } catch (e) {
            toast.error(e.message || 'Payment verification failed');
          }
        },
        onFailure: (err) => toast.error(err?.description || err?.message || 'Payment failed'),
      });
    } catch (e) {`;

content = content.slice(0, startIdx) + newBlock + content.slice(realCatchIdx + '} catch (e) {'.length);
fs.writeFileSync(filePath, content);
console.log('Patched successfully.');
