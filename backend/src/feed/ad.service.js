// AI rotates ads every 30 seconds or less
// Removes non-paying ads automatically

let activeAds = []; // List of current ads
let paidAds = [];   // Ads from paying clients

function addAd(ad){
    if(ad.paid){
        paidAds.push(ad);
    } else {
        console.log("Non-paying ad ignored from rotation.");
    }
    activeAds = [...paidAds];
}

function rotateAds(userId){
    if(activeAds.length === 0) return null;

    // Rotate ad randomly
    const index = Math.floor(Math.random() * activeAds.length);
    const ad = activeAds[index];
    console.log(`Displaying ad ${ad.id} to user ${userId}`);
    return ad;
}

// Rotate ads every 30s
setInterval(() => {
    // Normally you'd update feed per user session
    // For simplicity: log rotation
    rotateAds("all users");
}, 30000);

module.exports = { addAd, rotateAds };