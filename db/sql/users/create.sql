/*
    Creates a new user and returns it
*/
INSERT INTO users(username, email, password_hash)
VALUES(${username}, ${email}, ${password_hash})
RETURNING *