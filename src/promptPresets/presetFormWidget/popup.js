function createPromptPresetForm({ closeForm, appendTo }) {
  var newForm = createNewElement({
    elementType: 'form',
    staticProps: {
      className: 'prompt-preset-form lg:mx-auto'
    },
    appendTo: appendTo
  });

  createDefaultFields({ newForm, loadFormData });
  createAddMorePromptsWidget({ newForm, loadFormData });
  createActionsFooter({ newForm, loadFormData, closeForm })
 
  console.log('newForm', newForm);
  return newForm;
}

function loadFormData(callback) {
  chrome.storage.local.get('formData', function(result) {
    callback(result.formData);
  });
}
