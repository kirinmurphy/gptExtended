function placeDivAboveCursor({ textarea, classNames }) {
  const VERTICAL_OFFSET = 40;
  const matchingSelector = '.' + classNames.replace(/ /g, '.') 
  let keywordMatcherDiv = document.querySelector(matchingSelector);

  if (!keywordMatcherDiv) {
    const { bottom, left } = getCursorCoordinates(textarea);

    keywordMatcherDiv = createNewElement({
      elementType: 'div',
      staticProps: {
        className: classNames,
        style: `position: absolute; bottom: ${bottom + VERTICAL_OFFSET}px; left: ${left}px;`
      },
      appendTo: textarea.parentElement
    });
  } else {
    const { bottom, left } = getCursorCoordinates(textarea);
    keywordMatcherDiv.style.bottom = `${bottom + VERTICAL_OFFSET}px`;
    keywordMatcherDiv.style.left = `${left}px`;
  }

  return keywordMatcherDiv;
}

function getCursorCoordinates(textarea) {
  const computedStyle = window.getComputedStyle(textarea);
  const lineHeight = parseFloat(computedStyle.lineHeight);
  
  // For left positioning: Measure the last line's width
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = computedStyle.fontSize + ' ' + computedStyle.fontFamily;
  
  const contentUptoCursor = textarea.value.slice(0, textarea.selectionEnd);
  const allLinesUptoCursor = contentUptoCursor.split('\n');
  const lastLineText = allLinesUptoCursor[allLinesUptoCursor.length - 1] || '';
  const lastLineWidth = context.measureText(lastLineText).width;

  const paddingWidth = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const scrollbarWidth = textarea.offsetWidth - textarea.clientWidth;
  const effectiveWidth = textarea.clientWidth - paddingWidth - scrollbarWidth;

  // Calculate the height of content up to the cursor
  let heightUptoCursor = 0;
  for (let i = 0; i < allLinesUptoCursor.length; i++) {
      const line = allLinesUptoCursor[i];
      const textWidth = context.measureText(line).width;
      const numberOfLines = Math.ceil(textWidth / effectiveWidth);
      heightUptoCursor += numberOfLines * lineHeight;
  }

  // Calculate the distance from the bottom of the textarea to the cursor
  const totalContentHeight = textarea.scrollHeight;
  const distanceBelowCursor = totalContentHeight - heightUptoCursor;

  const coordinates = {
      bottom: distanceBelowCursor,
      left: lastLineWidth % effectiveWidth // Adjusted for wrapping
  };
  return coordinates;
}

