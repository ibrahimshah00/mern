const express = require('express');
const router = express.Router();
const User = require('../model/Purchase'); // Import the User model
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment', async (req, res) => {
  const { paymentMethodId, amount, userName, carName } = req.body;

  try {
    // Create a Payment Intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
      },
      return_url: 'http://localhost:3000/',
    });

    // Store the user and payment details in MongoDB
    const user = new User({
      userName,
      carName,
      amount,
      paymentIntentId: paymentIntent.id,
    });

    await user.save();

    // Respond with the client secret and payment intent status
    res.json({
      clientSecret: paymentIntent.client_secret,
      status: paymentIntent.status,
    });
  } catch (error) {
    console.error('Payment error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;