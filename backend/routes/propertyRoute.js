const express = require('express');
const router = express.Router();
const { protect } = require('../middleware');

const {
    createProperty,
    getAllProperties,
    getSellerProperties,
    updateProperty,
    deleteProperty,
    likeProperty,
    expressInterest,
    getPropertyById
} = require('../controllers/propertyController');

// Create a new property
router.post('/', protect, createProperty);

// Get all properties
router.get('/', getAllProperties);

// Get properties by seller
router.get('/seller', protect, getSellerProperties);

// Update a property
router.put('/:id', protect, updateProperty);

// Delete a property
router.delete('/:id', protect, deleteProperty);

// Like a property
router.put('/like/:id', protect, likeProperty);

// Express interest in a property
router.put('/interest/:id', protect, expressInterest);
// Get a property by ID
router.get('/:id', getPropertyById);

module.exports = router;