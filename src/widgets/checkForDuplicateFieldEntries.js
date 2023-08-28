const ERROR_CLASS_NAME = 'errors';

function checkForDuplicateFieldEntries(inputField) {
  inputField.addEventListener('blur', function() {
    const form = inputField.closest('form');
    const saveButton = form && form.querySelector('.submitForm');
    const inputs = [...form.querySelectorAll('input[type="text"]')];
    if (inputs.some(otherInput => otherInput !== inputField && otherInput.value === inputField.value)) {
      const errorDiv = document.createElement('div');
      errorDiv.className = ERROR_CLASS_NAME;
      errorDiv.textContent = 'This name already exists.';
      inputField.insertAdjacentElement('afterend', errorDiv);
      saveButton.disabled = true;
    }
  });

  inputField.addEventListener('keyup', function() {
    const form = inputField.closest('form');
    const saveButton = form && form.querySelector('.submitForm');
    const parentFieldset = inputField.closest('fieldset');
    const existingErrorDiv = parentFieldset ? parentFieldset.querySelector(`.${ERROR_CLASS_NAME}`) : null;
    if (existingErrorDiv) { existingErrorDiv.remove(); }
    saveButton.disabled = false;
  });
}
