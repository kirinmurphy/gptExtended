function insertAdditionalFieldset (props) {
  const { 
    newForm, 
    addMoreButtonWrapper, 
    index, 
    savedValue,
    formFieldText: { label, message },
    nameFieldCallback,
    fullScreenEditor
  } = props;

  const hiddenInput = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'hidden',
      name: `additional_option_${index}_uuid`,
      value: savedValue?.uuid || generateUUID()
    }
  });
  
  const fieldLabel = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'text',
      name: `additional_option_${index}_name`,
      placeholder: label,
      required: true,
      value: !!savedValue ? savedValue.name : null,
      tabIndex: ((index*3)+1).toString()
    },
    clickHandler: (event) => {
      if ( fullScreenEditor ) { setActiveElementState({ event }); }
    }
  });

  fieldLabel.addEventListener('keyup', (event) => {
    setAddMoreButtonDisabledState({ newForm });
  });

  nameFieldCallback && nameFieldCallback(fieldLabel);

  const fieldMessage = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: `additional_option_${index}_message`,
      placeholder: message,
      required: true,
      className: 'w-full mb-1',
      value: !!savedValue ? savedValue.message : null,
      tabIndex: ((index*3)+2).toString()
    }
  });

  if ( !fullScreenEditor ) {
    adjustTextareaHeight(fieldMessage);
  }

  const removeButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: '×',
      className: 'remove-button',
      tabIndex: ((index*3)+3).toString()
    },
    clickHandler: (event) => { 
      event.preventDefault();
      const button = event.target;
      const item = button.closest('fieldset');
      item.parentNode.removeChild(item);
      setAddMoreButtonDisabledState({ newForm });
    }
  });

  const fieldset = createNewElement({
    elementType: 'fieldset',
    staticProps: { className: 'w-full' },
    append: [hiddenInput, fieldLabel, removeButton, fieldMessage]
  }); 

  newForm.insertBefore(fieldset, addMoreButtonWrapper);

  checkForDuplicateFieldEntries(fieldLabel, removeButton);
}

function setActiveElementState ({ event }) {
  const parentFieldset = event.target.closest('fieldset');
  if ( parentFieldset.classList.contains('active') ) { return; }
  
  const form = event.target.closest('form');
  const activeFieldset = form.querySelector('fieldset.active');
  if (activeFieldset) {
    activeFieldset.classList.remove('active');
  }
  parentFieldset.classList.add('active');
  parentFieldset.querySelector('textarea').focus();
}

function setAddMoreButtonDisabledState({ newForm }) {
  const textInputs = Array.from(newForm.querySelectorAll('input[type="text"]'));
  const addMoreButton = newForm.querySelector('.addMoreButton');
  
  const hasEmptyInput = textInputs.some(input => input.value === '');
  addMoreButton.disabled = hasEmptyInput;
}
