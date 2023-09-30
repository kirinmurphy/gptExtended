
function checkMaxLengthIfRequired(props) {
  const { newForm, fieldset, fieldMessage, removeButton } = props;

  checkMaxLength({ 
    newForm,
    textarea: fieldMessage,
    otherFieldValueLengthAttribute: 'data-base-response-prompt-length',
    onAfterLoad: ({ maxLengthMessage }) => {
      setLargestTextareaLength(newForm);
      fieldset.insertBefore(maxLengthMessage, removeButton);
    },
    onBlurCallback: () => {
      setLargestTextareaLength(newForm);
    }
  });
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

