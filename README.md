# Conversation Car Simple
[![Build Status](https://travis-ci.org/watson-developer-cloud/conversation-car-simple.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/conversation-car-simple)
[![codecov.io](https://codecov.io/github/watson-developer-cloud/conversation-car-simple/coverage.svg?branch=master)](https://codecov.io/github/watson-developer-cloud/conversation-car-simple?branch=master)


This application demonstrates how the Conversation service uses intent capabilities in a simple chat interface.

[See the demo](http://conversation-simple-node-app-doc.mybluemix.net/).

Give it a try! Click the button below to fork into IBM DevOps Services and deploy your own copy of this application on Bluemix.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/watson-developer-cloud/conversation-car-simple)

## How the app works
The app interface is designed and trained for chatting with a cognitive car. The chat interface is on the left, and the
JSON that the JavaScript code receives from the server is on the right. Your questions and commands are run against a
small set of sample data trained with intents like these:

* `power_on`
* `traffic_info`
* `amenities`

To see all the intents, open `/training/car_intents.csv`.

These intents help the system to understand variations of questions and commands that you might submit.
For example, if you say "Wipers on" or "I want to turn on the windshield wipers," the system
understands that in both cases your intent is the same and responds accordingly.

## Getting Started

1. Create a Bluemix Account

  [Sign up][sign_up] in Bluemix, or use an existing account. Watson Beta or Experimental Services are free to use.

2. Download and install the [Cloud-foundry CLI][cloud_foundry] tool

3. Edit the `manifest.yml` file and change the `<application-name>` to something unique.
  ```none
  applications:
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

See the full [Getting Started][getting_started] documentation for more details, including code snippets and references.

## Running locally

  The application uses [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.com/).

1. Copy the credentials from your `conversation-service` service in Bluemix to a `.env` file in the root.
1. Use the Conversation tooling app to create a workspace and add the id to the `.env` file.
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