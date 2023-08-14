
async function initStarterPromptWidget () {
  const forms = document.getElementsByTagName('form');
  const lastForm = forms[forms.length - 1];

  const presetSelector = await createPresetSelector();
  const promptPresetWidget = createPromptPresetWidget();

  const promptEditorWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'promptEditorWrapper'
    },
    append: [presetSelector, promptPresetWidget]
  });

  promptEditorWrapper.style.display = 'none';

  const activePromptMessage = await createActivePromptMessage();

  const widgetWrapper = createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'promptPresetWidgetWrapper xl:max-w-3xl lg:max-w-2xl lg:mx-auto'
    },
    append:[promptEditorWrapper, activePromptMessage] 
  });

  lastForm.parentNode.insertBefore(widgetWrapper, lastForm.nextSibling);
}
