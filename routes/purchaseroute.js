// routes/purchase.js
const express = require('express');
const router = express.Router();
const Purchase = require('../model/Purchase');


router.get('/', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching purchases', error });
  }
});

router.get('/count', async (req, res) => {
  try {
    const totalCustomers = await Purchase.countDocuments();
    res.json({ totalCustomers });
  } catch (error) {
    console.error('Error counting customers:', error.message);
    res.status(500).json({ message: 'Error counting customers' });
  }
});


// Route to get the total amount from all purchases
router.get('/total-amount', async (req, res) => {
  try {
    // Aggregate the total amount
    const result = await Purchase.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);
    const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
    res.json({ totalAmount });
  } catch (error) {
    console.error('Error calculating total amount:', error.message);
    res.status(500).json({ message: 'Error calculating total amount' });
  }
});
    
router.get('/monthly-sales', async (req, res) => {
  try {
    // Aggregate sales data by month
    const result = await Purchase.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          totalSales: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    // Format the result for easier consumption
    const monthlySales = result.map(entry => ({
      month: `${entry._id.year}-${entry._id.month.toString().padStart(2, '0')}`,
      totalSales: entry.totalSales / 100 // Convert cents to dollars
    }));

    res.json(monthlySales);
  } catch (error) {
    console.error('Error calculating monthly sales:', error.message);
    res.status(500).json({ message: 'Error calculating monthly sales' });
  }
});

module.exports = router;
