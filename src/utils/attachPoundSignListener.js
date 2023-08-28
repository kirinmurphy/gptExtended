function attachPoundSignListener(inputElement, buttonElement) {
  inputElement.addEventListener('input', () => {
    if (inputElement.value === '#') {
      inputElement.value = '';
    }
    else if (inputElement.value && !inputElement.value.startsWith('#')) {
      inputElement.value = '#' + inputElement.value;
    }

    if ( buttonElement ) {
      buttonElement.disabled = !inputElement.value;
    }
  });
}
