const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const exportDB = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: 'mini_hotel_db'
        });

        const tables = ['hotels', 'rooms', 'bookings'];
        let sqlDump = 'CREATE DATABASE IF NOT EXISTS \`mini_hotel_db\`;\nUSE \`mini_hotel_db\`;\n\n';

        for (const table of tables) {
            const [createTableResult] = await connection.query(`SHOW CREATE TABLE \`${table}\``);
            sqlDump += `DROP TABLE IF EXISTS \`${table}\`;\n`;
            sqlDump += createTableResult[0]['Create Table'] + ';\n\n';

            const [rows] = await connection.query(`SELECT * FROM \`${table}\``);
            if (rows.length > 0) {
                sqlDump += `INSERT INTO \`${table}\` VALUES\n`;
                const values = rows.map(row => {
                    const mapped = Object.values(row).map(val => {
                        if (val === null) return 'NULL';
                        if (typeof val === 'string') return `'${val.replace(/'/g, "''").replace(/\n/g, "\\n")}'`;
                        if (val instanceof Date) return `'${val.toISOString().slice(0, 19).replace('T', ' ')}'`;
                        return val;
                    });
                    return `(${mapped.join(', ')})`;
                });
                sqlDump += values.join(',\n') + ';\n\n';
            }
        }

        fs.writeFileSync('mini_hotel_db_with_data.sql', sqlDump);
        console.log('Database exported successfully.');
    } catch (err) {
        console.error('Export failed:', err);
    } finally {
        if (connection) await connection.end();
    }
};

exportDB();
