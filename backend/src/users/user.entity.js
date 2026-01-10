const User = require('./user.entity');

function createUser(email, password, referral = null, role = "User") {
  if (users.find(u => u.email === email)) {
    return { success: false, message: "User already exists" };
  }

  const newUser = new User({ email, password, role });
  
  // Add wallet and storehouse properties
  newUser.aiWallet = {
    balance: 1000,
    maxCap: 10000,
    allowedPercents: [3,5,10,15,20,25,30,35,40,45,50],
    activePercent: 30
  };

  newUser.storehouse = {
    balance: 50000,
    minimumReserve: 10000
  };

  users.push(newUser);
  return { success: true, user: newUser };
}