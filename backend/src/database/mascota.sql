-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2024 a las 09:50:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mascota`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `nombre_categorias` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id_category`, `nombre_categorias`) VALUES
(2, 'perro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `id_gender` int(11) NOT NULL,
  `nombre_gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`id_gender`, `nombre_gender`) VALUES
(2, 'Macho');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pets`
--

CREATE TABLE `pets` (
  `id_pets` int(11) NOT NULL,
  `fk_race` int(11) DEFAULT NULL,
  `fk_category` int(11) DEFAULT NULL,
  `photo` varchar(64) NOT NULL,
  `fk_gender` int(11) DEFAULT NULL,
  `fk_user` int(11) DEFAULT NULL,
  `nombre_mascota` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pets`
--

INSERT INTO `pets` (`id_pets`, `fk_race`, `fk_category`, `photo`, `fk_gender`, `fk_user`, `nombre_mascota`) VALUES
(0, 2, 2, 'photo-sm-1.jpg', 2, NULL, 'Bingo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `races`
--

CREATE TABLE `races` (
  `id_races` int(11) NOT NULL,
  `nombre_razas` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `races`
--

INSERT INTO `races` (`id_races`, `nombre_razas`) VALUES
(2, 'Bulldog');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `fullname`, `email`, `password`) VALUES
(1, 'V', '', ''),
(2, 'Valentina Diaz Lerma', 'valen@gmail.com', '1234567');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id_gender`);

--
-- Indices de la tabla `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id_pets`),
  ADD KEY `realizar1` (`fk_race`),
  ADD KEY `realizar2` (`fk_category`),
  ADD KEY `realizar3` (`fk_gender`),
  ADD KEY `hacer` (`fk_user`);

--
-- Indices de la tabla `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`id_races`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `genders`
--
ALTER TABLE `genders`
  MODIFY `id_gender` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `races`
--
ALTER TABLE `races`
  MODIFY `id_races` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pets`
--
ALTER TABLE `pets`
  ADD CONSTRAINT `hacer` FOREIGN KEY (`fk_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `realizar1` FOREIGN KEY (`fk_race`) REFERENCES `races` (`id_races`),
  ADD CONSTRAINT `realizar2` FOREIGN KEY (`fk_category`) REFERENCES `categories` (`id_category`),
  ADD CONSTRAINT `realizar3` FOREIGN KEY (`fk_gender`) REFERENCES `genders` (`id_gender`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
