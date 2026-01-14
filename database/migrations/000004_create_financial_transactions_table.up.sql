CREATE TABLE IF NOT EXISTS financial_transactions (
    id BIGSERIAL PRIMARY KEY,
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'RUB',
    cargo_id BIGINT NOT NULL REFERENCES cargos(id) ON DELETE RESTRICT,
    type VARCHAR(64) NOT NULL, -- "income", "expense", "transfer"
    status VARCHAR(64) NOT NULL DEFAULT 'completed',
    transaction_date TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX idx_financial_transactions_cargo_id
    ON financial_transactions(cargo_id);
