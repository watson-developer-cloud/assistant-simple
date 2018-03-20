# Watson Assistant (formerly Conversation) Sample Application [![Build Status](https://travis-ci.org/watson-developer-cloud/assistant-simple.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/assistant-simple) [![codecov.io](https://codecov.io/github/watson-developer-cloud/assistant-simple/coverage.svg?branch=master)](https://codecov.io/github/watson-developer-cloud/assistant-simple?branch=master)

This Node.js app demonstrates the Watson Assistant service in a simple chat interface simulating a cognitive car dashboard.

![Demo](readme_images/demo.gif)

You can view a [demo][demo_url] of this app.

## Before you begin

* Create an IBM Cloud account
    * [Sign up](https://console.ng.bluemix.net/registration/?target=/catalog/%3fcategory=watson) in IBM Cloud, or use an existing account. Your account must have available space for at least 1 app and 1 service.
* Make sure that you have the following prerequisites installed:
    * The [Node.js](https://nodejs.org/#download) runtime, including the [npm][npm_link] package manager
    * The [Cloud Foundry][cloud_foundry] command-line client

      Note: Ensure that you Cloud Foundry version is up to date

## Installing locally

If you want to modify the app or use it as a basis for building your own app, install it locally. You can then deploy your modified version of the app to IBM Cloud.

### Getting the files

Use GitHub to clone the repository locally, or [download the .zip file](https://github.com/watson-developer-cloud/conversation-simple/archive/master.zip) of the repository and extract the files.

### Setting up the Watson Assistant service

You can use an exisiting instance of the Watson Assistant service. Otherwise, follow these steps.

1. At the command line, go to the local project directory (`conversation-simple`).

1. Connect to IBM Cloud with the Cloud Foundry command-line tool. For more information, see the Watson Developer Cloud [documentation][cf_docs].
    ```bash
    cf login
    ```

1. Create an instance of the Watson Assistant service in IBM Cloud (our CLI is being updated, for now, use the `create-service` conversation command). For example:

    ```bash
    cf create-service conversation free my-watson-assistant-service
    ```

### Importing the Watson Assistant workspace

1. In your browser, navigate to [your IBM Cloud console] (https://console.ng.bluemix.net/dashboard/services).

1. From the **All Items** tab, click the newly created Watson Assistant service in the **Services** list.

    ![Screen capture of Services list](readme_images/conversation_service.png)

1. On the Service Details page, click **Launch tool**.

1. Click the **Import workspace** icon in the Watson Assistant service tool. Specify the location of the workspace JSON file in your local copy of the app project:

    `<project_root>/training/car_workspace.json`

1. Select **Everything (Intents, Entities, and Dialog)** and then click **Import**. The car dashboard workspace is created.

### Configuring the app environment

1. Copy or rename the `.env.example` file to `.env` (nothing before the dot).

1. Create a service key in the format `cf create-service-key <service_instance> <service_key>`. For example:

    ```bash
    cf create-service-key my-watson-assistant-service myKey
    ```

1. Retrieve the credentials from the service key using the command `cf service-key <service_instance> <service_key>`. For example:

    ```bash
    cf service-key my-watson-assistant-service myKey
    ```

   The output from this command is a JSON object, as in this example:

    ```JSON
    {
      "password": "87iT7aqpvU7l",
      "url": "https://gateway.watsonplatform.net/conversation/api",
      "username": "ca2905e6-7b5d-4408-9192-e4d54d83e604"
    }
    ```

1. Paste  the `password` and `username` values (without quotation marks) from the JSON into the `ASSISTANT_PASSWORD` and `ASSISTANT_USERNAME` variables in the `.env` file. For example:

    ```
    ASSISTANT_USERNAME=ca2905e6-7b5d-4408-9192-e4d54d83e604
    ASSISTANT_PASSWORD=87iT7aqpvU7l
    ```

1. In your IBM Cloud console, open the Watson Assistant service instance where you imported the workspace.

1. Click the menu icon in the upper-right corner of the workspace tile, and then select **View details**.

    ![Screen capture of workspace tile menu](readme_images/workspace_details.png)

1. Click the ![Copy](readme_images/copy_icon.png) icon to copy the workspace ID to the clipboard.

1. On the local system, paste the workspace ID into the WORKSPACE_ID variable in the `.env` file. Save and close the file.

### Installing and starting the app

1. Install the demo app package into the local Node.js runtime environment:

    ```bash
    npm install
    ```

1. Start the app:

    ```bash
    npm start
    ```

1. Point your browser to http://localhost:3000 to try out the app.

## Testing the app

After your app is installed and running, experiment with it to see how it responds.

The chat interface is on the left, and the JSON that the JavaScript code receives from the Watson Assistant service is on the right. Your questions and commands are interpreted using a small set of sample data trained with the following intents:

    turn_on
    turn_off
    turn_up
    turn_down
    traffic_update
    locate_amenity
    weather
    phone
    capabilities
    greetings
    goodbyes

Type a request, such as `music on` or `I want to turn on the windshield wipers`. The system understands your intent and responds. You can see the details of how your input was understood by examining the JSON data in the `Watson understands` section on the right side.

For example, if you type `Turn on some music`, the JSON data shows that the system understood the `turn_on` intent with a high level of confidence, along with the `appliance` entity with a value of `music`.

For more information about intents, see the [Watson Assistant service documentation][doc_intents].

To see details of how these intents are defined, including sample input for each intent, launch the Watson Assistant tool.

## Modifying the app

After you have the app deployed and running, you can explore the source files and make changes. Try the following:

* Modify the .js files to change the app logic.
* Modify the .html file to change the appearance of the app page.
* Use the Watson Assistant tool to train the service for new intents, or to modify the dialog flow. For more information, see the [Watson Assistant service documentation][docs_landing].

## Deploying to IBM Cloud

You can use Cloud Foundry to deploy your local version of the app to IBM Cloud.

1. In the project root directory, open the `manifest.yml` file:

  * In the `applications` section of the `manifest.yml` file, change the `name` value to a unique name for your version of the demo app.
  * In the `services` section, specify the name of the Watson Assistant service instance you created for the demo app. If you do not remember the service name, use the `cf services` command to list all services you have created.

  The following example shows a modified `manifest.yml` file:

  ```yml
  ---
  declared-services:
   my-watson-assistant-service:
     label: conversation
     plan: free
  applications:
  - name: conversation-simple-app-test1
   command: npm start
   path: .
   memory: 256M
   instances: 1
   services:
   - my-watson-assistant-service
   env:
     NPM_CONFIG_PRODUCTION: false
  ```

1. Push the app to IBM Cloud:

  ```bash
  cf push
  ```
  Access your app on IBM Cloud at the URL specified in the command output.

## Troubleshooting

If you encounter a problem, you can check the logs for more information. To see the logs, run the `cf logs` command:

```none
cf logs <application-name> --recent
```

## License

This sample code is licensed under Apache 2.0.
Full license text is available in [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md).

## Open Source @ IBM

Find more open source projects on the
[IBM Github Page](http://ibm.github.io/).


[cf_docs]: (https://console.bluemix.net/docs/services/watson/getting-started-cf.html)
[cloud_foundry]: https://github.com/cloudfoundry/cli#downloads
[demo_url]: http://conversation-simple.ng.bluemix.net/
[doc_intents]: (https://console.bluemix.net/docs/services/conversation/intents-entities.html#planning-your-entities)
[docs]: https://console.bluemix.net/docs/services/conversation/index.html
[docs_landing]: (https://console.bluemix.net/docs/services/conversation/index.html)
[node_link]: (http://nodejs.org/)
[npm_link]: (https://www.npmjs.com/)
[sign_up]: bluemix.net/registration
