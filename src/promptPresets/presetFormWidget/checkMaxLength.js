const MAX_RESPONSE_LENGTH = 20;

function checkMaxLength (props) {
  const { 
    newForm, 
    textarea, 
    otherFieldValueLengthAttribute, 
    onBlurCallback,
    onAfterLoad
  } = props;

  const maxLengthMessage = createNewElement({
    elementType: 'span',
    staticProps: {
      className: 'max-length-message',
      textContent: ''
    }
  });

  textarea.addEventListener('focus', () => {
    const otherFieldValueLength = newForm.getAttribute(otherFieldValueLengthAttribute);
    const availableMaxLength = MAX_RESPONSE_LENGTH - otherFieldValueLength;
    textarea.setAttribute('maxLength', availableMaxLength);
    const atMaxLength = textarea.value.length >= availableMaxLength;
    maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
  });  

  textarea.addEventListener('input', (e) => {
    const availableMaxLength = parseInt(textarea.getAttribute('maxLength'), 10);
    const atMaxLength = textarea.value.length >= availableMaxLength;
    maxLengthMessage.textContent = atMaxLength ? 'max text length reached' : '';
  });
  
  textarea.addEventListener('blur', (e) => {
    onBlurCallback(textarea);
    maxLengthMessage.textContent = '';
  });

  onAfterLoad({ maxLengthMessage, textarea });
}
