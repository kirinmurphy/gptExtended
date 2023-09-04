chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.set({ 'authToken': request.authToken });
  } 
);

observeChatState();

// shrug?  fires before page leaves, but doesn't wait for response
// seems to work :/
window.addEventListener('beforeunload', async function (event) {
  event.preventDefault();
  await postPresetsOnPromptChange({ selectedPreset: DEFAULT_UUID });  
  return event.returnValue = '';
}, { capture: true });
