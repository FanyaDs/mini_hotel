const db = require('../config/db');

const Room = {
    getByHotelId: async (hotelId, checkIn, checkOut) => {
        const query = `
            SELECT r.* 
            FROM rooms r
            WHERE r.hotel_id = ?
            AND r.id NOT IN (
                SELECT room_id FROM bookings
                WHERE (checkin_date < ? AND checkout_date > ?)
            )
        `;
        const [rows] = await db.query(query, [hotelId, checkOut, checkIn]);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { hotel_id, name, capacity, price_per_night } = data;
        const [result] = await db.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night) VALUES (?, ?, ?, ?)',
            [hotel_id, name, capacity, price_per_night]
        );
        return result.insertId;
    }
};

module.exports = Room;
