-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2023 at 12:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `horizon`
--

-- --------------------------------------------------------

--
-- Table structure for table `blocked`
--

CREATE TABLE `blocked` (
  `id` varchar(36) NOT NULL,
  `idDealer` varchar(36) NOT NULL,
  `idTarget` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
  `id` varchar(36) NOT NULL,
  `error` text NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `friendrequests`
--

CREATE TABLE `friendrequests` (
  `id` varchar(36) NOT NULL,
  `idSender` varchar(36) NOT NULL,
  `idReceiver` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `friendships`
--

CREATE TABLE `friendships` (
  `id` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL,
  `idDealer` varchar(36) NOT NULL,
  `idTarget` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `operation` text NOT NULL,
  `date` bigint(16) NOT NULL,
  `observation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `idUser`, `operation`, `date`, `observation`) VALUES
('70633215-403a-4eb1-bbd4-0dd19320523c', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-out', 1691273578704, 'sign out'),
('d8557492-016c-4b78-a835-2a1043365162', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691273576395, 'sign out'),
('f74d6d4a-198b-4a0d-9f43-a5fdf8a483fe', 'b038f215-8cec-475f-9b82-d69d679fe39f', 'sign-out', 1691275251114, 'sign out');

-- --------------------------------------------------------

--
-- Table structure for table `nations`
--

CREATE TABLE `nations` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT '',
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nations`
--

INSERT INTO `nations` (`id`, `name`, `photo`, `banner`, `date`) VALUES
('44ba3532-33dc-11ee-9a78-6c02e0b9ae9e', 'España', '', '', 1691273106802);

-- --------------------------------------------------------

--
-- Table structure for table `recovery`
--

CREATE TABLE `recovery` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `token` text NOT NULL,
  `expiration` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `start` bigint(16) NOT NULL,
  `end` bigint(36) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(36) NOT NULL,
  `user` text NOT NULL,
  `nick` text NOT NULL,
  `nation` varchar(36) NOT NULL DEFAULT '44ba3532-33dc-11ee-9a78-6c02e0b9ae9e',
  `email` text NOT NULL,
  `pw` text NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `state` tinyint(4) NOT NULL DEFAULT 0,
  `lastOnline` bigint(16) NOT NULL DEFAULT 0,
  `date` bigint(16) NOT NULL,
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `nick`, `nation`, `email`, `pw`, `status`, `state`, `lastOnline`, `date`, `photo`, `banner`) VALUES
('704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sito8943', 'Sito Numbis', '44ba3532-33dc-11ee-9a78-6c02e0b9ae9e', 'sito8943@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, 0, 0, 1691273106802, '', ''),
('b038f215-8cec-475f-9b82-d69d679fe39f', 'visir2021', 'visir2021', '44ba3532-33dc-11ee-9a78-6c02e0b9ae9e', 'visir2021@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, 0, 0, 1691275249403, '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blocked`
--
ALTER TABLE `blocked`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserBlocker` (`idDealer`),
  ADD KEY `idUserBlocked` (`idTarget`);

--
-- Indexes for table `errors`
--
ALTER TABLE `errors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserError` (`idUser`);

--
-- Indexes for table `friendrequests`
--
ALTER TABLE `friendrequests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserFRequester` (`idSender`),
  ADD KEY `idUserFReceiver` (`idReceiver`);

--
-- Indexes for table `friendships`
--
ALTER TABLE `friendships`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserFriendR` (`idDealer`),
  ADD KEY `idUserFriendT` (`idTarget`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserLog` (`idUser`);

--
-- Indexes for table `nations`
--
ALTER TABLE `nations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `recovery`
--
ALTER TABLE `recovery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserRecovery` (`idUser`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserToken` (`idUser`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserNation` (`nation`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blocked`
--
ALTER TABLE `blocked`
  ADD CONSTRAINT `idUserBlocked` FOREIGN KEY (`idTarget`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUserBlocker` FOREIGN KEY (`idDealer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `errors`
--
ALTER TABLE `errors`
  ADD CONSTRAINT `idUserError` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friendrequests`
--
ALTER TABLE `friendrequests`
  ADD CONSTRAINT `idUserFReceiver` FOREIGN KEY (`idReceiver`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUserFRequester` FOREIGN KEY (`idSender`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `friendships`
--
ALTER TABLE `friendships`
  ADD CONSTRAINT `idUserFriendR` FOREIGN KEY (`idDealer`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUserFriendT` FOREIGN KEY (`idTarget`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `idUserLog` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `recovery`
--
ALTER TABLE `recovery`
  ADD CONSTRAINT `idUserRecovery` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `idUserToken` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `idUserNation` FOREIGN KEY (`nation`) REFERENCES `nations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
