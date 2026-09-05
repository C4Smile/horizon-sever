-- Renames Model.dateOfCreation/lastUpdate to createdAt/updatedAt across every
-- table. Run this BEFORE booting with the renamed entity: synchronize cannot
-- tell a rename from a drop plus an add, and would empty both columns.
ALTER TABLE `app` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `app` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `app-texts` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `app-texts` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `app-translation` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `app-translation` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `building-types` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `building-types` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `buildings` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `buildings` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `cannons` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `cannons` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `horizon-role` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `horizon-role` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `horizon-user` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `horizon-user` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `images` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `images` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `lang` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `lang` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `push-notification` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `push-notification` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `resources` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `resources` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `ships` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `ships` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `skills` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `skills` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `tech-types` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `tech-types` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `techs` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `techs` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
ALTER TABLE `users` CHANGE COLUMN `dateOfCreation` `createdAt` datetime NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE `users` CHANGE COLUMN `lastUpdate` `updatedAt` datetime NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP;
