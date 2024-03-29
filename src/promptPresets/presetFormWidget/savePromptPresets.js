function savePromptPresets ({ newForm }) {
  saveFormElements({ 
    newForm,
    formStorageKey: 'formData',
    formatter: (input) => {
      const { about_user_message, about_model_message_default, ...others } = input;
    
      const additionalPrompts = Object.entries(others)
        .filter(([key]) => key.startsWith('additional_option_') && key.endsWith('_name'))
        .map(([key, name]) => {
          const index = key.split('_')[2];
          const message = others[`additional_option_${index}_message`];
          const uuid = others[`additional_option_${index}_uuid`];
          return { name, message, uuid };
        });
    
      return { 
        about_user_message, 
        about_model_message_default, 
        additional_prompts: additionalPrompts 
      };
    } 
  });
}
