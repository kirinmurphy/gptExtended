const simulateKeyPress = (element, config) => {
  element.value += config.key; // Modify the value as needed
  let event = new Event('input', { 'bubbles': true, 'cancelable': true });
  element.dispatchEvent(event);
};