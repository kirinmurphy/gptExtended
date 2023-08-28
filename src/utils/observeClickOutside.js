const observeClickOutside = (() => {
  let currentListener = null;

  return (container, callback) => {
    if (currentListener) {
      document.body.removeEventListener('click', currentListener);
    }

    currentListener = (event) => {
      const closestElement = event.target.closest(container);
      if (!closestElement) {
        callback(event);
      }
    };

    document.body.addEventListener('click', currentListener);
  };
})();
