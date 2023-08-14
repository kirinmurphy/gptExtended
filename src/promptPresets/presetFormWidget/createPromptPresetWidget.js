function createPromptPresetWidget () {
  const promptPresetWidget = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'xl:max-w-3xl lg:max-w-2xl lg:mx-auto',
      style: { paddingTop: '1rem' }
    }
  });
  
  createPromptPresetFormToggle({ promptPresetWidget });
  
  return promptPresetWidget;
}

function createPromptPresetFormToggle({ promptPresetWidget }) {
  const promptPresetFormToggleWrapper = createNewElement({ 
    elementType: 'div',
    appendTo: promptPresetWidget
  });

  const promptPresetFormToggle = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Add Prompt Presets',
      className: 'btn btn-primary'
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
    },
    appendTo: promptPresetFormToggleWrapper
  });

  return promptPresetFormToggleWrapper;
}
