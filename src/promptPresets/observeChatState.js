async function observeChatState({ promptPresetWrapper }) {
  const interval = 1000; // 1 second interval

  async function poll() {
    const headerElement = document.querySelector('header.sticky');
    const promptEditorWrapper = document.querySelector('.promptEditorWrapper');
    const activePromptMessage = document.querySelector('.activePromptMessage');

    if ( promptEditorWrapper ) {
      if ( headerElement ) {        
        promptEditorWrapper.style.display = 'none';
        activePromptMessage.removeAttribute('style');
      } else {
        promptEditorWrapper.removeAttribute('style');
        activePromptMessage.style.display = 'none';
      }
    }

    if ( !headerElement ) {
      const promptPresetWidget = document.querySelector('.promptPresetWidgetWrapper');        
      if ( !promptPresetWidget ) { await initStarterPromptWidget({ promptPresetWrapper }); }
    }

    setTimeout(poll, interval);
  }

  await poll();
}
