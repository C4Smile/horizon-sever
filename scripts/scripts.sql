-- IMAGES
INSERT INTO `images` (`dateOfCreation`, `lastUpdate`, `deleted`, `fileName`, `url`) VALUES
('2024-08-26 09:28:46', '2024-08-26 09:28:46', 0, 'user-no-image.webp', '/user-no-image.webp');

-- USERS
INSERT INTO `users` (`dateOfCreation`, `lastUpdate`, `deleted`, `email`, `encrypted_password`, `phone`) VALUES
('2024-07-19 09:01:22', '2024-07-19 09:01:22', 0, 'administrador@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'administrador'),
('2024-07-19 09:01:22', '2024-07-19 09:01:22', 0, 'player@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'player');

-- HORIZON ROLE
INSERT INTO `horizon-role` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
('2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Administrador'),
('2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Player');

-- HORIZON USER
INSERT INTO `horizon-user` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `username`, `address`, `identification`, `phone`, `email`, `roleId`, `userId`, `imageId`) VALUES
('2024-08-12 10:34:55', '2024-08-13 09:37:16', 0, 'Administrador', 'administrador', 'administrador', 'administrador', 'administrador', 'aministrador@email.com', 1, 1, 1),
('2024-08-12 10:34:55', '2024-08-13 09:37:16', 0, 'player', 'player', 'player', 'player', 'player', 'player@email.com', 1, 2, 1),