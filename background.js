function handleBeforeSendHeaders(details) {
  const authTokenHeader = details.requestHeaders.find(({ name }) => name === 'Authorization');

  if (authTokenHeader) {
    const authToken = authTokenHeader.value;

    // Check if extension context is still valid
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

// Remove the event listener when the background script is unloaded
window.addEventListener("unload", function() {
  chrome.webRequest.onBeforeSendHeaders.removeListener(handleBeforeSendHeaders);
});
