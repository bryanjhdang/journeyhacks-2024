import { swBlock } from './sw-scripts-modules/sw-block.js';

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
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     let sites = []

    //     chrome.storage.sync.get('websiteList', (data) => {
    //         sites = data.websiteList || [];
    //     });

    //     sites.find(site => {
    //         if (tab.url.includes(site)) {
    //             chrome.scripting.executeScript({
    //                 target: { tabId: tabId },
    //                 function: swBlock
    //             });
    //         }
    //     })
    // })

    // if (changeInfo.status === 'complete') {
        // let sites = ['https://www.reddit.com/']
        chrome.storage.local.get('websiteList', (data) => {
            let sites = data.websiteList || [];
            console.log(sites)

            sites.find(site => {
                if (tab.url.includes(site.url)) {
                    // chrome.scripting.executeScript({
                    //     target: { tabId: tabId },
                    //     function: swBlock
                    // });
                    chrome.tabs.remove(tabId, () => {
                        console.log('Tab closed')
                        alert('This site is blocked');
                    })

                }
            })
        });

    // }
})