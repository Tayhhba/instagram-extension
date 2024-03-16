chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url && tab.url.includes("instagram.com")) {
        console.log('Page loaded:', tab.url, tabId);
        chrome.tabs.sendMessage(tabId, { type: "NEW" }, (response) => {
           console.log('Response from content script:', response);
        });
     }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
   if (message.type === "settingsChanged") {
       chrome.tabs.query({ url: "https://www.instagram.com/*" }, (tabs) => {
           chrome.tabs.reload(tabs[0].id);
       });
       console.log('changed');
   }
});