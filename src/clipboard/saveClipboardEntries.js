function savePromptClipboardEntries ({ newForm }) {
  saveFormElements({ 
    newForm,
    formStorageKey: 'clipboardData',
    formatter: (input) => {
    
      const additionalPrompts = Object.entries(input)
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
