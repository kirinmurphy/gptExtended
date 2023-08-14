function createDefaultFields ({ newForm, loadFormData }) {

  function createTextarea(labelText, name) {
    const label = createNewElement({
      elementType: 'label',
      staticProps: {
        textContent: labelText
      },
      appendTo: newForm
    });
    
    const textarea = createNewElement({
      elementType: 'textarea',
      staticProps: {
        name: name,
        className: 'w-full dark:bg-transparent mb-1'
      },
      appendTo: label
    });

    loadFormData((data) => {
      textarea.value = data[textarea.name];
    });

    return label;
  }

  newForm.appendChild(createTextarea('What would you like ChatGPT to know about you', 'about_user_message'));
  newForm.appendChild(createTextarea('Default Starter Prompt', 'about_model_message_default'));
}