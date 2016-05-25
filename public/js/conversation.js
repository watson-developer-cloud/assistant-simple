// The ConversationPanel module is designed to handle
// all display and behaviors of the conversation column of the app.
/* eslint no-unused-vars: "off" */
/* global Api: true, Common: true*/

var ConversationPanel = (function() {
  var settings = {
    selectors: {
      chatBox: '#scrollingChat',
      fromUser: '.from-user',
      fromWatson: '.from-watson',
      latest: '.latest'
    },
    authorTypes: {
      user: 'user',
      watson: 'watson'
    }
  };

  // Publicly accessible methods defined
  return {
    init: init,
    inputKeyDown: inputKeyDown
  };

  // Initialize the module
  function init() {
    chatUpdateSetup();
    // The client displays the initial message to the end user
    displayMessage(
      {output:
        {text: 'This Watson app shows how intents work. Try testing some below, using the examples in the app description.'}
      },
      settings.authorTypes.watson);
    setupInputBox();
  }

  // Set up callbacks on payload setters in Api module
  // This causes the displayMessage function to be called when messages are sent / received
  function chatUpdateSetup() {
    var currentRequestPayloadSetter = Api.setRequestPayload;
    Api.setRequestPayload = function(newPayloadStr) {
      currentRequestPayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.user);
    };

    var currentResponsePayloadSetter = Api.setResponsePayload;
    Api.setResponsePayload = function(newPayloadStr) {
      currentResponsePayloadSetter.call(Api, newPayloadStr);
      displayMessage(JSON.parse(newPayloadStr), settings.authorTypes.watson);
    };
  }

  function setupInputBox() {
    var input = document.getElementById('textInput');
    var dummy = document.getElementById('textInputDummy');
    var padding = 3;

    if (dummy === null) {
      var dummyJson = {
        'tagName': 'div',
        'attributes': [{
          'name': 'id',
          'value': 'textInputDummy'
        }]
      };

      dummy = Common.buildDomElement(dummyJson);
      ['font-size', 'font-style', 'font-weight', 'font-family', 'line-height', 'text-transform', 'letter-spacing'].forEach(function(index) {
        dummy.style[index] = window.getComputedStyle( input, null ).getPropertyValue( index );
      });

      document.body.appendChild(dummy);
    }

    input.addEventListener('input', function() {
      if (this.value === '') {
        this.classList.remove('underline');
        this.setAttribute('style', 'width:' + '100%');
        this.style.width = '100%';
      } else {
        this.classList.add('underline');
        var txtNode = document.createTextNode(this.value);
        dummy.innerText = txtNode.textContent;
        var widthValue = ( dummy.offsetWidth + padding) + 'px';
        this.setAttribute('style', 'width:' + widthValue);
        this.style.width = widthValue;
      }
    });

    fireEvent(input, 'input');
  }

  function fireEvent(element, event) {
    var evt;
    if (document.createEventObject) {
      // dispatch for IE
      evt = document.createEventObject();
      return element.fireEvent('on' + event, evt);
    }
    // otherwise, dispatch for Firefox, Chrome + others
    evt = document.createEvent('HTMLEvents');
    evt.initEvent(event, true, true); // event type,bubbling,cancelable
    return !element.dispatchEvent(evt);
  }

  // Display a user or Watson message that has just been sent/received
  function displayMessage(newPayload, typeValue) {
    var isUser = isUserMessage(typeValue);
    var textExists = (newPayload.input && newPayload.input.text)
      || (newPayload.output && newPayload.output.text);
    if (isUser !== null && textExists) {
      // Create new message DOM element
      var messageDiv = buildMessageDomElement(newPayload, isUser);
      var chatBoxElement = document.querySelector(settings.selectors.chatBox);
      var previousLatest = chatBoxElement.querySelector((isUser
              ? settings.selectors.fromUser : settings.selectors.fromWatson)
              + settings.selectors.latest);
      // Previous "latest" message is no longer the most recent
      if (previousLatest) {
        previousLatest.classList.remove('latest');
      }

      chatBoxElement.appendChild(messageDiv);
      // Class to start fade in animation
      messageDiv.classList.add('load');
      // Move chat to the most recent messages when new messages are added
      scrollToChatBottom();
    }
  }

  // Checks if the given typeValue matches with the user "name", the Watson "name", or neither
  // Returns true if user, false if Watson, and null if neither
  // Used to keep track of whether a message was from the user or Watson
  function isUserMessage(typeValue) {
    if (typeValue === settings.authorTypes.user) {
      return true;
    } else if (typeValue === settings.authorTypes.watson) {
      return false;
    }
    return null;
  }

  // Constructs new DOM element from a message payload
  function buildMessageDomElement(newPayload, isUser) {
    var dataObj = isUser ? newPayload.input : newPayload.output;

    var messageJson = {
      // <div class='segments'>
      'tagName': 'div',
      'classNames': ['segments'],
      'children': [{
        // <div class='from-user/from-watson latest'>
        'tagName': 'div',
        'classNames': [(isUser ? 'from-user' : 'from-watson'), 'latest'],
        'children': [{
          // <div class='message-inner'>
          'tagName': 'div',
          'classNames': ['message-inner'],
          'children': [{
            // <p>{messageText}</p>
            'tagName': 'p',
            'text': dataObj.text
          }]
        }]
      }]
    };

    return Common.buildDomElement(messageJson);
  }

  // Scroll to the bottom of the chat window (to the most recent messages)
  // Note: this method will bring the most recent user message into view,
  //   even if the most recent message is from Watson.
  //   This is done so that the "context" of the conversation is maintained in the view,
  //   even if the Watson message is long.
  function scrollToChatBottom() {
    var scrollingChat = document.querySelector('#scrollingChat');
    var messages = scrollingChat.children;
    var lastMessage = messages[messages.length - 1];

    // If the most recent message is from Watson,
    // scroll the latest message to the top of the section, rather than the bottom
    var top = false;
    var scrollEl = lastMessage.querySelector(settings.selectors.fromWatson
            + settings.selectors.latest);
    if (scrollEl) {
      top = true;
    }

    // Scroll to the latest message sent by the user
    scrollEl = scrollingChat.querySelector(settings.selectors.fromUser
            + settings.selectors.latest);
    if (scrollEl) {
      scrollEl.scrollIntoView({
        'behavior': 'smooth', // Only supported by Firefox, but including doesn't break other browsers
        'block': (top ? 'start' : 'end')
      });
    }
  }

  // Handles the submission of input
  function inputKeyDown(event, inputBox) {
    // Submit on enter key, dis-allowing blank messages
    if (event.keyCode === 13 && inputBox.value) {
      // Retrieve the context from the previous server response
      var context;
      var latestResponse = Api.getResponsePayload();
      if (latestResponse) {
        context = latestResponse.context;
      }

      // Send the user message
      Api.sendRequest(inputBox.value, context);

      // Clear input box for further messages
      inputBox.value = '';
      fireEvent(inputBox, 'input');
    }
  }
}());
