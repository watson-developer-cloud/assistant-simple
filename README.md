# Conversation Simple
[![Build Status](https://travis-ci.org/watson-developer-cloud/conversation-simple.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/conversation-simple)
[![codecov.io](https://codecov.io/github/watson-developer-cloud/conversation-simple/coverage.svg?branch=master)](https://codecov.io/github/watson-developer-cloud/conversation-simple?branch=master)


This application demonstrates how the Conversation service uses intent capabilities in a simple chat interface.

[See the demo](http://conversation-simple-node-app-doc.mybluemix.net/).

Give it a try! Click the button below to fork into IBM DevOps Services and deploy your own copy of this application on Bluemix.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/conversation-simple)

## How the app works
The app interface is designed and trained for chatting with a cognitive car. The chat interface is on the left, and the
JSON that the JavaScript code receives from the server is on the right. Your questions and commands are run against a
small set of sample data trained with intents like these:

* `turn_on`
* `weather`
* `capabilities`

To see all the intents, open [`/training/car_intents.csv`](training/car_intents.csv).

These intents help the system to understand variations of questions and commands that you might submit.
For example, if you say *"Wipers on"* or *"I want to turn on the windshield wipers"*, the system
understands that in both cases your intent is the same and responds accordingly.

## Getting Started
If you have used the Deploy to Bluemix button above, skip to **Creating a Workspace** below.  

1. Create a Bluemix Account

  [Sign up][sign_up] in Bluemix, or use an existing account. Watson Beta or Experimental Services are free to use.

2. Download and install the [Cloud-foundry CLI][cloud_foundry] tool

3. Edit the `manifest.yml` file and change the `<application-name>` to something unique.
  ```none
  applications:git 
  - services:
    - conversation-service
    name: <application-name>
    command: npm start
    path: .
    memory: 256M
  ```

  The name you use will determinate your application url initially, e.g. `<application-name>.mybluemix.net`.

4. Connect to Bluemix in the command line tool
  For US Region
  ```sh
  $ cf api https://api.ng.bluemix.net
  ```

  ```sh
  $ cf login -u <your user ID>
  ```

5. Create the [Conversation][service_url] Service in Bluemix

  ```sh
  $ cf create-service conversation experimental conversation-service
  ```

6. Push it live!

  ```sh
  $ cf push
  ```  
  
## Creating a Workspace  
1. Once the service has been provisioned, you will need to create a workspace. To do that navigate to the service instance tile within 
Bluemix. Once there click on the **Manage** menu item. Click on the **Launch Tooling** button within the documentation at which point a new
tab will open in your browser, and you will be prompted to login if you have not done so before. Log in with your Bluemix credentials.  

2. Once logged in you should be able to **Create a Workspace**. Press the **Create** button and give the workspace a name (and optional 
description). Press **Create** to finish creating the workspace.  

3. A new workspace tile will be created within the tooling. Press on the _menu_ button within the workspace tile, and select **View details**: 
![Workpsace Details](readme_images/workspace_details.png "Workspace Details Menu")  
In the Details UI copy the 36 character UNID **ID** field (e.g. 84a74a20-1390-4540-ce8a-eabac5fdf921). This is the **Workspace ID**.  

4. Open the workspace by pressing the **Get started** button within the workspace tile. You will be navigated to the Intents screen.
At this point you can either create your own itents by following the instructions on screen, or upload the intents used in this application. 
To upload the predefined intents from here simply press the **Import intents** button 
![Import intents button](readme_images/import_intents.png "Import intents").
Once you imported the intents or created your own the service will take a few moments to train the service.  

5. Return to your application, either in your local dev environment, or on Bluemix. If running on Bluemix you will need to create a new 
Environment Variable called **WORKSPACE_ID**. Paste in the value of the Workspace id (obtained in step 3 above) as the value of the new variable.
Restart your application. If running your application locally, skip to the next section.  

For information on workspaces, see the full  [Conversation service  documentation](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/conversation/overview.shtml).

## Running locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/).

1. Copy the credentials from your `conversation-service` service in Bluemix to a `.env` file in the root.
1. Use the Conversation tooling app to create a workspace, as described above, and add the workspace id to the `.env` file 
(see above for details on obtaining the **Workspace ID**).
1. Install [Node.js](http://nodejs.org/)
1. Go to the project folder in a terminal and run:
    ```
    npm install
    ```
1. Start the application
    ```
    npm start
    ```
6. Go to http://localhost:3000

## Troubleshooting

To troubleshoot your Bluemix application, use the logs. To see the logs, run:

  ```sh
  $ cf logs <application-name> --recent
  ```

## License

  This sample code is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).

[service_url]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/conversation.html
[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: http://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/getting_started/
[sign_up]: https://console.ng.bluemix.net/registration/
