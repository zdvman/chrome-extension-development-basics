window.onload = () => {
  const selectElem = document.getElementById('search-engine');
  if (!selectElem) return;

  // Load the stored search engine value
  chrome.storage.sync.get('searchEngine', (result) => {
    const storedValue = result.searchEngine || 'google';
    selectElem.value = storedValue;
  });

  // Save the selected value when changed
  selectElem.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue) return;
    chrome.storage.sync.set({ searchEngine: selectedValue }, () => {
      console.log(`Search engine changed to: ${selectedValue}`);
    });
  });
};
