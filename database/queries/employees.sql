-- name: CreateEmployee :one
INSERT INTO employees (first_name, last_name)
VALUES ($1, $2)
RETURNING *;

-- name: GetEmployee :one
SELECT * FROM employees
WHERE id = $1;

-- name: ListEmployees :many
SELECT * FROM employees
ORDER BY last_name, first_name
LIMIT $1 OFFSET $2;

-- name: UpdateEmployee :one
UPDATE employees
SET first_name = $2, last_name = $3, updated_at = now()
WHERE id = $1
RETURNING *;
