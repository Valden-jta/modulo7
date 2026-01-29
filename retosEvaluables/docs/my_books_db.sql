-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema my_books_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `my_books_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `my_books_db` ;

-- -----------------------------------------------------
-- Table `my_books_db`.`author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`author` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`author` (
  `author_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `bio` TEXT NULL DEFAULT NULL,
  `born_date` DATE NULL DEFAULT NULL,
  `external_id` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`author_id`),
  UNIQUE INDEX `uk_author_external_id` (`external_id` ASC) VISIBLE,
  INDEX `idx_author_name` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`book` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`book` (
  `book_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(300) NOT NULL,
  `openlibrary_work_id` VARCHAR(50) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`book_id`),
  UNIQUE INDEX `uk_book_openlibrary_id` (`openlibrary_work_id` ASC) VISIBLE,
  INDEX `idx_book_title` (`title` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`book_author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`book_author` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`book_author` (
  `book_id` INT UNSIGNED NOT NULL,
  `author_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`book_id`, `author_id`),
  INDEX `fk_ba_author` (`author_id` ASC) VISIBLE,
  CONSTRAINT `fk_ba_author`
    FOREIGN KEY (`author_id`)
    REFERENCES `my_books_db`.`author` (`author_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ba_book`
    FOREIGN KEY (`book_id`)
    REFERENCES `my_books_db`.`book` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Table `my_books_db`.`genre`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `my_books_db`.`genre` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`genre` (
  `genre_id` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `category` ENUM('fiction', 'nonfiction', 'format') NOT NULL,
  `genre_type` ENUM('system', 'custom') NOT NULL DEFAULT 'custom',
  PRIMARY KEY (`genre_id`),
  UNIQUE INDEX `uk_genre_code` (`code` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`user` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(120) NOT NULL,
  `lastName` VARCHAR(120) NOT NULL,
  `nickName` VARCHAR(120) NOT NULL,
  `bio` TEXT NULL DEFAULT NULL,
  `userRole` ENUM('reader', 'writer', 'publisher') NOT NULL DEFAULT 'reader',
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `thumb` VARCHAR(512) NULL DEFAULT NULL,
  `signInDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `uq_user_email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `uq_user_nickname` (`nickName` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`collection`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`collection` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`collection` (
  `collection_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `collection_type` ENUM('system', 'custom') NOT NULL DEFAULT 'custom',
  `is_public` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`),
  INDEX `fk_collection_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_collection_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`edition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`edition` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`edition` (
  `edition_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `book_id` INT UNSIGNED NOT NULL,
  `isbn_10` VARCHAR(20) NULL,
  `isbn_13` VARCHAR(20) NULL,
  `openlibrary_edition_id` VARCHAR(50) NULL,
  `language` VARCHAR(3) NOT NULL,
  `format` ENUM('hardcover', 'paperback', 'ebook', 'audiobook', 'other') NOT NULL DEFAULT 'other',
  `publish_date` DATE NULL,
  `pages` INT UNSIGNED NULL,
  `cover` VARCHAR(512) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`edition_id`),
  UNIQUE INDEX `uk_edition_isbn_10` (`isbn_10` ASC) VISIBLE,
  UNIQUE INDEX `uk_edition_isbn_13` (`isbn_13` ASC) VISIBLE,
  UNIQUE INDEX `uk_edition_openlibrary_id` (`openlibrary_edition_id` ASC) VISIBLE,
  INDEX `fk_edition_book_idx` (`book_id` ASC) INVISIBLE,
  CONSTRAINT `fk_edition_book`
    FOREIGN KEY (`book_id`)
    REFERENCES `my_books_db`.`book` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `my_books_db`.`collection_book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`collection_book` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`collection_book` (
  `collection_id` INT UNSIGNED NOT NULL,
  `edition_id` INT UNSIGNED NOT NULL,
  `position` INT UNSIGNED NULL DEFAULT NULL,
  `added_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`collection_id`, `edition_id`),
  INDEX `fk_cb_edition_idx` (`edition_id` ASC) VISIBLE,
  CONSTRAINT `fk_cb_collection`
    FOREIGN KEY (`collection_id`)
    REFERENCES `my_books_db`.`collection` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cb_edition`
    FOREIGN KEY (`edition_id`)
    REFERENCES `my_books_db`.`edition` (`edition_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`comment` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`comment` (
  `comment_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `book_id` INT UNSIGNED NULL DEFAULT NULL,
  `collection_id` INT UNSIGNED NULL DEFAULT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comment_user` (`user_id` ASC) VISIBLE,
  INDEX `fk_comment_book` (`book_id` ASC) VISIBLE,
  INDEX `fk_comment_collection` (`collection_id` ASC) VISIBLE,
  CONSTRAINT `fk_comment_book`
    FOREIGN KEY (`book_id`)
    REFERENCES `my_books_db`.`book` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_collection`
    FOREIGN KEY (`collection_id`)
    REFERENCES `my_books_db`.`collection` (`collection_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_comment_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`follow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`follow` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`follow` (
  `follow_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `follower_user_id` INT NOT NULL,
  `target_user_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`follow_id`),
  UNIQUE INDEX `uk_follow_pair` (`follower_user_id` ASC, `target_user_id` ASC) VISIBLE,
  INDEX `fk_follow_target` (`target_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_follow_follower`
    FOREIGN KEY (`follower_user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_follow_target`
    FOREIGN KEY (`target_user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`thread`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`thread` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`thread` (
  `thread_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `is_group` TINYINT(1) NOT NULL DEFAULT 0,
  `name` VARCHAR(200) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`thread_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`message` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`message` (
  `message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `thread_id` INT UNSIGNED NOT NULL,
  `user_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  INDEX `fk_msg_thread` (`thread_id` ASC) VISIBLE,
  INDEX `fk_msg_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_msg_thread`
    FOREIGN KEY (`thread_id`)
    REFERENCES `my_books_db`.`thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_msg_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`notification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`notification` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`notification` (
  `notification_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` VARCHAR(50) NOT NULL,
  `payload` JSON NULL DEFAULT NULL,
  `is_read` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`notification_id`),
  INDEX `fk_notification_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_notification_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`thread_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`thread_member` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`thread_member` (
  `thread_id` INT UNSIGNED NOT NULL,
  `user_id` INT NOT NULL,
  `joined_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`thread_id`, `user_id`),
  INDEX `fk_tm_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_tm_thread`
    FOREIGN KEY (`thread_id`)
    REFERENCES `my_books_db`.`thread` (`thread_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tm_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`user_book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`user_book` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`user_book` (
  `user_id` INT NOT NULL,
  `edition_id` INT UNSIGNED NOT NULL,
  `reading_status` ENUM('owned', 'reading', 'read', 'abandoned') NOT NULL DEFAULT 'owned',
  `rating` TINYINT UNSIGNED NULL DEFAULT NULL,
  `notes` TEXT NULL DEFAULT NULL,
  `added_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `edition_id`),
  INDEX `idx_ub_status` (`reading_status` ASC) VISIBLE,
  INDEX `fk_ub_edition_idx` (`edition_id` ASC) VISIBLE,
  INDEX `fk_ub_user` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_ub_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `my_books_db`.`user` (`user_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_ub_edition`
    FOREIGN KEY (`edition_id`)
    REFERENCES `my_books_db`.`edition` (`edition_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `my_books_db`.`book_genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `my_books_db`.`book_genre` ;

CREATE TABLE IF NOT EXISTS `my_books_db`.`book_genre` (
  `book_id` INT UNSIGNED NOT NULL,
  `genre_id` TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (`book_id`, `genre_id`),
  INDEX `fk_bg_genre` (`genre_id` ASC) VISIBLE,
  CONSTRAINT `fk_bg_book`
    FOREIGN KEY (`book_id`)
    REFERENCES `my_books_db`.`book` (`book_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_bg_genre`
    FOREIGN KEY (`genre_id`)
    REFERENCES `my_books_db`.`genre` (`genre_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- Seeds básicos de usuarios, obras, ediciones, generos y colecciones
-- -----------------------------------------------------

INSERT INTO `my_books_db`.`genre` (code, name, category, genre_type) VALUES
  -- Ficción
  ('fantasy',              'Fantasía',                       'fiction',   'system'),
  ('sci_fi',               'Ciencia ficción',                'fiction',   'system'),
  ('mystery_thriller',     'Misterio / Thriller',            'fiction',   'system'),
  ('horror',               'Terror',                         'fiction',   'system'),
  ('romance',              'Romance',                        'fiction',   'system'),
  ('historical_fiction',   'Ficción histórica',              'fiction',   'system'),
  ('contemporary_fiction', 'Ficción contemporánea',          'fiction',   'system'),
  ('ya',                   'Juvenil (YA)',                   'fiction',   'system'),
  ('children',             'Infantil',                       'fiction',   'system'),
  ('classics',             'Clásicos',                       'fiction',   'system'),

  -- No ficción
  ('biography_memoir',     'Biografía / Memorias',           'nonfiction','system'),
  ('history',              'Historia',                       'nonfiction','system'),
  ('popular_science',      'Divulgación científica',         'nonfiction','system'),
  ('business_economics',   'Empresa y economía',             'nonfiction','system'),
  ('self_help',            'Autoayuda y desarrollo personal','nonfiction','system'),
  ('psychology',           'Psicología',                     'nonfiction','system'),
  ('philosophy_religion',  'Filosofía y religión',           'nonfiction','system'),
  ('art_music_film',       'Arte, música y cine',            'nonfiction','system'),
  ('technology',           'Tecnología e informática',       'nonfiction','system'),

  -- Formatos / otros
  ('comics_graphic_novel', 'Cómic y novela gráfica',         'format',    'system'),
  ('poetry',               'Poesía',                         'format',    'system'),
  ('theatre',              'Teatro',                         'format',    'system');

-- Usuarios de ejemplo
INSERT INTO `my_books_db`.`user` (user_id, firstName, lastName, nickName, userRole, email, password)
VALUES
  (1, 'Ana',  'García', 'ana_g',  'reader', 'ana@example.com',  'hash_password_ana'),
  (2, 'Luis', 'Pérez',  'lperez', 'reader', 'luis@example.com', 'hash_password_luis');

-- Obras (books) de ejemplo
INSERT INTO `my_books_db`.`book` (book_id, title, openlibrary_work_id, description)
VALUES
  (1, 'Foundation',             'OL123W', 'Primera novela de la saga de la Fundación.'),
  (2, 'A Wizard of Earthsea',   'OL456W', 'Primer libro del ciclo de Terramar.');

-- Ediciones correspondientes
INSERT INTO `my_books_db`.`edition` (
  edition_id,
  book_id,
  isbn_10,
  isbn_13,
  openlibrary_edition_id,
  language,
  format,
  publish_date,
  pages,
  cover
)
VALUES
  (1, 1, NULL, '9780553293357', 'OL123E', 'eng', 'paperback', '1991-10-01', 255, NULL),
  (2, 2, NULL, '9780547773742', 'OL456E', 'eng', 'paperback', '2012-09-11', 320, NULL);

-- Biblioteca personal (user_book)
INSERT INTO `my_books_db`.`user_book` (user_id, edition_id, reading_status, rating, notes)
VALUES
  (1, 1, 'reading', 9,  'Relectura de ciencia ficción clásica.'),
  (1, 2, 'owned',   NULL, NULL),
  (2, 2, 'reading', 8,  'Muy buena fantasía juvenil.');

-- Colecciones de ejemplo
INSERT INTO `my_books_db`.`collection` (
  collection_id,
  user_id,
  name,
  description,
  collection_type,
  is_public
)
VALUES
  (1, 1, 'Favorites', 'Colección de libros favoritos de Ana.', 'system', 0),
  (2, 1, 'Wishlist',  'Libros que Ana quiere leer.',           'system', 0),
  (3, 1, 'Sci-Fi Favorites', 'Ciencia ficción recomendada por Ana.', 'custom', 1);

-- Libros dentro de colecciones (collection_book)
INSERT INTO `my_books_db`.`collection_book` (collection_id, edition_id, position)
VALUES
  (1, 1, 1),   -- Foundation en Favorites
  (3, 1, 1),   -- Foundation en Sci-Fi Favorites
  (3, 2, 2);   -- A Wizard of Earthsea en Sci-Fi Favorites

-- Relación obras ↔ géneros (book_genre)
-- Nota: estos IDs de género dependen del orden de inserción anterior en `genre`.
--  1: fantasy, 2: sci_fi, 8: ya, 10: classics
INSERT INTO `my_books_db`.`book_genre` (book_id, genre_id)
VALUES
  (1, 2),   -- Foundation → Ciencia ficción
  (1, 10),  -- Foundation → Clásicos
  (2, 1),   -- A Wizard of Earthsea → Fantasía
  (2, 8),   -- A Wizard of Earthsea → Juvenil (YA)
  (2, 10);  -- A Wizard of Earthsea → Clásicos


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
