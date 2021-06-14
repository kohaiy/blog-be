ALTER TABLE `article`
  CHANGE `introduction` `abstract` VARCHAR(500) NOT NULL,
  ADD COLUMN `linkName` VARCHAR(128) NOT NULL AFTER `name`;
	
UPDATE `article` SET `linkName`=`article`.`id`;

