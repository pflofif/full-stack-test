-- Створюємо таблиці
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(id),
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price FLOAT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Задаємо початкові дані для тестів
INSERT INTO brands (name, country) VALUES ('Toyota', 'Japan'), ('Ford', 'USA');
INSERT INTO cars (brand_id, model, year, price) VALUES
(1, 'Corolla', 2020, 20000),
(2, 'Mustang', 2021, 35000);
