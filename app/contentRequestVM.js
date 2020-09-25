//Involved HTML elements
var spinner = document.querySelector('.root-319');

//To allow sometime as the button shows enabled too quickly
delay(3500).then(() => getVM());

function closeTab(){
  //Close tab if succeeded
  console.log("Closing tab once spinner is done...");
  delay(2000).then(() => {
    var spinner = document.querySelector('.virtual-machine-actions-container > div div').nextElementSibling.firstElementChild;
    
    // Close connect once mutated
    const closeCallback = (mutationsList, observer) => {
      console.log("closeCallback -> closing");
      observer.disconnect();
      chrome.runtime.sendMessage({"message": "downloaded_file"});
      delay(1000).then(()=>window.close());  
    };
    
    const spinnerObserver = new MutationObserver(closeCallback);
    spinnerObserver.observe(spinner, { attributes: true});
    
  });
}

async function getVM(){
  var vmAvailable = document.querySelector('.ms-DetailsList-headerWrapper + div > div > div > div > div.ms-List-surface > div.ms-List-page');
  
  //Check if it exists
  if(vmAvailable == null){ 
    getNewVM();
  }else if (vmAvailable.tagName == "DIV"){
    getClickedVM();
  }


}

function getNewVM() {
  
  //Do the required clicks 
  //Only 3 clicks needed
  //1. Click "request VM"
  //2. Click "first group" for VM
  //3. Click "request VM" from selected group

  console.log("getVM -> Starting loop");
  
  var maxSeconds = 60;
  var requestsCounter = 0;
  
  //Loop of 0.2s to do checks constanty for next step/click
  var clicksInterval = setInterval(() => {

    //Wait max 60s
    if(requestsCounter < maxSeconds){
      requestsCounter+=0.2;
      console.log(15 - requestsCounter + 's to stop loop.');
    }else{
      clearInterval(clicksInterval);
      throw new Error("ERROR!");
    }
    console.log("getNewVM -> Starting new VM clicks");
    var clickedRequestVM = false;
    var clickedGroupVM = false;
    var clickedRequestedGroupVM = false;
    
    var requestButton = document.querySelector('button[data-automation-id="request"]');
    
    //1. Click "request VM"
    if(!requestButton.disabled && clickedRequestVM === false){
      console.log("clicksInterval -> requestButton.click()", requestButton.click());
      clickedRequestVM = true;
    }
    
    //2. Click "first group" for VM
    if(clickedRequestVM === true && clickedGroupVM ===false){
      navGroup = document.querySelector('div.requestVmMainOverride > div.ms-Modal-scrollableContent > div')
      .children[1].firstElementChild.children[1].firstElementChild.firstElementChild;
      
      firstGroupVmButton = navGroup.firstElementChild.children[1].firstElementChild
      .firstElementChild.firstElementChild.firstElementChild;  
      
      if(clickedGroupVM === false){
        console.log("clicksInterval -> firstGroupVmButton.click()", firstGroupVmButton.click());
        clickedGroupVM = true;
      }
    }
    
    //3. Click "request VM" from selected group
    if(clickedRequestedGroupVM ===  false && clickedGroupVM === true){
      requestSelectedGroupVmButton = 
      document.querySelector('div.requestVmMainOverride > div.ms-Modal-scrollableContent > div.ms-Dialog-lgHeader > div.ms-Dialog-inner > div.ms-Dialog-actions > div.ms-Dialog-actionsRight > span > button');
      console.log("clicksInterval -> requestSelectedGroupVmButton.click()", requestSelectedGroupVmButton.click());
      clickedRequestedGroupVM = true;
      console.log("getNewVMPromise -> clickedRequestedGroupVM = true");
      clearInterval(clicksInterval);
      closeTab();
    }
  }, 200);

};



function getClickedVM(){
  console.log("getClickedVM2 -> Waiting for VM to be clicked");
  var connectButton = document.querySelector('button[data-automation-id="connect"]');
  
  // Click connect once mutated
  const clickConnect = (mutationsList, observer) => {
    console.log("clickConnect -> connectButton.click();", connectButton.click());
    //To prevent more downloads
    console.log("clickConnect -> observer.disconnect()", observer.disconnect());
    //closeTab();
  };

  const connectButtonObserver = new MutationObserver(clickConnect);
  connectButtonObserver.observe(connectButton, { attributes: true});
};
  




//-------------------------------------------

//Little function (promise) to ensure delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
