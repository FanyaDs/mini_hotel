const db = require('../config/db');

const Booking = {
    create: async (data) => {
        const { room_id, guest_name, email, checkin_date, checkout_date, booking_reference } = data;
        const [result] = await db.query(
            'INSERT INTO bookings (room_id, guest_name, email, checkin_date, checkout_date, booking_reference) VALUES (?, ?, ?, ?, ?, ?)',
            [room_id, guest_name, email, checkin_date, checkout_date, booking_reference]
        );
        return result.insertId;
    },

    isAvailable: async (roomId, checkIn, checkOut) => {
        const query = `
            SELECT COUNT(*) as count 
            FROM bookings 
            WHERE room_id = ? 
            AND (checkin_date < ? AND checkout_date > ?)
        `;
        const [rows] = await db.query(query, [roomId, checkOut, checkIn]);
        return rows[0].count === 0;
    },

    getAllWithInfo: async () => {
        const query = `
            SELECT b.*, r.name as room_name, h.name as hotel_name, h.city
            FROM bookings b
            JOIN rooms r ON b.room_id = r.id
            JOIN hotels h ON r.hotel_id = h.id
            ORDER BY b.created_at DESC
        `;
        const [rows] = await db.query(query);
        return rows;
    }
};

module.exports = Booking;
