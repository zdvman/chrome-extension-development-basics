const urlMap = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
  yahoo: 'https://search.yahoo.com/search?p=',
};

const searchForText = (selectedText) => {
  chrome.storage.sync.get(['searchEngine'], (result) => {
    let searchEngine = 'google'; // Default search engine
    if (result.searchEngine) {
      searchEngine = result.searchEngine; // Default to Google if not set
    }
    chrome.tabs.create({
      url: `${urlMap[searchEngine]}${encodeURIComponent(selectedText)}`,
    });
  });
};

chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: 'search-text-selection',
    title: `Search for "%s"`,
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener((info) => {
    const { menuItemId } = info;
    if (menuItemId === 'search-text-selection' && info.selectionText) {
      searchForText(info.selectionText);
    }
  });
});
