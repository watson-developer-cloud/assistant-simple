
/* global ConversationPanel: true, PayloadPanel: true*/
/* eslint no-unused-vars: "off" */

// Other JS files required to be loaded first: apis.js, conversation.js, payload.js
(function() {
  // Initialize all modules
  ConversationPanel.init();
  PayloadPanel.init();

  // Test XMLHttpRequest for GET, POST
  const http = function(name, method, url) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200)
        console.log(name + ": " + req.responseText);
    };
    req.open(method, url);
    req.send();
  }
  
  http("/api/message2", "GET", "/api/message2");
  http("/api/message3", "POST", "/api/message3");
})();
