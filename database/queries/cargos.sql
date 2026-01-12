-- name: CreateCargo :one
INSERT INTO cargos (
    address_sequence,
    employee_id,
    vehicle_id,
    start_date,
    deadline_date,
    price
) VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;

-- name: GetCargo :one
SELECT * FROM cargos
WHERE id = $1;

-- name: ListCargos :many
SELECT * FROM cargos
ORDER BY created_at
LIMIT $1 OFFSET $2;

-- name: ListCargosDetailed :many
SELECT
    c.id,
    c.address_sequence,
    c.start_date,
    c.deadline_date,
    c.price,
    c.payment_status,
    e.id as employee_id,
    e.first_name as employee_first_name,
    e.last_name as employee_last_name,
    v.id as vehicle_id,
    v.plate_number as vehicle_plate_number,
    v.make as vehicle_make,
    cu.company_type as customer_company_type,
    cu.company_name as customer_company_name,
    cu.inn as customer_inn,
    cu.kpp as customer_kpp,
    cu.ogrn as customer_ogrn,
    c.created_at,
    c.updated_at
FROM cargos c
JOIN employees e ON e.id = c.employee_id
JOIN vehicles v ON v.id = c.vehicle_id
JOIN customers cu ON cu.id = c.customer_id
ORDER BY c.created_at
LIMIT $1 OFFSET $2;

-- name: UpdateCargo :one
UPDATE cargos
SET
    address_sequence = COALESCE(sqlc.narg(address_sequence), address_sequence),
    employee_id = COALESCE(sqlc.narg(employee_id), employee_id),
    vehicle_id = COALESCE(sqlc.narg(vehicle_id), vehicle_id),
    start_date = COALESCE(sqlc.narg(start_date), start_date),
    deadline_date = COALESCE(sqlc.narg(deadline_date), deadline_date),
    price = COALESCE(sqlc.narg(price), price),
    payment_status = COALESCE(sqlc.narg(payment_status), payment_status),
    updated_at = now()
WHERE id = $1
RETURNING *;
