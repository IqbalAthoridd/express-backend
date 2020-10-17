-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 17, 2020 at 12:35 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `userId`, `productId`, `total`) VALUES
(1, 1, 4, 2),
(3, 1, 9, 1),
(4, 1, 5, 1),
(5, 1, 6, 1),
(6, 1, 1, 0),
(7, 1, 10, 0),
(8, 3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `picture` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `picture`) VALUES
(1, 'Asus', 'Asus mantap sekali', 'assets/picture/avatar-1602575455847.jpg'),
(2, 'Realme', 'Realme brand CIna', 'assets/picture/avatar-1602575480604.jpeg'),
(3, 'Samsung', 'Samsung mantap', 'assets/picture/avatar-1602580747200.jpg'),
(4, 'Lenovo', 'Lenovo mantap', 'assets/picture/avatar-1602581584731.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `conditions`
--

CREATE TABLE `conditions` (
  `id` int(11) NOT NULL,
  `name` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `conditions`
--

INSERT INTO `conditions` (`id`, `name`) VALUES
(1, 'New'),
(2, 'Used');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `price` int(50) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `description`, `quantity`, `user_id`, `condition_id`, `category_id`, `create_at`, `update_at`) VALUES
(1, 'Asus Rog', 30000000, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 1, NULL, '2020-10-13 09:08:19'),
(3, 'Realme C3', 1999999, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:14:17'),
(4, 'Realme C11', 1999999, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:15:28'),
(5, 'Realme C15', 2999999, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:15:53'),
(6, 'Iphon 11 Pro Max', 2100000, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:16:32'),
(7, 'Realme 5 Pro', 2999999, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:17:20'),
(8, 'Realme 3 Pro', 2999999, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 2, NULL, '2020-10-13 10:18:04'),
(9, 'Samsung S20 Ultra', 25000000, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 3, NULL, '2020-10-13 10:19:47'),
(10, 'Lenovo Legion', 30000000, 'adalah sebuah brand perangkat keras notebook khusus gaming dari ASUS, perusahaan berbasis di Taiwan yang memproduksi komponen komputer seperti papan induk, kartu grafis, dan notebook. ASUS belakangan ini mulai memproduksi PDA, Telepon genggam, LCD, dan Perangkat keras lainnya. Pesaing utamanya termasuk MSI, dan Gigabyte.', 2, 2, 1, 4, NULL, '2020-10-13 10:33:48');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `hexcode` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`id`, `product_id`, `name`, `hexcode`) VALUES
(1, 1, 'Green', 0),
(2, 2, 'Green', 0),
(3, 3, 'Green', 0),
(4, 4, 'Green', 0),
(5, 5, 'Green', 0),
(6, 6, 'Green', 0),
(7, 7, 'Green', 0),
(8, 8, 'Green', 0),
(9, 9, 'Green', 0),
(10, 10, 'Black', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_picture`
--

CREATE TABLE `product_picture` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `indexOf` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_picture`
--

INSERT INTO `product_picture` (`id`, `productId`, `url`, `indexOf`) VALUES
(1, 1, 'assets/picture/picture-1602576499154.jpg', 0),
(2, 2, 'assets/picture/picture-1602580237118.jpg', 0),
(3, 3, 'assets/picture/picture-1602580457346.jpeg', 0),
(4, 4, 'assets/picture/picture-1602580528359.jpeg', 0),
(5, 5, 'assets/picture/picture-1602580553472.jpg', 0),
(6, 6, 'assets/picture/picture-1602580592861.jpeg', 0),
(7, 7, 'assets/picture/picture-1602580640513.jpeg', 0),
(8, 8, 'assets/picture/picture-1602580684280.jpg', 0),
(9, 9, 'assets/picture/picture-1602580787744.jpg', 0),
(10, 10, 'assets/picture/picture-1602581628062.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`user_id`, `product_id`, `rating`, `comment`) VALUES
(1, 1, 2, 'mantap sekali COyyy'),
(1, 2, 5, 'mantap sekali COyyy'),
(1, 2, 4, 'mantap sekali COyyy'),
(1, 4, 4, 'mantap sekali COyyy');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`) VALUES
(1, 'Admin', 'All privilage'),
(2, 'Admin', 'All privilage'),
(3, 'Custommer', 'Buy Product'),
(4, 'Seller', 'Sell Product');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `store_name` varchar(30) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone_number`, `store_name`, `role_id`, `create_at`, `update_at`) VALUES
(1, 'iqbal', 'iqbal25@gmail.com', '$2b$10$tZFFxFa2qvawKy.kJITeCehTyLawZ05DwkDgf3D0rxjTJgy3/Ogbq', NULL, NULL, 3, NULL, NULL),
(2, 'Seller', 'seller@gmail.com', '$2b$10$9yg6U691MjwVvNsn.eQaKOmUzN9jS8NnT82om6lqExxWGPul6AsXq', '0857224624', 'Tokopaedi', 4, NULL, NULL),
(3, 'iqbal', 'iqball@gmail.com', '$2b$10$4hDZwwIe1F0SJKAFMaQcZuYEt0nwMOIsfkFEd1tgwrbEFvMFjamyK', NULL, NULL, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_adress`
--

CREATE TABLE `user_adress` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `recipient` varchar(50) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `adress` varchar(30) NOT NULL,
  `postal_code` varchar(25) NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `birt_day` date NOT NULL,
  `gender` enum('laki-laki','perempuan','others') NOT NULL,
  `avatar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `birt_day`, `gender`, `avatar`) VALUES
(1, '0000-00-00', 'laki-laki', ''),
(2, '0000-00-00', 'laki-laki', ''),
(3, '0000-00-00', 'laki-laki', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`,`productId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conditions`
--
ALTER TABLE `conditions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `condition_id` (`condition_id`,`category_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_picture`
--
ALTER TABLE `product_picture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD KEY `user_id` (`user_id`,`product_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_adress`
--
ALTER TABLE `user_adress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `conditions`
--
ALTER TABLE `conditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `product_picture`
--
ALTER TABLE `product_picture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_adress`
--
ALTER TABLE `user_adress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`condition_id`) REFERENCES `conditions` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product_picture`
--
ALTER TABLE `product_picture`
  ADD CONSTRAINT `product_picture_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_adress`
--
ALTER TABLE `user_adress`
  ADD CONSTRAINT `user_adress_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_details`
--
ALTER TABLE `user_details`
  ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
