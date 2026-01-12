DROP INDEX IF EXISTS idx_cargo_customer_id;

ALTER TABLE cargos
DROP CONSTRAINT IF EXISTS cargos_customer_id_fkey,
DROP COLUMN IF EXISTS customer_id;

DROP TABLE IF EXISTS customers;
