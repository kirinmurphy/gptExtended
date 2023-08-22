const adjustTextareaHeight = (textarea) => {
  const resize = () => {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight > 300 ? 300 : textarea.scrollHeight) + 'px';
    if (textarea.scrollHeight > 300) {
      textarea.scrollTop = textarea.scrollHeight;
    }
  };
  textarea.addEventListener('input', resize);
  setTimeout(() => {
    resize();
  }, 0);
  // resize(); // Initial adjustment
};
