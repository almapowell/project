SELECT q.message, u.name FROM questions q
JOIN users u ON q.user_id = u.user_id
