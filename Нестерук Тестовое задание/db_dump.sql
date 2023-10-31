-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: qwe
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authors` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Антон','Павлович','Чехов'),(2,'Лев','Николаевич','Толстой'),(3,'Александр','Сергеевич','Пушкин'),(4,'Николай','Васильевич','Гоголь');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `author_id` bigint DEFAULT NULL,
  `available` bit(1) NOT NULL,
  `info` varchar(512) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfjixh2vym2cvfj3ufxj91jem7` (`author_id`),
  CONSTRAINT `FKfjixh2vym2cvfj3ufxj91jem7` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,1,_binary '','Пьеса, написанная Чеховым в 1903 году. Она рассказывает историю о бывшей зажиточной семье, которая вынуждена продать свой вишневый сад, чтобы погасить долги. Пьеса является одним из наиболее известных произведений Чехова и считается классикой мирового театра.','Вишневый сад'),(2,1,_binary '','Рассказ, опубликованный в 1899 году. Он рассказывает историю о мужчине, который влюбляется в женщину, которую встречает в курортном городке. Однако их отношения становятся сложными, когда они оба понимают, что не могут быть вместе','Дама с собачкой'),(3,1,_binary '','Пьеса, написанная Чеховым в 1895 году. Она рассказывает историю о группе людей, которые проводят лето на даче и сталкиваются с различными проблемами в своих отношениях. Пьеса является одним из наиболее известных произведений Чехова и считается классикой мирового театра.','Чайка'),(4,1,_binary '','Рассказ, опубликованный в 1888 году. Он рассказывает историю о группе людей, которые путешествуют на поезде через степь. Рассказ является одним из наиболее известных произведений Чехова и считается классикой русской литературы.','Степь'),(5,2,_binary '','Роман, написанный Львом Толстым в 1869 году. Он рассказывает историю нескольких аристократических семей в России во время войн с Наполеоном в начале XIX века. Роман является одним из наиболее известных произведений Толстого и считается классикой мировой литературы.','Война и мир'),(6,2,_binary '','Роман, написанный Львом Толстым в 1869 году. Он рассказывает историю нескольких аристократических семей в России во время войн с Наполеоном в начале XIX века. Роман является одним из наиболее известных произведений Толстого и считается классикой мировой литературы.','Война и мир');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `book_id` bigint DEFAULT NULL,
  `issue_date` datetime(6) DEFAULT NULL,
  `refunded` bit(1) NOT NULL,
  `return_date` datetime(6) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKi0uonhq5m6jxxlt5smyobjrdv` (`book_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKi0uonhq5m6jxxlt5smyobjrdv` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (4,1,'2023-10-06 01:08:06.664057',_binary '','2023-10-06 01:08:09.865799',1),(5,1,'2023-10-06 01:08:12.486771',_binary '','2023-10-06 01:08:22.954868',1),(6,1,'2023-10-06 01:08:27.303031',_binary '','2023-10-06 01:36:45.402630',2),(7,2,'2023-10-06 01:08:34.513191',_binary '','2023-10-06 01:36:34.038277',1),(20,3,'2023-10-06 08:45:54.829174',_binary '','2023-10-06 08:45:56.654624',1),(22,1,'2023-10-06 08:57:02.627025',_binary '','2023-10-06 08:57:19.384225',1),(23,2,'2023-10-06 08:57:11.240785',_binary '','2023-10-06 08:57:28.594317',2),(24,1,'2023-10-06 08:57:26.916609',_binary '','2023-10-06 09:55:25.074211',2),(25,1,'2023-10-06 09:58:08.015682',_binary '','2023-10-06 09:58:23.798846',1),(26,2,'2023-10-06 09:58:16.697335',_binary '','2023-10-06 09:58:37.024744',2),(27,1,'2023-10-06 12:37:07.347831',_binary '','2023-10-06 12:38:24.654428',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `pasport_number` varchar(9) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_51ulktrxm90e05rereaoev729` (`pasport_number`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Иван','Иванов','Иванович','AB1212121'),(2,'Петр','Петров','Петрович','QW1212122'),(3,'Никита','Никитьев','Никитич','RR1231234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06 12:52:22
