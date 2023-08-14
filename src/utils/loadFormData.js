
function loadFormData(callback) {
  chrome.storage.local.get('formData', function(result) {
    callback(result.formData);
  });
}
