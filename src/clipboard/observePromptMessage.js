const DEBOUNCE_TIMEOUT = 500;

async function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let checkForKeywordListener;
  let typeaheadListener;
  const props = { textarea, checkForKeywordListener, typeaheadListener }

  if (document.activeElement === textarea) {
    await onGPTPromptFocus(props);
  }
 
  textarea.addEventListener('focus', async () => {
    await onGPTPromptFocus(props);
  });

  createClipboardWidget({ clipboardWrapper });
  initCodeSnippetObserver();
  initCopySelection();
};
