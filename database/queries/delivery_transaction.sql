-- name: ListDeliveriesByTransaction :many
SELECT d.* FROM delivery_transaction dt
RIGHT JOIN delivery d ON dt.delivery_id = d.id
WHERE dt.transaction_id = $1;

-- name: ListTransactionsByDelivery :many
SELECT t.* FROM delivery_transaction dt
RIGHT JOIN transaction t ON dt.transaction_id = t.id
WHERE dt.delivery_id = $1;

-- name: LinkDeliveriesTransactions :copyfrom
INSERT INTO delivery_transaction (delivery_id, transaction_id)
VALUES ($1, $2);
