const ALREADY_ADDED_CLASS = 'codeAlreadyAdded';

function createInjectedCodeClipboardForm(codeElement) { 
  const hasClass = codeElement.classList.contains(ALREADY_ADDED_CLASS);
  if ( hasClass ) { return; }

  codeElement.classList.add(ALREADY_ADDED_CLASS);

  const formWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'addCodeToClipboardFormWrapper'
    }
  });

  const message = createNewElement({
    elementType: 'span',
    staticProps: {
      textContent: 'Save code to clipboard'
    }   
  });

  const input = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'text',
      placeholder: '#keyword'
    }
  });

  const button = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Save',
      className: 'btn btn-primary',
      disabled: true
    }
  });

  input.addEventListener('input', () => {
    button.disabled = !input.value;
  });

  button.addEventListener('click', async () => {
    button.disabled = true;
    await saveSnippetToClipboard({ codeElement, input, form, formWrapper });
  });

  const form = createNewElement({
    elementType: 'form',
    append: [message, input, button],
    appendTo: formWrapper
  });

  setTimeout(() => {
    codeElement.insertAdjacentElement('afterend', formWrapper);
  }, 1000);
}
