const db = require('../config/db');

const Hotel = {
    search: async (city, guests, checkIn, checkOut) => {
        const query = `
            SELECT h.*, MIN(r.price_per_night) as starting_price
            FROM hotels h
            JOIN rooms r ON h.id = r.hotel_id
            WHERE h.city LIKE ? 
            AND r.capacity >= ?
            AND r.id NOT IN (
                SELECT room_id FROM bookings
                WHERE (checkin_date < ? AND checkout_date > ?)
            )
            GROUP BY h.id
        `;
        const searchTerm = `%${(city || '').trim()}%`;
        const [rows] = await db.query(query, [searchTerm, guests, checkOut, checkIn]);
        return rows;
    },


    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM hotels WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { name, city, address, description } = data;
        const [result] = await db.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            [name, city, address, description]
        );
        return result.insertId;
    }
};

module.exports = Hotel;
