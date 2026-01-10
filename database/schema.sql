-- =======================
-- PulsePlay Database Schema
-- =======================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    isPaying BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI Wallets table
CREATE TABLE IF NOT EXISTS ai_wallets (
    user_id INT PRIMARY KEY REFERENCES users(id),
    balance DECIMAL(12,2) DEFAULT 1000.00,
    confidence DECIMAL(12,2) DEFAULT 0,
    trade_percent INT DEFAULT 30,
    daily_trade_count INT DEFAULT 0,
    loss_count INT DEFAULT 0,
    max_limit DECIMAL(12,2) DEFAULT 10000.00
);

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    trade_amount DECIMAL(12,2) NOT NULL,
    trade_percent INT NOT NULL,
    result DECIMAL(12,2) NOT NULL,
    mode VARCHAR(10) DEFAULT 'dummy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Storehouse table
CREATE TABLE IF NOT EXISTS storehouse (
    id SERIAL PRIMARY KEY,
    balance DECIMAL(15,2) DEFAULT 0
);