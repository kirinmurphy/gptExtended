async function triggerDefaultFirstField ({ parent }) {
  const clipboardData = await asyncLoad(CLIPBOARD_FORM_DATA_KEY) || {};
  const existingFields = clipboardData[CLIPBOARD_ADDITIONAL_FIELDS_KEY];
  if ( !existingFields?.length ) {
    const addMoreButton = parent.querySelector('.addMoreButton');
    if (addMoreButton) { addMoreButton.click(); }
  }

  if ( !existingFields?.length || existingFields?.length === 1 ) {
    replaceRemoveWithClear({ parent });
  }

  parent.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-button')) {
      if ( parent.querySelectorAll('fieldset').length === 1 ) {
        replaceRemoveWithClear({ parent });
      }
    }

    if (e.target.classList.contains('addMoreButton')) {
      const firstFieldset = parent.querySelector('fieldset');
      updateRemoveButtonDisplayState({ firstFieldset, displayState: "inline-block" });
      firstFieldset.querySelector('.clearField')?.remove();
    }
  });
}

function replaceRemoveWithClear ({ parent }) {
  const firstFieldset = parent.querySelector('fieldset');
  updateRemoveButtonDisplayState({ firstFieldset, displayState: "none" });
  createNewElement({
    elementType: 'div',
    staticProps: {
      textContent: 'clear',
      className: 'clearField'
    },
    clickHandler: (e) => {
      firstFieldset.querySelector('input[type="text"]').value = "";
      firstFieldset.querySelector('textarea').value = "";
    },
    appendTo: firstFieldset
  });
}

function updateRemoveButtonDisplayState({ firstFieldset, displayState }) {
  const firstFieldsetRemoveButton = firstFieldset.querySelector('.remove-button');
  firstFieldsetRemoveButton.style.display = displayState;  
}
