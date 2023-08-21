function createPromptPresetForm({ closeForm, appendTo }) {
  var newForm = createNewElement({
    elementType: 'form',
    staticProps: {
      className: 'prompt-preset-form lg:mx-auto'
    },
    appendTo
  });

  createDefaultFields({ newForm });
  createAddMorePromptsWidget({ newForm });
  createActionsFooter({ newForm, closeForm });
 
  return newForm;
}
