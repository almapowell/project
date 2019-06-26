CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100)
)

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    phone INT,
    bride_groom_name VARCHAR,
    booking_date DATE,
    location VARCHAR,
    budget INT,
    notes TEXT,
    how TEXT
)

CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    message TEXT,
    name VARCHAR(50),
    email VARCHAR(100),
    phone INT
)

CREATE TABLE video (
    video_id SERIAL PRIMARY KEY,
    url TEXT
)




heroku pg:killall -a "jazzzzzzzzzzzzzzzzzzzzzzzzzzzz"


-- CREATE TABLE booking (
--     booking_id SERIAL PRIMARY KEY,
--     user_id INT REFERENCES users(user_id),
--     bride_groom_name VARCHAR,
--     booking_date DATE,
--     -- time_stamp TIMESTAMP,
--     location VARCHAR,
--     budget INT,
--     notes TEXT,
--     how TEXT
-- )


-- CREATE TABLE users (
--     user_id SERIAL PRIMARY KEY,
--     name VARCHAR(50),
--     email VARCHAR(100),
--     phone INT
-- )

-- CREATE TABLE questions (
--     question_id SERIAL PRIMARY KEY,
--     message TEXT,
--     -- time_stamp TIMESTAMP,
--     user_id INT REFERENCES users(user_id)
-- )


