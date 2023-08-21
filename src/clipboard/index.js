const replaceKeywords = (message, replacements) => {
  return replacements.reduce((updatedMessage, { keyword, replacement }) => {
    const keywordExists = updatedMessage.includes(keyword);
    const newReplacement = `\n\n${replacement}\n\n`;
    return keywordExists ? updatedMessage.split(keyword).join(newReplacement) : updatedMessage;
  }, message);
};

const replacements = [
  { keyword: '#sandwich', replacement: 'I am the replacement' },
];

function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  textarea.addEventListener('keyup', () => {
    textarea.value = replaceKeywords(textarea.value, replacements);
  });
  
  createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'gptExtendedWrapper',
      textContent: 'herlo'
    },
    appendTo: clipboardWrapper
  });
}
