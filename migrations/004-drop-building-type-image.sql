-- A building type carries no picture. Nothing ever drew one: the game renders
-- its type tabs as text and the dashboard lists them by name, so the imageId
-- was a column and a join that no screen read.
--
-- Only the link goes. The rows in `photos` and the files on disk stay, so
-- nothing another entity points at is touched.
--
-- typeorm runs with synchronize: true, so it drops this column on the next
-- start whether or not this file is applied. It is written down here so the
-- change can also be made on a database the server has not booted against.

SET @fk := (
  SELECT CONSTRAINT_NAME
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'building-types'
    AND COLUMN_NAME = 'imageId'
    AND REFERENCED_TABLE_NAME IS NOT NULL
  LIMIT 1
);
SET @sql := IF(@fk IS NULL, 'SELECT 1',
  CONCAT('ALTER TABLE `building-types` DROP FOREIGN KEY `', @fk, '`'));
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @col := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'building-types'
    AND COLUMN_NAME = 'imageId'
);
SET @sql := IF(@col = 0, 'SELECT 1',
  'ALTER TABLE `building-types` DROP COLUMN `imageId`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
