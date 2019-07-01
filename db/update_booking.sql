UPDATE booking
SET
    name = ${name},
    email = ${email},
    phone = ${phone},
    booking_date = ${booking_date},
    location =${location},
    notes = ${notes}
WHERE booking_id = ${booking_id};

SELECT * FROM booking;
