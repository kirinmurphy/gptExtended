chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.set({ 'authToken': request.authToken });
  } 
);

observeChatState();

window.addEventListener('beforeunload', async function (event) {
  event.preventDefault();
  await postPresetsOnPromptChange({ selectedPreset: DEFAULT_UUID });  
  return event.returnValue = '';
}, { capture: true });
