/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests
var Conversation = require('watson-developer-cloud/conversation/v1'); // watson sdk
const cfenv = require('cfenv');
var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());

const appEnv = cfenv.getAppEnv();

// Create the service wrapper
var conversation = new Conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
   username: '2f1e384e-be57-4b4b-9f31-d5b55e0e5930',
   password: 'SIuetsggVw6L',
   url: 'https://gateway.watsonplatform.net/conversation/api',
  version_date: Conversation.VERSION_DATE_2017_04_21
});


//This code is called only when subscribing the webhook //
app.get('/webhook/gaurav12345', function (req, res) {
    if (req.query['hub.verify_token'] === 'i_am_gaurav_and_am_from_cnx') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
})

// Endpoint to be call from the client side
app.post('/api/message', function(req, res) {
  var workspace = '6b5efbae-127e-4b3b-84aa-80af827e1909';//process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  // Send the input to the conversation service
  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});


//This function receives the response text and sends it back to the user //
function sendMessage(sender,text) {
    messageData = {
        text: text
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData,
        }
    }, function (error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

var token = "EAATmuKTrQzwBAB4FFM0w1QWUMxNmht7KHAyzaD5AlQ8MJ3ebzUwxBFacZBI2lJIixxCze1STw0v4GOpb2jpjKa1FhZApdMH7Dkq6BZCFVFC5vaPrCFvPQncI3Kw3tmZCCHRXOxOZBkq7NbL5Wxr4mdK2S0ZB8UuAiboul86s0zjoXM0detqZBNq";
var host = ('https://watsontestapp.eu-gb.mybluemix.net/' || 'localhost');
var port = (appEnv.port || 3000);
app.listen(port, host);
