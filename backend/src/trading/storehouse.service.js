let MIN_STOREHOUSE_BALANCE = 5000; // storehouse must keep minimum
let MAX_AI_WALLET = 50000; // max AI wallet funding

function fundAIWallet(userId){
  const ai = aiWallets[userId];
  if(ai.balance <= 0 && storehouse.balance - MIN_STOREHOUSE_BALANCE >= 1000){
    ai.balance += 1000;
    storehouse.balance -= 1000;
    console.log(`AI wallet funded $1000. New AI balance: $${ai.balance}`);
  } else {
    console.log('Not enough storehouse balance to fund AI wallet.');
  }
}

function depositExcessToStorehouse(userId){
  const ai = aiWallets[userId];
  if(ai.balance > ai.maxCap){
    const excess = ai.balance - ai.maxCap;
    ai.balance = ai.maxCap;
    storehouse.balance += excess;
    console.log(`Excess $${excess} deposited to storehouse. AI wallet: $${ai.balance}`);
  }
}

function getStorehouseBalance(){
  return storehouse.balance;
}

module.exports = { fundAIWallet, depositExcessToStorehouse, getStorehouseBalance };