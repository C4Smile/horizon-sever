-- Points the images table at the renamed files under public/images. The
-- uploader derives url and fileName from whatever name the file arrived with,
-- so rows still carry the stock-photo ids the files used to be called.
-- Run this together with the commit that renames them; on its own either half
-- leaves the rows pointing at paths that no longer exist.
--
-- resources/oig2.jpeg was byte for byte the same image as resources/madera.jpeg,
-- so its rows move onto the file that survived.

UPDATE `images` SET `url` = 'ships/goleta.jpeg', `fileName` = 'goleta' WHERE `url` IN ('ships/bryceschooner.jpeg', '/ships/bryceschooner.jpeg');
UPDATE `images` SET `url` = 'ships/carabela.jpeg', `fileName` = 'carabela' WHERE `url` IN ('ships/caravela_vera_cruz_no_rio_tejo.jpeg', '/ships/caravela_vera_cruz_no_rio_tejo.jpeg');
UPDATE `images` SET `url` = 'ships/balandra.jpeg', `fileName` = 'balandra' WHERE `url` IN ('ships/sloop7.jpeg', '/ships/sloop7.jpeg');
UPDATE `images` SET `url` = 'resources/cajas.jpeg', `fileName` = 'cajas' WHERE `url` IN ('resources/cajasdemaderabeneficiosparaembalaje.jpeg', '/resources/cajasdemaderabeneficiosparaembalaje.jpeg');
UPDATE `images` SET `url` = 'buildings/lenadores.jpeg', `fileName` = 'lenadores' WHERE `url` IN ('buildings/leadores.jpeg', '/buildings/leadores.jpeg');
UPDATE `images` SET `url` = 'techs/artilleria.jpeg', `fileName` = 'artilleria' WHERE `url` IN ('techs/depositphotos_3636071stockphotocannonsofapirateship.jpeg', '/techs/depositphotos_3636071stockphotocannonsofapirateship.jpeg');
UPDATE `images` SET `url` = 'techs/flota-de-indias.jpeg', `fileName` = 'flota-de-indias' WHERE `url` IN ('techs/flotaindiaskqhh1248x698abc.jpeg', '/techs/flotaindiaskqhh1248x698abc.jpeg');
UPDATE `images` SET `url` = 'techs/casco.jpeg', `fileName` = 'casco' WHERE `url` IN ('techs/istockphoto1461664099612x612.jpeg', '/techs/istockphoto1461664099612x612.jpeg');
UPDATE `images` SET `url` = 'techs/cuadernas.jpeg', `fileName` = 'cuadernas' WHERE `url` IN ('techs/montaxedecaderna13.jpeg', '/techs/montaxedecaderna13.jpeg');
UPDATE `images` SET `url` = 'techs/forja.jpeg', `fileName` = 'forja' WHERE `url` IN ('techs/nlc2000534img001.jpeg', '/techs/nlc2000534img001.jpeg');
UPDATE `images` SET `url` = 'techs/arquitectura.jpeg', `fileName` = 'arquitectura' WHERE `url` IN ('techs/seminarioarquitecturamedieval2.jpeg', '/techs/seminarioarquitecturamedieval2.jpeg');
UPDATE `images` SET `url` = 'techs/comercio.jpeg', `fileName` = 'comercio' WHERE `url` IN ('techs/mercahnt.jpeg', '/techs/mercahnt.jpeg');
UPDATE `images` SET `url` = 'techs/lenadores.png', `fileName` = 'lenadores' WHERE `url` IN ('techs/mejora-de-lenadores-copy.png', '/techs/mejora-de-lenadores-copy.png');
UPDATE `images` SET `url` = 'techs/vivienda.jpeg', `fileName` = 'vivienda' WHERE `url` IN ('techs/housing.jpeg', '/techs/housing.jpeg');
UPDATE `images` SET `url` = 'techs/navegacion.jpeg', `fileName` = 'navegacion' WHERE `url` IN ('techs/sailing_quietly.jpeg', '/techs/sailing_quietly.jpeg');
UPDATE `images` SET `url` = 'techs/mejora.png', `fileName` = 'mejora' WHERE `url` IN ('techs/upgrade.png', '/techs/upgrade.png');
UPDATE `images` SET `url` = 'skills/navegacion.jpeg', `fileName` = 'navegacion' WHERE `url` IN ('skills/steelwind.jpeg', '/skills/steelwind.jpeg');
UPDATE `images` SET `url` = 'buildingTypes/construccion.png', `fileName` = 'construccion' WHERE `url` IN ('buildingTypes/buildings.png', '/buildingTypes/buildings.png');
UPDATE `images` SET `url` = 'buildingTypes/artilleria.png', `fileName` = 'artilleria' WHERE `url` IN ('buildingTypes/guns.png', '/buildingTypes/guns.png');
UPDATE `images` SET `url` = 'buildingTypes/naval.png', `fileName` = 'naval' WHERE `url` IN ('buildingTypes/ships.png', '/buildingTypes/ships.png');
UPDATE `images` SET `url` = 'buildingTypes/investigacion.png', `fileName` = 'investigacion' WHERE `url` IN ('buildingTypes/research.png', '/buildingTypes/research.png');
UPDATE `images` SET `url` = 'buildingTypes/observatorio.png', `fileName` = 'observatorio' WHERE `url` IN ('buildingTypes/researches.png', '/buildingTypes/researches.png');
UPDATE `images` SET `url` = 'buildingTypes/mejora.png', `fileName` = 'mejora' WHERE `url` IN ('buildingTypes/upgrade.png', '/buildingTypes/upgrade.png');
UPDATE `images` SET `url` = 'techTypes/investigacion.png', `fileName` = 'investigacion' WHERE `url` IN ('techTypes/research.png', '/techTypes/research.png');
UPDATE `images` SET `url` = 'techTypes/mejora.png', `fileName` = 'mejora' WHERE `url` IN ('techTypes/upgrade.png', '/techTypes/upgrade.png');
UPDATE `images` SET `url` = 'resources/madera.jpeg', `fileName` = 'madera' WHERE `url` IN ('resources/oig2.jpeg', '/resources/oig2.jpeg');
