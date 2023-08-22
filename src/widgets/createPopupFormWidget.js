
function createPopupFormWidget(props) {
  const { 
    parent, 
    title,
    tagline,
    toggleText, 
    createPopupFormFields, 
    saveAction 
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
          closeForm(newForm);
        }
      });

      const newForm = createNewElement({
        elementType: 'form',
        staticProps: {
          className: 'popupForm lg:mx-auto'
        },
        appendTo: parent
      });

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

      function closeForm (newForm) {
        newForm.parentNode.removeChild(newForm);
        newFormOverlay.parentNode.removeChild(newFormOverlay);
        popupFormToggle.removeAttribute('style');
      }
    
      await createPopupFormFields({ 
        newForm,
        appendTo: parent
      });

      createActionsFooter({ newForm, closeForm, saveAction }); 

      popupFormToggle.style.display = 'none';  
    }
  });

  const popupFormToggleWrapper = createNewElement({ 
    elementType: 'div',
    append: [popupFormToggle],
    appendTo: parent
  });

  return popupFormToggleWrapper;
}