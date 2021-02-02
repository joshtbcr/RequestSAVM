function modifyHTML(message){
  document.querySelector('#root').style.opacity = "1"; 
  var img = document.createElement("img");
  var txt = document.createElement("h2");
  txt.innerHTML = message;
  var div = document.createElement("div");
  img.src = chrome.runtime.getURL('favicon.png');
  div.style.top = '50%';
  div.style.left = '50%';
  div.style.margin = 'auto';
  div.style.position = 'fixed';
  div.appendChild(img);
  div.appendChild(txt);
  var body = document.querySelector('body');
  body.insertBefore(div, body.firstChild);
};

delay(5000).then(() => {
  var vmAvailable = document.querySelector('.ms-DetailsList-headerWrapper + div > div > div > div > div.ms-List-surface > div.ms-List-page');

  //Check if it exists
  if(vmAvailable == null){ 
    modifyHTML('Downloading new VM and closing tab...');
  }else if (vmAvailable.tagName == "DIV"){
    modifyHTML('Click VM to download automatically');
  }

});

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


