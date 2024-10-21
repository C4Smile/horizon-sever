-- IMAGES
INSERT INTO `images` (`dateOfCreation`, `lastUpdate`, `deleted`, `fileName`, `url`) VALUES
('2024-08-26 09:28:46', '2024-08-26 09:28:46', 0, 'user-no-image.webp', '/user-no-image.webp');

-- USERS
INSERT INTO `users` (`dateOfCreation`, `lastUpdate`, `deleted`, `email`, `encrypted_password`, `phone`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'bot'),
('2024-07-19 09:01:22', '2024-07-19 09:01:22', 0, 'administrador@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'administrador'),
('2024-08-26 09:11:04', '2024-08-26 09:11:04', 0, 'invitado@email.com', '', 'invitado');

-- HORIZON ROLE
INSERT INTO `horizon-role` (`id`, `dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
(1, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Administrador'),
(1, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Player'),
(3, '2024-08-26 09:18:35', '2024-08-26 09:18:35', 0, 'Invitado');

-- HORIZON USER
INSERT INTO `horizon-user` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `username`, `address`, `identification`, `phone`, `email`, `roleId`, `userId`, `imageId`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot', 'bot', 'bot', 'bot', 'bot', 'bot@email.com', 1, 1, 1),
('2024-08-12 10:34:55', '2024-08-13 09:37:16', 0, 'Administrador', 'administrador', 'administrador', 'administrador', 'administrador', 'aministrador@email.com', 1, 2, 1),

-- APP TEXTS
INSERT INTO `app-texts` (`dateOfCreation`, `lastUpdate`, `deleted`, `title`, `urlName`, `content`) VALUES
('2024-07-19 09:03:21', '2024-07-19 09:03:21', 0, 'Acerca del Museo', 'acerca-del-museo', '<p>Contenido del Acerca de</p>\n'),
('2024-07-19 09:05:40', '2024-07-19 09:05:40', 0, 'Término y Condiciones de uso', 'termino-y-condiciones-de-uso', '<p>Contenido del Término y Condiciones de uso</p>\n'),
('2024-07-19 09:05:55', '2024-07-19 09:05:55', 0, 'Política de Privacidad', 'politica-de-privacidad', '<p>Contenido de las Política de Privacidad</p>\n'),
('2024-07-19 09:06:08', '2024-07-19 09:06:08', 0, 'Política de Cookies', 'politica-de-cookies', '<p>Contenido de las Política de Cookies</p>\n');

-- LANG
INSERT INTO `lang` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `code`) VALUES
('2024-08-27 10:41:21', '2024-08-27 10:41:21', 0, 'Español', "es"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Inglés', "en"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Francés', "fr"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Alemán', "de"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Ruso', "ru");