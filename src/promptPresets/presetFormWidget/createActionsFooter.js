function createActionsFooter ({ newForm, closeForm }) {
  const actionsFooter = createNewElement({
    elementType: 'div',
    staticProps: { className: 'text-right' },
});

  createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Save',
      className: 'btn btn-primary'
    },
    clickHandler: function (e) {
      e.preventDefault();
      const formObject = new FormData(newForm).entries();
      const formData = Object.fromEntries(formObject);
      const formattedFormData = formatPromptPresetFormData(formData);
      chrome.storage.local.set({'formData': formattedFormData}, function() {
        console.log('Form data saved.', formData, formattedFormData);
      });
      closeForm(newForm);
    },
    appendTo: actionsFooter
  });

  createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Cancel',
      className: 'btn btn-neutral'
    },
    clickHandler: function (e) {
      e.preventDefault();
      closeForm(newForm);
    },
    appendTo: actionsFooter
  });
  
  newForm.appendChild(actionsFooter);
}


function formatPromptPresetFormData(input) {
  const { about_user_message, about_model_message_default, additional_prompts } = input;

  const additionalPrompts = additional_prompts
    .filter(([key]) => key.startsWith('additional_prompt_') && key.endsWith('_name'))
    .map(([key, name]) => {
      const index = key.split('_')[2];
      const message = others[`additional_prompt_${index}_message`];
      return { name, message };
    });

    console.log('b4 after', additonal_prompts, additionalPrompts);

  return { 
    about_user_message, 
    about_model_message_default, 
    additional_prompts: additionalPrompts 
  };
}
