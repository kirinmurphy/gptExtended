function createPromptPresetWidget () {

  const promptPresetWidget = createNewElement({ elementType: 'div' });  

  createPopupFormWidget({ 
    parent: promptPresetWidget,
    title: 'Chat Instructions',
    tagline: 'Add instructions to set up a chat with a specific context.',
    toggleText: 'instructions',
    createPopupFormFields,
    saveAction: savePromptPresets
  });  
  
  return promptPresetWidget;
}

async function createPopupFormFields ({ newForm }) {

  newForm.appendChild(await createTextarea({ 
    appendTo: newForm,
    name: 'about_user_message',
    savedFormDataKey: 'formData', 
    labelText: 'What would you like ChatGPT to know about you?'
  }));

  newForm.appendChild(await createTextarea({ 
    appendTo: newForm,
    name: 'about_model_message_default',
    savedFormDataKey: 'formData', 
    labelText: 'How would you like ChatGPT to respond?'
  }));
      
  createAddMoreFieldsetsWidget({ 
    newForm,
    addMoreButtonText: 'Add More Prompts',
    additionalOptionInstruction: 'Add additional prompt instructions you can set for each unique chat.',
    formFieldText: {
      label: 'Starter Prompt Name',
      message: 'Starter Prompt'
    },
    savedFormDataKey: 'formData',
    savedFormAdditionalFieldsKey: 'additional_prompts'
  });
}