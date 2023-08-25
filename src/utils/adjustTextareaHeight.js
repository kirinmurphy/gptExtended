const MAX_TEXTAREA_HEIGHT = 250;

const adjustTextareaHeight = (textarea) => {
  const resize = () => {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight > MAX_TEXTAREA_HEIGHT 
      ? MAX_TEXTAREA_HEIGHT 
      : textarea.scrollHeight) + 'px';
    
    if (textarea.scrollHeight > MAX_TEXTAREA_HEIGHT) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  };
  
  textarea.addEventListener('input', resize);
  setTimeout(resize, 0);
  resize(); 
};
