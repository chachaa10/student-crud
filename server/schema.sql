CREATE database studentportal;

use studentportal;

CREATE TABLE
  students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    middle_name VARCHAR(255),
    last_name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    gender ENUM ('male', 'female', 'other') NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(11) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(7) NOT NULL,
    student_id VARCHAR(8) UNIQUE NOT NULL,
    course VARCHAR(10) NOT NULL,
    year_level INT CHECK (year_level BETWEEN 1 AND 4) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );