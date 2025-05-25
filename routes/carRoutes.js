

const express = require('express');
const router = express.Router();
const carController = require('../controller/carController');
const auth = require('../middlewares/authmiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Create a new car
router.post('/', auth, upload.array('pictures', 10), carController.addcar);

// Get all cars
router.get('/', carController.getAllCars);

// Get a car by its ID
router.get('/:id', carController.getCarById);

// Update a car by its ID
router.put('/:id', auth, upload.array('images'), carController.updateCarById);

// Delete a car by its ID
router.delete('/:id', auth, carController.deleteCarById);

// Get cars by company
router.get('/filter/company/:company', carController.getCarsByCompany);

// Get cars by color
router.get('/filter/color/:color', carController.getCarsByColor);


// Get the total count of cars
router.get('/stats/count', carController.countTotalCars);

// Get all unique car companies
router.get('/stats/companies', carController.getCarCompanies);

  //search
  router.get('/search/cars', carController.searchCarsByName);

module.exports = router;







