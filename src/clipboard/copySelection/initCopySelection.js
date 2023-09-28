function initCopySelection() {
  document.addEventListener('mouseup', (event) => {
    const selection = window.getSelection();

    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    if (range.startOffset === range.endOffset) return;

    let node = range.commonAncestorContainer;

    while (node !== null) {
      if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('group')) {
        const clonedSelection = range.cloneContents();

        const selectionContent = createNewElement({
          elementType: 'div',
          staticProps: {
            className: 'copiedSelectionContents',
          },
          append: [clonedSelection]
        });

        const copyToClipboardForm = getSnippetClipboardForm({
          snippetContainer: selectionContent, 
          onAfterSaveCallback: () => {
            setTimeout(() => { selectionContainer.remove(); }, 1000);
          } 
        });

        const selectionContainer = createNewElement({
          elementType: 'div',
          staticProps: {
            className: 'copiedSelectionTooltip'
          },
          append: [selectionContent, copyToClipboardForm],
          appendTo: document.body
        });

        Object.assign(selectionContainer.style, {
          position: 'absolute',
          right: '1rem',
          bottom: '1rem',
          zIndex: '1000'
        });

        setTimeout(() => {
          document.addEventListener('click', function outsideClickListener(event) {
            if (!selectionContainer.contains(event.target)) {
              selectionContainer.remove();
              document.removeEventListener('click', outsideClickListener);
            }
          });
        }, 50);

        break;
      }
      node = node.parentNode;
    }
  });
}
