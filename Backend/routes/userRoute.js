const router = require('express').Router();
const { login, createUser, auth } = require('../controller/userController');
const checkAuth = require('../middleware/checkAuth');

// Login endpoint
router.post('/login', login);

// Auth endpoint
router.get('/auth', checkAuth, auth );

// Create account endpoint
router.post('/create-user', checkAuth, createUser);

module.exports = router;