function createPopupFormWidget(props) {
  const { 
    parent, 
    title,
    tagline,
    toggleText, 
    createPopupFormFields, 
    saveAction, 
    fullScreenEditor
  } = props;

  const popupFormToggle = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: toggleText,
      className: 'popupFormToggle'
    },
    clickHandler: async function (e) {
      const newFormOverlay = createNewElement({
        elementType: 'div',
        staticProps: { className: 'form-overlay' },
        appendTo: parent,
        clickHandler: (e) => {
          closeForm();
        }
      });

      const dynamicPopupClass = fullScreenEditor ? 'fullScreenEditor' : '';

      const newFormWrapper = createNewElement({
        elementType: 'div',
        staticProps: {
          className: `popupFormWrapper ${dynamicPopupClass}`
        },
        appendTo: parent
      });

      const newForm = createNewElement({
        elementType: 'form',
        staticProps: {
          className: 'popupForm'
        },
        appendTo: newFormWrapper
      });

      createHeader ({ newForm, newFormWrapper, title, tagline, closeForm });

      const formFieldWrapper = createNewElement({
        elementType: 'div',
        staticProps: {
          className: 'formFieldWrapper'
        },
        appendTo: newForm
      });

      const formFieldWrapperInner = createNewElement({
        elementType: 'div',
        staticProps: {
          className: 'formFieldWrapperInner'
        },
        appendTo: formFieldWrapper
      });

      await createPopupFormFields({ 
        newForm: formFieldWrapperInner,
        parent
      });

      createActionsFooter({ newForm, closeForm, saveAction }); 

      popupFormToggle.style.display = 'none';  

      function closeForm () {
        newFormWrapper.parentNode.removeChild(newFormWrapper);
        newFormOverlay.parentNode.removeChild(newFormOverlay);
        popupFormToggle.removeAttribute('style');
      }
    }
  });

  const popupFormToggleWrapper = createNewElement({ 
    elementType: 'div',
    append: [popupFormToggle],
    appendTo: parent
  });

  return popupFormToggleWrapper;
}

function createHeader ({ newForm, title, tagline, closeForm }) {
  const header = createNewElement({
    elementType: 'header',
    appendTo: newForm
  });  

  createNewElement({
    elementType: 'h3',
    staticProps: { textContent: title },
    appendTo: header
  });  

  if ( tagline ) {
    createNewElement({
      elementType: 'div',
      staticProps: { 
        className: 'tagline',
        innerHTML: tagline 
      },
      appendTo: header
    });  
  }

  createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: '×',
      className: 'remove-button'
    },
    clickHandler: (e) => { 
      closeForm();
    },
    appendTo: header
  });
}
