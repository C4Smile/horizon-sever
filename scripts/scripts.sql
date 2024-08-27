INSERT INTO `images` (`dateOfCreation`, `lastUpdate`, `deleted`, `fileName`, `url`) VALUES
('2024-08-26 09:28:46', '2024-08-26 09:28:46', 0, 'user-no-image.webp', '/user-no-image.webp');

INSERT INTO `users` (`dateOfCreation`, `lastUpdate`, `deleted`, `email`, `encrypted_password`, `phone`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot@email.com', '$2b$10$4YsdTpoGUfo8Vlcay53Ka.qUruxAOyUO7zjcLUZQLkv2zuEe3SbHi', 'bot'),
('2024-07-19 09:01:22', '2024-07-19 09:01:22', 0, 'administrador@email.com', '$2b$10$4YsdTpoGUfo8Vlcay53Ka.qUruxAOyUO7zjcLUZQLkv2zuEe3SbHi', 'administrador'),
('2024-08-13 09:14:04', '2024-08-13 09:14:04', 0, 'comunicador@email.com', '$2b$10$4YsdTpoGUfo8Vlcay53Ka.qUruxAOyUO7zjcLUZQLkv2zuEe3SbHi', 'comunicador'),
('2024-08-13 09:14:04', '2024-08-13 09:14:04', 0, 'museologo@email.com', '$2b$10$4YsdTpoGUfo8Vlcay53Ka.qUruxAOyUO7zjcLUZQLkv2zuEe3SbHi', 'museologo'),
('2024-08-26 09:11:04', '2024-08-26 09:11:04', 0, 'invitado@email.com', '', 'invitado');

INSERT INTO `museum-role` (`id`, `dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
(1, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Administrador'),
(2, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Comunicador'),
(3, '2024-08-26 08:53:16', '2024-08-26 09:18:29', 0, 'Museólogo'),
(4, '2024-08-26 09:18:35', '2024-08-26 09:18:35', 0, 'Invitado');

INSERT INTO `museum-user` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `username`, `address`, `identification`, `phone`, `email`, `roleId`, `userId`, `imageId`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot', 'bot', 'bot', 'bot', 'bot', 'bot@email.com', 1, 1, 1),
('2024-08-12 10:34:55', '2024-08-13 09:37:16', 0, 'Administrador', 'administrador', 'administrador', 'administrador', 'administrador', 'aministrador@email.com', 1, 2, 1),
('2024-08-13 09:14:04', '2024-08-13 09:14:39', 0, 'Comunicador', 'comunicador', 'comunicador', 'comunicador', 'comunicador', 'comunicador@email.com', 2, 3, 1),
('2024-08-13 09:14:04', '2024-08-13 09:14:39', 0, 'Museologo', 'museologo', 'museologo', 'museologo', 'museologo', 'museologo@email.com', 3, 4, 1),
('2024-08-26 09:11:04', '2024-08-26 09:11:04', 0, 'invitado@email.com', 'invitado', 'invitado', 'invitado', 'invitado', 'invitado@email.com', 4, 5, 1);

INSERT INTO `app-texts` (`dateOfCreation`, `lastUpdate`, `deleted`, `title`, `urlName`, `content`) VALUES
('2024-07-19 09:03:21', '2024-07-19 09:03:21', 0, 'Acerca del Museo', 'acerca-del-museo', '<p>Contenido del Acerca de</p>\n'),
('2024-07-19 09:05:40', '2024-07-19 09:05:40', 0, 'Término y Condiciones de uso', 'termino-y-condiciones-de-uso', '<p>Contenido del Término y Condiciones de uso</p>\n'),
('2024-07-19 09:05:55', '2024-07-19 09:05:55', 0, 'Política de Privacidad', 'politica-de-privacidad', '<p>Contenido de las Política de Privacidad</p>\n'),
('2024-07-19 09:06:08', '2024-07-19 09:06:08', 0, 'Política de Cookies', 'politica-de-cookies', '<p>Contenido de las Política de Cookies</p>\n');

INSERT INTO `room-status` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
('2024-08-27 10:36:47', '2024-08-27 10:36:47', 0, 'Funcional'),
('2024-08-27 10:36:53', '2024-08-27 10:36:53', 0, 'Mantenimiento'),
('2024-08-27 10:36:58', '2024-08-27 10:36:58', 0, 'Inhabilitada');