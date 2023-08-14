function savePromptPresets ({ newForm }) {
  const formObject = new FormData(newForm).entries();
  const formData = Object.fromEntries(formObject);
  const formattedFormData = formatPromptPresetFormData(formData);
  chrome.storage.local.set({'formData': formattedFormData}, function() {
    console.log('Form data saved.');
  });
}

function formatPromptPresetFormData(input) {
  const { about_user_message, about_model_message_default, ...others } = input;

  const additionalPrompts = Object.entries(others)
    .filter(([key]) => key.startsWith('additional_prompt_') && key.endsWith('_name'))
    .map(([key, name]) => {
      const index = key.split('_')[2];
      const message = others[`additional_prompt_${index}_message`];
      const uuid = others[`additional_prompt_${index}_uuid`];
      return { name, message, uuid };
    });

  return { 
    about_user_message, 
    about_model_message_default, 
    additional_prompts: additionalPrompts 
  };
}
