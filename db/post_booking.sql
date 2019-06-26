INSERT INTO booking (name, email, phone, bride_groom_name, booking_date, location, budget, notes, how)
VALUES (${name}, ${email}, ${phone}, ${bride_groom_name}, ${booking_date}, ${location}, ${budget}, ${notes}, ${how});

SELECT * FROM booking;


-- SELECT b.bride_groom_name, b.booking_date, b.location, b.budget, b.notes, b.how, u.name, u.email, u.phone 
-- FROM booking b
-- JOIN users u ON u.user_id = b.user_id;

-- {
-- 	"bride_groom_name": "sally",
-- 	"booking_date": "02/27/1996",
-- 	"location": "draper",
-- 	"budget": 600,
-- 	"notes": "cantiaoseiojfijeifn",
-- 	"how": "google",
-- 	"name": "joe",
-- 	"email": "joe@gmail.com",
-- 	"phone": 5816816
-- }