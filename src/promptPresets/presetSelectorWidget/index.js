async function createPresetSelector () {
  const selectedPreset = await asyncLoad('selectedPreset');
  if ( !!selectedPreset && selectedPreset !== DEFAULT_UUID ) {
    await postPresetsOnPromptChange({ selectedPreset: DEFAULT_UUID });
  }

  const presetSelectorWrapper = createNewElement({
    elementType: 'div',
    staticProps: { className: 'presetSelectorWrapper' },
  });

  const formData = await asyncLoad('formData');

  const additionalPrompts = formData?.additional_prompts;
  if ( !!additionalPrompts?.length ) { 
    loadPresetSelector({ presetSelectorWrapper, additionalPrompts });
  }

  return presetSelectorWrapper;
}
