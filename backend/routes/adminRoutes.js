const express = require('express');
const router = express.Router();
const Joi = require('joi');
const adminController = require('../controllers/adminController');
const validate = require('../middleware/validation');

const hotelSchema = Joi.object({
    name: Joi.string().required(),
    city: Joi.string().required(),
    address: Joi.string().required(),
    description: Joi.string().allow('')
});

const roomSchema = Joi.object({
    hotel_id: Joi.number().required(),
    name: Joi.string().required(),
    capacity: Joi.number().min(1).required(),
    price_per_night: Joi.number().min(0).required()
});

router.post('/hotels', validate(hotelSchema), adminController.createHotel);
router.post('/rooms', validate(roomSchema), adminController.createRoom);
router.get('/bookings', adminController.getAllBookings);

module.exports = router;
