// background.js

// Called when the user clicks on the browser action.
//(send to content.js)
chrome.browserAction.onClicked.addListener(tab => {
    // Send a message to the active tab
    
    console.log('[background.js] opening VM')
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});


// Run this as received from content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        // console.log(request.url);
        chrome.tabs.create({"url": request.url});
      }
    }
);
