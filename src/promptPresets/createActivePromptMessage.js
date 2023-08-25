async function createActivePromptMessage () {  
  const message = createNewElement({
    elementType: 'div',
    staticProps: {
      textContent: '',
      className: 'activePromptMessage'
    }
  });

  message.style.display = 'none';

  chrome.storage.onChanged.addListener(async function(changes, namespace) {
    if ( !changes.selectedPreset ) { return; }
    const selectedPreset = changes.selectedPreset.newValue;
    const { additional_prompts } = await asyncLoad('formData') || {};
    const selectionName = additional_prompts?.filter(({ uuid }) => uuid === selectedPreset)[0]?.name;
  
    const hasAdditionalPromptActiveMessage = !!selectedPreset 
      && selectedPreset !== 'default'
      && !!selectionName;
  
    message.textContent = hasAdditionalPromptActiveMessage ? `using ${selectionName} prompt` : '';
  });

  return message;
}
