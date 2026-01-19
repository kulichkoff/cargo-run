CREATE TABLE IF NOT EXISTS driver (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS truck (
    id BIGSERIAL PRIMARY KEY,
    plate_number VARCHAR(128) NOT NULL UNIQUE,
    make VARCHAR(128),
    model VARCHAR(128),
    vin VARCHAR(128),
    year INT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
    id BIGSERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    company_type VARCHAR(64) NOT NULL,
    inn VARCHAR(16) NOT NULL UNIQUE,
    kpp VARCHAR(16) NOT NULL UNIQUE,
    ogrn VARCHAR(16) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery (
  id BIGSERIAL PRIMARY KEY,
  pickup_address TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  pickup_time TIMESTAMPTZ,
  delivery_deadline TIMESTAMPTZ NOT NULL,
  driver_id BIGINT REFERENCES driver(id) ON DELETE SET NULL,
  truck_id BIGINT REFERENCES truck(id) ON DELETE SET NULL,
  customer_id BIGINT REFERENCES customer(id) ON DELETE SET NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'created',
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS cargo (
    id BIGSERIAL PRIMARY KEY,
    weight NUMERIC(13, 3),
    volume NUMERIC(13, 3),
    category VARCHAR(64) NOT NULL,
    description TEXT NOT NULL,
    delivery_id BIGINT NOT NULL REFERENCES delivery(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS transaction (
    id BIGSERIAL PRIMARY KEY,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(8) NOT NULL,
    description TEXT,
    category VARCHAR(64),
    type VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL DEFAULT 'completed',
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS delivery_transaction (
    delivery_id BIGINT NOT NULL REFERENCES delivery(id) ON UPDATE CASCADE ON DELETE CASCADE,
    transaction_id BIGINT NOT NULL REFERENCES transaction(id) ON DELETE CASCADE,
    CONSTRAINT delivery_transaction_pkey PRIMARY KEY (delivery_id, transaction_id)
);
