const MAX_ADDITIONAL_PROMPTS = 10;

function createAddMorePromptsWidget ({ newForm }) {
  const addMoreButtonWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'addMoreButtonWrapper'
    },
    appendTo: newForm
  });

  let fieldsetCount = 0;

  const addMoreButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Add More Prompts',
      className: 'btn btn-primary'
    },
    clickHandler: (e) => {
      e.preventDefault();
  
      if (fieldsetCount >= MAX_ADDITIONAL_PROMPTS) { 
        addMoreButton.disabled = true;
      } else {
        insertAdditionalStarterPrompt({ newForm, addMoreButtonWrapper, index: fieldsetCount });
        fieldsetCount++;  
      }
    },
    appendTo: addMoreButtonWrapper
  });

  const addMorePromptsMessage = createNewElement({
    elementType: 'div',
    staticProps: {
      textContent: 'Add additional prompt instructions you can set for each unique chat.'
    },
    appendTo: addMoreButtonWrapper
  });

  loadFormData(({ additional_prompts }) => {
    fieldsetCount = additional_prompts.length;

    additional_prompts.forEach((savedValue, index) => {
      insertAdditionalStarterPrompt({ newForm, addMoreButtonWrapper, index, savedValue });
    });

    if (additional_prompts.length === MAX_ADDITIONAL_PROMPTS) {
      addMoreButton.disabled = true;
    }
  });
}

function insertAdditionalStarterPrompt (props) {
  const { 
    newForm, 
    addMoreButtonWrapper, 
    index, 
    savedValue
  } = props;

  const hiddenInput = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'hidden',
      name: `additional_prompt_${index}_uuid`,
      value: savedValue?.uuid || generateUUID()
    },
    appendTo: document.body
  });
  
  const starterName = createNewElement({
    elementType: 'input',
    staticProps: {
      name: `additional_prompt_${index}_name`,
      placeholder: 'Starter Prompt Name',
      required: true,
      className: 'mb-1 border border-gray-400',
      value: !!savedValue ? savedValue.name : null
    }
  });
  
  const starterMessage = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: `additional_prompt_${index}_message`,
      placeholder: 'Starter Prompt',
      required: true,
      className: 'w-full mb-1',
      value: !!savedValue ? savedValue.message : null
    }
  });

  const removeButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: '+',
      className: 'remove-button'
    },
    clickHandler: (e) => { 
      e.preventDefault();
      const button = e.target;
      const item = button.closest('fieldset');
      item.parentNode.removeChild(item);
    }
  });

  const fieldset = createNewElement({
    elementType: 'fieldset',
    staticProps: { className: 'w-full' },
    append: [hiddenInput, starterName, starterMessage, removeButton]
  }); 

  newForm.insertBefore(fieldset, addMoreButtonWrapper);
}
