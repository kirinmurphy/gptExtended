const observePromptFormReadded = () => {
  const handleWrapper = (form, action) => {
    const wrapper = document.querySelector('div.gptExtendedWrapper');
    if (wrapper) {
      if (action === 'hide') {
        wrapper.style.display = 'none';
      } else if (action === 'show') {
        form.insertAdjacentElement('afterend', wrapper);
        wrapper.style.display = 'block';
      }
    }
  };

  const findForm = (nodes, id) => {
    return Array.from(nodes).find(node =>
      node.tagName === 'FORM' && node.querySelector(id)
    );
  };

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        const removedForm = findForm(mutation.removedNodes, '#prompt-textarea');
        if (removedForm) {
          handleWrapper(null, 'hide');
        }

        const addedForm = findForm(mutation.addedNodes, '#prompt-textarea');
        if (addedForm) {
          handleWrapper(addedForm, 'show');
        }
      }
    });
  });

  const config = {
    childList: true,
    subtree: true
  };

  observer.observe(document.body, config);
};
