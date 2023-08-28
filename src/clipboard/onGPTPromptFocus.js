
async function onGPTPromptFocus ({ textarea, keyupListener }) {
  if (keyupListener) {
    textarea.removeEventListener('keyup', keyupListener);
  }

  const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
  const replacements = clipboardData?.[CLIPBOARD_ADDITIONAL_FIELDS_KEY]?.slice()
    .sort((a, b) => b.name.length - a.name.length) || [];

  keyupListener = debounce(() => {
    checkForKeywordInPrompt({ replacements, textarea });
  }, DEBOUNCE_TIMEOUT);

  textarea.addEventListener('keyup', keyupListener);

  textarea.addEventListener('keyup', () => {
    console.log('keyuppin');
    const partialMatchers = getPartialMatchers({ textarea, replacements });
    const keywordMatcherDiv = placeDivAboveCursor(textarea);

    console.log('partialMatchers', partialMatchers);

    if ( !!partialMatchers.length ) {
      keywordMatcherDiv.innerHTML = '';
      partialMatchers.forEach(matcher => {
        createNewElement({
          elementType: 'div',
          staticProps: {
            textContent: matcher
          },
          clickHandler: () => {

          },
          appendTo: keywordMatcherDiv
        });
      });  
    } else {
      keywordMatcherDiv.parentNode.removeChild(keywordMatcherDiv);
    }
  });
}