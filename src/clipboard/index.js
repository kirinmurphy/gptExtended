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

  createClipboardWidget({ clipboardWrapper });
}

function createClipboardWidget ({ clipboardWrapper }) {

  const clipboardWidget = createNewElement({ 
    elementType: 'div',
    appendTo: clipboardWrapper
  });  

  createPopupFormWidget({ 
    parent: clipboardWidget,
    toggleText: 'clipboard',
    createPopupFormFields: ({ newForm }) => {
      createAddMoreFieldsetsWidget({ 
        newForm,
        addMoreButtonText: 'Add More Clipboard Items',
        // additionalOptionInstruction: 'Add additional prompt instructions you can set for each unique chat.',
        formFieldText: {
          label: 'Keyword',
          message: 'Clipboard Text'
        },
        savedFormDataKey: 'clipboardData',
        savedFormAdditionalFieldsKey: 'additional_clipboard_items'
      });
    },
    saveAction: savePromptClipboardEntries
  });  
  
  return clipboardWidget;
}
