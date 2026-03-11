const db = require('./config/db');

const seedData = async () => {
    try {
        console.log('Starting seed...');

        // 1. Create Hotel
        const [hotelResult] = await db.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Grand Hyatt', 'Jakarta', 'Jl. M.H. Thamrin No.Kav 28-30', 'Luxury hotel in the heart of Jakarta.']
        );
        const hotelId = hotelResult.insertId;

        // 2. Create Rooms
        await db.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night) VALUES (?, ?, ?, ?)',
            [hotelId, 'Deluxe Room', 2, 150.00]
        );
        await db.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night) VALUES (?, ?, ?, ?)',
            [hotelId, 'Family Suite', 4, 300.00]
        );

        console.log('Seed completed successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
};

seedData();
