INSERT INTO questions ( message, name, email, phone )
VALUES ( ${message}, ${name}, ${email}, ${phone} );

SELECT * FROM questions;

-- SELECT u.name, u.email, u.phone, q.message
-- FROM questions q
-- JOIN users u ON u.user_id = q.user_id;