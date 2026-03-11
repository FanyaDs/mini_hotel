const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bookingController = require('../controllers/bookingController');
const validate = require('../middleware/validation');

const bookingSchema = Joi.object({
    room_id: Joi.number().required(),
    guest_name: Joi.string().required(),
    email: Joi.string().email().required(),
    checkin_date: Joi.date().iso().required(),
    checkout_date: Joi.date().iso().greater(Joi.ref('checkin_date')).required()
});

router.post('/', validate(bookingSchema), bookingController.createBooking);

module.exports = router;
