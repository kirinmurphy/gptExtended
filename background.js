chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    const authToken = details.requestHeaders.filter(({ name }) => name === 'Authorization')[0].value
    console.log('authToken', authToken);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { authToken });
    });

  },
  {urls: ["https://chat.openai.com/public-api/conversation_limit"]},
  ["requestHeaders"]
);

console.log("Background script loaded.");
