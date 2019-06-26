CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    phone INT
)


CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(100),
    password VARCHAR(100)
)


CREATE TABLE questions (
    question_id SERIAL PRIMARY KEY,
    message TEXT,
    time_stamp TIMESTAMP,
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE booking (
    booking_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    bride_groom_name VARCHAR,
    booking_date DATE,
    -- time_stamp TIMESTAMP,
    location VARCHAR,
    budget INT,
    notes TEXT,
    how TEXT
)

CREATE TABLE video (
    video_id SERIAL PRIMARY KEY,
    url TEXT
)






-- CREATE TABLE booking (
--     booking_id SERIAL PRIMARY KEY,
--     name VARCHAR REFERENCES users(user_id),
--     email VARCHAR(60) REFERENCES users(user_id),
--     groom_name VARCHAR,
--     bride_name VARCHAR,
--     booking_date DATE,
--     booking_time TIME,
--     time_stamp TIMESTAMP,
--     location VARCHAR,
--     budget INT,
--     notes TEXT,
--     user_id INT REFERENCES users(user_id),
--     how TEXT
-- )



select pg_terminate_backend(pid) from pg_stat_activity where datname='dd1ja3ghbijh0';