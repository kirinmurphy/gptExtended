const port = chrome.runtime.connect();

port.onDisconnect.addListener(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler, { capture: true });
});

const beforeUnloadHandler = async function (event) {
  event.preventDefault();
  await postPresetsOnPromptChange({ selectedPreset: DEFAULT_UUID });  
  return event.returnValue = '';
};

window.addEventListener('beforeunload', beforeUnloadHandler, { capture: true });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    chrome.storage.local.set({ 'authToken': request.authToken });
  } 
);

observeChatState();
