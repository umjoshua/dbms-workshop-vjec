CREATE DATABASE IF NOT EXISTS GAPFILLING;

USE GAPFILLING;

CREATE TABLE IF NOT EXISTS TASKS(
    id INT AUTO_INCREMENT PRIMARY KEY,
    task VARCHAR(29),
    completed INT
);