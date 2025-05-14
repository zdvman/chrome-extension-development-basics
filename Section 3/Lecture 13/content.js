chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "example_message") {
    window.alert("Message received!");
  }
});
