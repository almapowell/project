insert into admin (email, password)
values (${email}, ${hash})
returning *;