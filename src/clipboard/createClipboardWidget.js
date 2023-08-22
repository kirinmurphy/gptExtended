
function createClipboardWidget ({ clipboardWrapper }) {

  const clipboardWidget = createNewElement({ 
    elementType: 'div',
    appendTo: clipboardWrapper
  });  

  createPopupFormWidget({ 
    parent: clipboardWidget,
    toggleText: 'clipboard',
    createPopupFormFields: async ({ newForm }) => {
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

      const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
      if ( !clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY].length ) {
        const addMoreButton = clipboardWidget.querySelector('.addMoreButton');
        if (addMoreButton) { 
          addMoreButton.click(); 
        }   
      }

      const firstFieldsetRemoveButton = clipboardWidget.querySelector('fieldset .remove-button');
      firstFieldsetRemoveButton.remove();          

    },
    saveAction: savePromptClipboardEntries
  });  
  
  return clipboardWidget;
}
