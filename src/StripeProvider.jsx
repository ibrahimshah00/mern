// src/StripeProvider.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PoOAJ00fqy6sCtbYM5rJKK3U8veW9Nr4KneU5g7RRRodVjFUAWnZKq8uFrox62uqVjmJEZBYJEIC8YqILiHWwJu008OH4fnm5'); // Your public key

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
