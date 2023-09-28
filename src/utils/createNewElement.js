function createNewElement(props) {
  const {
    elementType,
    staticProps,
    clickHandler,
    blurHandler,
    appendTo,
    append
   } = props;

  const element = document.createElement(elementType);
  Object.assign(element, staticProps);

  if ( staticProps?.style ) {
    for (const [key, value] of Object.entries(staticProps.style)) {
      element.style[key] = value;
    }
  }
  
  if (clickHandler) {
    element.addEventListener('click', clickHandler);
  }

  if (blurHandler) {
    element.addEventListener('blur', blurHandler);
  }

  if ( appendTo ) {
    appendTo.appendChild(element);
  }

  if ( append ) {
    append.forEach(childElement => { 
      childElement && element.appendChild(childElement);
    });
  }

  return element;
}
