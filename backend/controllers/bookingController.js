const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');
const generateUUID = require('../utils/generateUUID');
const db = require('../config/db');

exports.createBooking = async (req, res, next) => {
    const connection = await db.getConnection();
    try {
        const { room_id, guest_name, email, checkin_date, checkout_date } = req.body;

        await connection.beginTransaction();

        // Check availability again within transaction (using the models/logic)
        const isAvailable = await Booking.isAvailable(room_id, checkin_date, checkout_date);
        if (!isAvailable) {
            await connection.rollback();
            return res.status(400).json({ error: 'Room no longer available for these dates' });
        }

        const booking_reference = generateUUID();
        await Booking.create({
            room_id,
            guest_name,
            email,
            checkin_date,
            checkout_date,
            booking_reference
        });

        await connection.commit();
        res.status(201).json({
            message: 'Booking successful',
            booking_reference
        });
    } catch (err) {
        await connection.rollback();
        next(err);
    } finally {
        connection.release();
    }
};
