//content.js
//Involved HTML elements
var spinner, requestButton, navGroup, firstGroupVmButton;  
spinner = document.querySelector('.root-319');

if(window.location.host === 'tdc.azure.net'){
  //Show loading instead
  document.querySelector('#root').style.opacity = "0.2"; 
  var img = document.createElement("img");
  var txt = document.createElement("h1");
  txt.innerHTML = 'Loading ...';
  var div = document.createElement("div");
  img.src = chrome.runtime.getURL('icon.jpg');
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.margin = 'auto';
  div.style.position = 'fixed';
  div.appendChild(img);
  div.appendChild(txt);
  var body = document.querySelector('body');
  body.insertBefore(div, body.firstChild);


  
  delay(3000).then(() => {
    generalFunctionRequestVM();
  });
}

//Only 3 clicks needed
//Click request VM
//Click first group for VM
//Click request VM from selected group
async function generalFunctionRequestVM(){
  console.log("Running code for getting a VM");

  let newVMPromise = new Promise((resolve, reject) => {
    //Do the required clicks 
    console.log("doClicksForVM -> Running clicks");

    //Wait max 15s
    var requestsCounter = 0;
    
    var clickedRequestVM = false;
    var clickedGroupVM = false;
    var clickedRequestedGroupVM = false;
    
    var clicksInterval = setInterval(() => {
      //Wait max 15s
      if(requestsCounter < 15){
        requestsCounter++;
        console.log(requestsCounter + 's');
      }else{
        clearInterval(clicksInterval);
        reject(new Error("ERROR!"));
      }
      
      
      requestButton = document.querySelector('button[data-automation-id="request"]');
      
      // if(!requestButton.disabled && spinner.style.display == 'none' && clickedRequestVM === false){
      if(!requestButton.disabled && clickedRequestVM === false){
        console.log("clicksInterval -> requestButton.click()", requestButton.click());
        clickedRequestVM = true;
      } 


      
      //Click first group for VM
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
      
      //Click request VM from selected group
      if(clickedRequestedGroupVM ===  false && clickedGroupVM === true){
        requestSelectedGroupVmButton = 
        document.querySelector('div.requestVmMainOverride > div.ms-Modal-scrollableContent > div.ms-Dialog-lgHeader > div.ms-Dialog-inner > div.ms-Dialog-actions > div.ms-Dialog-actionsRight > span > button');

        //Only if the button is enabled
        // if(requestSelectedGroupVmButton.classList.value.search('is-disabled') !== -1){
        if(true){
          console.log("clicksInterval -> requestSelectedGroupVmButton.click()", requestSelectedGroupVmButton.click());
          clickedRequestedGroupVM = true;
          console.log("clicksInterval -> clearclicksInterval(clicksInterval)", clearInterval(clicksInterval));
          console.log("clicksInterval -> resolve(true)", resolve(true));
        }

      }
    }, 1000);
    
  });
  

        
  
  newVMPromise
  .then(result=>{
    //Close tab if succeeded
    console.log("Closing tab once downloaded...");
    delay(2000).then(() => {
      
      var spinner = document.querySelector('.root-319');
      let closeInterval = setInterval(()=>{
        if(spinner.style.display === 'none'){
          console.log("closeInterval -> clearcloseInterval(closeInterval)", clearInterval(closeInterval));
          window.close();
        }
        
      },1000);
    });
  })
  .catch(error =>{
    //Show error instead if unsuccesful
    alert('There was an error in downloading the RDP file: \n', error );
  });




}







//Little function (promise) to ensure delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function repeatEvery(callback, ms){

  let interval = setInterval(()=>{
    
    callback;
  }, ms);
}

function repeatEveryUntil(){

  return new Promise(resolve =>{

  });
}




function doClicksForVM(){
  console.log("doClicksForVM -> Running clicks");

  //Wait max 15s
  var requestsCounter = 0;
  
  var clickedRequestVM = false;
  var clickedGroupVM = false;
  var clickedRequestedGroupVM = false;
  
  var clicksInterval = setclicksInterval(function () {
    //Wait max 15s
    if(requestsCounter < 15){
      requestsCounter++;
    }else{
      clearclicksInterval(clicksInterval);
      return clickedRequestedGroupVM;
    }
    
    console.log('Request #'+requestsCounter);
    
    //Click request VM
    let requestButton = $('button[data-automation-id="request"]');
    let firstGroupVmButton = $('button[data-automation-id="request"]');
    let requestSelectedGroupVmButton = $('.requestVmMainOverride');
    //$('button[title="CSS SAVM - East US 2"]');
    //$('button[title="CSS SAVM - East US 2"]');
    
    if(!requestButton.disabled && clickedRequestVM === false){
      requestButton.click();
      console.log("clicksInterval -> requestButton.click()", requestButton);
      clickedRequestVM = true;
    } 
    
    //Click first group for VM
    if(clickedGroupVM === false && clickedRequestVM === true){
      clickedGroupVM = true;
    }
    
    //Click request VM from selected group
    if(clickedRequestedGroupVM ===  false && clickedGroupVM === true){

      clickedRequestedGroupVM = true;
      clearclicksInterval(clicksInterval);
      return clickedRequestedGroupVM;
    }

  }, 1000);

}


//Run to function when click on extension is done.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "clicked_browser_action" ) {
        var pageToOpen = "https://tdc.azure.net/";

        // var pageToOpen = $("a[href^='http']").eq(0).attr("href");
        
        chrome.runtime.sendMessage({"message": "open_new_tab", "url": pageToOpen});
      }
    }
  );
