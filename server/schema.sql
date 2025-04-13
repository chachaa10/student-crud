create database studentportal;

use studentportal;

create table
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
        year_level INT check (year_level between 1 and 4) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

DESCRIBE students;

drop table students;

select
    *
from
    students;

INSERT INTO
    students (
        first_name,
        middle_name,
        last_name,
        birthdate,
        gender,
        email,
        mobile_number,
        street_address,
        city,
        state,
        zip_code,
        student_id,
        course,
        year_level,
        password,
        created_at
    )
VALUES
    (
        'Quyn',
        'Carolyn Holman',
        'Booker',
        '1988-11-28 16:00:00',
        'other',
        'nomynymux@example.com',
        '09997555252',
        'Sit Optio Sit Sed D',
        'Expedita Perferendis',
        'Et In Et Labore Nesc',
        '2085',
        '56468043',
        'bshrm',
        2,
        '$2b$10$.2xmkF0F9YqFAO4DQ2OTmOS/m0b0P2dwOzww65W.jCHgDOibFdsCm',
        '2025-04-01 07:58:32'
    ),
    (
        'Kalia',
        'Marny Foreman',
        'Hull',
        '1989-11-16 16:00:00',
        'other',
        'kalia@example.com',
        '09715931501',
        'Esse Hic Accusantiu',
        'Qui Eveniet Eius Vo',
        'Facilis Debitis Comm',
        '6471',
        '54071372',
        'bshrm',
        3,
        '$2b$10$YMFJl0a5AS6tXJFvebWuZeLzupxdcwZn8oxi3zZmdNeh.sqed5IoG',
        '2025-04-01 08:00:08'
    ),
    (
        'Clark',
        'Blaine Larson',
        'Allison',
        '1977-12-17 16:00:00',
        'female',
        'clark@example.com',
        '09259905327',
        'Sapiente Sequi Rerum',
        'Maiores Dignissimos ',
        'Vero Vel Aut Vel Com',
        '8048',
        '73308366',
        'bsat',
        4,
        '$2b$10$uaCsJjcFJma62Pnwphluze0JFIpOHdf7NMfBZUL/9mRc4xuzvmIQ6',
        '2025-04-01 08:16:36'
    ),
    (
        'Wilma',
        'Katelyn Holt',
        'Merrill',
        '2024-01-13 16:00:00',
        'male',
        'batemog@example.com',
        '09594728890',
        'Dolorem Repellendus',
        'Nemo Eum Nulla Iure ',
        'Nulla Modi Duis Est ',
        '8318',
        '28873513',
        'bsba',
        4,
        '$2b$10$qtPvRXqVw/iKOxqPxf7ZQO/KXgoh6LQ7Vs2yASwlXMU7/vRIC09yC',
        '2025-04-01 09:15:13'
    ),
    (
        'Gwendolyn',
        'Latifah Vincent',
        'Bernard',
        '2000-01-19 16:00:00',
        'male',
        'mytusaru@example.com',
        '09184944882',
        'Sit Accusantium Vol',
        'Qui Eiusmod Reiciend',
        'Eveniet Itaque Dele',
        '8921',
        '10458842',
        'bsa',
        1,
        '$2b$10$/8GAdQ8LNudNM7vt0hsd..KXP0.UQT/NSgEoQkihBSVXPtRdOXH5K',
        '2025-04-01 09:15:19'
    ),
    (
        'Elton',
        'Aline Carlson',
        'Ayala',
        '1991-02-08 16:00:00',
        'female',
        'elton@example.com',
        '09618991592',
        'Reprehenderit Conse',
        'Quia Voluptatem Non',
        'Eos Assumenda Dicta ',
        '7028',
        '93731500',
        'bspysch',
        2,
        '$2b$10$c9gC3Bf2kkZU60fk2o2wZ.Zea8./KYzjR7cGYSBGZtywsxLYWIrzG',
        '2025-04-07 14:38:14'
    ),
    (
        'Mollie',
        'Arden Harding',
        'Weiss',
        '2014-02-27 16:00:00',
        'other',
        'mollie@example.com',
        '09920295608',
        'Aliquip Qui Quaerat ',
        'Ut Iste Laborum Volu',
        'Libero Enim Veritati',
        '1618',
        '39536587',
        'bshm',
        3,
        '$2b$10$ursMygYFvISEgo0cqb.fluq9fGBRx9NZ0RZe2dDfihhDpXXM5J/HC',
        '2025-04-08 02:32:55'
    ),
    (
        'Harlan',
        'Penelope Fisher',
        'Cooke',
        '2004-08-21 16:00:00',
        'other',
        'saqavapype@example.com',
        '09426054580',
        'Nihil Nemo Qui Sed E',
        'In Consequatur Aliq',
        'Velit Cupiditate Rep',
        '3390',
        '78636115',
        'bsis',
        3,
        '$2b$10$ZQ49MQY.OZJ0sYQeOOVzpeQXxK7YCyuaFBD1V3TttSlHw7gklGKey',
        '2025-04-08 03:58:00'
    ),
    (
        'Nero',
        'Lael Johnson',
        'Castillo',
        '1981-06-21 16:00:00',
        'other',
        'givyrir@example.com',
        '09480592157',
        'Ipsum Nulla Autem E',
        'Voluptas Sunt Nesciu',
        'Eum Qui Est Sequi In',
        '6697',
        '24822735',
        'bped',
        3,
        '$2b$10$lPcvDlyUfK8JV7sm9dq6d..e/xa7eAIzKxoHiS4ZNxli04rbuc7jq',
        '2025-04-08 03:58:04'
    ),
    (
        'Rose',
        'Irene Reed',
        'Shelton',
        '1991-05-20 16:00:00',
        'female',
        'dywaj@example.com',
        '09760020452',
        'Ullam Assumenda Vel ',
        'Illo Atque Incididun',
        'Amet Ut Aut Elit V',
        '8239',
        '45093508',
        'bsat',
        4,
        '$2b$10$lsbjhXq5lmSaIevjrYOqPue/NvDRNWDfaWUqQx3a6rdgISuSbUCrK',
        '2025-04-08 03:58:09'
    ),
    (
        'Arden',
        'Emily Wilkinson',
        'Simmons',
        '2017-06-26 16:00:00',
        'female',
        'tiwaka@example.com',
        '09793301763',
        'Proident Vel Corpor',
        'Praesentium Atque Co',
        'Est Provident Volup',
        '9782',
        '75537168',
        'bsis',
        2,
        '$2b$10$8qkuG6F0Zv7QzKhlqQBws.G4yv9eB9SRSIifBaOaBBDulxDX09C2i',
        '2025-04-08 03:58:13'
    ),
    (
        'Maxwell',
        'Ross Munoz',
        'Mcclain',
        '1998-03-26 16:00:00',
        'female',
        'jiwaxazahy@example.com',
        '09462444559',
        'Anim Voluptates Dolo',
        'Saepe Reprehenderit',
        'Mollit Eos Minim Est',
        '5697',
        '73263649',
        'beed',
        3,
        '$2b$10$SaATSrk3VgYPCZp7jlntvun8XRW8DeKue1VKVSb0.4c75f9FRy.76',
        '2025-04-08 03:58:18'
    ),
    (
        'Latifah',
        'Cherokee Buckner',
        'Beasley',
        '2021-01-18 16:00:00',
        'male',
        'huburux@example.com',
        '09393077244',
        'Esse Placeat Dignis',
        'Est Nihil Id Dolore ',
        'Officia Ad Esse Et ',
        '3389',
        '41891475',
        'bael',
        1,
        '$2b$10$7eQdNOB3zkTtBtR27DgFeeFcBL.TWt3tLM7KRzVLdz9vwPCaAVoty',
        '2025-04-08 03:58:23'
    );