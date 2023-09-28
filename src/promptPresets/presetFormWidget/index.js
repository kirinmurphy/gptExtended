const MAX_RESPONSE_LENGTH = 20;

function createPromptPresetWidget () {

  const promptPresetWidget = createNewElement({ elementType: 'div' });  

  createPopupFormWidget({ 
    parent: promptPresetWidget,
    title: 'Chat Instructions',
    tagline: 'Add instructions to set up a chat with a specific context.',
    toggleText: 'instructions',
    createPopupFormFields: createPresetPopupFormFields,
    saveAction: savePromptPresets
  });  
  
  return promptPresetWidget;
}

async function createPresetPopupFormFields ({ newForm }) {

  newForm.setAttribute('data-max-response-length', MAX_RESPONSE_LENGTH);

  await createTextarea({ 
    appendTo: newForm,
    name: 'about_user_message',
    savedFormDataKey: 'formData', 
    labelText: 'What would you like ChatGPT to know about you?'
  });

  const maxLengthMessage = createNewElement({
    elementType: 'span',
    staticProps: {
      className: 'max-length-message',
      textContent: ''
    }
  });

  await createTextarea({ 
    appendTo: newForm,
    name: 'about_model_message_default',
    savedFormDataKey: 'formData', 
    labelText: 'How would you like ChatGPT to respond?',
    onAfterLoad: ({ label, textarea, value }) => {
      newForm.setAttribute('data-base-response-prompt-length', value.length);
      label.insertBefore(maxLengthMessage, textarea);
    },
    focusHandler: (e) => {
      const additionalPromptMessageLemgth = newForm.getAttribute('data-max-additional-response-prompt-length');
      const availableMaxLength = MAX_RESPONSE_LENGTH - additionalPromptMessageLemgth;
      e.target.setAttribute('maxLength', availableMaxLength);
      const atMaxLength = e.target.value.length >= availableMaxLength;
      maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
    },
    inputHandler: (e) => {
      const availableMaxLength = parseInt(e.target.getAttribute('maxLength'), 10);
      const atMaxLength = e.target.value.length >= availableMaxLength;
      maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
    },
    blurHandler: (e) => {
      const characterCount = e.target.value.length;
      newForm.setAttribute('data-base-response-prompt-length', characterCount);
      maxLengthMessage.textContent = '';
    }
  });

  createAddMoreFieldsetsWidget({ 
    newForm,
    addMoreButtonText: 'Add More Prompts',
    additionalOptionInstruction: 'Add additional prompt instructions you can set for each unique chat.',
    formFieldText: {
      label: 'Prompt Name',
      message: 'Prompt Instructions'
    },
    savedFormDataKey: 'formData',
    savedFormAdditionalFieldsKey: 'additional_prompts',
  });
}