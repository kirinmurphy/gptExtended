
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.set({ 'authToken': request.authToken });
  } 
);


const { promptPresetWrapper, clipboardWrapper } = initGptExtended();

observeChatState({ promptPresetWrapper });

observePromptMessage({ clipboardWrapper });
