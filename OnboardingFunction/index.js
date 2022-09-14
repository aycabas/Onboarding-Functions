const graph = require('../Shared/graph');

module.exports = async function (context, eventHubMessages) {
    context.log(`JavaScript eventhub trigger function called for message array ${eventHubMessages}`);
    
    eventHubMessages.forEach(async (message, index) => {
        
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