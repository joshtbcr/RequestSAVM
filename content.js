//content.js

if(window.location.host === 'tdc.azure.net'){
  console.log("Running code for getting a VM");

  
  let newVMPromise = new Promise((resolve, reject) => {
    //Do the required clicks 
    if (doClicksForVM()){
      resolve(true);
    }else{
      reject(new Error("ERROR!"));
    }
    
  });
  
  //Close tab if succeeded
  newVMPromise.then(result =>{
    console.log("closing tab....");
    delay(5000).then(() => window.close());
  }).catch(error =>{
    
    //Show error instead if unsuccesful
    alert('There was an error in downloading the RDP file: \n', error );
  });



}

//Little function (promise) to ensure delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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
  
  var interval = setInterval(function () {
    //Wait max 15s
    requestsCounter < 15 ? requestsCounter++ : clearInterval(interval);
    
    console.log('Request #'+requestsCounter);
    
    //Click request VM
    let requestVmButton = $('button[data-automation-id="request"]');
    let requestFirstGroupVmButton = $('button[data-automation-id="request"]');
    let requestSelectedGroupVmButton = $('.requestVmMainOverride');
    //$('button[title="CSS SAVM - East US 2"]');
    
    if(requestVmButton.disabled && clickedRequestVM === false){
      requestVmButton.click();
      clickedRequestVM = true;
    } 
    
    //Click first group for VM
    if(clickedGroupVM === false){
      clickedGroupVM = true;
    }
    
    //Click request VM from selected group
    if(clickedRequestedGroupVM ===  false){

      clickedRequestedGroupVM = true;
      clearInterval(interval);
    }

  }, 1000);

  return clickedRequestedGroupVM;
}

function loopRequests(guid) {
  var intervalo = setInterval(function () {
    requestsCounter < 5 ? requestsCounter++ : clearInterval(intervalo);
    
    console.log('Request #'+requestsCounter);
      
    var xhr = new XMLHttpRequest();
    xhr.open('GET',eventBus.backendUrl + '/buscar?busquedaId=' + guid);
    xhr.onload = () => {
      if (xhr.status === 200 && xhr.responseText!== 'False'){
        console.log(xhr.responseText); 
        clearInterval(intervalo);
      }else{
        console.log('Respuesta del backend no valida:'+ "\n\t"+ xhr.status  + xhr.responseText); 

      }
    }
    xhr.send();
  }, 5000);
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
