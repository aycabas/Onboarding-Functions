require('isomorphic-fetch');
const graph = require('../Shared/graph');

module.exports = async function (context, myTimer) {
      
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   

    //triggering subscription function
    const subscription = await graph.postSubscriptionAsync();
    
    //Optional
    console.log(`Subscription: ${subscription.id}`);
    console.log(`  Resource: ${subscription.resource}`);
    console.log(`  ChangeType: ${subscription.changeType}`);
    console.log(`  NotificationUrl: ${subscription.notificationUrl}`);
    console.log(`  ExpirationDateTime: ${subscription.expirationDateTime}`);
    console.log(`  ClientState: ${subscription.clientState}`);
    console.log(`  LatestSupportedTlsVersion: ${subscription.latestSupportedTlsVersion}`);


};