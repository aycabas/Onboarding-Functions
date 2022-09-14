const expiry = require('./dateTimeFormat');
require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
let _clientSecretCredential = undefined;
let _appClient = undefined;
let _memberId = undefined;
function ensureGraphForAppOnlyAuth() {
  if (!_clientSecretCredential) {
    _clientSecretCredential = new azure.ClientSecretCredential(
      '<YOUR-AAD-APP-TENANT-ID>',
      '<YOUR-AAD-APP-CLIENT-ID>',
      '<YOUR-AAD-APP-CLIENT-SECRET>'
    );
  }

  if (!_appClient) {
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    _appClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
async function postSubscriptionAsync() {
    ensureGraphForAppOnlyAuth();
    
 
    if(!_expiry){
    _expiry = await expiry.getDateTimeAsync();
    }
    const subscription = {
        changeType: 'created, updated',
        notificationUrl: 'EventHub:https://onboarding-keyvault1.vault.azure.net/secrets/event-hub-conn?tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47',
        resource: 'users',
        expirationDateTime: _expiry,
        clientState: 'secretClientValue',
        };
    
    return _appClient?.api('/subscriptions')
        .post(subscription);
}


async function postTeamsMemberAsync(memberId) {
    ensureGraphForAppOnlyAuth();
    _memberId = memberId;
    const user = 'https://graph.microsoft.com/v1.0/users(\'' + _memberId +'\')';
    const conversationMember = {
        '@odata.type': '#microsoft.graph.aadUserConversationMember',
        roles: [],
        'user@odata.bind': user
    };
    
    return _appClient?.api('/teams/2e348d8a-774c-4c9d-a3a4-1fbeb9e2e81e/members')
        .post(conversationMember);
    
}
      
      module.exports.postSubscriptionAsync = postSubscriptionAsync;
      module.exports.postTeamsMemberAsync = postTeamsMemberAsync;