//content.js




if(window.location.host === 'tdc.azure.net'){

  //while($('.root-319').style.display != 'none')
  delay(3000).then(() => {
    generalFunctionRequestVM();
  });
}


function generalFunctionRequestVM(){
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
      }else{
        clearInterval(clicksInterval);
        reject(new Error("ERROR!"));
      }
      
      console.log(requestsCounter + 's');
      
      //Click request VM
      let requestButton = $('button[data-automation-id="request"]');
      let requestFirstGroupVmButton = $('button[data-automation-id="request"]');
      let requestSelectedGroupVmButton = $('.requestVmMainOverride');
      //$('button[title="CSS SAVM - East US 2"]');
      
      if(!requestButton.disabled && clickedRequestVM === false){
        console.log("clicksInterval -> requestButton.click()", requestButton.click());
        clickedRequestVM = true;
      } 
      
      //Click first group for VM
      if(clickedGroupVM === false && clickedRequestVM === true){
        console.log("clicksInterval -> requestFirstGroupVmButton.click()", requestFirstGroupVmButton.click());
        clickedGroupVM = true;
      }
      
      //Click request VM from selected group
      if(clickedRequestedGroupVM ===  false && clickedGroupVM === true){
        console.log("clicksInterval -> requestSelectedGroupVmButton.click()", requestSelectedGroupVmButton.click());
        clickedRequestedGroupVM = true;
        console.log("clicksInterval -> clearclicksInterval(clicksInterval)", clearInterval(clicksInterval));
        console.log("clicksInterval -> resolve(true)", resolve(true));
      }

    }, 1000);
    
  });
  
  //Close tab if succeeded
  newVMPromise.then(result =>{
    console.log("closing tab....");
    delay(5000).then(() => {
      //window.close()
    });
  }).catch(error =>{
    
    //Show error instead if unsuccesful
    alert('There was an error in downloading the RDP file: \n', error );
  });

}




//Little function (promise) to ensure delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function repeatEvery(){

  let interval = setInterval(callback, 5000);
}

function repeatEveryUntil(){

  return new Promise(resolve =>{

  });
}

var spinner = $('.root-319');


var navGroup = $('div.requestVmMainOverride > div.ms-Modal-scrollableContent > div ')
  .children[1].firstElementChild.children[1].firstElementChild.firstElementChild;

var firstGroup = navGroup.firstElementChild.children[1].firstElementChild
  .firstElementChild.firstElementChild.firstElementChild;  

var requestSelectedGroupVmButton = $('#id__57');





//Only 3 clicks needed
//Click request VM

//Click first group for VM
//Click request VM from selected group
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
    let requestFirstGroupVmButton = $('button[data-automation-id="request"]');
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
