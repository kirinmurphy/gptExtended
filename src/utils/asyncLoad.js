async function asyncLoad (key) {
  return await new Promise(resolve => {
    chrome.storage?.local.get(key, function(result) {
      if (chrome.runtime.lastError) {
        console.warn("Extension context invalidated:", chrome.runtime.lastError);
        return;
      }
      resolve(result[key]);
    });
  });
}
