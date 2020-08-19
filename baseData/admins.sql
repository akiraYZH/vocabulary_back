-- phpMyAdmin SQL Dump
-- version 4.9.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 13, 2020 at 10:45 PM
-- Server version: 5.7.26
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `vocabulary`
--

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `account`, `password`, `created_at`, `updated_at`, `role_id`, `deleted_at`, `email`) VALUES
(1, 'akira', '123456', '2020-07-04 10:43:09', '2020-07-28 22:25:27', 1, NULL, '664753092@qq.com'),
(2, 'dingzhaoqiu', '123456', '2020-07-29 15:33:31', '2020-07-29 15:33:31', 2, NULL, 'akira.yzh@gmail.com');
