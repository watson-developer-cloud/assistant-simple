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
/* eslint no-undef: 0 */

casper.test.begin('Watson Assistant simple Demo', 5, function suite(test) {
  var baseHost = 'http://localhost:3000';

  function testWelcomeMessageExists() {
    casper.waitForSelector('.from-watson', function () {
      test.assertExists('.message-inner', 'Welcome message received');
    });
  }

  function testEnterMessageClick() {
    casper.then(function () {
      this.sendKeys('#textInput', 'I want to make a credit card payment');
      this.sendKeys('#textInput', casper.page.event.key.Enter);
    });
    casper.waitForSelector('.from-user', function () {
      test.assertExists('.message-inner', 'Message sent');
      test.assertTextExists('I want to make a credit card payment', 'Message in bubble');
      casper.waitForText('I can help you with credit card payments');
    });
  }

  casper.start(baseHost, function () {
    casper.test.comment('Starting Testing');
    test.assertHttpStatus(200, 'assistant-simple is up');
    test.assertTitle('Watson Assistant Chat App', 'Title is correct');

    testWelcomeMessageExists();
    testEnterMessageClick();
  });

  casper.run(function () {
    test.done();
  });
});
