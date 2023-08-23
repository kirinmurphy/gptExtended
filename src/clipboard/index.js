const DEBOUNCE_TIMEOUT = 500;

const replaceKeywords = (prompt, replacements) => {
  return replacements.reduce((updatedMessage, { name, message }) => {
    const keywordExists = updatedMessage.includes(name);
    const newReplacement = `\n\n${message}\n`;
    return keywordExists ? updatedMessage.split(name).join(newReplacement) : updatedMessage;
  }, prompt);
};

const observePromptMessage = ({ clipboardWrapper }) => {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let keyupListener;

  textarea.addEventListener('focus', async () => {
    if (keyupListener) {
      textarea.removeEventListener('keyup', keyupListener);
    }

    const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
    const replacements = clipboardData?.[CLIPBOARD_ADDITIONAL_FIELDS_KEY]?.slice().sort((a, b) => b.name.length - a.name.length) || [];

    keyupListener = debounce(async () => {
      if (replacements.length) {
        const newValue = replaceKeywords(textarea.value, replacements);
        if (textarea.value !== newValue) {
          textarea.value = newValue;
          simulateKeyPress(textarea, { key: ' ' });
          textarea.scrollTop = textarea.scrollHeight;
        }
      }
    }, DEBOUNCE_TIMEOUT);

    textarea.addEventListener('keyup', keyupListener);
  });

  createClipboardWidget({ clipboardWrapper });
};
