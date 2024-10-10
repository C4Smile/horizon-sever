-- IMAGES
INSERT INTO `images` (`dateOfCreation`, `lastUpdate`, `deleted`, `fileName`, `url`) VALUES
('2024-08-26 09:28:46', '2024-08-26 09:28:46', 0, 'user-no-image.webp', '/user-no-image.webp');

-- USERS
INSERT INTO `users` (`dateOfCreation`, `lastUpdate`, `deleted`, `email`, `encrypted_password`, `phone`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'bot'),
('2024-07-19 09:01:22', '2024-07-19 09:01:22', 0, 'administrador@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'administrador'),
('2024-08-13 09:14:04', '2024-08-13 09:14:04', 0, 'comunicador@email.com', '$2b$10$MPHks/bwdSic91xZta3tfeGWpEF6mxslv/YLoOXTrbRdYai6wIQMO', 'comunicador'),
('2024-08-26 09:11:04', '2024-08-26 09:11:04', 0, 'invitado@email.com', '', 'invitado');

-- MUSEUM ROLE
INSERT INTO `museum-role` (`id`, `dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
(1, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Administrador'),
(2, '2024-07-19 09:01:36', '2024-07-19 09:01:36', 0, 'Comunicador'),
(3, '2024-08-26 09:18:35', '2024-08-26 09:18:35', 0, 'Invitado');

-- MUSEUM USER
INSERT INTO `museum-user` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `username`, `address`, `identification`, `phone`, `email`, `roleId`, `userId`, `imageId`) VALUES
('2024-08-26 09:12:02', '2024-08-26 09:12:02', 0, 'bot', 'bot', 'bot', 'bot', 'bot', 'bot@email.com', 1, 1, 1),
('2024-08-12 10:34:55', '2024-08-13 09:37:16', 0, 'Administrador', 'administrador', 'administrador', 'administrador', 'administrador', 'aministrador@email.com', 1, 2, 1),
('2024-08-13 09:14:04', '2024-08-13 09:14:39', 0, 'Comunicador', 'comunicador', 'comunicador', 'comunicador', 'comunicador', 'comunicador@email.com', 2, 3, 1),
('2024-08-26 09:11:04', '2024-08-26 09:11:04', 0, 'Invitado', 'invitado', 'invitado', 'invitado', 'invitado', 'invitado@email.com', 3, 4, 1);

-- APP TEXTS
INSERT INTO `app-texts` (`dateOfCreation`, `lastUpdate`, `deleted`, `title`, `urlName`, `content`) VALUES
('2024-07-19 09:03:21', '2024-07-19 09:03:21', 0, 'Acerca del Museo', 'acerca-del-museo', '<p>Contenido del Acerca de</p>\n'),
('2024-07-19 09:05:40', '2024-07-19 09:05:40', 0, 'Término y Condiciones de uso', 'termino-y-condiciones-de-uso', '<p>Contenido del Término y Condiciones de uso</p>\n'),
('2024-07-19 09:05:55', '2024-07-19 09:05:55', 0, 'Política de Privacidad', 'politica-de-privacidad', '<p>Contenido de las Política de Privacidad</p>\n'),
('2024-07-19 09:06:08', '2024-07-19 09:06:08', 0, 'Política de Cookies', 'politica-de-cookies', '<p>Contenido de las Política de Cookies</p>\n');

-- ROOM STATUS
INSERT INTO `room-status` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
('2024-08-27 10:36:47', '2024-08-27 10:36:47', 0, 'Funcional'),
('2024-08-27 10:36:53', '2024-08-27 10:36:53', 0, 'Mantenimiento'),
('2024-08-27 10:36:58', '2024-08-27 10:36:58', 0, 'Inhabilitada');

-- ROOM TYPE
INSERT INTO `room-type` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
('2024-08-27 10:39:36', '2024-08-27 10:39:36', 0, 'Salas de exposición permanente'),
('2024-09-22 12:14:44', '2024-09-22 12:14:44', 0, 'Sala transitoria'),
('2024-09-22 12:17:28', '2024-09-22 12:17:28', 0, 'Otros espacios');

-- TAGS
INSERT INTO `tags` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`) VALUES
('2024-08-27 10:41:21', '2024-08-27 10:41:21', 0, 'Cultural'),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Internacional');

-- LANG
INSERT INTO `lang` (`dateOfCreation`, `lastUpdate`, `deleted`, `name`, `code`) VALUES
('2024-08-27 10:41:21', '2024-08-27 10:41:21', 0, 'Español', "es"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Inglés', "en"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Francés', "fr"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Alemán', "de"),
('2024-08-27 10:41:25', '2024-08-27 10:41:25', 0, 'Ruso', "ru");

-- ROOM
INSERT INTO `room` (`dateOfCreation`, `lastUpdate`, `deleted`, `number`, `name`, `urlName`, `description`, `content`, `statusId`, `typeId`) VALUES
('2024-09-20 08:46:25', '2024-09-22 12:06:50', 0, 'I', 'Historia de un símbolo', 'i', 'Descripción de la sala Historia de un símbolo', '<p>Descripción de la sala Historia de un símbolo</p>\n', 1, 1),
('2024-09-20 08:46:47', '2024-09-22 12:07:01', 0, 'II', 'La Forja de un guerrillero', 'ii', 'La Forja de un guerrillero.', '<p><span >La Forja de un guerrillero.</span>&nbsp;</p>\n', 1, 1),
('2024-09-20 08:46:58', '2024-09-22 12:07:08', 0, 'III', 'Frente Decisivo', 'iii', 'Frente Decisivo', '<p>Frente Decisivo</p>\n', 1, 1),
('2024-09-22 12:06:42', '2024-09-22 12:06:42', 0, 'IV', 'Victorias estratégicas', 'victorias-estrategicas', 'Victorias estratégicas.', '<p><span >Victorias estratégicas.</span>&nbsp;</p>\n', 1, 1),
('2024-09-22 12:07:35', '2024-09-22 12:07:35', 0, 'V', 'Lecciones de una guerrilla', 'lecciones-de-una-guerrilla', 'Lecciones de una guerrilla', '<p><span >Lecciones de una guerrilla</span>&nbsp;</p>\n', 1, 1),
('2024-09-22 12:11:44', '2024-09-22 12:11:44', 0, 'VI', 'Promesas cumplidas', 'promesas-cumplidas', 'Promesas cumplidas', '<p><span >Promesas cumplidas</span>&nbsp;</p>\n', 1, 1),
('2024-09-22 12:11:57', '2024-09-22 12:11:57', 0, 'VII', 'Ni olvidados, ni muertos', 'ni-olvidados-ni-muertos', 'Ni olvidados, ni muertos', '<p><span >Ni olvidados, ni muertos</span>&nbsp;</p>\n', 1, 1),
('2024-09-22 12:12:09', '2024-09-22 12:12:09', 0, 'VIII', 'Triunfo', 'triunfo', 'Triunfo', '<p><span >Triunfo</span>&nbsp;</p>\n', 1, 1),
('2024-09-22 12:16:44', '2024-09-22 12:16:44', 0, 'Transitoria', 'Celia Sánchez Manduley', 'celia-sanchez-manduley', 'Sala Transitoria Celia Sánchez Manduley', '<p>Sala Transitoria Celia Sánchez Manduley</p>\n', 1, 2),
('2024-09-22 12:18:31', '2024-09-22 12:18:31', 0, '', 'Centro de Información y Documentación', 'centro-de-informacion-y-documentacion', 'Centro de Información y Documentación', '<p>Centro de Información y Documentación</p>\n', 1, 3),
('2024-09-22 12:22:42', '2024-09-22 12:22:42', 0, '', 'Librería. El Cubano Libre.', 'libreria-el-cubano-libre', 'Librería. El Cubano Libre.', '<p><span >Librería. El Cubano Libre.</span>&nbsp;</p>\n', 1, 3),
('2024-09-22 12:22:54', '2024-09-22 12:22:54', 0, '', 'Sala Teatro Celia Sánchez Manduley', 'sala-teatro-celia-sanchez-manduley', 'Sala Teatro Celia Sánchez Manduley', '<p><span >Sala Teatro Celia Sánchez Manduley</span>&nbsp;</p>\n', 1, 3),
('2024-09-22 12:23:58', '2024-09-22 12:23:58', 0, '', 'Sala Interactiva', 'sala-interactiva', 'Sala Interactiva', '<p><span >Sala Interactiva</span>&nbsp;</p>\n', 1, 3),
('2024-09-22 12:25:32', '2024-09-22 12:25:32', 0, '', 'Sala Polifuncional', 'sala-polifuncional', 'Sala Polifuncional', '<p><span >Sala Polifuncional</span>&nbsp;</p>\n', 1, 3);