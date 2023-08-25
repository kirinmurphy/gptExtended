function initCodeSnippetObserver () {
  const mainElement = document.querySelector('main');

  const observerConfig = {
    childList: true,
    subtree: true
  };

  const mutationCallback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(addedNode => {
          if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.tagName === 'PRE') {
            createInjectedCodeClipboardForm(addedNode);
          }
        });
      }
    });
  };

  const observer = new MutationObserver(mutationCallback);
  observer.observe(mainElement, observerConfig);
} 
