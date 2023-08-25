function createInjectedCodeClipboardForm(codeElement) {
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

    try {
      console.log('CBD hello');
      const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY) || {};
      const additionalFields = clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY];
      const codeSnippet = codeElement.querySelector('code').innerText;
      const newClipboardItem = {
        message: codeSnippet,
        name: input.value,
        uuid: generateUUID()
      };

      clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY] = additionalFields?.length 
        ? [...additionalFields, newClipboardItem] 
        : [newClipboardItem];


      saveFormObject({ 
        formStorageKey: CLIPBOARD_FORM_DATA_KEY, 
        formattedFormData: clipboardData
      });
    } catch (error) {}

    form.parentNode.removeChild(form);

    const messageDiv = createNewElement({
      elementType: 'div',
      staticProps: {
        className: 'savedMessage',
        innerHTML: `${input.value} saved to <a>clipboard</a>`
      },
      appendTo: formWrapper,
      clickHandler: (e) => {
        const clipboardPopupToggle = document.querySelector('.clipboardWrapper .popupFormToggle');
        clipboardPopupToggle.click();
      }
    });
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
