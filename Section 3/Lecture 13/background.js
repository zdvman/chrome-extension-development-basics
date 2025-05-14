chrome.runtime.onInstalled.addListener(async function () {
  chrome.action.onClicked.addListener(function (tab) {
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        message: "example_message",
      });
    });
  });
});
