async function observeChatState() {
  const interval = 1000; // 1 second interval
  let presetReverted = false;

  async function poll() {
    const headerElement = document.querySelector('header.sticky');
    const promptEditorWrapper = document.querySelector('.promptEditorWrapper');
    const activePromptMessage = document.querySelector('.activePromptMessage');
    const gptExtendedWrapper = document.querySelector('.gptExtendedWrapper');

    if ( promptEditorWrapper ) {
      if ( headerElement ) {        
        promptEditorWrapper.style.display = 'none';
        activePromptMessage.removeAttribute('style');
      } else {
        promptEditorWrapper.removeAttribute('style');
        activePromptMessage.style.display = 'none';
      }
    }

    if ( !gptExtendedWrapper ) {
      const { promptPresetWrapper, clipboardWrapper } = initGptExtended();

      await observePromptMessage({ clipboardWrapper });

      if ( !headerElement ) {
        const promptPresetWidget = document.querySelector('.promptPresetWidgetWrapper');        
        if ( !promptPresetWidget ) { await initStarterPromptWidget({ promptPresetWrapper }); }
      }
    }

    setTimeout(poll, interval);
  }

  await poll();

  observePromptFormReadded();
}
