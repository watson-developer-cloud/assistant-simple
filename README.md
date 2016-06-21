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

To see all the intents, open [`/training/car_intents.csv`](https://raw.githubusercontent.com/watson-developer-cloud/conversation-simple/master/training/car_intents.csv).

These intents help the system to understand variations of questions and commands that you might submit.
For example, if you say *"Wipers on"* or *"I want to turn on the windshield wipers"*, the system
understands that in both cases your intent is the same and responds accordingly.

## Getting Started
If you used the **Deploy to Bluemix** button, skip this section and go to **Creating a workspace**.  

1. Create a Bluemix account.

  [Sign up][sign_up] in Bluemix, or use an existing account. Watson beta or experimental services are free to use.

2. Download and install the [Cloud-foundry CLI][cloud_foundry] tool.

3. Edit the `manifest.yml` file, and change the `<application-name>` to something unique.
  ```none
  applications:git 
  - services:
    - conversation-service
    name: <application-name>
    command: npm start
    path: .
    memory: 256M
  ```

  The name you use determinates your application URL initially, such as `<application-name>.mybluemix.net`.

4. Connect to Bluemix in the command-line tool:
  For US Region
  ```sh
  $ cf api https://api.ng.bluemix.net
  ```

  ```sh
  $ cf login -u <your user ID>
  ```

5. Create the [Conversation][service_url] service in Bluemix:

  ```sh
  $ cf create-service conversation experimental conversation-service
  ```

6. Push it live:

  ```sh
  $ cf push
  ```  
  
## Creating a workspace
After the service is provisioned, you need to create a workspace.

1. Navigate to the service instance tile in Bluemix, and click **Manage** in the menu.
2. Click the **Launch Tooling** button in the documentation. A new tab opens in your browser, and a log-in prompt is displayed, if you are not logged in.
3. Log in with your Bluemix credentials.  
4. Click **Create a Workspace**, and then click **Create**.
5. Specify a name for the workspace and, optionally, a description, and click **Create**. A new workspace tile is created in the tooling.
6. Click _menu_ in the workspace tile, and select **View details**: ![Workpsace Details](readme_images/workspace_details.png "Workspace Details Menu")
7. In the Details window, copy the 36-character UNID in the **ID** field (for example, 84a74a20-1390-4540-ce8a-eabac5fdf921). This value is the workspace ID.
8. Open the workspace by clicking **Get started** in the workspace tile. The Intents page is displayed. You can either create your own itents by following the displayed instructions or upload the intents that are used in this application. To upload the predefined intents from here, click the **Import intents** button: ![Import intents button](readme_images/import_intents.png "Import intents"). After you import the intents or create your own, the service takes a few moments to train itself.
9. Return to your application in your local dev environment or on Bluemix. If the application is running on Bluemix, you must create a new environment variable called **WORKSPACE_ID**. Paste the value of the workspace ID that you copied in Step 7 as the value of the new variable.
10. Restart your application. If you are running the application locally, skip to the next section.  

For information on workspaces, see the full  [Conversation service  documentation](https://www.ibm.com/smarterplanet/us/en/ibmwatson/developercloud/doc/conversation/overview.shtml).

## Running the application locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/).

1. Copy the credentials from your `conversation-service` service in Bluemix to a `.env` file in the root.
2. Use the Conversation tooling app to create a workspace, as described above, and add the workspace ID environment variable to the `.env` file. For details about obtaining the workspace ID, see Step 6 - 7 in the previous section.
3. Install [Node.js](http://nodejs.org/).
4. Open the terminal, go to the project folder, and run this command:
    ```
    npm install
    ```
5. Start the application by running this command:
    ```
    npm start
    ```
6. Open `http://localhost:3000` in a browser.

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
