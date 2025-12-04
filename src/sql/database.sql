DROP SCHEMA IF EXISTS aiko_db;

CREATE DATABASE IF NOT EXISTS aiko_db;

USE aiko_db;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(255) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    user_id INT,
    seconds_played INT,
    audio_text_speed_add INT,
    audio_text_speed_sub INT,
    restart_count INT,
    game_end INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS decisions (
    decision_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    decision_text LONGTEXT,
    decision_sound_id VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS choices (
    choice_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    choice_text VARCHAR(255),
    next_stage_id INT
);

CREATE TABLE IF NOT EXISTS stages (
    stage_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    dialogue_text LONGTEXT,
    dialogue_sound_id VARCHAR(255),
    stage_picture VARCHAR(255),
    decision_id INT,
    choice_id_1 INT,
    choice_id_2 INT,
    FOREIGN KEY (decision_id) REFERENCES decisions(decision_id),
    FOREIGN KEY (choice_id_1) REFERENCES choices(choice_id),
    FOREIGN KEY (choice_id_2) REFERENCES choices(choice_id)
);