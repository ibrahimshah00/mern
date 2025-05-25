
const Car = require('../model/Carmodel');
const fs = require('fs');
const path = require('path');

// Helper function to encode image to Base64
function encodeImageToBase64(filePath) {
  const image = fs.readFileSync(filePath);
  const base64Image = Buffer.from(image).toString('base64');
  return `data:image/${path.extname(filePath).slice(1)};base64,${base64Image}`;
}

// Add a new car
exports.addcar = async (req, res) => {
  const { carName,price, milesRun, model, transmission, fuelType, company, carId, isAvailable, guarantee, description, numberOfPassengers, color, equipments } = req.body;

  let formattedEquipments = {};
  if (equipments) {
    try {
      formattedEquipments = typeof equipments === 'string' ? JSON.parse(equipments) : equipments;
    } catch (error) {
      return res.status(400).json({ msg: 'Invalid format for equipments field.' });
    }
  }

  const pictures = req.files ? req.files.map(file => {
    const filePath = path.join('images', file.filename);
    return encodeImageToBase64(filePath);
  }) : [];

  try {
    const car = new Car({
      pictures,
      price,
      carName,
      milesRun,
      model,
      transmission,
      fuelType,
      company,
      carId,
      isAvailable,
      guarantee,
      description,
      numberOfPassengers,
      color,
      equipments: formattedEquipments
    });
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    const carsWithFullUrls = cars.map(car => ({
      ...car._doc,
      pictures: car.pictures // Pictures are already Base64-encoded
    }));
    res.json(carsWithFullUrls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
};

// Get a car by its ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a car by its ID
// exports.updateCarById = async (req, res) => {
//   try {
//     let pictures = [];
//     if (req.files) {
//       pictures = req.files.map(file => {
//         const filePath = path.join('images', file.filename);
//         return encodeImageToBase64(filePath);
//       });
//     }

//     const car = await Car.findByIdAndUpdate(
//       req.params.id,
//       {
//         ...req.body,
//         pictures: pictures.length ? pictures : undefined
//       },
//       { new: true }
//     );

//     if (!car) return res.status(404).json({ msg: 'Car not found' });
//     res.json(car);
//   } catch (err) {
//     console.error('Error updating car:', err.message);
//     res.status(500).send('Server error');
//   }
// };
 exports.updateCarById = async (req, res) => {
  try {
    let pictures = [];
    if (req.files) {
      pictures = req.files.map(file => {
        const filePath = path.join('images', file.filename);
        return encodeImageToBase64(filePath);
      });
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        pictures: pictures.length ? pictures : undefined
      },
      { new: true }
    );

    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error('Error updating car:', err.message);
    res.status(500).send('Server error');
  }
 };




// Delete a car by its ID
exports.deleteCarById = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json({ msg: 'Car removed' });
  } catch (err) {
    console.error('Error deleting car:', err.message);
    res.status(500).send('Server error');
  }
};

// Get cars by company
exports.getCarsByCompany = async (req, res) => {
  const company = req.params.company;

  try {
    const cars = await Car.find({ company });
    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars by company:', err.message);
    res.status(500).send('Server error');
  }
};

// Get cars by color
exports.getCarsByColor = async (req, res) => {
  const color = req.params.color;

  try {
    const cars = await Car.find({ color });
    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars by color:', err.message);
    res.status(500).send('Server error');
  }
};

// Get all unique car companies
exports.getCarCompanies = async (req, res) => {
  try {
    const companies = await Car.distinct('company');
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Count total cars

exports.countTotalCars = async (req, res) => {
  try {
    const totalCars = await Car.countDocuments();
    res.json({ totalCars });
  } catch (error) {
    console.error('Error counting cars:', error.message);
    res.status(500).json({ message: 'Error counting cars' });
  }
};

// Update car availability
exports.updateCarAvailability = async (req, res) => {
  const { isAvailable } = req.body;

  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true }
    );

    if (!car) return res.status(404).json({ msg: 'Car not found' });
    res.json(car);
  } catch (err) {
    console.error('Error updating car availability:', err.message);
    res.status(500).send('Server error');
  }
};

//search car
exports.searchCarsByName = async (req, res) => {
  try {
    let { carName } = req.query;

    // Check if carName is provided
    if (!carName) {
      return res.status(400).json({ message: 'Car name is required' });
    }

    // Normalize the carName input
    carName = carName.trim();

    const cars = await Car.find({ carName: new RegExp(carName, 'i') });

    res.json(cars);
  } catch (err) {
    console.error('Search error:', err.message);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
};
