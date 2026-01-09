-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGSERIAL PRIMARY KEY,
    plate_number VARCHAR(128) NOT NULL UNIQUE,
    make VARCHAR(128),
    model VARCHAR(128),
    vin VARCHAR(128) UNIQUE,
    manufacture_year INT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Cargos table
CREATE TABLE cargos (
  id               BIGSERIAL PRIMARY KEY,
  address_sequence TEXT[] NOT NULL,
  employee_id      BIGINT NOT NULL REFERENCES employees(id) ON DELETE RESTRICT,
  vehicle_id       BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
  start_date       TIMESTAMPTZ NOT NULL,
  deadline_date    TIMESTAMPTZ NOT NULL,
  price            NUMERIC(12, 2) NOT NULL,

  -- Payment status is an enum with following values
  -- Canceled = -10
  -- Failed = -1
  -- Pending = 0
  -- Paid = 10
  payment_status   INT NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
