-- =======================
-- Initial Seed Data
-- =======================

-- Users
INSERT INTO users (name, email, password, isPaying) VALUES
('Alice', 'alice@example.com', 'password123', TRUE),
('Bob', 'bob@example.com', 'password123', FALSE),
('Charlie', 'charlie@example.com', 'password123', TRUE);

-- AI Wallets (linked to users)
INSERT INTO ai_wallets (user_id, balance, confidence, trade_percent, daily_trade_count, loss_count, max_limit) VALUES
(1, 1500.00, 0, 30, 0, 0, 10000.00),
(2, 1000.00, 0, 30, 0, 0, 10000.00),
(3, 1200.00, 0, 30, 0, 0, 10000.00);

-- Initial Trades (optional: empty for now)
-- INSERT INTO trades (user_id, trade_amount, trade_percent, result, mode) VALUES
-- (1, 30.00, 3, 1.50, 'dummy');

-- Storehouse
INSERT INTO storehouse (balance) VALUES (0.00);