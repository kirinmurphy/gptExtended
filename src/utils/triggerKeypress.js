const triggerKeyPress = (element, config) => {
  let event = new KeyboardEvent('keyup', config);
  console.log('EVENNNNNT', event);
  element.dispatchEvent(event);
};

const simulateKeyPress = (element, config) => {
  element.value += config.key; // Modify the value as needed
  let event = new Event('input', { 'bubbles': true, 'cancelable': true });
  element.dispatchEvent(event);
};