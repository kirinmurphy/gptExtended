const MAX_ADDITIONAL_FIELDS = 100;

async function createAddMoreFieldsetsWidget (props) {
  const { 
    newForm, 
    addMoreButtonText, 
    additionalOptionInstruction,
    formFieldText,
    savedFormDataKey,
    savedFormAdditionalFieldsKey
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
          formFieldText 
        });
        fieldsetCount++;  
        newForm.scrollTop = newForm.scrollHeight;
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
        formFieldText
      });
    });
  
    if (additionalFields.length === MAX_ADDITIONAL_FIELDS) {
      addMoreButton.disabled = true;
    }  
  }
}

function insertAdditionalFieldset (props) {
  const { 
    newForm, 
    addMoreButtonWrapper, 
    index, 
    savedValue,
    formFieldText: { label, message }
  } = props;

  const hiddenInput = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'hidden',
      name: `additional_option_${index}_uuid`,
      value: savedValue?.uuid || generateUUID()
    }
  });
  
  const starterName = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'text',
      name: `additional_option_${index}_name`,
      placeholder: label,
      required: true,
      value: !!savedValue ? savedValue.name : null
    }
  });

  const starterMessage = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: `additional_option_${index}_message`,
      placeholder: message,
      required: true,
      className: 'w-full mb-1',
      value: !!savedValue ? savedValue.message : null
    }
  });

  adjustTextareaHeight(starterMessage);

  const removeButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: '+',
      className: 'remove-button'
    },
    clickHandler: (e) => { 
      e.preventDefault();
      const button = e.target;
      const item = button.closest('fieldset');
      item.parentNode.removeChild(item);
    }
  });

  const fieldset = createNewElement({
    elementType: 'fieldset',
    staticProps: { className: 'w-full' },
    append: [hiddenInput, starterName, starterMessage, removeButton]
  }); 

  newForm.insertBefore(fieldset, addMoreButtonWrapper);

  checkForDuplicateFieldEntries(starterName);
}
