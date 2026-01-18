-- name: CreateCargo :one
INSERT INTO cargo (
    weight,
    volume,
    type,
    description,
    delivery_id
)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;

-- name: ListCargoByDelivery :many
SELECT * FROM cargo
WHERE delivery_id = $1
ORDER BY created_at DESC
LIMIT $2 OFFSET $3;
