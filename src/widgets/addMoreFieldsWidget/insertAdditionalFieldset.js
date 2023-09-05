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
  
  const starterName = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'text',
      name: `additional_option_${index}_name`,
      placeholder: label,
      required: true,
      value: !!savedValue ? savedValue.name : null
    },
    clickHandler: (event) => {
      if ( !fullScreenEditor ) return;
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
  });

  nameFieldCallback && nameFieldCallback(starterName);

  const starterMessage = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: `additional_option_${index}_message`,
      placeholder: message,
      required: true,
      className: 'w-full mb-1',
      value: !!savedValue ? savedValue.message : null
    }
  });

  adjustTextareaHeight(starterMessage);

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
    append: [hiddenInput, starterName, removeButton, starterMessage]
  }); 

  newForm.insertBefore(fieldset, addMoreButtonWrapper);

  checkForDuplicateFieldEntries(starterName, removeButton);
}