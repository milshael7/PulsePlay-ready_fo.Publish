// backend/src/manager/manager.controller.js
const usersService = require('../users/users.service');

exports.viewAnalytics = async () => {
  return usersService.users.map(u => ({ id:u.id, role:u.role, aiWallet:u.aiWallet }));
};