function createDefaultFields ({ newForm }) {

  function createTextarea(labelText, name) {
    const textarea = createNewElement({
      elementType: 'textarea',
      staticProps: {
        name: name,
        className: 'w-full mb-1'
      }
    });

    loadFormData((data) => {
      textarea.value = data[textarea.name];
    });

    const label = createNewElement({
      elementType: 'label',
      staticProps: {
        textContent: labelText
      },
      appendTo: newForm,
      append: [textarea]
    });

    return label;
  }

  newForm.appendChild(createTextarea('What would you like ChatGPT to know about you', 'about_user_message'));
  newForm.appendChild(createTextarea('How would you like ChatGPT to respond?', 'about_model_message_default'));
}