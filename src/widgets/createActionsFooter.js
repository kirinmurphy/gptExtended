function createActionsFooter ({ newForm, closeForm, saveAction }) {
  const saveButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Save',
      className: 'btn btn-primary'
    },
    clickHandler: function (e) {
      e.preventDefault();
      saveAction({ newForm });
      closeForm(newForm);
    }
  });

  const cancelButton = createNewElement({
    elementType: 'button',
    staticProps: {
      textContent: 'Cancel',
      className: 'btn btn-neutral'
    },
    clickHandler: function (e) {
      e.preventDefault();
      closeForm(newForm);
    }
  });
  
  const actionsFooter = createNewElement({
    elementType: 'div',
    staticProps: { className: 'formActionsFooter text-right' },
    append: [saveButton, cancelButton]
  });

  newForm.appendChild(actionsFooter);
}