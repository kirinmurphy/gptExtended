
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
    createPopupFormFields,
    saveAction: savePromptClipboardEntries
  });  
  
  return clipboardWidget;
}

async function createPopupFormFields ({ newForm, parent }) {
  createAddMoreFieldsetsWidget({ 
    newForm,
    addMoreButtonText: 'Add More Clipboard Items',
    formFieldText: {
      label: 'Keyword',
      message: 'Clipboard Text'
    },
    savedFormDataKey: CLIPBOARD_FORM_DATA_KEY,
    savedFormAdditionalFieldsKey: CLIPBOARD_ADDITIONAL_FIELDS_KEY
  });

  await triggerDefaultFirstField({ parent });
}

async function triggerDefaultFirstField ({ parent }) {
  const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY) || {};
  if ( !clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY]?.length ) {
    const addMoreButton = parent.querySelector('.addMoreButton');
    if (addMoreButton) { 
      addMoreButton.click(); 
    }   
  }

  const firstFieldsetRemoveButton = parent.querySelector('fieldset .remove-button');
  firstFieldsetRemoveButton.remove();            
}
