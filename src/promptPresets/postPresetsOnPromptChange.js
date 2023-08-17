async function postPresetsOnPromptChange ({ selectedPreset }) {
  return await new Promise(resolve => {
    chrome.storage.local.set({'selectedPreset': selectedPreset}, async function() {
      const formData = await asyncLoad('formData');
      await postPresets({ data: formData, selectedValue: selectedPreset });      
      console.log('Selected value saved', selectedPreset);
      resolve();
    });
  });
}
