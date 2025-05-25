    const express = require('express');
    const { register,login,getAllUsers } = require('../controller/authcontroller');
    const auth = require('../middlewares/authmiddleware');
    const User = require('../model/User');
    const router = express.Router();
    const bcrypt = require('bcryptjs');


    


    router.post('/register', register);
    router.post('/login', login);
    router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    });
 
    // Get all users
    router.get('/allUsers', auth, getAllUsers);
  
    module.exports = router;
