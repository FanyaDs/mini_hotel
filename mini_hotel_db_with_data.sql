CREATE DATABASE IF NOT EXISTS `mini_hotel_db`;
USE `mini_hotel_db`;

DROP TABLE IF EXISTS `hotels`;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_hotels_city` (`city`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hotels` VALUES
(1, 'Grand Hyatt', 'Jakarta', 'Jl. M.H. Thamrin No.Kav 28-30', 'Luxury hotel in the heart of Jakarta.', '2026-03-11 14:51:24'),
(2, 'Hotel Indonesia Kempinski', 'Jakarta', 'Jl. M.H. Thamrin No.1', 'Iconic five-star hotel with legendary hospitality.', '2026-03-11 14:51:24'),
(3, 'Ayana Resort', 'Bali', 'Jl. Karang Mas Sejahtera, Jimbaran', 'Clifftop resort overlooking the Indian Ocean.', '2026-03-11 14:51:24'),
(4, 'W Bali - Seminyak', 'Bali', 'Jl. Petitenget, Kerobokan', 'Ulta-chic beachfront hotel in the heart of Seminyak.', '2026-03-11 14:51:24'),
(5, 'The Trans Luxury Hotel', 'Bandung', 'Jl. Gatot Subroto No.289', 'A spectacular 6-star luxury hotel in Bandung.', '2026-03-11 14:51:24'),
(6, 'Padma Hotel', 'Bandung', 'Jl. Ranca Bentang 56-58, Ciumbuleuit', 'Luxury hillside resort with stunning valley views.', '2026-03-11 14:51:24'),
(7, 'JW Marriott Hotel', 'Surabaya', 'Jl. Embong Malang 85-89', 'Refined luxury in the bustling city center.', '2026-03-11 14:51:24'),
(8, 'Hotel Majapahit', 'Surabaya', 'Jl. Tunjungan No.65', 'Historic colonial-era luxury hotel.', '2026-03-11 14:51:24'),
(9, 'Tentrem Hotel', 'Yogyakarta', 'Jl. P. Mangkubumi No.72A', 'Elegant hotel combining traditional Javanese culture with modern luxury.', '2026-03-11 14:51:24'),
(10, 'Amanjiwo', 'Yogyakarta', 'Ds. Majaksingi, Borobudur', 'Stunning luxury resort overlooking Borobudur temple.', '2026-03-11 14:51:24');

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotel_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `capacity` int NOT NULL,
  `price_per_night` decimal(10,2) NOT NULL,
  `total_quantity` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_rooms_hotel_id` (`hotel_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rooms` VALUES
(1, 1, 'Deluxe Room', 2, '150.00', 10),
(2, 1, 'Family Suite', 4, '300.00', 5),
(3, 2, 'Executive Suite', 2, '250.00', 8),
(4, 3, 'Ocean View Villa', 2, '450.00', 4),
(5, 4, 'Wonderful Garden View', 2, '350.00', 12),
(6, 5, 'Premier Room', 2, '120.00', 15),
(7, 6, 'Valley View Room', 2, '140.00', 10),
(8, 7, 'Deluxe City View', 2, '110.00', 20),
(9, 8, 'Heritage Suite', 2, '180.00', 6),
(10, 9, 'Deluxe Room', 2, '130.00', 25),
(11, 10, 'Borobudur Suite', 2, '600.00', 3);

DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `guest_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `checkin_date` date NOT NULL,
  `checkout_date` date NOT NULL,
  `booking_reference` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_bookings_room_id` (`room_id`),
  KEY `idx_bookings_dates` (`checkin_date`,`checkout_date`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bookings` VALUES
(1, 1, 'Fanya', 'ekafanya@gmail.com', '2026-03-10 17:00:00', '2026-03-11 17:00:00', '12b43078-16ab-4429-b573-4715b5390cf3', '2026-03-11 14:52:56');

