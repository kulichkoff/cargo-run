CREATE TABLE IF NOT EXISTS vehicles (
    id SERIAL PRIMARY KEY,
    plate_number VARCHAR(128) NOT NULL,
    make VARCHAR(128),
    model VARCHAR(128),
    vin VARCHAR(128),
    manufacture_year INT,
    created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
    updated_at TIMESTAMP DEFAULT current_timestamp NOT NULL
);
