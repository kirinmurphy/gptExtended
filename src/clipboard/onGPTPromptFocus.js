
async function onGPTPromptFocus ({ textarea, checkForKeywordListener, typeaheadListener }) {

  if (checkForKeywordListener) {
    textarea.removeEventListener('keyup', checkForKeywordListener);
  }

  if (typeaheadListener) {
    textarea.removeEventListener('keyup', typeaheadListener);
  }

  const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY);
  const replacements = clipboardData?.[CLIPBOARD_ADDITIONAL_FIELDS_KEY]?.slice()
    .sort((a, b) => b.name.length - a.name.length) || [];

  checkForKeywordListener = debounce(() => {
    checkForKeywordInPrompt({ replacements, textarea });
  }, DEBOUNCE_TIMEOUT);

  typeaheadListener = () => {
    const { lastMatch, filteredNames } = getPartialMatchers({ textarea, replacements });
    const keywordMatcherDiv = placeDivAboveCursor(textarea);

    if ( !!filteredNames.length ) {
      keywordMatcherDiv.innerHTML = '';
      filteredNames.forEach(matcher => {
        createNewElement({
          elementType: 'div',
          staticProps: {
            textContent: matcher
          },
          clickHandler: () => {
            replaceLastOccurrenceAndTriggerKeyup({ textarea, lastMatch: `#${lastMatch}`, matcher });
          },
          appendTo: keywordMatcherDiv
        });
      });  
    } else {
      keywordMatcherDiv.parentNode.removeChild(keywordMatcherDiv);
    }
  }

  textarea.addEventListener('keyup', checkForKeywordListener);
  textarea.addEventListener('keyup', typeaheadListener);
}

function getPartialMatchers({ textarea, replacements }) {
  const text = textarea.value;
  const cursorPosition = textarea.selectionStart;

  const textUpToCursor = text.substring(0, cursorPosition);

  const regex = /#([a-zA-Z0-9-_]*)$/; // Matching empty string after #
  const match = regex.exec(textUpToCursor);  

  const lastMatch = match ? match[1] : null;
  const names = replacements.map(replacement => replacement.name);

  const filteredNames = lastMatch === "" 
    ? names : lastMatch 
    ? names.filter(name => name.startsWith(`#${lastMatch}`) && name !== `#${lastMatch}`) : [];

  return { lastMatch, filteredNames };
}

function replaceLastOccurrenceAndTriggerKeyup({ textarea, lastMatch, matcher }) {
  const text = textarea.value;
  const cursorPosition = textarea.selectionStart;
  const textUpToCursor = text.substring(0, cursorPosition);
  const lastIndex = textUpToCursor.lastIndexOf(lastMatch);
  
  if (lastIndex !== -1) {
    const beforeMatch = text.substring(0, lastIndex);
    const afterMatch = text.substring(lastIndex + lastMatch.length);
    textarea.value = beforeMatch + matcher + afterMatch;
    triggerFakeKeyup(textarea);
    textarea.focus();
    setTimeout(() => {
      const startPosition = textarea.value.indexOf(afterMatch);
      if (startPosition !== -1) {
          textarea.setSelectionRange(startPosition, startPosition);
      }
    }, 500);

  }
}

function triggerFakeKeyup(element) {
  const event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: "Unidentified"
  });
  element.dispatchEvent(event);
}
