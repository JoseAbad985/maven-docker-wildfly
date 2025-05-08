-- Create products table
CREATE TABLE IF NOT EXISTS products (
                                        id SERIAL PRIMARY KEY,
                                        name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL
    );

-- Insert some initial data
INSERT INTO products (name, description, price) VALUES
                                                    ('Laptop', 'High-performance laptop', 1299.99),
                                                    ('Smartphone', 'Latest model smartphone', 899.99),
                                                    ('Tablet', 'Large screen tablet', 499.99),
                                                    ('Headphones', 'Noise-cancelling headphones', 199.99),
                                                    ('Monitor', '4K ultra-wide monitor', 349.99);