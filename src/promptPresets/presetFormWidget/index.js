function createPromptPresetWidget () {
  const promptPresetWidget = createNewElement({ elementType: 'div' });  
  createPromptPresetFormToggle({ promptPresetWidget });  
  return promptPresetWidget;
}

function createPromptPresetFormToggle({ promptPresetWidget }) {
  const promptPresetFormToggle = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'custom instructions',
      className: 'add-custom-instructions'
    },
    clickHandler: function (e) {
      const newFormOverlay = createNewElement({
        elementType: 'div',
        staticProps: { className: 'prompt-preset-form-overlay' },
        appendTo: promptPresetWidget
      });
        
      createPromptPresetForm({ 
        closeForm: (newForm) => {
          newForm.parentNode.removeChild(newForm);
          newFormOverlay.parentNode.removeChild(newFormOverlay);
          promptPresetFormToggle.removeAttribute('style');
        },
        appendTo: promptPresetWidget
      });

      promptPresetFormToggle.style.display = 'none';  
    }
  });

  const promptPresetFormToggleWrapper = createNewElement({ 
    elementType: 'div',
    append: [promptPresetFormToggle],
    appendTo: promptPresetWidget
  });

  return promptPresetFormToggleWrapper;
}
