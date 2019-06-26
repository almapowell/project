SELECT b.*, u.name 
FROM booking b
JOIN users u ON b.user_id = u.user_id
