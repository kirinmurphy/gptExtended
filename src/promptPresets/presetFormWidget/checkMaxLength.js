const MAX_RESPONSE_LENGTH = 1500;

const MAX_LENGTH_MESSAGE_HTML = 'max character length reached <b>&#9432;</b>';
const TOOLTIP_MESSAGE = `The default response prompt combined with each additional prompt must be below ${MAX_RESPONSE_LENGTH} characters`;

function checkMaxLength(props) {
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
      innerHTML: '',
    }
  });

  const tooltip = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'tooltip',
      innerHTML: TOOLTIP_MESSAGE,
    }
  });

  maxLengthMessage.addEventListener('mouseover', () => {
    maxLengthMessage.appendChild(tooltip);
  });

  maxLengthMessage.addEventListener('mouseout', () => {
    maxLengthMessage.removeChild(tooltip);
  });

  textarea.addEventListener('focus', () => {
    const otherFieldValueLength = newForm.getAttribute(otherFieldValueLengthAttribute);
    const availableMaxLength = MAX_RESPONSE_LENGTH - otherFieldValueLength;
    textarea.setAttribute('maxLength', availableMaxLength);
    toggleMaxLengthMessage(textarea, availableMaxLength);
  });

  textarea.addEventListener('input', (e) => {
    const availableMaxLength = parseInt(textarea.getAttribute('maxLength'), 10);
    toggleMaxLengthMessage(textarea, availableMaxLength);
  });

  function toggleMaxLengthMessage (textarea, availableMaxLength) {
    const atMaxLength = textarea.value.length >= availableMaxLength;
    maxLengthMessage.innerHTML = atMaxLength ? MAX_LENGTH_MESSAGE_HTML : '';
  }

  textarea.addEventListener('blur', (e) => {
    onBlurCallback(textarea);
    maxLengthMessage.innerHTML = '';
  });

  onAfterLoad({ maxLengthMessage, textarea });
}

