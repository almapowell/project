insert into admin (name, email, password)
values (${name}, ${email}, ${hash})
returning *;