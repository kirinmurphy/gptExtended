function handleBeforeSendHeaders(details) {
  const authTokenHeader = details.requestHeaders.find(({ name }) => name === 'Authorization');

  if (authTokenHeader) {
      const authToken = authTokenHeader.value;

      if (chrome.runtime.lastError) {
          console.warn("Extension context invalidated:", chrome.runtime.lastError);
          return;
      }

      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          if (tabs[0] && tabs[0].id) {
              chrome.tabs.sendMessage(tabs[0].id, { authToken });
          }
      });
  }
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  handleBeforeSendHeaders,
  { urls: ["https://chat.openai.com/public-api/conversation_limit"] },
  ["requestHeaders"]
);

self.addEventListener('install', function(event) {
  // Perform install steps, if any
});
