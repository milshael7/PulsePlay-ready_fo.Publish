# AI Training System (PausePlay)

This folder contains the training logic for the PausePlay AI system.
The AI is designed to learn continuously and safely before interacting
with real financial activity.

---

## Core Philosophy

- **Dummy mode is harder than real trading**
- AI is trained against worst-case market scenarios
- Failure is intentional during training
- Real trading becomes easier once deployed

---

## Folder Overview

### dummy_mode.js
Simulates extreme market conditions and user behavior.

- High volatility
- Fake breakouts
- Emotional traps
- Sudden liquidity loss
- Risk escalation

Purpose:
Train AI to survive **the hardest possible scenarios** before real money is involved.

---

### news_analysis.js
Processes news and sentiment without emotional bias.

- Filters hype
- Detects manipulation patterns
- Identifies long-term vs short-term signals

Purpose:
Prevent reactionary or emotional trading decisions.

---

### retraining.js
Combines dummy training and news analysis.

- Updates AI behavior logs
- Refines decision weighting
- Adjusts confidence thresholds

Purpose:
Continuous improvement over time.

---

## Learning Timeline

### Short Term (0–6 months)
- Rule-based learning
- Pattern recognition
- Failure logging

### Mid Term (6–18 months)
- Strategy refinement
- Bias correction
- Risk calibration

### Long Term (2–4 years)
- Autonomous strategy weighting
- Market cycle awareness
- Multi-market adaptability

---

## Important Notes

- Training runs silently in the background
- No user interaction occurs here
- No financial actions are executed
- Output is **insight**, not execution

---

## Status

- Training logic: ✅ Implemented
- Extreme dummy scenarios: ✅ Implemented
- Live trading integration: ⏳ Planned
- User-facing AI responses: ⏳ Separate module

---

This system is intentionally strict.
If the AI survives dummy mode, it can survive the real market.