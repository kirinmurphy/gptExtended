const MAX_ADDITIONAL_FIELDS = 100;

async function createAddMoreFieldsetsWidget (props) {
  const { 
    newForm, 
    addMoreButtonText, 
    additionalOptionInstruction,
    formFieldText,
    savedFormDataKey,
    savedFormAdditionalFieldsKey,
    nameFieldCallback,
    fullScreenEditor
  } = props;

  const addMoreButtonWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'addMoreButtonWrapper'
    },
    appendTo: newForm
  });

  let fieldsetCount = 0;

  const addMoreButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: addMoreButtonText,
      className: 'addMoreButton btn btn-primary'
    },
    clickHandler: (e) => {
      e.preventDefault();
  
      if (fieldsetCount >= MAX_ADDITIONAL_FIELDS) { 
        addMoreButton.disabled = true;
      } else {
        insertAdditionalFieldset({ 
          newForm, 
          addMoreButtonWrapper, 
          index: fieldsetCount, 
          formFieldText,
          nameFieldCallback,
          fullScreenEditor
        });
        fieldsetCount++;  
        newForm.scrollTop = newForm.scrollHeight;
        if ( fullScreenEditor ) { toggleLastClipboadItem(newForm); }
      }
    },
    appendTo: addMoreButtonWrapper
  });

  if ( additionalOptionInstruction ) {
    createNewElement({
      elementType: 'div',
      staticProps: {
        textContent: additionalOptionInstruction
      },
      appendTo: addMoreButtonWrapper
    });  
  }

  // load existing fields
  const results = await asyncLoad(savedFormDataKey);

  if ( results ) {
    const additionalFields = results[savedFormAdditionalFieldsKey];  

    fieldsetCount = additionalFields.length;
  
    additionalFields.forEach((savedValue, index) => {
      insertAdditionalFieldset({ 
        newForm, 
        addMoreButtonWrapper, 
        index, 
        savedValue,
        formFieldText,
        nameFieldCallback,
        fullScreenEditor
      });
    });
  
    if (additionalFields.length === MAX_ADDITIONAL_FIELDS) {
      addMoreButton.disabled = true;
    }  
  }

  if ( fullScreenEditor ) { 
    toggleLastClipboadItem(newForm); 
    const lastTextarea = newForm.querySelector('fieldset:last-of-type textarea');
    lastTextarea.focus();
  }
}

function toggleLastClipboadItem (newForm) {
  const lastFieldset = newForm.querySelector('fieldset:last-of-type');
  const inputField = lastFieldset.querySelector('input[type="text"]');
  inputField.click();
  inputField.focus();
}