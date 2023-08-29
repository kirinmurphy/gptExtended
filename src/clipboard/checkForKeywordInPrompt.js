
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

