function getSelectionCopyFormPositioning (event, selectionContainer) {
  if (!selectionContainer) return;

  const spaceBelow = window.innerHeight - event.clientY;
  const spaceRight = window.innerWidth - event.clientX;
  const containerHeight = selectionContainer.offsetHeight;
  const containerWidth = selectionContainer.offsetWidth;

  const top = containerHeight > spaceBelow 
    ? `${event.clientY - containerHeight - window.scrollY}px`
    : `${event.clientY + window.scrollY}px`;

  const left = containerWidth > spaceRight 
    ? `${event.clientX - containerWidth - window.scrollX}px`
    : `${event.clientX + window.scrollX}px`;

  return {
    position: 'absolute',
    top,
    left,
    zIndex: '1000'
  };
}
