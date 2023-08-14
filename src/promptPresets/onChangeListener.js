chrome.storage.onChanged.addListener(async function(changes, namespace) {  
  if ( !changes.formData ) { return; }
  const additionalPrompts = changes.formData.newValue.additional_prompts;

  const presetSelectorWrapper = document.querySelector('.presetSelectorWrapper');

  while (presetSelectorWrapper.firstChild) {
    presetSelectorWrapper.removeChild(presetSelectorWrapper.firstChild);
  }
  
  if ( !!additionalPrompts.length ) {
    await loadPresetSelector({ presetSelectorWrapper, additionalPrompts });
  }
  
  const selectedPreset = await asyncLoad('selectedPreset');

  postPresets({ data: changes.formData.newValue, selectedValue: selectedPreset }); 
});
