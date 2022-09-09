# Onboarding Functions

This sample shows how to get new users in the Azure Active Directory and add them in Onboarding team on Microsoft Teams.

1. Create Azure Event Hubs and Key Vault to get Microsoft Graph Change Notifications delivered: [Get change notifications delivered in different ways](https://docs.microsoft.com/en-us/graph/change-notifications-delivery)

1. Create `local.settings.json` file in your code and add the following code snippet by updating the Event Hub connection string:
    ```json
    {
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "OnboardingEventHubs_Listen_EVENTHUB": "EventHub-Connection-String"
    },
    "watchDirectories": [ "Shared" ]
    }
    ```

1. Register an app to Azure Active Directory to handle authentication for the deamon app: [Optional: configure app-only authentication](https://docs.microsoft.com/en-us/graph/tutorials/javascript?tabs=aad&tutorial-step=7)
    > In the App permissions tab, add `User.Read.All` and `TeamMember.ReadWrite.All` permissions from Microsoft Graph Application Permissions. Grant admin consent for the permissions.

    > Update `Shared/appsettings.js` file in the code with the required AAD app settings.

1. Run the following commands in your CLI to install the dependencies:
    ```
    npm install @azure/identity @microsoft/microsoft-graph-client isomorphic-fetch readline-sync
    ```
1. Run your app by selecting **F5** or **Run and Debug** console.

## Code Structure

- **SubscriptionFunction:** Subscribing to  Microsoft Graph `users` change notifications, notifications will be delivered to Azure Event Hubs.
- **OnboardingFunction:** Receiving change notifications from Azure Event Hubs and using the user id to add the user in the Onboarding team.
- **Shared/graph.js:** Shared code that handles Microsoft Graph API calls for `/subscriptions` and `/teams/{team-id}/members`.
- **Shared/appSettings.js:** Includes the Azure Active Directory app registration settings.

