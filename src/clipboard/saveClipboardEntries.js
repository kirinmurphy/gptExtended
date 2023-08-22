const CLIPBOARD_FORM_DATA_KEY = 'clipboardData';
const CLIPBOARD_ADDITIONAL_FIELDS_KEY = 'additional_clipboard_items';

function savePromptClipboardEntries ({ newForm }) {
  saveFormElements({ 
    newForm,
    formStorageKey: CLIPBOARD_FORM_DATA_KEY,
    formatter: (input) => {
      const clipboardItems = Object.entries(input)
        .filter(([key]) => key.startsWith('additional_option_') && key.endsWith('_name'))
        .map(([key, name]) => {
          const index = key.split('_')[2];
          const message = input[`additional_option_${index}_message`];
          const uuid = input[`additional_option_${index}_uuid`];
          return { name, message, uuid };
        });

      const returnObject = {};
      returnObject[CLIPBOARD_ADDITIONAL_FIELDS_KEY] = clipboardItems;

      return returnObject;
    } 
  });
}
