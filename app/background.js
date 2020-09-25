// background.js

function downloadNotification(){
  var nIcon = chrome.extension.getURL("favicon.png");
  var nTitle = "SAVM Extension";
  var nMessage = "RDP file has been downloaded...";
  var nOptions = { type: "basic", iconUrl: nIcon, priority:2, title: nTitle, message: nMessage};
  chrome.notifications.create("DownloadNotification", nOptions);
}


// Run this as received from content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        chrome.tabs.create({"url": request.url, active: false});
      }

      if(request.message === "downloaded_file"){
        console.log("[Background.js] Sending notification");
        downloadNotification();
      }
    }
);


//This was some code to open the file automatically.
//However, chrome requires a user gesture to prevent that, and so makes no sense to use it then
// var query = {"filenameRegex":"^.*\.(rdp)$", "limit": 1};
// chrome.downloads.search(query, function callback(results){
//   console.log("File: ");
//   console.log(results[0]);
//   chrome.downloads.open; 
// });