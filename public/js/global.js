
/* global ConversationPanel: true, PayloadPanel: true*/
/* eslint no-unused-vars: "off" */

// Other JS files required to be loaded first: apis.js, conversation.js, payload.js
(function() {
  // Initialize all modules
  // Note: ConversationPanel and PayloadPanel depend on Api,
  // so they will be initialized after Api.init completes
  ConversationPanel.init();
  PayloadPanel.init();
})();
