
function createClipboardWidget ({ clipboardWrapper }) {
  const clipboardWidget = createNewElement({ 
    elementType: 'div',
    appendTo: clipboardWrapper
  });  

  createPopupFormWidget({ 
    parent: clipboardWidget,
    title: 'Clipboard',
    tagline: 'Save commonly used text snippets to re-use in/across chats.  Type the <strong>#keyword</strong> into your chat message to popuplate the clipboard text.',
    toggleText: 'clipboard',
    createPopupFormFields: createClipboardPopupFormFields,
    saveAction: savePromptClipboardEntries
  });  
  
  return clipboardWidget;
}

async function createClipboardPopupFormFields ({ newForm, parent }) {
  createAddMoreFieldsetsWidget({ 
    newForm,
    addMoreButtonText: 'Add More Clipboard Items',
    formFieldText: {
      label: 'Keyword',
      message: 'Clipboard Text'
    },
    savedFormDataKey: CLIPBOARD_FORM_DATA_KEY,
    savedFormAdditionalFieldsKey: CLIPBOARD_ADDITIONAL_FIELDS_KEY,
    nameFieldCallback: (input) => { attachPoundSignListener(input); }
  });

  await triggerDefaultFirstField({ parent });
}

