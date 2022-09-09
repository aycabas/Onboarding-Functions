const graph = require('../Shared/graph');
let jsonMessage = undefined;
module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
    
    eventHubMessages.forEach(async (message, index) => {
        // var body = JSON.stringify(message);
        var jsonMessage = JSON.parse(message);
        context.log(jsonMessage);

        for (let i in jsonMessage.value) {

            var resourceData = jsonMessage.value[i].resourceData;
    
            context.log(resourceData);
            const newMemberId = resourceData.id;
            await graph.postTeamsMemberAsync(newMemberId);
        }

    });

  
};