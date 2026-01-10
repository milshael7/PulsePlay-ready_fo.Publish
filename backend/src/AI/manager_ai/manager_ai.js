function getManagerInsights(userId){
  return { trustScore:95, engagement:80 };
}

function getAdminInsights(){
  return { revenue:10000, walletStatus:"OK", securityAlerts:0 };
}

module.exports = { getManagerInsights, getAdminInsights };