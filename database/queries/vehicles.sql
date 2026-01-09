-- name: CreateVehicle :one
-- Inserts a new vehicle and returns the created result
INSERT INTO vehicles
(plate_number, make, model, vin, manufacture_year)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: GetVehicle :one
-- Retrieves a single vehicle by ID
SELECT * FROM vehicles
WHERE id = $1;

-- name: ListVehicles :many
-- Retrieves all vehicles ordered by plate number with pagination
SELECT * FROM vehicles
ORDER BY plate_number
LIMIT $1 OFFSET $2;

-- name: UpdateVehicle :one
-- Updates a vehicle's information and returns the updated record
UPDATE vehicles
SET plate_number = $2, make = $3, model = $4,
    vin = $5, manufacture_year = $6,
    updated_at = now()
WHERE id = $1
RETURNING *;
