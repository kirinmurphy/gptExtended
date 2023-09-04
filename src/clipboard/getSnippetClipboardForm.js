const ALREADY_ADDED_CLASS = 'codeAlreadyAdded';

function getSnippetClipboardForm({ snippetContainer, onAfterSaveCallback }) { 
  const hasClass = snippetContainer.classList.contains(ALREADY_ADDED_CLASS);
  if ( hasClass ) { return; }

  snippetContainer.classList.add(ALREADY_ADDED_CLASS);

  const formWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'addCodeToClipboardFormWrapper'
    }
  });

  const message = createNewElement({
    elementType: 'span',
    staticProps: {
      textContent: 'Save to clipboard'
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

  const input = createNewElement({
    elementType: 'input',
    staticProps: {
      type: 'text',
      placeholder: '#keyword'
    }
  });

  input.addEventListener('input', () => {
    button.disabled = !input.value;
  });

  input.addEventListener('keydown', (e) => {
    const parentForm = input.closest('form');    
    const errorElement = parentForm.querySelector('.errors');
    if (errorElement && e.key !== 'ENTER' ) { errorElement.remove(); }
  });

  attachPoundSignListener(input, button);  
  
  button.addEventListener('click', async () => {
    button.disabled = true;
    await saveSnippetToClipboard({
      snippetContainer, 
      input, 
      form, 
      formWrapper, 
      onAfterSaveCallback 
    });
  });

  const form = createNewElement({
    elementType: 'form',
    append: [message, input, button],
    appendTo: formWrapper
  });

  return formWrapper;
}
