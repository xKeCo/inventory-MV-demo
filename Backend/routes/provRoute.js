const router = require('express').Router();
const { allProviders, newProvider, updateProvider, deleteProvider } = require('../controller/provController');
const checkAuth = require('../middleware/checkAuth');

// All providers
router.get('/all', checkAuth, allProviders);

// New provider
router.post('/new', checkAuth, newProvider  );

// Update provider
router.post('/update/:id', checkAuth, updateProvider  );

// Delete provider
router.delete('/delete/:id', checkAuth, deleteProvider  );

module.exports = router;