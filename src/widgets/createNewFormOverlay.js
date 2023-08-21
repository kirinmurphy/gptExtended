function createFormOverlay () {
  return createNewElement({
    elementType: 'div',
    staticProps: { className: 'form-overlay' },
    appendTo: document.body
  });
}