const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const setup = async () => {
    let connection;
    try {
        console.log('--- Laragon/MySQL Setup ---');
        console.log('Connecting to MySQL at ' + (process.env.DB_HOST || '127.0.0.1') + ':' + (process.env.DB_PORT || '3306') + '...');

        connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        });

        console.log('Loading schema.sql...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');

        console.log('Creating database and tables...');
        await connection.query(schema);
        console.log('Schema applied successfully.');

        console.log('Seeding demo data into mini_hotel_db...');
        await connection.query('USE mini_hotel_db');

        // Clear for fresh start
        await connection.query('DELETE FROM bookings');
        await connection.query('DELETE FROM rooms');
        await connection.query('DELETE FROM hotels');

        // Hotels in Jakarta
        const [jakartaHotel1] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Grand Hyatt', 'Jakarta', 'Jl. M.H. Thamrin No.Kav 28-30', 'Luxury hotel in the heart of Jakarta.']
        );
        const [jakartaHotel2] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Hotel Indonesia Kempinski', 'Jakarta', 'Jl. M.H. Thamrin No.1', 'Iconic five-star hotel with legendary hospitality.']
        );

        // Hotels in Bali
        const [baliHotel1] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Ayana Resort', 'Bali', 'Jl. Karang Mas Sejahtera, Jimbaran', 'Clifftop resort overlooking the Indian Ocean.']
        );
        const [baliHotel2] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['W Bali - Seminyak', 'Bali', 'Jl. Petitenget, Kerobokan', 'Ulta-chic beachfront hotel in the heart of Seminyak.']
        );

        // Hotels in Bandung
        const [bandungHotel1] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['The Trans Luxury Hotel', 'Bandung', 'Jl. Gatot Subroto No.289', 'A spectacular 6-star luxury hotel in Bandung.']
        );
        const [bandungHotel2] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Padma Hotel', 'Bandung', 'Jl. Ranca Bentang 56-58, Ciumbuleuit', 'Luxury hillside resort with stunning valley views.']
        );

        // Hotels in Surabaya
        const [surabayaHotel1] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['JW Marriott Hotel', 'Surabaya', 'Jl. Embong Malang 85-89', 'Refined luxury in the bustling city center.']
        );
        const [surabayaHotel2] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Hotel Majapahit', 'Surabaya', 'Jl. Tunjungan No.65', 'Historic colonial-era luxury hotel.']
        );

        // Hotels in Yogyakarta
        const [yogyaHotel1] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Tentrem Hotel', 'Yogyakarta', 'Jl. P. Mangkubumi No.72A', 'Elegant hotel combining traditional Javanese culture with modern luxury.']
        );
        const [yogyaHotel2] = await connection.query(
            'INSERT INTO hotels (name, city, address, description) VALUES (?, ?, ?, ?)',
            ['Amanjiwo', 'Yogyakarta', 'Ds. Majaksingi, Borobudur', 'Stunning luxury resort overlooking Borobudur temple.']
        );

        // Rooms for Grand Hyatt (Jakarta)
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [jakartaHotel1.insertId, 'Deluxe Room', 2, 150.00, 10]
        );
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [jakartaHotel1.insertId, 'Family Suite', 4, 300.00, 5]
        );

        // Rooms for Kempinski (Jakarta)
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [jakartaHotel2.insertId, 'Executive Suite', 2, 250.00, 8]
        );

        // Rooms for Ayana (Bali)
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [baliHotel1.insertId, 'Ocean View Villa', 2, 450.00, 4]
        );

        // Rooms for W Bali (Bali)
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [baliHotel2.insertId, 'Wonderful Garden View', 2, 350.00, 12]
        );

        // Rooms for Trans Luxury Bandung
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [bandungHotel1.insertId, 'Premier Room', 2, 120.00, 15]
        );

        // Rooms for Padma Bandung
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [bandungHotel2.insertId, 'Valley View Room', 2, 140.00, 10]
        );

        // Rooms for JW Marriott Surabaya
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [surabayaHotel1.insertId, 'Deluxe City View', 2, 110.00, 20]
        );

        // Rooms for Hotel Majapahit Surabaya
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [surabayaHotel2.insertId, 'Heritage Suite', 2, 180.00, 6]
        );

        // Rooms for Tentrem Yogyakarta
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [yogyaHotel1.insertId, 'Deluxe Room', 2, 130.00, 25]
        );

        // Rooms for Amanjiwo Yogyakarta
        await connection.query(
            'INSERT INTO rooms (hotel_id, name, capacity, price_per_night, total_quantity) VALUES (?, ?, ?, ?, ?)',
            [yogyaHotel2.insertId, 'Borobudur Suite', 2, 600.00, 3]
        );


        console.log('DONE: Database is ready in Laragon!');
    } catch (err) {
        console.error('ERROR during setup:', err.message);
        if (err.code === 'ECONNREFUSED') {
            console.error('Check if Laragon is running and MySQL is started.');
        }
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
};

setup();
