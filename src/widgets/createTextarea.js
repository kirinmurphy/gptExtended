
async function createTextarea(props) {
  
  const {
    name,
    savedFormDataKey,
    labelText,
    appendTo,
    onAfterLoad,
    inputHandler,
    focusHandler,
    blurHandler
  } = props;

  console.log('props', props);
  
  const textarea = createNewElement({
    elementType: 'textarea',
    staticProps: {
      name: name,
      className: 'w-full mb-1'
    }
  });

  const formData = await asyncLoad(savedFormDataKey);
  if ( formData ) { textarea.value = formData[textarea.name]; }

  adjustTextareaHeight(textarea);

  const label = createNewElement({
    elementType: 'label',
    staticProps: {
      textContent: labelText
    },
    appendTo,
    append: [textarea]
  });

  if (onAfterLoad) {
    onAfterLoad({ label, textarea, value: formData[textarea.name] });
  }

  if (inputHandler) {
    textarea.addEventListener('input', inputHandler);
  }

  if (focusHandler) {
    console.log('focusHandler for', labelText);
    textarea.addEventListener('focus', focusHandler);
  }

  if (blurHandler) {
    textarea.addEventListener('blur', blurHandler);
  }

  return label;
}
