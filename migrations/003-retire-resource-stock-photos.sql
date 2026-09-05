-- The stock photos under public/images/resources were replaced by the new art
-- and deleted, so any row still pointing at them now resolves to nothing.
-- Moves those rows onto the .png that took their place.
--
-- Each statement lists both the name the file had before migration 002 and the
-- one it had after, so this runs correctly whether or not 002 was applied.
--
-- JUDGEMENT CALL: cajas.jpeg (a wooden crate) has no direct replacement. Its
-- rows go to suministros.png, the closest of the new art. Change that line if
-- the resource it belonged to is a different one.

UPDATE `images` SET `url` = 'resources/madera.png', `fileName` = 'madera'
  WHERE `url` IN ('resources/madera.jpeg', '/resources/madera.jpeg',
                  'resources/oig2.jpeg', '/resources/oig2.jpeg');

UPDATE `images` SET `url` = 'resources/monedas.png', `fileName` = 'monedas'
  WHERE `url` IN ('resources/monedas.jpeg', '/resources/monedas.jpeg');

UPDATE `images` SET `url` = 'resources/poblacion.png', `fileName` = 'poblacion'
  WHERE `url` IN ('resources/poblacion.jpeg', '/resources/poblacion.jpeg');

UPDATE `images` SET `url` = 'resources/suministros.png', `fileName` = 'suministros'
  WHERE `url` IN ('resources/cajas.jpeg', '/resources/cajas.jpeg',
                  'resources/cajasdemaderabeneficiosparaembalaje.jpeg',
                  '/resources/cajasdemaderabeneficiosparaembalaje.jpeg');
