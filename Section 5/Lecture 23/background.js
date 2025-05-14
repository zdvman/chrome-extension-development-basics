// Map the search engine to its search query URL
const urlMap = {
  bing: "https://www.bing.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
  google: "https://google.com/search?q=",
  yahoo: "https://search.yahoo.com/search?q=",
};

const searchForText = (selectedText) => {
  // Try and retrieve their preferred search engine (if set)
  chrome.storage.sync.get(["searchEngine"], (result) => {
    let url;
    // If the user has a preferred search engine
    if (result.searchEngine) {
      url = `${urlMap[result.searchEngine]}${encodeURIComponent(selectedText)}`;
    } else {
      // Otherwise, fallback to Google
      url = `${urlMap["google"]}${encodeURIComponent(selectedText)}`;
    }

    // Create a new tab with the search URL and query based on their selected text
    chrome.tabs.create({
      url,
    });
  });
};

chrome.runtime.onInstalled.addListener(function () {
  // Create the context menu item on text selection only
  chrome.contextMenus.create({
    id: "search-text-selection",
    title: `Search for "%s"`,
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener(function (info) {
    const { menuItemId } = info;

    if (menuItemId === "search-text-selection" && info.selectionText) {
      searchForText(info.selectionText);
    }
  });
});
