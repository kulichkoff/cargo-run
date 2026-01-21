-- name: ListDeliveriesByTransaction :many
SELECT d.* FROM delivery_transaction dt
RIGHT JOIN delivery d ON dt.delivery_id = d.id
WHERE dt.transaction_id = $1;

-- name: LinkDeliveriesTransactions :copyfrom
INSERT INTO delivery_transaction (delivery_id, transaction_id)
VALUES ($1, $2);
