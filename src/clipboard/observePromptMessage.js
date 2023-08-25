const DEBOUNCE_TIMEOUT = 500;

function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let keyupListener;

  textarea.addEventListener('focus', async () => {
    if (keyupListener) {
      textarea.removeEventListener('keyup', keyupListener);
    }

    const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
    const replacements = clipboardData?.[CLIPBOARD_ADDITIONAL_FIELDS_KEY]?.slice()
      .sort((a, b) => b.name.length - a.name.length) || [];

    keyupListener = debounce(() => {
      checkForKeywordInPrompt({ replacements, textarea });
    }, DEBOUNCE_TIMEOUT);

    textarea.addEventListener('keyup', keyupListener);
  });

  createClipboardWidget({ clipboardWrapper });
  initCodeSnippetObserver();
};

function checkForKeywordInPrompt ({ replacements, textarea }) {
  if (replacements.length) {
    const newValue = getPromptWithReplacedClipboardText(textarea.value, replacements);

    if (textarea.value !== newValue) {
      textarea.value = newValue;
      simulateKeyPress(textarea, { key: ' ' });
      textarea.scrollTop = textarea.scrollHeight;
    }
  }
}

function getPromptWithReplacedClipboardText (prompt, replacements) {
  return replacements.reduce((updatedMessage, { name, message }) => {
    const keywordExists = !!message && updatedMessage.includes(name);
    const separator = '--------------------------------------------------------------------';
    const newReplacement = `\n${separator}\n${message}\n${separator}\n`;
    return keywordExists ? updatedMessage.split(name).join(newReplacement) : updatedMessage;
  }, prompt);
};
