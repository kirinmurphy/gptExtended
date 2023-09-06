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

  let fieldsetCount = 0;

  const addMoreButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: addMoreButtonText,
      className: 'addMoreButton btn btn-primary'
    },
    clickHandler: (e) => {
      e.preventDefault();
  
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
      addMoreButton.disabled = true;
    }
  });

  const addMoreButtonWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'addMoreButtonWrapper'
    },
    appendTo: newForm,
    append: [addMoreButton],
    clickHandler: () => {
      const button = addMoreButtonWrapper.querySelector('button');
      if (button && button.disabled) {
        const textInputs = Array.from(newForm.querySelectorAll('input[type="text"]'));    
        const emptyInput = textInputs.find(input => !input.value.trim());
        if (emptyInput) { emptyInput.focus(); }
      }
    }
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
  }

  if ( fullScreenEditor ) { 
    toggleLastClipboadItem(newForm); 
    const lastTextarea = newForm.querySelector('fieldset:last-of-type textarea');
    if ( lastTextarea ) { lastTextarea.focus(); }
  }
}

function toggleLastClipboadItem (newForm) {
  const lastFieldset = newForm.querySelector('fieldset:last-of-type');
  const inputField = lastFieldset?.querySelector('input[type="text"]');
  if ( inputField ) {
    inputField.click();
    inputField.focus();  
  }
}