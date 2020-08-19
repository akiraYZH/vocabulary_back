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
-- Dumping data for table `vocabulary`
--

INSERT INTO `vocabulary` (`id`, `spelling`, `phonetic`, `image`, `audio`, `created_at`, `updated_at`, `difficulty`, `primary_explaination`, `primary_type_id`, `spelling_m`, `spelling_f`) VALUES
(1, 'pomme', '[pɔm]', NULL, NULL, '2020-07-09 22:46:34', '2020-07-09 22:46:34', 1, '苹果', 3, '', ''),
(2, 'bas', '[bɑ, -s]', NULL, NULL, '2020-07-10 17:30:16', '2020-07-10 17:30:16', 1, '低的, 矮的；浅的', 7, 'bas', 'basse'),
(3, 'ab', 'a', NULL, NULL, '2020-08-06 20:37:04', '2020-08-06 20:41:23', 1, '', 1, 'a', 'a'),
(4, 'a', 'a', NULL, NULL, '2020-08-06 20:41:45', '2020-08-06 21:10:22', 1, 'a', 1, 'a', 'a'),
(5, 'b', 'b', NULL, NULL, '2020-08-06 20:49:32', '2020-08-06 20:49:32', 1, '', 1, 'b', 'b'),
(7, 'bb', 'b', NULL, NULL, '2020-08-06 20:51:41', '2020-08-06 20:51:41', 1, '', 1, 'b', 'b'),
(8, 'c', 'c', NULL, NULL, '2020-08-06 20:57:13', '2020-08-06 20:57:13', 1, '', 1, 'c', 'c'),
(10, 'ccc', 'c', NULL, NULL, '2020-08-06 20:59:27', '2020-08-06 20:59:46', 1, '', 1, 'c', 'c');
