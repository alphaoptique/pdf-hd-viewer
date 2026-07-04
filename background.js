chrome.action.onClicked.addListener((tab) => {
  const viewerUrl = chrome.runtime.getURL("viewer.html") + "?file=" + tab.url;
  chrome.tabs.create({ url: viewerUrl });
});
