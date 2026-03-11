const Hotel = require('../models/hotelModel');
const Room = require('../models/roomModel');

exports.searchHotels = async (req, res, next) => {
    try {
        const { city, checkin, checkout, guests } = req.query;
        const hotels = await Hotel.search(city, guests, checkin, checkout);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};

exports.getHotelDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { checkin, checkout } = req.query;

        const hotel = await Hotel.getById(id);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

        const rooms = await Room.getByHotelId(id, checkin, checkout);
        res.status(200).json({ ...hotel, rooms });
    } catch (err) {
        next(err);
    }
};
