async function asyncLoad (key) {
  return await new Promise(resolve => {
    chrome.storage.local.get(key, function(result) {
      console.log('result', result);
      resolve(result[key]);
    });
  });
}

