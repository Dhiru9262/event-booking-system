CREATE DATABASE event_db;
USE event_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE
);

CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  description TEXT,
  date DATETIME,
  total_capacity INT,
  remaining_tickets INT
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  event_id INT,
  booking_code VARCHAR(50) UNIQUE,
  booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (event_id) REFERENCES events(id)
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(50),
  entry_time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_code) REFERENCES bookings(booking_code)
);

INSERT INTO users (name, email)
VALUES ('Dhiraj', 'dhiraj@email.com');

INSERT INTO events (title, description, date, total_capacity, remaining_tickets)
VALUES ('Test Event', 'Demo', '2026-05-01 18:00:00', 10, 10);