const MAX_ADDITIONAL_PROMPTS = 10;

function createAddMorePromptsWidget ({ newForm }) {
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
        insertAdditionalStarterPrompt({ newForm, addMoreButton, index: fieldsetCount });
        fieldsetCount++;  
      }
    },
    appendTo: newForm
  });

  loadFormData(({ additional_prompts }) => {
    additional_prompts.forEach((savedValue, index) => {
      insertAdditionalStarterPrompt({ newForm, addMoreButton, index, savedValue });
    });

    if (additional_prompts.length === MAX_ADDITIONAL_PROMPTS) {
      addMoreButton.disabled = true;
    }
  });
}

function insertAdditionalStarterPrompt (props) {
  const { 
    newForm, 
    addMoreButton, 
    index, 
    savedValue
  } = props;

  const fieldset = createNewElement({
    elementType: 'fieldset',
    staticProps: { className: 'w-full' }
  });
  
  const legend = createNewElement({
    elementType: 'legend',
    staticProps: { textContent: 'Starter Prompt' },
    appendTo: fieldset
  });
  
  const starterName = createNewElement({
    elementType: 'input',
    staticProps: {
      name: `additional_prompt_${index}_name`,
      placeholder: 'Starter Prompt Name',
      required: true,
      className: 'dark:bg-transparent mb-1 border border-gray-400'
    },
    appendTo: fieldset
  });
  
  const starterMessage = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: `additional_prompt_${index}_message`,
      placeholder: 'Starter Prompt',
      required: true,
      className: 'w-full dark:bg-transparent mb-1'
    },
    appendTo: fieldset
  });  

  if (savedValue) {
    starterName.value = savedValue.name;
    starterMessage.value = savedValue.message; 
  }

  newForm.insertBefore(fieldset, addMoreButton);
}
