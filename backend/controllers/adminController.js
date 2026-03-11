const Hotel = require('../models/hotelModel');
const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');

exports.createHotel = async (req, res, next) => {
    try {
        const hotelId = await Hotel.create(req.body);
        res.status(201).json({ message: 'Hotel created', hotelId });
    } catch (err) {
        next(err);
    }
};

exports.createRoom = async (req, res, next) => {
    try {
        const roomId = await Room.create(req.body);
        res.status(201).json({ message: 'Room created', roomId });
    } catch (err) {
        next(err);
    }
};

exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await Booking.getAllWithInfo();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};
