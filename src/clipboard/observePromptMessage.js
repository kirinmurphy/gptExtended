const DEBOUNCE_TIMEOUT = 500;

async function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let checkForKeywordListener;
  let typeaheadListener;
  const props = { textarea, checkForKeywordListener, typeaheadListener }

  if (document.activeElement === textarea) {
    await onGPTPromptFocus(props);
  }

  const focusHandler = async () => {
    await onGPTPromptFocus(props);
  };
  
  textarea.addEventListener('focus', focusHandler);

  createClipboardWidget({ clipboardWrapper });
  initCodeSnippetObserver();
  initCopySelection();

  const port = chrome.runtime.connect();
  port.onDisconnect.addListener(() => {
    textarea.removeEventListener('focus', focusHandler);
  });
};
