# AI Logic and Trading System

This document explains the AI trading system and internal logic used in PulsePlay.

## AI Wallets
- Each user has an AI wallet (`aiWallets`) that stores:
  - `balance`: current AI wallet funds
  - `confidence`: last trade amount used to determine future trades
  - `tradePercent`: % of wallet to use per trade
  - `dailyTradeCount`: number of trades executed per day
  - `lossCount`: number of consecutive losses

## Trade Execution
- Trades can run in `dummy` or `live` mode:
  - **Dummy Mode:** for testing; uses base win rate 42%, smaller multipliers.
  - **Live Mode:** real trading; base win rate 56%, smaller losses, minimal crash chance.
- Trade result formula:
  - `result = tradeAmount * multiplier`
  - Multiplier varies depending on win/loss and mode.

## Confidence Mechanism
- If AI wins, it may increase `tradePercent`.
- If AI loses consecutively (≥2), `tradePercent` resets to 3%.

## Daily Limits
- Each AI wallet tracks `dailyTradeCount`.
- Owner can set daily trade limit (3–7 trades).

## News Analysis Integration
- Each trade can consider market news via `analyzeNews()` for retraining.

## Storehouse Overflow
- If AI balance exceeds max wallet limit, excess goes to `storehouse.balance`.

---