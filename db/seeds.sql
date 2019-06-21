CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    phone INT
)


CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(30)
)


CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    message TEXT,
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(60),
    booking_date DATE,
    booking_time TIME,
    time_stamp TIMESTAMP,
    location VARCHAR,
    budget INT,
    notes TEXT,
    user_id INT REFERENCES users(user_id)
)


CREATE TABLE video (
    video_id SERIAL PRIMARY KEY,
    url TEXT
)