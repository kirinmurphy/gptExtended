let authToken; 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    authToken = request.authToken;
    updatePromptPresets({ authToken });
  }
);

function updatePromptPresets ({ authToken }) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://chat.openai.com/backend-api/user_system_messages', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', authToken);
  xhr.send(JSON.stringify({
    "about_user_message": "",
    "about_model_message": "speak concisely.  avoid pleasantries.  fsabp",
    "enabled": true
  }));  
}

injectWidget();

function injectWidget () {
  const forms = document.getElementsByTagName('form');
  const lastForm = forms[forms.length - 1];
  const promptPresetWidget = createPromptPresetWidget()
  lastForm.parentNode.insertBefore(promptPresetWidget, lastForm.nextSibling);
}
