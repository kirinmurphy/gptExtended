
async function initStarterPromptWidget ({ promptPresetWrapper }) {
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

  createNewElement({ 
    elementType: 'div', 
    staticProps: {
      className: 'promptPresetWidgetWrapper'
    },
    appendTo: promptPresetWrapper,
    append:[promptEditorWrapper, activePromptMessage] 
  });
}
