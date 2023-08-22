function initGptExtended () {
  const forms = document.getElementsByTagName('form');
  const lastForm = forms[forms.length - 1];

  const promptPresetWrapper = createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'promptPresetWrapper'
    }
  });

  const clipboardWrapper = createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'clipboardWrapper'
    }
  });

  const gptExtendedWrapper = createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'gptExtendedWrapper xl:max-w-3xl lg:max-w-2xl lg:mx-auto'
    },
    append: [promptPresetWrapper, clipboardWrapper]
  });

  lastForm.parentNode.insertBefore(gptExtendedWrapper, lastForm.nextSibling);  

  return { promptPresetWrapper, clipboardWrapper };
}
