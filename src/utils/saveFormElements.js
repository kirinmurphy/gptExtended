function saveFormElements (props) {
  const { formatter, formStorageKey, newForm } = props;

  const formObject = new FormData(newForm).entries();
  const formData = Object.fromEntries(formObject);
  const formattedFormData = formatter(formData);

  saveFormObject({ formStorageKey, formattedFormData });
}

function saveFormObject (props) {
  const { formStorageKey, formattedFormData } = props;
  const dataToStore = {};
  dataToStore[formStorageKey] = formattedFormData;
  chrome.storage.local.set(dataToStore, function() {
    console.log('Form data saved.', );
  });
}
