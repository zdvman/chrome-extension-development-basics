chrome.runtime.onInstalled.addListener(function () {
  chrome.action.onClicked.addListener(async function (tab) {
    const badgeText = await chrome.action.getBadgeText({});

    let text;
    if (!badgeText) {
      text = "1";
    } else {
      text = (parseInt(badgeText) + 1).toString();
    }
    chrome.action.setBadgeText({ text });
  });
});
