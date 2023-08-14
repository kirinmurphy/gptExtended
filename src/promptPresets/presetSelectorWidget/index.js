async function createPresetSelector () {
  const presetSelectorWrapper = createNewElement({
    elementType: 'div',
    staticProps: { className: 'presetSelectorWrapper' },
  });

  const formData = await asyncLoad('formData');

  const additionalPrompts = formData.additional_prompts;
  if ( !!additionalPrompts.length ) { 
    loadPresetSelector({ presetSelectorWrapper, additionalPrompts });
  }

  return presetSelectorWrapper;
}
