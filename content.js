//content.js

//Function to run when click on extension is done (action received from background.js)
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var pageToOpen = "https://tdc.azure.net/";
        console.log('opening VM')

        chrome.runtime.sendMessage({"message": "open_new_tab", "url": pageToOpen});
      }
    }
  );
