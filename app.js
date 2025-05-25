  const express = require('express');
  const connectDB = require('./config/db');
  const dotenv = require('dotenv');
  const carRoutes = require('./routes/carRoutes');
  const cors = require('cors');
  const path = require('path');
  //const paymentRoutes = require('./config/payment');
  const purchaseRoutes = require('./routes/purchaseroute');
  dotenv.config();
  const app = express();

  // Connect to the database
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use('/images', express.static(path.join(__dirname, 'images')));

  // Routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/cars', carRoutes);
  
  app.use('/api/purchases', purchaseRoutes); 
  app.use('/api/getallcustomers',purchaseRoutes);
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  //app.use('/api', paymentRoutes);

  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));






