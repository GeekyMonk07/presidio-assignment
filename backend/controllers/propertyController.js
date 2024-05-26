const Property = require('../models/Property');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Create a new property
exports.createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges,
        } = req.body;

        const seller = req.user._id;

        const property = await Property.create({
            seller,
            title,
            description,
            location,
            area,
            bedrooms,
            bathrooms,
            nearbyHospitals,
            nearbyColleges,
        });

        // Add the new property to the seller's properties array
        await User.findByIdAndUpdate(seller, {
            $push: { properties: property._id },
        });

        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('seller', 'firstName lastName');

        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get properties by seller
exports.getSellerProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('properties');

        res.json(user.properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        if (property.seller.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Remove the property from the seller's properties array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { properties: property._id },
        });

        await property.remove();

        res.json({ message: 'Property removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Like a property
exports.likeProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const user = req.user._id;

        if (property.likedBy.includes(user)) {
            return res.status(400).json({ message: 'Property already liked' });
        }

        property.likedBy.push(user);
        await property.save();

        res.json({ message: 'Property liked' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Express interest in a property
exports.expressInterest = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const buyer = req.user._id;
        const seller = property.seller;

        if (property.interestedBuyers.includes(buyer)) {
            return res.status(400).json({ message: 'Interest already expressed' });
        }

        property.interestedBuyers.push(buyer);
        await property.save();

        // Send email to buyer with seller details
        const buyerEmail = req.user.email;
        const sellerDetails = await User.findById(seller, 'firstName lastName email phoneNumber');

        sendEmail(buyerEmail, sellerDetails);

        // Send email to seller with buyer details
        const sellerEmail = sellerDetails.email;
        const buyerDetails = {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            phoneNumber: req.user.phoneNumber,
        };

        sendEmail(sellerEmail, buyerDetails, true);

        res.json({ message: 'Interest expressed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a property by ID
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('seller', 'firstName lastName email phoneNumber');

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Helper function to send email
const sendEmail = async (to, details, isSeller = false) => {
    const transporter = nodemailer.createTransport({
        // Configure your email service provider
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject: isSeller ? 'New interest in your property' : 'Property details',
        text: `
      ${isSeller ? 'A buyer is interested in your property.' : 'Here are the details of the seller:'}
      Name: ${details.firstName} ${details.lastName}
      Email: ${details.email}
      Phone: ${details.phoneNumber}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};