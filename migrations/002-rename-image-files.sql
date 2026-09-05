-- Points the images table at the files under public/images as they are named
-- today. Rows were written by the uploader, which builds url and fileName from
-- whatever the file arrived with, so they still carry the stock site ids the
-- files used to have.
--
-- Both halves of a rename are listed where the name changed as well as the
-- file: the crate became the supplies art, the lumberjack camp the sawmill,
-- the farms one farm, and the duplicate resources/oig2.jpeg folded onto madera.

UPDATE `images` SET `url` = 'ships/goleta.png', `fileName` = 'goleta'
  WHERE `url` IN ('ships/bryceschooner.jpeg', '/ships/bryceschooner.jpeg');
UPDATE `images` SET `url` = 'ships/carabela.png', `fileName` = 'carabela'
  WHERE `url` IN ('ships/caravela_vera_cruz_no_rio_tejo.jpeg', '/ships/caravela_vera_cruz_no_rio_tejo.jpeg');
UPDATE `images` SET `url` = 'ships/balandro.png', `fileName` = 'balandro'
  WHERE `url` IN ('ships/sloop7.jpeg', '/ships/sloop7.jpeg');
UPDATE `images` SET `url` = 'ships/fragata.png', `fileName` = 'fragata'
  WHERE `url` IN ('ships/fragata.jpeg', '/ships/fragata.jpeg');
UPDATE `images` SET `url` = 'resources/madera.png', `fileName` = 'madera'
  WHERE `url` IN ('resources/madera.jpeg', '/resources/madera.jpeg');
UPDATE `images` SET `url` = 'resources/madera.png', `fileName` = 'madera'
  WHERE `url` IN ('resources/oig2.jpeg', '/resources/oig2.jpeg');
UPDATE `images` SET `url` = 'resources/monedas.png', `fileName` = 'monedas'
  WHERE `url` IN ('resources/monedas.jpeg', '/resources/monedas.jpeg');
UPDATE `images` SET `url` = 'resources/poblacion.png', `fileName` = 'poblacion'
  WHERE `url` IN ('resources/poblacion.jpeg', '/resources/poblacion.jpeg');
UPDATE `images` SET `url` = 'resources/suministros.png', `fileName` = 'suministros'
  WHERE `url` IN ('resources/cajasdemaderabeneficiosparaembalaje.jpeg', '/resources/cajasdemaderabeneficiosparaembalaje.jpeg');
UPDATE `images` SET `url` = 'buildings/academia.png', `fileName` = 'academia'
  WHERE `url` IN ('buildings/academia.jpeg', '/buildings/academia.jpeg');
UPDATE `images` SET `url` = 'buildings/astillero.png', `fileName` = 'astillero'
  WHERE `url` IN ('buildings/astillero.jpeg', '/buildings/astillero.jpeg');
UPDATE `images` SET `url` = 'buildings/forja.png', `fileName` = 'forja'
  WHERE `url` IN ('buildings/forja.jpeg', '/buildings/forja.jpeg');
UPDATE `images` SET `url` = 'buildings/granja.png', `fileName` = 'granja'
  WHERE `url` IN ('buildings/granjas.jpeg', '/buildings/granjas.jpeg');
UPDATE `images` SET `url` = 'buildings/aserradero.png', `fileName` = 'aserradero'
  WHERE `url` IN ('buildings/leadores.jpeg', '/buildings/leadores.jpeg');
UPDATE `images` SET `url` = 'buildings/mercado.png', `fileName` = 'mercado'
  WHERE `url` IN ('buildings/mercado.jpeg', '/buildings/mercado.jpeg');
UPDATE `images` SET `url` = 'buildings/vivienda.png', `fileName` = 'vivienda'
  WHERE `url` IN ('buildings/vivienda.jpeg', '/buildings/vivienda.jpeg');
UPDATE `images` SET `url` = 'techs/artilleria.jpeg', `fileName` = 'artilleria'
  WHERE `url` IN ('techs/depositphotos_3636071stockphotocannonsofapirateship.jpeg', '/techs/depositphotos_3636071stockphotocannonsofapirateship.jpeg');
UPDATE `images` SET `url` = 'techs/flota-de-indias.jpeg', `fileName` = 'flota-de-indias'
  WHERE `url` IN ('techs/flotaindiaskqhh1248x698abc.jpeg', '/techs/flotaindiaskqhh1248x698abc.jpeg');
UPDATE `images` SET `url` = 'techs/casco.jpeg', `fileName` = 'casco'
  WHERE `url` IN ('techs/istockphoto1461664099612x612.jpeg', '/techs/istockphoto1461664099612x612.jpeg');
UPDATE `images` SET `url` = 'techs/cuadernas.jpeg', `fileName` = 'cuadernas'
  WHERE `url` IN ('techs/montaxedecaderna13.jpeg', '/techs/montaxedecaderna13.jpeg');
UPDATE `images` SET `url` = 'techs/forja.jpeg', `fileName` = 'forja'
  WHERE `url` IN ('techs/nlc2000534img001.jpeg', '/techs/nlc2000534img001.jpeg');
UPDATE `images` SET `url` = 'techs/arquitectura.jpeg', `fileName` = 'arquitectura'
  WHERE `url` IN ('techs/seminarioarquitecturamedieval2.jpeg', '/techs/seminarioarquitecturamedieval2.jpeg');
UPDATE `images` SET `url` = 'techs/comercio.jpeg', `fileName` = 'comercio'
  WHERE `url` IN ('techs/mercahnt.jpeg', '/techs/mercahnt.jpeg');
UPDATE `images` SET `url` = 'techs/lenadores.png', `fileName` = 'lenadores'
  WHERE `url` IN ('techs/mejora-de-lenadores-copy.png', '/techs/mejora-de-lenadores-copy.png');
UPDATE `images` SET `url` = 'techs/vivienda.jpeg', `fileName` = 'vivienda'
  WHERE `url` IN ('techs/housing.jpeg', '/techs/housing.jpeg');
UPDATE `images` SET `url` = 'techs/navegacion.jpeg', `fileName` = 'navegacion'
  WHERE `url` IN ('techs/sailing_quietly.jpeg', '/techs/sailing_quietly.jpeg');
UPDATE `images` SET `url` = 'techs/mejora.png', `fileName` = 'mejora'
  WHERE `url` IN ('techs/upgrade.png', '/techs/upgrade.png');
UPDATE `images` SET `url` = 'skills/navegacion.jpeg', `fileName` = 'navegacion'
  WHERE `url` IN ('skills/steelwind.jpeg', '/skills/steelwind.jpeg');
UPDATE `images` SET `url` = 'buildingTypes/construccion.png', `fileName` = 'construccion'
  WHERE `url` IN ('buildingTypes/buildings.png', '/buildingTypes/buildings.png');
UPDATE `images` SET `url` = 'buildingTypes/artilleria.png', `fileName` = 'artilleria'
  WHERE `url` IN ('buildingTypes/guns.png', '/buildingTypes/guns.png');
UPDATE `images` SET `url` = 'buildingTypes/naval.png', `fileName` = 'naval'
  WHERE `url` IN ('buildingTypes/ships.png', '/buildingTypes/ships.png');
UPDATE `images` SET `url` = 'buildingTypes/investigacion.png', `fileName` = 'investigacion'
  WHERE `url` IN ('buildingTypes/research.png', '/buildingTypes/research.png');
UPDATE `images` SET `url` = 'buildingTypes/observatorio.png', `fileName` = 'observatorio'
  WHERE `url` IN ('buildingTypes/researches.png', '/buildingTypes/researches.png');
UPDATE `images` SET `url` = 'buildingTypes/mejora.png', `fileName` = 'mejora'
  WHERE `url` IN ('buildingTypes/upgrade.png', '/buildingTypes/upgrade.png');
UPDATE `images` SET `url` = 'techTypes/investigacion.png', `fileName` = 'investigacion'
  WHERE `url` IN ('techTypes/research.png', '/techTypes/research.png');
UPDATE `images` SET `url` = 'techTypes/mejora.png', `fileName` = 'mejora'
  WHERE `url` IN ('techTypes/upgrade.png', '/techTypes/upgrade.png');
