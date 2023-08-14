async function loadPresetSelector ({ presetSelectorWrapper, additionalPrompts }) {

  const presetSelector = createNewElement({
    elementType: 'select',
    staticProps: { name: 'presetSelector', className: 'presetSelector' },
    appendTo: presetSelectorWrapper
  });

  presetSelector.addEventListener('change', async function() {
    const selectedValue = presetSelector.value;
    chrome.storage.local.set({'selectedPreset': selectedValue}, function() {
      console.log('Selected value saved');
    });

    const formData = await asyncLoad('formData');
    await postPresets({ data: formData, selectedValue });
  });
   
  createNewElement({
    elementType: 'option',
    staticProps: { value: 'default', text: 'Default Prompt' },
    appendTo: presetSelector
  });

  additionalPrompts.forEach(prompt => {
    createNewElement({
      elementType: 'option',
      staticProps: { value: prompt.uuid, text: prompt.name },
      appendTo: presetSelector
    });
  });

  const presetValue = await setSelectedPresetValue();
  presetSelector.value = presetValue;
}

async function setSelectedPresetValue () {
 
  const selectedPreset = await asyncLoad('selectedPreset');
  return selectedPreset || 'default';
}
