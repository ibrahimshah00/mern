// models/Purchase.js
const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userName: { type: String, required: true }, // User's name
  carName: { type: String, required: true }, // Name of the car
  amount: { type: Number, required: true }, // Payment amount in cents
  paymentIntentId: { type: String, required: true }, // Stripe payment intent ID
  createdAt: { type: Date, default: Date.now }, 
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
