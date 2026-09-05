-- Everything a fresh clone needs: the placeholder image, the accounts, and
-- the entities that own the art under public/images. Every statement checks
-- first, so running this twice changes nothing.
--
-- Numbers other than the ones already played with are left at 0, they are
-- meant to be edited from the dashboard.

-- ─── images ────────────────────────────────────────────────────────────────
-- id 1 is the placeholder every entity falls back to, so it goes in first
INSERT INTO `images` (`id`, `fileName`, `alt`, `url`)
  SELECT 1, 'user-no-image.webp', 'No user image', '/user-no-image.webp'
  FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `id` = 1);

INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'academia', 'academia', 'buildings/academia.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/academia.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'aserradero', 'aserradero', 'buildings/aserradero.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/aserradero.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'astillero', 'astillero', 'buildings/astillero.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/astillero.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'forja', 'forja', 'buildings/forja.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/forja.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'granja', 'granja', 'buildings/granja.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/granja.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'mercado', 'mercado', 'buildings/mercado.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/mercado.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'vivienda', 'vivienda', 'buildings/vivienda.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/vivienda.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'canon', 'canon', 'cannons/canon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'cannons/canon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'madera', 'madera', 'resources/iconos/madera.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/madera.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'monedas', 'monedas', 'resources/iconos/monedas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/monedas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'poblacion', 'poblacion', 'resources/iconos/poblacion.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/poblacion.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'suministros', 'suministros', 'resources/iconos/suministros.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/suministros.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'madera', 'madera', 'resources/madera.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/madera.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'monedas', 'monedas', 'resources/monedas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/monedas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'poblacion', 'poblacion', 'resources/poblacion.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/poblacion.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'suministros', 'suministros', 'resources/suministros.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/suministros.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'balandro', 'balandro', 'ships/balandro.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/balandro.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'carabela', 'carabela', 'ships/carabela.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/carabela.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'fragata', 'fragata', 'ships/fragata.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/fragata.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'galeon', 'galeon', 'ships/galeon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/galeon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'goleta', 'goleta', 'ships/goleta.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/goleta.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'balandro', 'balandro', 'ships/iconos/balandro.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/balandro.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'carabela', 'carabela', 'ships/iconos/carabela.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/carabela.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'fragata', 'fragata', 'ships/iconos/fragata.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/fragata.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'galeon', 'galeon', 'ships/iconos/galeon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/galeon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'goleta', 'goleta', 'ships/iconos/goleta.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/goleta.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'navegacion', 'navegacion', 'skills/navegacion.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'skills/navegacion.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'investigacion', 'investigacion', 'techTypes/investigacion.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techTypes/investigacion.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'mejora', 'mejora', 'techTypes/mejora.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techTypes/mejora.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'arquitectura', 'arquitectura', 'techs/arquitectura.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/arquitectura.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'artilleria', 'artilleria', 'techs/artilleria.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/artilleria.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'casco', 'casco', 'techs/casco.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/casco.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'comercio', 'comercio', 'techs/comercio.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/comercio.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'cuadernas', 'cuadernas', 'techs/cuadernas.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/cuadernas.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'cultivos', 'cultivos', 'techs/cultivos.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/cultivos.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'flota-de-indias', 'flota-de-indias', 'techs/flota-de-indias.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/flota-de-indias.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'forja', 'forja', 'techs/forja.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/forja.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'lenadores', 'lenadores', 'techs/lenadores.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/lenadores.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'madera', 'madera', 'techs/madera.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/madera.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'mejora', 'mejora', 'techs/mejora.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/mejora.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'navegacion', 'navegacion', 'techs/navegacion.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/navegacion.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'vivienda', 'vivienda', 'techs/vivienda.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/vivienda.jpeg');

-- ─── accounts, seeded already validated ──────────────────────────────────────────────────────────────
INSERT INTO `horizon-role` (`name`)
  SELECT 'Administrador' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-role` WHERE `name` = 'Administrador') AS x);
INSERT INTO `horizon-role` (`name`)
  SELECT 'Player' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-role` WHERE `name` = 'Player') AS x);
INSERT INTO `users` (`email`, `encrypted_password`, `phone`)
  SELECT 'administrador@email.com', '$2b$10$/6GY3X8iIwkmbLNloI4BUuYAnXdbs5DVyOTkyLOLTmPCSTmgQkfGy', 'administrador' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `users` WHERE `email` = 'administrador@email.com') AS x);
INSERT INTO `users` (`email`, `encrypted_password`, `phone`)
  SELECT 'player@email.com', '$2b$10$/6GY3X8iIwkmbLNloI4BUuYAnXdbs5DVyOTkyLOLTmPCSTmgQkfGy', 'player' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `users` WHERE `email` = 'player@email.com') AS x);
INSERT INTO `horizon-user` (`name`, `username`, `phone`, `email`, `roleId`, `userId`, `imageId`, `status`)
  SELECT 'administrador', 'administrador', 'administrador', 'administrador@email.com', (SELECT id FROM (SELECT id FROM `horizon-role` WHERE `name` = 'Administrador' LIMIT 1) AS r), (SELECT id FROM (SELECT id FROM `users` WHERE `email` = 'administrador@email.com' LIMIT 1) AS u), 1, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-user` WHERE `username` = 'administrador') AS x);
INSERT INTO `horizon-user` (`name`, `username`, `phone`, `email`, `roleId`, `userId`, `imageId`, `status`)
  SELECT 'player', 'player', 'player', 'player@email.com', (SELECT id FROM (SELECT id FROM `horizon-role` WHERE `name` = 'Player' LIMIT 1) AS r), (SELECT id FROM (SELECT id FROM `users` WHERE `email` = 'player@email.com' LIMIT 1) AS u), 1, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-user` WHERE `username` = 'player') AS x);

-- ─── types, needed before the rows that point at them ──────────────────────
-- The icons these types are drawn with live in the website, which is what
-- paints the buttons, so every type here carries the placeholder image.
--
-- Naval, Militar and Investigacion are named after those icons. Produccion and
-- Civil are a guess at what the remaining buildings have in common: rename
-- either and the buildings below follow, they look the type up by name.
INSERT INTO `building-types` (`name`, `imageId`)
  SELECT 'Naval', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Naval') AS x);
INSERT INTO `building-types` (`name`, `imageId`)
  SELECT 'Militar', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Militar') AS x);
INSERT INTO `building-types` (`name`, `imageId`)
  SELECT 'Investigacion', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Investigacion') AS x);
INSERT INTO `building-types` (`name`, `imageId`)
  SELECT 'Produccion', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Produccion') AS x);
INSERT INTO `building-types` (`name`, `imageId`)
  SELECT 'Civil', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Civil') AS x);
INSERT INTO `tech-types` (`name`, `imageId`)
  SELECT 'Naval', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-types` WHERE `name` = 'Naval') AS x);

-- ─── resources ─────────────────────────────────────────────────────────────
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Madera', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/madera.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/madera.png' LIMIT 1) AS i), 6, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Madera') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Monedas', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/monedas.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/monedas.png' LIMIT 1) AS i), 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Monedas') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Poblacion', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/poblacion.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/poblacion.png' LIMIT 1) AS i), 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Poblacion') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Suministros', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/suministros.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/suministros.png' LIMIT 1) AS i), 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Suministros') AS x);

-- ─── ships ─────────────────────────────────────────────────────────────────
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Fragata', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/fragata.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/fragata.png' LIMIT 1) AS i), 100, 12, 10, 40, 60, 24, 300, 20, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Fragata') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Balandro', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/balandro.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/balandro.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Balandro') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Carabela', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/carabela.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/carabela.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Carabela') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Galeon', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/galeon.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/galeon.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Galeon') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Goleta', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/goleta.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/goleta.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Goleta') AS x);

-- ─── buildings ─────────────────────────────────────────────────────────────
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Astillero', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/astillero.png' LIMIT 1) AS i), 10, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Naval' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Astillero') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Academia', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/academia.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Investigacion' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Academia') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Aserradero', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/aserradero.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Produccion' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Aserradero') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Forja', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/forja.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Militar' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Forja') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Granja', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/granja.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Produccion' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Granja') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Mercado', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/mercado.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Civil' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Mercado') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Vivienda', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/vivienda.png' LIMIT 1) AS i), 0, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Civil' LIMIT 1) AS t), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Vivienda') AS x);

-- ─── the rest of the seed ──────────────────────────────────────────────────
-- cannons carry no image column, so cannons/canon.png has no owner
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Culebrina', 30, 900, 8, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Culebrina') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Carena', 1, (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Naval' LIMIT 1) AS t), 5, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Carena') AS x);
INSERT INTO `skills` (`name`, `imageId`, `description`)
  SELECT 'Navegacion', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'skills/navegacion.jpeg' LIMIT 1) AS i), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `skills` WHERE `name` = 'Navegacion') AS x);
