-- Everything a fresh clone needs: the placeholder image, the accounts, and
-- the prefab the game is balanced around. Every statement checks first, so
-- running this twice changes nothing.
--
-- The numbers, the descriptions and every relation come from the December
-- 2024 dump kept in the Horizon folder, which is the only place they ever
-- existed. Three things are translated on the way in:
--
--   * ids are never copied. Everything is looked up by name, because the
--     dump numbers its resources in a different order than this database
--     does: its resource 2 is Suministros where ours is Monedas, so a
--     straight copy would have the granja charging coins for food.
--   * the names follow the art under public/images. The dump calls them
--     Materiales, Riquezas and Campamentos de Leñadores; here they are
--     Madera, Monedas and Aserradero, which is what the pictures show.
--   * neither kind of type carries an image. The game paints its building
--     type buttons from its own assets and never asks for a tech type
--     picture at all.

-- ─── images ────────────────────────────────────────────────────────────────
-- id 1 is the placeholder every entity falls back to, so it goes in first
INSERT INTO `images` (`id`, `fileName`, `alt`, `url`)
  SELECT 1, 'user-no-image.webp', 'No user image', '/user-no-image.webp'
  FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `id` = 1);

INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'aserradero', 'aserradero', 'buildings/aserradero.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/aserradero.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'granja', 'granja', 'buildings/granja.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/granja.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'vivienda', 'vivienda', 'buildings/vivienda.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/vivienda.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'mercado', 'mercado', 'buildings/mercado.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/mercado.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'astillero', 'astillero', 'buildings/astillero.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/astillero.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'forja', 'forja', 'buildings/forja.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/forja.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'academia', 'academia', 'buildings/academia.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'buildings/academia.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'canon', 'canon', 'cannons/canon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'cannons/canon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'madera', 'madera', 'resources/iconos/madera.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/madera.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'suministros', 'suministros', 'resources/iconos/suministros.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/suministros.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'monedas', 'monedas', 'resources/iconos/monedas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/monedas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'poblacion', 'poblacion', 'resources/iconos/poblacion.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/iconos/poblacion.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'madera', 'madera', 'resources/madera.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/madera.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'suministros', 'suministros', 'resources/suministros.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/suministros.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'monedas', 'monedas', 'resources/monedas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/monedas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'poblacion', 'poblacion', 'resources/poblacion.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'resources/poblacion.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'balandro', 'balandro', 'ships/balandro.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/balandro.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'goleta', 'goleta', 'ships/goleta.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/goleta.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'carabela', 'carabela', 'ships/carabela.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/carabela.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'fragata', 'fragata', 'ships/fragata.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/fragata.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'galeon', 'galeon', 'ships/galeon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/galeon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'balandro', 'balandro', 'ships/iconos/balandro.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/balandro.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'carabela', 'carabela', 'ships/iconos/carabela.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/carabela.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'fragata', 'fragata', 'ships/iconos/fragata.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/fragata.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'galeon', 'galeon', 'ships/iconos/galeon.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/galeon.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'goleta', 'goleta', 'ships/iconos/goleta.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'ships/iconos/goleta.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'navegacion', 'navegacion', 'skills/navegacion.jpeg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'skills/navegacion.jpeg');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'cultivos', 'cultivos', 'techs/cultivos.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/cultivos.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'mulas', 'mulas', 'techs/mulas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/mulas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'comercio', 'comercio', 'techs/comercio.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/comercio.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'velas', 'velas', 'techs/velas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/velas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'casco', 'casco', 'techs/casco.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/casco.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'flotas', 'flotas', 'techs/flotas.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/flotas.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'arquitectura', 'arquitectura', 'techs/arquitectura.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/arquitectura.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'construccion-naval', 'construccion-naval', 'techs/construccion-naval.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/construccion-naval.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'artilleria', 'artilleria', 'techs/artilleria.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/artilleria.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'forja', 'forja', 'techs/forja.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'techs/forja.png');

INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'england', 'england', 'nations/england.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'nations/england.png');
INSERT INTO `images` (`fileName`, `alt`, `url`) SELECT 'spain', 'spain', 'nations/spain.png' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM `images` WHERE `url` = 'nations/spain.png');

-- ─── accounts, seeded already validated ────────────────────────────────────
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
  SELECT 'administrador', 'administrador', 'administrador', 'administrador@email.com', (SELECT id FROM (SELECT id FROM `horizon-role` WHERE `name` = 'Administrador' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `users` WHERE `email` = 'administrador@email.com' LIMIT 1) AS u), 1, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-user` WHERE `username` = 'administrador') AS x);
INSERT INTO `horizon-user` (`name`, `username`, `phone`, `email`, `roleId`, `userId`, `imageId`, `status`)
  SELECT 'player', 'player', 'player', 'player@email.com', (SELECT id FROM (SELECT id FROM `horizon-role` WHERE `name` = 'Player' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `users` WHERE `email` = 'player@email.com' LIMIT 1) AS u), 1, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `horizon-user` WHERE `username` = 'player') AS x);

-- ─── types, needed before the rows that point at them ──────────────────────
-- A building type carries no picture: the game paints those buttons from its
-- own assets.
INSERT INTO `building-types` (`name`)
  SELECT 'Producción' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Producción') AS x);
INSERT INTO `building-types` (`name`)
  SELECT 'Astillero' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Astillero') AS x);
INSERT INTO `building-types` (`name`)
  SELECT 'Investigación' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Investigación') AS x);
INSERT INTO `building-types` (`name`)
  SELECT 'Forja' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-types` WHERE `name` = 'Forja') AS x);
INSERT INTO `tech-types` (`name`)
  SELECT 'Mejora' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-types` WHERE `name` = 'Mejora') AS x);
INSERT INTO `tech-types` (`name`)
  SELECT 'Investigación' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-types` WHERE `name` = 'Investigación') AS x);

-- ─── nations ───────────────────────────────────────────────────────────────
-- Lifted from Horizon/game.sqlite3, the only place they ever lived. The five
-- european powers are playable; the caribs and taínos are there as a presence
-- in the world, not as a choice. Inglaterra is spelled properly here.

INSERT INTO `nations` (`name`, `imageId`, `description`, `playable`)
  SELECT 'Inglaterra', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'nations/england.png' LIMIT 1) AS i), 'Un reino en ascenso que busca expandir su influencia y riqueza a través del comercio marítimo y la colonización. Inglaterra está empezando a establecer sus primeras colonias en América del Norte y las Indias Occidentales, con una creciente flota naval y ambiciones comerciales.', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'Inglaterra') AS x);
INSERT INTO `nations` (`name`, `imageId`, `description`, `playable`)
  SELECT 'España', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'nations/spain.png' LIMIT 1) AS i), 'El imperio más grande del mundo, con vastos territorios en América, Filipinas y Europa. España controla minas de plata en el Nuevo Mundo y mantiene una poderosa flota, aunque se enfrenta a desafíos económicos y amenazas de piratas y rivales europeos.', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'España') AS x);
INSERT INTO `nations` (`name`, `description`, `playable`)
  SELECT 'Francia', 'Una potencia emergente con intereses coloniales en Canadá y el Caribe. Francia busca consolidar su posición en el Nuevo Mundo y aumentar su influencia comercial en el Atlántico. Su fuerza militar y diplomática son claves para su expansión.', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'Francia') AS x);
INSERT INTO `nations` (`name`, `description`, `playable`)
  SELECT 'Holanda', 'Una república mercantil en pleno auge, conocida por su poderosa flota comercial y sus compañías de comercio en Asia y América. Holanda compite ferozmente con otras potencias europeas por el control de las rutas comerciales y las colonias.', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'Holanda') AS x);
INSERT INTO `nations` (`name`, `description`, `playable`)
  SELECT 'Portugal', 'Un imperio marítimo con enclaves estratégicos en África, Asia y América del Sur. Portugal busca mantener su monopolio sobre el comercio de especias y expandir sus rutas comerciales, enfrentando desafíos de sus vecinos y rivales europeos.', 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'Portugal') AS x);
INSERT INTO `nations` (`name`, `description`, `playable`)
  SELECT 'Caribes y taínos en el Caribe', 'Aunque los taínos habían sido casi completamente sometidos tras la llegada de los españoles, los caribes aún habitaban algunas islas y luchaban contra la colonización. Eran conocidos por su feroz resistencia a la dominación europea', 0 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `nations` WHERE `name` = 'Caribes y taínos en el Caribe') AS x);

-- ─── resources ─────────────────────────────────────────────────────────────
-- baseFactor 1: what a player harvests before owning a single building
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Madera', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/madera.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/madera.png' LIMIT 1) AS i), 1, '<p>Recursos esenciales para levantar y mejorar edificios, reparar barcos y fabricar objetos. Incluyen madera, piedra, metal y otros materiales necesarios para la expansión y fortificación</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Madera') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Suministros', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/suministros.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/suministros.png' LIMIT 1) AS i), 1, '<p>Provisiones que mantienen alimentados y saludables a los habitantes y tripulaciones. La disponibilidad de suministros es crucial para sostener la moral y evitar hambrunas durante largos viajes o tiempos difíciles.</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Suministros') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Monedas', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/monedas.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/monedas.png' LIMIT 1) AS i), 1, '<p>Moneda y bienes valiosos utilizados para comerciar, pagar salarios y financiar proyectos. La riqueza es el motor del crecimiento económico y facilita la adquisición de materiales y otros recursos.</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Monedas') AS x);
INSERT INTO `resources` (`name`, `imageId`, `iconId`, `baseFactor`, `description`)
  SELECT 'Poblacion', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/poblacion.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'resources/iconos/poblacion.png' LIMIT 1) AS i), 1, '<p>Personas que realizan tareas esenciales en la construcción, la recolección de recursos y la navegación. Una mayor población permite realizar más actividades, pero también aumenta la necesidad de suministros y vivienda.</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `resources` WHERE `name` = 'Poblacion') AS x);

-- ─── buildings ─────────────────────────────────────────────────────────────
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Aserradero', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/aserradero.png' LIMIT 1) AS i), 5, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Producción' LIMIT 1) AS q), '<p>Destinado a producir recursos madera para la construcción de barcos y otros edificios.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Aserradero') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Granja', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/granja.png' LIMIT 1) AS i), 10, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Producción' LIMIT 1) AS q), '<p>Proporciona suministros necesarios para el consumo de la población y los trabajadores.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Granja') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Vivienda', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/vivienda.png' LIMIT 1) AS i), 15, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Producción' LIMIT 1) AS q), '<p>Edificio donde viven los trabajadores, necesario para aumentar la población.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Vivienda') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Mercado', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/mercado.png' LIMIT 1) AS i), 30, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Producción' LIMIT 1) AS q), '<p>Permite la acumulación de riquezas o la producción de dinero para el jugador.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Mercado') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Astillero', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/astillero.png' LIMIT 1) AS i), 50, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Astillero' LIMIT 1) AS q), '<p>Permite la construcción de barcos, uno de los elementos clave del juego.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Astillero') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Forja', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/forja.png' LIMIT 1) AS i), 40, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Forja' LIMIT 1) AS q), '<p>Permite la producción de metales procesados como el hierro, que se utilizan en la construcción de barcos, armas, etc.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Forja') AS x);
INSERT INTO `buildings` (`name`, `imageId`, `creationTime`, `typeId`, `description`)
  SELECT 'Academia', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'buildings/academia.png' LIMIT 1) AS i), 60, (SELECT id FROM (SELECT id FROM `building-types` WHERE `name` = 'Investigación' LIMIT 1) AS q), '<p>Edificio donde se entrenan los marineros, oficiales o se investigan mejoras tecnológicas.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `buildings` WHERE `name` = 'Academia') AS x);

-- ─── ships ─────────────────────────────────────────────────────────────────
-- Fragata and Galeon have art but never had numbers, so they come in at zero
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Balandro', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/balandro.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/balandro.png' LIMIT 1) AS i), 40, 7, 8, 44, 75, 12, 300, 180, '<p>El balandro es uno de los barcos más maniobrables del juego.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Balandro') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Goleta', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/goleta.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/goleta.png' LIMIT 1) AS i), 50, 7, 12, 50, 100, 18, 400, 240, '<p>La goleta es una embarcación ágil y versátil, ideal para maniobras rápidas tanto en aguas tranquilas como en mar abierto. Su diseño, con dos o tres mástiles, le permite adaptarse a diversas condiciones de viento, asegurando un control preciso en los combates y en la navegación costera.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Goleta') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Carabela', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/carabela.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/carabela.png' LIMIT 1) AS i), 55, 9, 12, 60, 120, 16, 500, 360, '<p>La carabela es un barco ágil y maniobrable, ideal para la exploración de nuevas rutas marítimas y para comercio.</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Carabela') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Fragata', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/fragata.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/fragata.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Fragata') AS x);
INSERT INTO `ships` (`name`, `imageId`, `iconId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Galeon', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/galeon.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'ships/iconos/galeon.png' LIMIT 1) AS i), 0, 0, 0, 0, 0, 0, 0, 0, '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Galeon') AS x);

-- The Nao comes from Horizon/game.sqlite3, which knows a single crew number
-- rather than the three this schema keeps, so it lands on bestCrew; the
-- rest are left at zero to be set from the dashboard. It has no art yet, so
-- it falls back to the placeholder.
INSERT INTO `ships` (`name`, `imageId`, `capacity`, `knots`, `minCrew`, `bestCrew`, `maxCrew`, `guns`, `hull`, `creationTime`, `description`)
  SELECT 'Nao', 1, 22, 5, 0, 55, 0, 0, 550, 60, 'Un nao es un tipo de barco que apareció por primera vez en el siglo X y fue ampliamente utilizado desde alrededor del siglo XII en adelante. Los engranajes se construyeron con clinker, generalmente de roble. Estos barcos estaban equipados con un solo mástil y una sola vela de aparejo cuadrado. Se asociaron principalmente con el comercio marítimo en el noroeste de Europa medieval, especialmente la Liga Hanseática.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ships` WHERE `name` = 'Nao') AS x);
-- ─── cannons ───────────────────────────────────────────────────────────────
-- the table has no image column, so cannons/canon.png has no owner
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 12 libras', 100, 0.5, 10, '<p>Este cañón es el más común en barcos de guerra de esa época. Es eficaz a media distancia y tiene una buena tasa de fuego para su tamaño.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 12 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 18 libras', 140, 0.6, 12, '<p>Más pesado que el de 12 libras, ofrece un mayor poder de penetración y mayor daño. Ideal para enfrentamientos más largos y enfrentamientos en la línea de batalla.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 18 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 24 libras', 180, 0.9, 15, '<p>Este cañón es adecuado para barcos más grandes, especialmente los <strong>Navíos de Línea</strong>. Tiene mayor alcance y poder de penetración, lo que lo hace muy efectivo contra los cascos de barcos grandes.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 24 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 32 libras', 250, 1.1, 20, '<p>Muy potente, usado principalmente en los barcos más grandes y en la artillería costera. Ofrece una gran capacidad de daño, especialmente contra barcos enemigos más resistentes.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 32 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 6 libras', 60, 0.25, 6, '<p>Usado en embarcaciones más pequeñas o como armas secundarias en barcos más grandes. Su tamaño y poder limitado lo hacen adecuado para dañar barcos más ligeros o realizar disparos rápidos.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 6 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de 4 libras', 40, 0.15, 5, '<p>Muy ligero y de bajo poder. Usado principalmente en barcos más pequeños, como las <strong>Goletas</strong> o en funciones secundarias de barcos más grandes.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de 4 libras') AS x);
INSERT INTO `cannons` (`name`, `baseDamage`, `weight`, `creationTime`, `description`)
  SELECT 'Cañón de Fortaleza de 48 libras', 300, 1.5, 25, '<p>Cañón extremadamente pesado y potente utilizado en defensa costera. Su poder de destrucción es tremendo, ideal para destrozar incluso los cascos más fuertes de grandes barcos de guerra.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras') AS x);

-- ─── techs and skills ──────────────────────────────────────────────────────
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Métodos Avanzados de Cultivo', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/cultivos.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 15, '<p>Aumenta la productividad de las granjas mediante nuevas técnicas agrícolas, lo que permite una mayor cosecha de granos con el mismo espacio de cultivo.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Mulas de Tiro', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/mulas.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 12, '<p>Recuas de mulas de tiro arrastran la madera desde el monte hasta el aserradero. Lo que antes bajaba a hombros baja ahora por carga, y la sierra no espera a que llegue el tronco.</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Mulas de Tiro') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Desarrollo de Rutas Comerciales', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/comercio.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 20, '<p>Desarrolla nuevas rutas comerciales y métodos para expandir la red de comercio, mejorando el flujo de riquezas en el mercado local y marítimo, aumentando la ganancia de recursos.&nbsp;</p>\\n' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales') AS x);
INSERT INTO `skills` (`name`, `imageId`, `description`)
  SELECT 'Navegacion', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'skills/navegacion.jpeg' LIMIT 1) AS i), '' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `skills` WHERE `name` = 'Navegacion') AS x);
-- The seven from Horizon/game.sqlite3. Every one of them already had its
-- picture sitting unused under public/images/techs; the four above are the
-- ones the December dump carried. All of them are Mejora: that is the type
-- the sqlite gives them, and the other type it knows, Desbloqueo, is empty.

INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Innovaciones en Velas', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/velas.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'Mediante la investigación y el desarrollo de nuevas formas y materiales para las velas, esta tecnología permite a los barcos alcanzar velocidades superiores.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Innovaciones en Velas') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Casco refinado', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/casco.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'El desarrollo de técnicas avanzadas en la construcción de cascos permite crear embarcaciones más resistentes.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Casco refinado') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Desarrollo de Flotas', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/flotas.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'Sugiere que la investigación tiene como objetivo la expansión y diversificación de la flota disponible.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Desarrollo de Flotas') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Arquitectura', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/arquitectura.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'El estudio avanzado de técnicas de construcción y diseño estructural permite a los arquitectos optimizar el uso de materiales y mano de obra.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Arquitectura') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Construcción Naval Eficiente', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/construccion-naval.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'Esta técnica innovadora optimiza el proceso de construcción naval mediante el uso de métodos sistemáticos y herramientas especializadas.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Construcción Naval Eficiente') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Artillería Mejorada', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/artilleria.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'El avance en la ciencia de la artillería permite el diseño de cañones más potentes y precisos.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Artillería Mejorada') AS x);
INSERT INTO `techs` (`name`, `imageId`, `typeId`, `creationTime`, `description`)
  SELECT 'Forja Rápida', (SELECT id FROM (SELECT id FROM `images` WHERE `url` = 'techs/forja.png' LIMIT 1) AS i), (SELECT id FROM (SELECT id FROM `tech-types` WHERE `name` = 'Mejora' LIMIT 1) AS q), 1, 'Mediante la implementación de técnicas avanzadas de forja y ensamblaje, esta tecnología permite una producción más ágil de cañones.' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `techs` WHERE `name` = 'Forja Rápida') AS x);
-- The two naval skills from the sqlite. Neither has art yet, so both fall
-- back to the placeholder. The column there is spelled `decription`.
INSERT INTO `skills` (`name`, `imageId`, `description`)
  SELECT 'Disparo de cadenas', 1, 'Permite que la nave dispare Disparos en cadena durante el combate. Impidiendo que el enemigo escape' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `skills` WHERE `name` = 'Disparo de cadenas') AS x);
INSERT INTO `skills` (`name`, `imageId`, `description`)
  SELECT 'Disparo de metrallas', 1, 'Permite que la nave dispare metrallas durante el combate. Disminuyendo rápidamente la tripulación enemiga' FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `skills` WHERE `name` = 'Disparo de metrallas') AS x);

-- ─── what each thing costs, eats and makes ─────────────────────────────────
-- These are the rows the game has been missing. Without them canPayFor
-- returns true on an empty list, so every building went up for free, and
-- handleBuildingCompleted returned early, so finishing one never changed how
-- fast anything came in.
--
-- base is what the first level costs, factor is how much each further level
-- adds: needed = base + base * factor * level.

-- what a building costs to raise
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.1, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.6, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.5, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.3, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.1, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.5, 15 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 15 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.5, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.2, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.3, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-costs` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 15 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-costs`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);

-- what a finished building adds to the daily harvest
INSERT INTO `building-produces` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.5, 11.25 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-produces`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `building-produces` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.3, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-produces`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-produces` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 1, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-produces`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-produces` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.3, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-produces`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);

-- what a building eats every day
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.2, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.5, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.2, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.2, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.5, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.2, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0.3, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 0.5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `building-upkeeps` (`buildingId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.2, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-upkeeps`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);

-- what has to stand before a building can be raised
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q)) AS x);
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q)) AS x);
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q)) AS x);
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q)) AS x);
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q)) AS x);
INSERT INTO `building-req-buildings` (`buildingId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `building-req-buildings`
    WHERE `buildingId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Vivienda' LIMIT 1) AS q)) AS x);

-- ships. Fragata and Galeon have no rows: they never had numbers
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 1, 300 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 1, 500 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 1, 300 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 1, 8 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 1, 400 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 1, 700 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 1, 400 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 1, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 60 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 30 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 30 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-costs` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0, 100 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-costs`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);

INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 1, 100 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 1, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 1, 30 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 1, 100 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 1, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 1, 4 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-upkeeps` (`shipId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0, 30 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-upkeeps`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);

INSERT INTO `ship-req-buildings` (`shipId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-req-buildings`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Balandro' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-req-buildings` (`shipId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-req-buildings`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Goleta' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q)) AS x);
INSERT INTO `ship-req-buildings` (`shipId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `ship-req-buildings`
    WHERE `shipId` = (SELECT id FROM (SELECT id FROM `ships` WHERE `name` = 'Carabela' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Astillero' LIMIT 1) AS q)) AS x);

-- techs
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.3, 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.5, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.5, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.2, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-costs` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 4 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-costs`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);

INSERT INTO `tech-produces` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0.5, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-produces`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-produces` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0.5, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-produces`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-produces` (`techId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q), 0.3, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-produces`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Monedas' LIMIT 1) AS q)) AS x);

INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Mercado' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Desarrollo de Rutas Comerciales' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Academia' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Métodos Avanzados de Cultivo' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Granja' LIMIT 1) AS q)) AS x);
INSERT INTO `tech-req-buildings` (`techId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `tech-req-buildings`
    WHERE `techId` = (SELECT id FROM (SELECT id FROM `techs` WHERE `name` = 'Mulas de Tiro' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Aserradero' LIMIT 1) AS q)) AS x);

-- cannons
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 2 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 12 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 6 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 3 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 14 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 5 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 16 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 12 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 6 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 15 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 8 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 24 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 20 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 10 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q), 0, 30 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Madera' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q), 0, 25 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Suministros' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-costs` (`cannonId`, `resourceId`, `factor`, `base`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q), 0, 15 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-costs`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q) AND `resourceId` = (SELECT id FROM (SELECT id FROM `resources` WHERE `name` = 'Poblacion' LIMIT 1) AS q)) AS x);

INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 4 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 6 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 12 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 18 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 24 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de 32 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
INSERT INTO `cannon-req-buildings` (`cannonId`, `buildingReqId`, `level`)
  SELECT (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q), (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q), 1 FROM DUAL
  WHERE NOT EXISTS (SELECT 1 FROM (SELECT 1 FROM `cannon-req-buildings`
    WHERE `cannonId` = (SELECT id FROM (SELECT id FROM `cannons` WHERE `name` = 'Cañón de Fortaleza de 48 libras' LIMIT 1) AS q) AND `buildingReqId` = (SELECT id FROM (SELECT id FROM `buildings` WHERE `name` = 'Forja' LIMIT 1) AS q)) AS x);
