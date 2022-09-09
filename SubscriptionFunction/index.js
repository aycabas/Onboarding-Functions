require('isomorphic-fetch');
const graph = require('../Shared/graph');

module.exports = async function (context, myTimer) {
      
    var timeStamp = new Date().toISOString();
    
    if (myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    context.log('JavaScript timer trigger function ran!', timeStamp);   

    // Get users
    // const userPage = await auth.getUsersAsync();
    // const users = userPage.value;
    // for (const user of users) {
    //     console.log(`User: ${user.displayName ?? 'NO NAME'}`);
    //     console.log(`  ID: ${user.id}`);
    //     console.log(`  Email: ${user.mail ?? 'NO EMAIL'}`);
    //   }

    
    const subscription = await graph.postSubscriptionAsync();
    console.log(`Subscription: ${subscription.id}`);
    console.log(`  Resource: ${subscription.resource}`);
    console.log(`  ChangeType: ${subscription.changeType}`);
    console.log(`  NotificationUrl: ${subscription.notificationUrl}`);
    console.log(`  ExpirationDateTime: ${subscription.expirationDateTime}`);
    console.log(`  ClientState: ${subscription.clientState}`);
    console.log(`  LatestSupportedTlsVersion: ${subscription.latestSupportedTlsVersion}`);


};