// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { useState } from 'react';

// const stripePromise = loadStripe('pk_test_51PoOAJ00fqy6sCtbYM5rJKK3U8veW9Nr4KneU5g7RRRodVjFUAWnZKq8uFrox62uqVjmJEZBYJEIC8YqILiHWwJu008OH4fnm5');

// const CheckoutForm = ({ car, closeSidebar }) => {
//   const [loading, setLoading] = useState(false);
//   const stripe = useStripe();
//   const elements = useElements();


// const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
  
//     setLoading(true);
  
//     try {
//       const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//       });
  
//       if (paymentMethodError) {
//         throw new Error(paymentMethodError.message);
//       }
  
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           paymentMethodId: paymentMethod.id,
//           amount: Math.round(car.price * 100), // Convert to cents and ensure it's an integer
//         }),
//       });
  
//       const result = await response.json();
  
//       if (response.ok && result.status === 'succeeded') {
//         alert('Payment successful!');
//         window.location.href = '/'; // Redirect to homepage
//       } else {
//         throw new Error(result.error || 'Payment failed.');
//       }
//     } catch (error) {
//       console.error('Payment error:', error.message);
//       alert(`An error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//       closeSidebar();
//     }
//   };
//   return (
//     <div>
//       <h2>Payment Information</h2>
//       <form onSubmit={handlePaymentSubmit}>
//         <div className="form-group">
//           <label htmlFor="card">Card Details</label>
//           <CardElement 
//             id="card"
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }} 
//           />
//         </div>
//         <button type="submit" disabled={loading || !stripe}>Submit Payment</button>
//         <button type="button" onClick={closeSidebar}>Close</button>
//       </form>
//     </div>
//   );
// };

// const WrappedCheckoutForm = (props) => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm {...props} />
//   </Elements>
// );

// export default WrappedCheckoutForm;




import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_51PoOAJ00fqy6sCtbYM5rJKK3U8veW9Nr4KneU5g7RRRodVjFUAWnZKq8uFrox62uqVjmJEZBYJEIC8YqILiHWwJu008OH4fnm5');

// const CheckoutForm = ({ car, closeSidebar }) => {
//   const [loading, setLoading] = useState(false);
//   const [userName, setUserName] = useState('');
//   const stripe = useStripe();
//   const elements = useElements();

//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);

//     try {
//       const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: elements.getElement(CardElement),
//         billing_details: {
//           name: userName,
//         },
//       });

//       if (paymentMethodError) {
//         throw new Error(paymentMethodError.message);
//       }

//       // Ensure car.name is available
//       const carName = car.name; 

//       const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           paymentMethodId: paymentMethod.id,
//           amount: Math.round(car.price * 100), // Convert to cents
//           userName,
//           carName, // Make sure carName is included in the request
//         }),
//       });

//       const result = await response.json();

//       if (response.ok && result.status === 'succeeded') {
//         alert('Payment successful!');
//         window.location.href = '/';
//       } else {
//         throw new Error(result.error || 'Payment failed.');
//       }
//     } catch (error) {
//       console.error('Payment error:', error.message);
//       alert(`An error occurred: ${error.message}`);
//     } finally {
//       setLoading(false);
//       closeSidebar();
//     }
//   };

//   return (
//     <div>
//       <h2>Payment Information</h2>
//       <form onSubmit={handlePaymentSubmit}>
//         <div className="form-group">
//           <label htmlFor="userName">User Name</label>
//           <input
//             id="userName"
//             type="text"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="card">Card Details</label>
//           <CardElement 
//             id="card"
//             options={{
//               style: {
//                 base: {
//                   fontSize: '16px',
//                   color: '#424770',
//                   '::placeholder': {
//                     color: '#aab7c4',
//                   },
//                 },
//                 invalid: {
//                   color: '#9e2146',
//                 },
//               },
//             }} 
//           />
//         </div>
//         <button type="submit" disabled={loading || !stripe}>Submit Payment</button>
//         <button type="button" onClick={closeSidebar}>Close</button>
//       </form>
//     </div>
//   );
// };

const CheckoutForm = ({ car, closeSidebar }) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: userName,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // Use car.carName to ensure the correct property is used
      const carName = car.carName; 

      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: Math.round(car.price * 100), // Convert to cents
          userName,
          carName, // Ensure carName is included in the request
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 'succeeded') {
        alert('Payment successful!');
        window.location.href = '/';
      } else {
        throw new Error(result.error || 'Payment failed.');
      }
    } catch (error) {
      console.error('Payment error:', error.message);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
      closeSidebar();
    }
  };

  return (
    <div className='checkoutform'>
      <h2>Payment Information</h2>
      <form  className='cardform' onSubmit={handlePaymentSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="card">Card Details</label>
          <CardElement 
            id="carddetails"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }} 
          />
        </div>
        <div className="cardsumit">
        <button type="submit" disabled={loading || !stripe}>Submit Payment</button>
        <button type="button" onClick={closeSidebar}>Close</button>
        </div>
      </form>
    </div>
  );
};

const WrappedCheckoutForm = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default WrappedCheckoutForm;
