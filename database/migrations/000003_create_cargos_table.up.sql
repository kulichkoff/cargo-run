CREATE TABLE cargos (
  id               SERIAL PRIMARY KEY,
  address_sequence TEXT[] NOT NULL,
  employee_id      INT NOT NULL REFERENCES employees(id),
  vehicle_id       INT NOT NULL REFERENCES vehicles(id),
  start_date       TIMESTAMP NOT NULL,
  deadline_date    TIMESTAMP NOT NULL,
  price            NUMERIC(12, 2) NOT NULL,
  payment_status   INT NOT NULL,

  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL
);
