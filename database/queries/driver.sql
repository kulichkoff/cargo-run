-- name: CreateDriver :one
INSERT INTO driver (first_name, last_name)
VALUES ($1, $2)
RETURNING *;

-- name: GetDriver :one
SELECT * FROM driver
WHERE id = $1;

-- name: ListDrivers :many
SELECT * FROM driver
ORDER BY last_name, first_name
LIMIT $1 OFFSET $2;

-- name: UpdateDriver :one
UPDATE driver
SET first_name = $2, last_name = $3, updated_at = now()
WHERE id = $1
RETURNING *;
