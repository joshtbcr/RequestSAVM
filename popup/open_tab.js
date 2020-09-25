console.log("[popup] Opening new tab...");

var pageToOpen = "https://tdc.azure.net/";
chrome.tabs.create({"url": pageToOpen, active: false});

//Close it manually as it will popup an ugly white square because of empty HTML
window.close();