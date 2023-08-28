async function saveSnippetToClipboard ({ codeElement, input, form, formWrapper }) {

  try {
    const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY) || {};
    const additionalFields = clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY];
    const codeSnippet = codeElement.querySelector('code').innerText;
    const trimmedCodeSnippet = codeSnippet.replace(/[\r\n]+$/, '')
    const newClipboardItem = {
      message: trimmedCodeSnippet,
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
}