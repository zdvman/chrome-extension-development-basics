const selectionClickHandler = (info, tab) => {
  console.log(
    `Selection context menu item clicked ${
      !info.selectionText
        ? 'with no selected text!'
        : `with text "${info.selectionText}"!`
    }`
  );
};

const pageClickHandler = (info, tab) => {
  console.log('Page context menu item clicked!');
};

const menuItemMap = {
  SELECTION: 'selection-click',
  PAGE: 'page-click',
};

const handlerMap = {
  [menuItemMap.SELECTION]: selectionClickHandler,
  [menuItemMap.PAGE]: pageClickHandler,
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: menuItemMap.PAGE,
    title: 'New Context Menu Item - Page',
    contexts: ['page'],
  });

  chrome.contextMenus.create({
    id: menuItemMap.SELECTION,
    title: 'New Context Menu Item - Selection',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const { menuItemId } = info;

    const handler = handlerMap[menuItemId];

    if (handler) handler(info, tab);
  });
});
