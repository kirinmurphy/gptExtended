const DEFAULT_UUID = 'default-uuid';

const defaultPromptOptions = {
  name: 'default',
  uuid: DEFAULT_UUID
};

async function loadPresetSelector ({ presetSelectorWrapper, additionalPrompts }) {
  observeClickOutside('.presetSelector', () => {
    presetSelectorWrapper.setAttribute('data-is-open', false);
  });
  
  const presetSelector = createNewElement({
    elementType: 'div',
    staticProps: { 
      className: 'presetSelector',
      textContent: await getPresetLabel({ additionalPrompts })
    },
    appendTo: presetSelectorWrapper,
    clickHandler: (e) => {
      const openState = presetSelectorWrapper.getAttribute('data-is-open');
      const newState = !openState || openState === 'false' ?  'true' : 'false';
      presetSelectorWrapper.setAttribute('data-is-open', newState);
    }
  });

  const presetOptionsWrapper = createNewElement({
    elementType: 'div',
    staticProps: {
      className: 'presetOptionsWrapper'
    },
    appendTo: presetSelectorWrapper
  });

  const options = [defaultPromptOptions, ...additionalPrompts];

  options.forEach(prompt => {
    createNewElement({
      elementType: 'div',
      staticProps: { 
        value: prompt.uuid, 
        textContent: `${prompt.name} prompt`
      },
      appendTo: presetOptionsWrapper,
      clickHandler: async (e) => {
        await postPresetsOnPromptChange({ selectedPreset: prompt.uuid });
        presetSelectorWrapper.setAttribute('data-is-open', false);
        presetSelector.textContent = await getPresetLabel({ additionalPrompts });    
      }
    });
  });   
}

async function getPresetLabel ({ additionalPrompts }) {
  const selectedValue = await asyncLoad('selectedPreset');
  const selectedPrompt = additionalPrompts.filter(({ uuid }) => uuid === selectedValue )[0];
  const promptName = selectedPrompt?.name || defaultPromptOptions.name;
  return `use ${promptName} prompt`;
}
