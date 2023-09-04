function findScrollingAncestor(element) {
  while (element) {
    if (element.scrollHeight > element.clientHeight || 
        element.scrollWidth > element.clientWidth) {
      return element;
    }
    element = element.parentElement;
  }
  return null;
}
