async function asyncLoad (key) {
  return await new Promise(resolve => {
    chrome.storage.local.get(key, function(result) {
      resolve(result[key]);
    });
  });
}
