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

var app = require('../app');
var bodyParser = require('body-parser');
var request = require('supertest');

app.use(bodyParser.json());

describe('Basic API tests', function() {
  it('GET to / should load the home page', function(done) {
    request(app).get('/').expect(200, done);
  });

//  it('POST to /api/message should return error message', function(done) {
//    request(app)
//      .post('/api/message')
//      .set('Accept', /application\/json/)
//      .expect('Content-Type', /application\/json/)
//      .send({'input': {'text': 'Turn on the radio'}})
//      .expect(function(res) {
//        if (!res.body) throw new Error('Body was not present in response');
//        console.log(res.body);
//        if (!res.body.output) throw new Error('\'Output\' was not present in response');
//        if (!res.body.output.text) throw new Error('\'text\' was not present in response');
//      })
//      .expect(200, done);
//  });
});
