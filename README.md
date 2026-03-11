# Mini Hotel Booking Engine

A complete OTA (Online Travel Agent) Mini Hotel Booking Engine built with Node.js, Express, MySQL, and React Native (Expo Web).

## Tech Stack
*   **Frontend**: React Native Web (Expo SDK 52, React 18)
*   **Backend**: Node.js, Express, Joi (Validation)
*   **Database**: MySQL (optimized for Laragon)

---

## How to Run the Project (For HR Evaluation)

This project has been explicitly designed to run straight out of the box using **Laragon**.

### 1. Database Setup
1. Open Laragon and **Start All** (Ensure Apache/Nginx and MySQL are running).
2. Open Laragon's database manager (HeidiSQL or phpMyAdmin) and create an empty database named \`mini_hotel_db\`:
   \`\`\`sql
   CREATE DATABASE mini_hotel_db;
   \`\`\`
3. Import the provided SQL dump which contains **all pre-seeded hotel data** (Jakarta, Bali, Bandung, Surabaya, Yogyakarta):
   *   Locate the \`mini_hotel_db_with_data.sql\` file in the root directory.
   *   Import it into the \`mini_hotel_db\` you just created.

*Note: The backend assumes default Laragon MySQL credentials (User: \`root\`, Password: \`[empty]\`).*

### 2. Startup Script (Windows)
We have provided a one-click startup batch script.
1. Open a terminal in the root folder (\`Mini_Hotel\`).
2. Run the initialization script:
   \`\`\`bash
   ./start-app.bat
   \`\`\`
3. This script will automatically:
   *   Install all necessary backend and frontend dependencies.
   *   Start the backend server on **Port 5000**.
   *   Start the Expo web bundler on **Port 8081**.

### 3. Accessing the Application
Once the terminal shows the bundler is ready, open your web browser and navigate to:
**http://localhost:8081**

*Note: If you do not see the hotel data immediately, please perform a Hard Refresh (\`Ctrl + F5\`) to clear the browser cache.*

---

## Features Implemented
*   **Search Engine**: Robust, case-insensitive hotel search by City and Dates.
*   **Native Calendar Picker**: Utilizes HTML5 native date pickers for seamless web UX.
*   **Booking System**: Complete booking flow from room selection to confirmation using UUIDs.
*   **Admin Dashboard**: Dedicated screens to add new Hotels and browse all Bookings.
*   **Responsive**: Mobile-first React Native architecture gracefully falling back to Web.
