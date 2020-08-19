-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2020 at 10:47 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `vocabulary`
--

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `type_abbr`, `type`, `type_cn`, `created_at`, `updated_at`) VALUES
(1, 'n.', 'Nom', '名词', '2020-07-10 16:59:17', '2020-07-10 16:59:17'),
(2, 'n.m.', 'Nom masculin', '阳性名词', '2020-07-10 17:00:29', '2020-07-10 17:00:29'),
(3, 'n.f.', 'Nom féminin', '阴性名词', '2020-07-10 17:00:54', '2020-07-10 17:00:54'),
(4, 'v.', 'Verbe', '动词', '2020-07-10 17:01:18', '2020-07-10 17:01:18'),
(5, 'v.t.', 'Verbe transitif', '及物动词', '2020-07-10 17:01:48', '2020-07-10 17:01:48'),
(6, 'v.i.', 'Verbe intransitif', '不及物动词', '2020-07-10 17:02:14', '2020-07-10 17:02:14'),
(7, 'adj.', 'Adjectif', '形容词', '2020-07-10 17:02:37', '2020-07-10 17:02:37'),
(8, 'adv.', 'Adverbe', '副词', '2020-07-10 17:03:10', '2020-07-10 17:03:10'),
(9, 'prép.', 'Préposition', '介词', '2020-07-10 17:03:32', '2020-07-10 17:03:32'),
(10, 'pron.', 'Pronom', '代词', '2020-07-10 17:03:52', '2020-07-10 17:03:52'),
(11, 'interj.', 'Interjection', '感叹词', '2020-07-10 17:04:15', '2020-07-10 17:11:57');
