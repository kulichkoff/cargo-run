-- name: CreateTruck :one
INSERT INTO truck
(plate_number, make, model, vin, year)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetTruck :one
SELECT * FROM truck
WHERE id = $1;

-- name: ListTrucks :many
SELECT * FROM truck
ORDER BY plate_number
LIMIT $1 OFFSET $2;
