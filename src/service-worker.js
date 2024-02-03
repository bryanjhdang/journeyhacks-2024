import "./sw-scripts-modules/sw-block.js"

// onInstalled is an event that is fired when the extension is first installed, 
// when the extension is updated to a new version, and when Chrome is updated to a new version.
chrome.runtime.onInstalled.addListener(({ reason }) => {
    if (reason === 'install') {
        chrome.storage.local.set({
            apiSuggestions: ['tabs', 'storage', 'scripting']
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        
        if (tab.url.includes("https://www.reddit.com/")) {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                function: swBlock
            });
        }
    }
})