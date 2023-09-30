
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
  await createTextarea({ 
    appendTo: newForm,
    name: 'about_user_message',
    savedFormDataKey: 'formData', 
    labelText: 'What would you like ChatGPT to know about you?'
  });

  const baseResponsePrompt = await createTextarea({ 
    appendTo: newForm,
    name: 'about_model_message_default',
    savedFormDataKey: 'formData', 
    labelText: 'How would you like ChatGPT to respond?',
    onAfterLoad: ({ value }) => {
      newForm.setAttribute('data-base-response-prompt-length', value.length);
    }
  });

  checkMaxLength({ 
    newForm,
    textarea: baseResponsePrompt.querySelector('textarea'),
    otherFieldValueLengthAttribute: 'data-max-additional-response-prompt-length',
    onAfterLoad: ({ maxLengthMessage, textarea }) => {
      baseResponsePrompt.insertBefore(maxLengthMessage, textarea);
    },
    onBlurCallback: (textarea) => {
      const characterCount = textarea.value.length;
      newForm.setAttribute('data-base-response-prompt-length', characterCount);
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
    addMaxLengthCheck: true
  });
}
