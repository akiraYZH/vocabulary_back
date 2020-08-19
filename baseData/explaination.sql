-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2020 at 10:51 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `vocabulary`
--

--
-- Dumping data for table `explainations`
--

INSERT INTO `explainations` (`id`, `created_at`, `updated_at`, `word_id`, `explaination_cn`, `sentence_fr`, `sentence_cn`, `sort`, `audio`, `type_id`) VALUES
(1, '2020-07-09 22:46:34', '2020-07-09 22:46:34', 1, '苹果', 'On coupe cette pomme en quatre quartiers.', '我们把苹果切成四份。', 1, NULL, 3),
(2, '2020-07-10 17:30:16', '2020-07-10 17:30:17', 2, '低的, 矮的；浅的', 'Il marche la tête basse.', '他低着头走路。', 1, NULL, 7),
(3, '2020-08-06 20:41:23', '2020-08-06 20:41:23', 3, 'a', 'a', 'a', 1, NULL, 1),
(4, '2020-08-06 21:10:22', '2020-08-06 21:10:22', 4, 'a', 'a', 'a', 1, NULL, 1),
(5, '2020-08-06 20:49:32', '2020-08-06 20:49:32', 5, 'b', 'b', 'b', 1, NULL, 1),
(6, '2020-08-06 20:51:41', '2020-08-06 20:51:41', 7, 'b', 'b', 'b', 1, NULL, 1),
(7, '2020-08-06 20:57:13', '2020-08-06 20:57:13', 8, 'c', 'c', 'c', 1, NULL, 1),
(8, '2020-08-06 20:59:46', '2020-08-06 20:59:46', 10, 'c', 'c', 'c', 1, NULL, 1);