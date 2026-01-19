-- name: CreateDelivery :one
INSERT INTO delivery (
    pickup_address,
    delivery_address,
    pickup_time,
    delivery_deadline,
    driver_id,
    truck_id,
    customer_id
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING *;

-- name: GetDelivery :one
SELECT * FROM delivery
WHERE id = $1;

-- name: ListDeliveries :many
SELECT * FROM delivery
ORDER BY created_at DESC
LIMIT $1 OFFSET $2;

-- name: UpdateDelivery :one
UPDATE delivery
SET
    pickup_address = COALESCE(sqlc.narg(pickup_address), pickup_address),
    delivery_address = COALESCE(sqlc.narg(delivery_address), delivery_address),
    pickup_time = COALESCE(sqlc.narg(pickup_time), pickup_time),
    delivery_deadline = COALESCE(sqlc.narg(delivery_deadline), delivery_deadline),
    status = COALESCE(sqlc.narg(status), status),
    driver_id = COALESCE(sqlc.narg(driver_id), driver_id),
    truck_id = COALESCE(sqlc.narg(truck_id), truck_id),
    customer_id = COALESCE(sqlc.narg(customer_id), customer_id),
    updated_at = now()
WHERE id = $1
RETURNING *;

-- name: ListDeliveriesDetailed :many
SELECT
    d.id,
    d.pickup_address,
    d.delivery_address,
    d.pickup_time,
    d.delivery_deadline,
    d.status,
    e.id as driver_id,
    e.first_name as driver_first_name,
    e.last_name as driver_last_name,
    v.id as truck_id,
    v.plate_number as truck_plate_number,
    v.make as truck_make,
    c.id as customer_id,
    c.company_type as customer_company_type,
    c.company_name as customer_company_name,
    c.inn as customer_inn,
    c.kpp as customer_kpp,
    c.ogrn as customer_ogrn,
    d.created_at,
    d.updated_at
FROM delivery d
JOIN driver e ON e.id = d.driver_id
JOIN truck v ON v.id = d.truck_id
JOIN customer c ON c.id = d.customer_id
ORDER BY d.created_at
LIMIT $1 OFFSET $2;
