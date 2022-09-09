const router = require('express').Router();
const { login, createUser } = require('../controller/userController');

// Login endpoint
router.post('/login', login);

// Auth endpoint
router.get('/auth');

// Create account endpoint
router.post('/create-user', createUser);

module.exports = router;