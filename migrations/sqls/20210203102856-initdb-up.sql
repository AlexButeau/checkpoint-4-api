/* Replace with your SQL commands */
/* USE 'checkpoint_4'; */
/* TRUNCATE DATABASE `checkpoint_4`;
USE `checkpoint_4`; */
/* CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(150) NOT NULL,
  `lastname` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(150) NOT NULL,
  `birthdate` DATE,
  `tel` VARCHAR(10),
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `ride` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_city` VARCHAR(150) NOT NULL,
  `start_address` VARCHAR(255) NOT NULL,
  `start_zipcode` VARCHAR(150) NOT NULL,
  `arrival_city` VARCHAR(150) NOT NULL,
  `arrival_address` VARCHAR(255) NOT NULL,
  `arrival_zipcode` VARCHAR(150) NOT NULL,
  `start_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `comment` TEXT,
  `user_id` INT NOT NULL,
  `transport_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ride_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_ride_transport` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `species` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `species` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `rideToSpecies` (
  `ride_id` INT NOT NULL,
  `species_id` INT NOT NULL,
  PRIMARY KEY (`ride_id`, `species_id`),
  CONSTRAINT `ride_to_species_fk_ride` FOREIGN KEY (`ride_id`) REFERENCES `ride` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ride_to_species_fk_species` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `advert` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_city` VARCHAR(150) NOT NULL,
  `start_address` VARCHAR(255) NOT NULL,
  `start_zipcode` VARCHAR(150) NOT NULL,
  `arrival_city` VARCHAR(150) NOT NULL,
  `arrival_address` VARCHAR(255) NOT NULL,
  `arrival_zipcode` VARCHAR(150) NOT NULL,
  `min_date` DATE NOT NULL,
  `max_date` DATE NOT NULL,
  `comment` TEXT,
  `user_id` INT NOT NULL,
  `species_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_advert_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_advert_species` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `transport` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `transport` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */
/* CREATE TABLE `advertToTransport` (
  `advert_id` INT NOT NULL,
  `transport_id` INT NOT NULL,
  PRIMARY KEY (`advert_id`, `transport_id`),
  CONSTRAINT `advert_to_transport_fk_advert` FOREIGN KEY (`advert_id`) REFERENCES `advert` (`id`) ON DELETE CASCADE,
  CONSTRAINT `advert_to_transport_fk_transport` FOREIGN KEY (`transport_id`) REFERENCES `transport` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin; */