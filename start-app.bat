@echo off
echo ==========================================
echo   Mini Hotel Booking Engine - Setup
echo ==========================================
echo.
echo 1. Menyiapkan Database di Laragon...
cd backend
node setup_db.js
echo.
echo 2. Menjalankan Backend Server...
start cmd /k "node server.js"
echo.
echo 3. Menjalankan Frontend Server (Expo Web)...
cd ../frontend
start cmd /k "npx expo start --web -c"
echo.
echo ==========================================
echo SETUP SELESAI! 
echo Silakan tunggu sampai Expo selesai mem-bundle.
echo Buka http://localhost:8081 di browser Anda.
echo ==========================================
pause
