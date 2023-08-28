const DEBOUNCE_TIMEOUT = 500;

async function observePromptMessage ({ clipboardWrapper }) {
  const textarea = document.querySelector('main form:first-of-type textarea');
  let keyupListener;

  if (document.activeElement === textarea) {
    await onGPTPromptFocus({ textarea, keyupListener });
  }
 
  textarea.addEventListener('focus', async () => {
    await onGPTPromptFocus({ textarea, keyupListener });
  });

  createClipboardWidget({ clipboardWrapper });
  initCodeSnippetObserver();
};

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

function checkForKeywordInPrompt ({ replacements, textarea }) {
  if (replacements.length) {
    const newValue = getPromptWithReplacedClipboardText(textarea.value, replacements);

    if (textarea.value !== newValue) {
      textarea.value = newValue;
      simulateKeyPress(textarea, { key: ' ' });
      textarea.scrollTop = textarea.scrollHeight;
    } 
  }
}

function getPromptWithReplacedClipboardText (prompt, replacements) {
  return replacements.reduce((updatedMessage, { name, message }) => {
    const keywordExists = !!message && updatedMessage.includes(name);
    const separator = '--------------------------------------------------------------------';
    const newReplacement = `\n${separator}\n${message}\n${separator}\n`;
    return keywordExists ? updatedMessage.split(name).join(newReplacement) : updatedMessage;
  }, prompt);
};

function getPartialMatchers({ textarea, replacements }) {
  const text = textarea.value;
  const regex = /#([a-zA-Z0-9-_]+)$/;
  const match = regex.exec(text);  

  const lastMatch = match ? match[1] : null;
  const names = replacements.map(replacement => replacement.name);

  const filteredNames = lastMatch ? 
    names.filter(name => name.startsWith(`#${lastMatch}`) && name !== `#${lastMatch}`) :
    [];

  return filteredNames;
}
