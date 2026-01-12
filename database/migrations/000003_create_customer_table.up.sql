CREATE TABLE IF NOT EXISTS customers (
    id BIGSERIAL PRIMARY KEY,

    company_name VARCHAR(255) NOT NULL,
    -- "individual", "legal", "partner", etc.
    company_type VARCHAR(64) NOT NULL,

    inn VARCHAR(16) NOT NULL,
    kpp VARCHAR(16) NOT NULL,
    ogrn VARCHAR(16) NOT NULL,

    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE cargos
ADD COLUMN customer_id BIGINT NOT NULL
    REFERENCES customers(id)
    ON DELETE RESTRICT;

CREATE INDEX idx_cargo_customer_id ON cargos(customer_id);
