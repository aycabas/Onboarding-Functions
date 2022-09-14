# Onboarding Functions

This sample shows how to get new users in the Azure Active Directory and add them in Onboarding team on Microsoft Teams.

![Solution architecture](/images/architecture-functions.png)

## Pre-requisites
- [Microsoft 365 Developer Program account](https://aka.ms/m365developers)
- [Microsoft Azure Subscription](https://azure.microsoft.com/en-us/free/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Functions Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure Storage Emulator](https://go.microsoft.com/fwlink/?linkid=717179&clcid=0x409)

## Run the project
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

    > Update `Shared/graph.js` file in the code with the required AAD app settings.

1. Run the following commands in your CLI to install the dependencies:
    ```
    npm install @azure/identity @microsoft/microsoft-graph-client isomorphic-fetch readline-sync
    ```
1. Open the terminal in Visual Studio Code and run your functions with the following command:
    ```
    func host start
    ```
    >Make sure that Microsoft Azure Storage Emulator is running in the background.

## Debug your project
To debug the onboarding functions, you need run the functions locally and create a new user in Azure Active Directory to see if the new user is added automatically in Microsoft Teams Onboarding team.

1. Open the terminal in Visual Studio Code and run your functions with the following command:
    ```
    func host start
    ```
    >Make sure that Microsoft Azure Storage Emulator is running in the background.

1. Go to [Azure Portal](https://portal.azure.com) and select Azure Active Directory from the left pane and go to **Users**. Select **+ New user** and **Create new user**. Fill in the details.

1. Once the *OnboardingFunction* triggered successfully, you should be able to see the newly added user as a member of the Onboarding team on Microsoft Teams.
![new member in Onboarding team on Microsoft Teams](/images/new-member-onboarding.png)

## Code Structure

- **SubscriptionFunction:** Subscribing to  Microsoft Graph `users` change notifications, notifications will be delivered to Azure Event Hubs.
- **OnboardingFunction:** Receiving change notifications from Azure Event Hubs and using the user id to add the user in the Onboarding team.
- **Shared/graph.js:** Shared code that handles Microsoft Graph API calls for `/subscriptions` and `/teams/{team-id}/members`.
