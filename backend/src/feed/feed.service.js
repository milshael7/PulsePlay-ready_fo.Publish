const { rotateAds } = require('./ad.service');

// Feed logic per blueprint
// Priority: 1. Network 2. Live 3. Random global

function generateFeed(user){
    const feed = [];

    // 1. Add network content
    user.network.forEach(u => {
        feed.push(...u.recentPosts);
    });

    // 2. Add live network
    user.network.filter(u => u.isLive).forEach(u => {
        feed.push(...u.liveFeed);
    });

    // 3. Random global content
    const randomGlobal = getRandomGlobalPosts();
    feed.push(...randomGlobal);

    // Add rotating ads
    const ad = rotateAds(user.id);
    if(ad) feed.push({ type: 'ad', content: ad });

    return feed;
}

function getRandomGlobalPosts(){
    // Placeholder logic
    return [
        { id: 'global1', type: 'post', content: 'Global Post 1'},
        { id: 'global2', type: 'post', content: 'Global Post 2'}
    ];
}

module.exports = { generateFeed };