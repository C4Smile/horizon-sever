-- Same as 003, for the ships: the stock photos were replaced by the new art and
-- deleted, so rows still pointing at them resolve to nothing.
--
-- Each statement lists the name the file had before migration 002 and the one it
-- had after, so this runs correctly whether or not 002 was applied.
--
-- Note the sloop changed name as well as file: balandra.jpeg -> balandro.png.

UPDATE `images` SET `url` = 'ships/goleta.png', `fileName` = 'goleta'
  WHERE `url` IN ('ships/goleta.jpeg', '/ships/goleta.jpeg',
                  'ships/bryceschooner.jpeg', '/ships/bryceschooner.jpeg');

UPDATE `images` SET `url` = 'ships/carabela.png', `fileName` = 'carabela'
  WHERE `url` IN ('ships/carabela.jpeg', '/ships/carabela.jpeg',
                  'ships/caravela_vera_cruz_no_rio_tejo.jpeg',
                  '/ships/caravela_vera_cruz_no_rio_tejo.jpeg');

UPDATE `images` SET `url` = 'ships/balandro.png', `fileName` = 'balandro'
  WHERE `url` IN ('ships/balandra.jpeg', '/ships/balandra.jpeg',
                  'ships/sloop7.jpeg', '/ships/sloop7.jpeg');

UPDATE `images` SET `url` = 'ships/fragata.png', `fileName` = 'fragata'
  WHERE `url` IN ('ships/fragata.jpeg', '/ships/fragata.jpeg');
