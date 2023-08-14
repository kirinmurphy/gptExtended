async function createActivePromptMessage () {
  const selectedPreset = await asyncLoad('selectedPreset');  
  const { additional_prompts } = await asyncLoad('formData');
  const selectionName = additional_prompts.filter(({ uuid }) => uuid === selectedPreset)[0]?.name;

  const hasAdditionalPromptActiveMessage = !!selectedPreset 
    && selectedPreset !== 'default'
    && !!selectionName;

  const textContent = hasAdditionalPromptActiveMessage ? `using ${selectionName} prompt` : '';
  
  const message = createNewElement({
    elementType: 'div',
    staticProps: {
      textContent,
      className: 'activePromptMessage'
    }
  });

  message.style.display = 'none';

  return message;
}
