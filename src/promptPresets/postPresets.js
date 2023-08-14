function postPresets ({ data, selectedValue }) {
  const { about_user_message, about_model_message_default, additional_prompts } = data;
  const additionalPromptMessage = additional_prompts.filter(({ uuid }) => uuid === selectedValue)[0]?.message;
  const about_model_message = `${about_model_message_default} ${additionalPromptMessage || ''}`; 

  const requestBody = {
    about_user_message, 
    about_model_message,
    enabled: true
  };

  chrome.storage.local.get('authToken', function(result) {
    const authToken = result.authToken; 
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://chat.openai.com/backend-api/user_system_messages', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', authToken);
    xhr.send(JSON.stringify(requestBody));  
  });
}
