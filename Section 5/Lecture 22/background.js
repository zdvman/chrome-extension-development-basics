const searchForText = (selectedText) => {
  chrome.tabs.create({
    url: `https://google.com/search?q=${encodeURIComponent(selectedText)}`,
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
