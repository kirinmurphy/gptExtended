
function addMaxLengthCheckIfRequired(props) {
  const { newForm, fieldset, fieldMessage, removeButton } = props;

  const maxResponseLength = newForm.getAttribute('data-max-response-length');
  const baseResponsePromptLemgth = newForm.getAttribute('data-base-response-prompt-length');
  
  if ( !maxResponseLength || !baseResponsePromptLemgth ) return; 

  setLargestTextareaLength(newForm);

  const maxLengthMessage = createNewElement({
    elementType: 'span',
    staticProps: {
      className: 'max-length-message',
      textContent: ''
    }
  });
  
  fieldMessage.addEventListener('focus', (e) => {
    const baseResponsePromptLemgth = newForm.getAttribute('data-base-response-prompt-length');
    const availableMaxLength = maxResponseLength - baseResponsePromptLemgth;
    fieldMessage.setAttribute('maxLength', availableMaxLength);
    const atMaxLength = e.target.value.length >= availableMaxLength;
    maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
});  

  fieldMessage.addEventListener('input', (e) => {
    const availableMaxLength = parseInt(fieldMessage.getAttribute('maxLength'), 10);
    const atMaxLength = e.target.value.length >= availableMaxLength;
    maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
});  

  fieldMessage.addEventListener('blur', (e) => {
    setLargestTextareaLength(newForm);
    maxLengthMessage.textContent = '';
  });

  fieldset.insertBefore(maxLengthMessage, removeButton);
}

function setLargestTextareaLength(newForm) {
  const textareas = Array.from(newForm.querySelectorAll('textarea'));
  const matchingTextareas = textareas.filter(textarea => /^additional_option_\d+_message$/.test(textarea.name));
  
  const lengths = matchingTextareas.map(textarea => {
    const valueLength = textarea.value.length;
    return valueLength;
  });

  const largestLength = Math.max(...lengths);

  newForm.setAttribute('data-max-additional-response-prompt-length', largestLength);
}

