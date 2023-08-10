-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 05:27 PM
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
-- Table structure for table `buildingcosts`
--

CREATE TABLE `buildingcosts` (
  `id` varchar(36) NOT NULL,
  `idBuilding` varchar(36) NOT NULL,
  `idResource` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL,
  `cost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buildingcosts`
--

INSERT INTO `buildingcosts` (`id`, `idBuilding`, `idResource`, `date`, `cost`) VALUES
('b4b00bf5-377f-11ee-b6ba-6c02e0b9ae9e', 'fb876e3b-377e-11ee-b6ba-6c02e0b9ae9e', '728abbb1-377f-11ee-b6ba-6c02e0b9ae9e', 1691673090154, 100),
('b4b0184f-377f-11ee-b6ba-6c02e0b9ae9e', 'fb876e3b-377e-11ee-b6ba-6c02e0b9ae9e', '728ac9f3-377f-11ee-b6ba-6c02e0b9ae9e', 1691673090154, 10);

-- --------------------------------------------------------

--
-- Table structure for table `buildingresources`
--

CREATE TABLE `buildingresources` (
  `id` varchar(36) NOT NULL,
  `idBuilding` varchar(36) NOT NULL,
  `idResource` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL,
  `multiplier` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buildingresources`
--

INSERT INTO `buildingresources` (`id`, `idBuilding`, `idResource`, `date`, `multiplier`) VALUES
('ec69cb54-377f-11ee-b6ba-6c02e0b9ae9e', 'fb876e3b-377e-11ee-b6ba-6c02e0b9ae9e', '728abbb1-377f-11ee-b6ba-6c02e0b9ae9e', 1691673090154, 10);

-- --------------------------------------------------------

--
-- Table structure for table `buildings`
--

CREATE TABLE `buildings` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL DEFAULT '',
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT '',
  `creation` int(11) NOT NULL DEFAULT 0,
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buildings`
--

INSERT INTO `buildings` (`id`, `name`, `description`, `photo`, `banner`, `creation`, `date`) VALUES
('fb876e3b-377e-11ee-b6ba-6c02e0b9ae9e', 'Industrias', 'La industria es una actividad cuyo objeto es transformar materias primas en productos terminados, semielaborados o súper terminados.', '/images/users/industries.jpg', '', 10, 1691672893193);

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
('01357919-d39e-4be8-9750-39ca1d351870', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680198320, 'sign out'),
('0ada1538-ffc2-4e2b-ba25-5e7bd5be152d', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691675595409, 'sign out'),
('27916a86-717f-4336-ae9b-6bb7ddc7a988', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-out', 1691615916276, 'sign out'),
('4a9ed9f4-d349-495a-895d-d0c89e1048d4', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691615924272, 'sign out'),
('547afa1b-e016-43b4-8441-228bd77681ca', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676156079, 'sign out'),
('5a4f3e75-7623-4283-900c-d436abf98018', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680437757, 'sign out'),
('65321b40-9cc7-4298-b523-12f39d3393b2', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680398632, 'sign out'),
('6abc0d8d-d746-443b-a72f-fa39a4636c98', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680532935, 'sign out'),
('70633215-403a-4eb1-bbd4-0dd19320523c', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-out', 1691273578704, 'sign out'),
('7907ec08-80ba-49e8-bc41-4c4939f687f6', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676361988, 'sign out'),
('7be66b22-d83b-4e92-a54a-d193bc1fb97a', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676010215, 'sign out'),
('80eefdf8-7877-4c9f-a252-64f3cffc99b5', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680156164, 'sign out'),
('891529ea-1ab5-457f-857e-4401220ed795', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691615060826, 'sign out'),
('8e4a70e1-2a11-4294-9ea6-04410e316cfc', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-out', 1691680622173, 'sign out'),
('8f18fd0d-7e8e-402b-94f6-3e672d2b070f', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676251414, 'sign out'),
('a758ea0b-00d7-4a83-a31f-50585490d6ee', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680474176, 'sign out'),
('c2a7facd-ac20-4d6e-9ed2-2d5565b3ada9', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676530968, 'sign out'),
('ca94414e-5ef2-45c8-b720-9db9930be402', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691676446841, 'sign out'),
('cbebd543-803f-4dc9-b2b7-14c4c0249acf', '0eb99680-8d9f-448c-9c7d-fe0c3e8e1f53', 'sign-out', 1691494121633, 'sign out'),
('d8557492-016c-4b78-a835-2a1043365162', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691273576395, 'sign out'),
('e3bbe41b-a182-4813-bde6-337d2c98a836', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691675782993, 'sign out'),
('ee996138-4696-4522-8408-e786eddf20bf', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sign-in', 1691680754516, 'sign out');

-- --------------------------------------------------------

--
-- Table structure for table `nations`
--

CREATE TABLE `nations` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `advantage` text NOT NULL,
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT '',
  `date` bigint(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nations`
--

INSERT INTO `nations` (`id`, `name`, `description`, `advantage`, `photo`, `banner`, `date`) VALUES
('44ba3532-33dc-11ee-9a78-6c02e0b9ae9e', 'España', 'Tras el descubrimiento de América en 1492, España exploró y conquistó grandes extensiones de territorio en América,  desde el actual suroeste de Estados Unidos, México y el Caribe, hasta Centroamérica, la mayor parte de Sudamérica,  y algunos fuertes y asentamientos aislados por las actuales Alaska y Columbia Británica. ', 'Galeones españoles: Barcos specializados en la transportación de grandes cantidades de materiales, llegando a cargar 69 toneladas[!]Los constructores trabajan un 30% más rápido[!]Las fundiciones producen un 15% más de metales[!]Aumenta el daño de todos los cañones en un 25%[!]Los barcos españoles se mueven un 60% más rápido[!]Los barcos españoles son un 20% más baratos[!]Los barcos españoles tienen un 25% más de durabilidad[!]', '/images/nations/spain.png', '', 1691273106802),
('58640b17-3458-11ee-9ca4-6c02e0b9ae9e', 'Inglaterra', 'El imperio de Inglaterra en América se iba expandiendo gradualmente mediante guerras y conquistas fundando colonias.  Las colonias americanas se extendían hacia el oeste en busca de nuevas tierras para la agricultura.  Durante la guerra de los Siete Años, los ingleses vencieron a los franceses y se quedaron con Nueva Francia, en 1760,  lo que convertía a Inglaterra en dueña de una buena parte de América del Norte. ', 'Aumente la producción de suministros en 20%[!]Construir granjas cuesta un 50% menos de materiales[!]El Astillero y el Mercado cuesta un 25% más barato[!]La Universidad aumenta la velocidad de investigación en un 10% más[!]Aumenta en un 25% el botín al ganar contra piratas[!]La Torre Blanca reemplaza al Torreón, con más durabilidad y potencia de ataque en un 50%[!]Reemplaza Fragata por Fragata Speaker, aumenta capacidad de carga en 6, cantidad de tripulación en 60 y  durabilidad en 50', '/images/nations/england.png', '', 1691326415349),
('58641f90-3458-11ee-9ca4-6c02e0b9ae9e', 'Francia', 'Generalmente se hace una distinción entre el \"primer imperio colonial\", que existió hasta 1814, momento en el que la mayor parte se había perdido o vendido. En su apogeo (1680), se extendió por más de 10 000 000 km², siendo el segundo imperio más grande del mundo en ese momento solo detrás del Imperio español. ', 'Las defensas son un 25% más baratas[!]Los leñadores son un 25% más rápidos aumentando la producción de materiales[!]Reemplaza la Academia por la Academia Real, las tecnologías son un 25% más baratas[!]Salón del gremio: Permite seleccionar un recurso y producirlo al pasar del tiempo[!]El Palacio Rojo reemplaza al Torreón, con más durabilidad y potencia de ataque[!]Reemplaza Arsenal por Colegio de la Artillería, haciendo que los cañones provoquen un 20% más de daño[!]La Cámara del Comercio reemplaza al Mercado, haciendo que al comerciar ganes el 30% del recurso en riquezas', '/images/nations/french.png', '', 1691326415349),
('6727dd4d-3458-11ee-9ca4-6c02e0b9ae9e', 'Holanda', 'Holanda despunta como potencia mercantilista en el siglo XVI e inició su despliegue colonial en el oriente y en América, afectando en este último continente el dominio comercial y territorial de España, y sobre todo de Portugal. Diecisiete provincias conocidas también como Países Bajos conformaban la metrópoli holandesa. ', 'Fluyt (Filibote): Barcos especializados en la transportación de grandes cantidades de materiales. Puede camuflar su cargamento, es más rápido que un galeón\"[!]Las granjas producen riquezas[!]Bancos: Edificio permite salvar riquezas de los saqueos a la ciudad[!]Oficina de Comercio: Puede ser construida en una ciudad aliada para producir riquezas al gobernador de la ciudad[!]Los saqueos de ciudades pueden obtener riquezas[!]Las expediciones y saqueos de piratería recaudan más riquezas[!]La Capitanes cuestan un 25% menos de riqueza', '/images/nations/dutch.jpg', '', 1691326415349);

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
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` varchar(36) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL DEFAULT '',
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT '',
  `date` bigint(16) NOT NULL,
  `multiplier` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `name`, `description`, `photo`, `banner`, `date`, `multiplier`) VALUES
('728abbb1-377f-11ee-b6ba-6c02e0b9ae9e', 'Materiales', '', '', '', 1691673090154, 0),
('728ac9f3-377f-11ee-b6ba-6c02e0b9ae9e', 'Metales', '', '', '', 1691673090154, 0),
('7a3afaa3-377f-11ee-b6ba-6c02e0b9ae9e', 'Suministros', '', '', '', 1691673090154, 0),
('7a3b0763-377f-11ee-b6ba-6c02e0b9ae9e', 'Riqueza', '', '', '', 1691673090154, 0);

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

--
-- Dumping data for table `tokens`
--

INSERT INTO `tokens` (`id`, `idUser`, `start`, `end`, `token`) VALUES
('1ad58906-f283-4022-908f-08a962429b44', '704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 1691767154520, 1691767154520, 'U2FsdGVkX19EF7FSB6GllwyglRX/mFXztf1ecrB2mlRofUj5tLn47L1BonuiZWFq+Y8d7M4jMZS6TQvRqi9QfutdGo8+QideQeWySnQyyHcma1iBtRVu98z4BMswVPXs');

-- --------------------------------------------------------

--
-- Table structure for table `userbuildings`
--

CREATE TABLE `userbuildings` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `idBuilding` varchar(36) NOT NULL,
  `date` bigint(16) NOT NULL,
  `level` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userresources`
--

CREATE TABLE `userresources` (
  `id` varchar(36) NOT NULL,
  `idUser` varchar(36) NOT NULL,
  `idResource` varchar(36) NOT NULL,
  `count` float NOT NULL,
  `date` bigint(16) NOT NULL
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
  `state` tinyint(4) NOT NULL DEFAULT -1,
  `lastOnline` bigint(16) NOT NULL DEFAULT 0,
  `date` bigint(16) NOT NULL,
  `photo` text NOT NULL DEFAULT '',
  `banner` text NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user`, `nick`, `nation`, `email`, `pw`, `status`, `state`, `lastOnline`, `date`, `photo`, `banner`) VALUES
('0eb99680-8d9f-448c-9c7d-fe0c3e8e1f53', 'visir2021', 'Sito', '58641f90-3458-11ee-9ca4-6c02e0b9ae9e', 'visir2021@gmail.com', '25d55ad283aa400af464c76d713c07ad', 0, 0, 0, 1691494008382, '/images/no-photo.webp', ''),
('704a8407-33dc-11ee-9a78-6c02e0b9ae9e', 'sito8943', 'SitoNumbis', '58641f90-3458-11ee-9ca4-6c02e0b9ae9e', 'sito8943@gmail.com', '25d55ad283aa400af464c76d713c07ad', 1, 0, 0, 1691273106802, '/images/users/sito8943.png', '');

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
-- Indexes for table `buildingcosts`
--
ALTER TABLE `buildingcosts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBuildingCost` (`idBuilding`),
  ADD KEY `idResourceBuildingCost` (`idResource`);

--
-- Indexes for table `buildingresources`
--
ALTER TABLE `buildingresources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idBuildingResource` (`idBuilding`),
  ADD KEY `idResourceBuilding` (`idResource`);

--
-- Indexes for table `buildings`
--
ALTER TABLE `buildings`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserToken` (`idUser`);

--
-- Indexes for table `userbuildings`
--
ALTER TABLE `userbuildings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserBuilding` (`idUser`),
  ADD KEY `idBuildingUser` (`idBuilding`);

--
-- Indexes for table `userresources`
--
ALTER TABLE `userresources`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUserResource` (`idUser`),
  ADD KEY `idResourceUser` (`idResource`);

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
-- Constraints for table `buildingcosts`
--
ALTER TABLE `buildingcosts`
  ADD CONSTRAINT `idBuildingCost` FOREIGN KEY (`idBuilding`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idResourceBuildingCost` FOREIGN KEY (`idResource`) REFERENCES `resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `buildingresources`
--
ALTER TABLE `buildingresources`
  ADD CONSTRAINT `idBuildingResource` FOREIGN KEY (`idBuilding`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idResourceBuilding` FOREIGN KEY (`idResource`) REFERENCES `resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `userbuildings`
--
ALTER TABLE `userbuildings`
  ADD CONSTRAINT `idBuildingUser` FOREIGN KEY (`idBuilding`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUserBuilding` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userresources`
--
ALTER TABLE `userresources`
  ADD CONSTRAINT `idResourceUser` FOREIGN KEY (`idResource`) REFERENCES `resources` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `idUserResource` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `idUserNation` FOREIGN KEY (`nation`) REFERENCES `nations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
