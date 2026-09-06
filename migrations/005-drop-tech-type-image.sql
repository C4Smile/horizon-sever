-- Same as 004, for tech types. Nothing draws a picture for one: the game never
-- asks for it and the dashboard lists them by name.
--
-- Only the link goes. The rows in `photos` and the files on disk stay.
--
-- typeorm runs with synchronize: true, so it drops this column on the next
-- start whether or not this file is applied.

SET @fk := (
  SELECT CONSTRAINT_NAME
  FROM information_schema.KEY_COLUMN_USAGE
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'tech-types'
    AND COLUMN_NAME = 'imageId'
    AND REFERENCED_TABLE_NAME IS NOT NULL
  LIMIT 1
);
SET @sql := IF(@fk IS NULL, 'SELECT 1',
  CONCAT('ALTER TABLE `tech-types` DROP FOREIGN KEY `', @fk, '`'));
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @col := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'tech-types'
    AND COLUMN_NAME = 'imageId'
);
SET @sql := IF(@col = 0, 'SELECT 1',
  'ALTER TABLE `tech-types` DROP COLUMN `imageId`');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;
