function createNewElement({ elementType, staticProps, clickHandler, appendTo }) {
  const element = document.createElement(elementType);
  Object.assign(element, staticProps);

  console.log(elementType, staticProps);
  
  if (clickHandler) {
    element.addEventListener('click', clickHandler);
  }

  if ( appendTo ) {
    appendTo.appendChild(element);
  }

  // if ( append ) {
  //   append.forEach(childElement => { 
  //     element.appendChild(childElement);
  //   });
  // }

  return element;
}
