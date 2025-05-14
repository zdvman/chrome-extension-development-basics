(function () {
  // Store reference to the search engine select field
  const searchEngineSelect = document.getElementById("search-engine");

  // Attempt to grab the stored name from Chrome sync storage initially
  chrome.storage.sync.get(["searchEngine"], function (result) {
    // If found in sync storage, set the select value
    if (result.searchEngine) {
      searchEngineSelect.value = result.searchEngine;
    }
  });

  // Add listener for changes to the preferred search engine
  searchEngineSelect.addEventListener("change", function () {
    const value = searchEngineSelect.value;

    if (value.length) {
      // Update their saved preferences
      chrome.storage.sync.set({ searchEngine: value });
    }
  });
})();
