function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let replacements;

  textarea.addEventListener('keyup', async () => {
    const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
    replacements = clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY];
    if ( replacements.length ) { 
      const newValue = replaceKeywords(textarea.value, replacements);
      if ( textarea.value !== newValue ) {
        textarea.value = replaceKeywords(textarea.value, replacements);
        simulateKeyPress(textarea, { key: ' ' });
        textarea.scrollTop = textarea.scrollHeight;
      }
    }
  });

  createClipboardWidget({ clipboardWrapper });
}

function replaceKeywords (prompt, replacements) {
  console.log('------------');
  return replacements.reduce((updatedMessage, { name, message }) => {
    const keywordExists = updatedMessage.includes(name);
    const newReplacement = `\n\n${message}\n`;
    return keywordExists ? updatedMessage.split(name).join(newReplacement) : updatedMessage;
  }, prompt);
};
