const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    pictures: { type: [String], default: [] },
    price:{ type:String, required:true}, // Array to store multiple pictures
    carName: { type: String, required: true },
    milesRun: { type: String, required: true },
    model: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    company: { type: String, required: true },
    carId: { type: String, required: true },  
    isAvailable: { type: Boolean, required: true },
    guarantee: { type: String }, // Add guarantee field
    description: { type: String }, // Add description field
    numberOfPassengers: { type: Number }, // Add number of passengers field
    color: { type: String }, // Add color field
    equipments: { type: Map, of: String } // Dynamic equipment key-value pairs
});

module.exports = mongoose.model('Car', CarSchema);