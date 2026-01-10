// backend/src/store/store.service.js
let storeItems = [
  { id:1, name:'Item A', price:50 },
  { id:2, name:'Item B', price:30 }
];

let ads = [
  { id:1, content:'Ad 1', active:true },
  { id:2, content:'Ad 2', active:true }
];

exports.getStoreItems = async (userId) => storeItems;

exports.getAds = async (userId) => ads.filter(ad => ad.active);

exports.buyItem = async (userId, itemId) => {
  const item = storeItems.find(i => i.id === itemId);
  // Payment logic here (simulate)
  return { success:true, item };
};

exports.rotateAds = () => {
  ads.forEach(ad => {
    if(!ad.payingUser) ad.active=false; // disable unpaid ads
  });
};