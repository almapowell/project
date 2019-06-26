INSERT INTO users (name, email, phone)
VALUES (${name}, ${email}, ${phone});


INSERT INTO booking (bride_groom_name, booking_date, location, budget, notes, how)
VALUES (${bride_groom_name}, ${booking_date}, ${location}, ${budget}, ${notes}, ${how});

SELECT b.bride_groom_name, b.booking_date, b.location, b.budget, b.notes, b.how, u.name, u.email, u.phone 
FROM booking b
JOIN users u ON u.user_id = b.user_id;