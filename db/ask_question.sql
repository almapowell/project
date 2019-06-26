INSERT INTO questions ( message, times_stamp )
VALUES ( ${message}, ${times_stamp} );

INSERT INTO users ( name, email, phone )
VALUES (${name}, ${email}, ${phone});

SELECT u.name, u.email, u.phone, q.message, q.times_stamp
FROM questions q
JOIN users u ON u.user_id = q.user_id