async function saveSnippetToClipboard ({ codeElement, input, form, formWrapper }) {
  const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY) || {};
  const additionalFields = clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY] || [];

  const codeSnippet = codeElement.querySelector('code').innerText;
  const trimmedCodeSnippet = codeSnippet.replace(/[\r\n]+$/, '')

  const inputValue = input.value;

  try {
    const isNameDuplicate = additionalFields.some(field => field.name === inputValue);
    if (isNameDuplicate) { throw new Error("DuplicateName"); }

    const newClipboardItem = {
      message: trimmedCodeSnippet,
      name: inputValue,
      uuid: generateUUID()
    };

    clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY] = additionalFields?.length 
      ? [...additionalFields, newClipboardItem] 
      : [newClipboardItem];

    saveFormObject({ 
      formStorageKey: CLIPBOARD_FORM_DATA_KEY, 
      formattedFormData: clipboardData
    });
    
  } catch (error) {
    if (error.message === "DuplicateName") {
      createNewElement({
        elementType: 'div',
        staticProps: {
          className: 'errors',
          innerHTML: "This clipboard name already exists. <a href=''>Replace</a>"
        },
        appendTo: form,
        clickHandler: (e) => {
          if (e.target.tagName === 'A') {
            e.preventDefault(); 

            clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY] = additionalFields.map(field => {
              if ( field.name === inputValue ) { field.message = trimmedCodeSnippet; }
              return field;
            });
        
            saveFormObject({ 
              formStorageKey: CLIPBOARD_FORM_DATA_KEY, 
              formattedFormData: clipboardData
            });

            triggerFormSuccessState({ form, inputValue, formWrapper });
          }
        }
      });
    }
    return;    
  }

  triggerFormSuccessState({ form, inputValue, formWrapper });
}

function triggerFormSuccessState ({ form, inputValue, formWrapper }) {
  form.parentNode.removeChild(form);

  const messageDiv = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'savedMessage',
      innerHTML: `${inputValue} saved to <a>clipboard</a>`
    },
    appendTo: formWrapper,
    clickHandler: (e) => {
      const clipboardPopupToggle = document.querySelector('.clipboardWrapper .popupFormToggle');
      clipboardPopupToggle.click();
    }
  });
}