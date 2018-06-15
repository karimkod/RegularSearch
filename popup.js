let changeColor = document.getElementById('changeColor');
let checkbox = document.getElementById('dynsearch'); 
let regularExpression = document.getElementById('regX'); 
let annuler = document.getElementById("annuler");
let regLabel = document.getElementById("regLabel");
/*
chrome.storage.sync.get('lastSearch', function(data) {
     lastSearch = data.lastSearch;
     if (lastSearch != null && lastSearch != "")
        console.log("Heelo" + lastSearch)
  });
*/
  changeColor.onclick = function(element) {
    /*let color = element.target.value;
      chrome.tabs.executeScript({code: 'document.body.style.backgroundColor = "' + color + '";'});*/

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {RegEx: regularExpression.value});
      });


  };

  annuler.onclick = function (param) { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cancel: true}, function(response) {});
      });
     /* chrome.storage.sync.set({lastSearch: ""}, function() {
        console.log("last searched saved");
      });*/
      regularExpression.value = ""

   }

  checkbox.onclick = function(element)
  {
    chrome.storage.sync.set({active: checkbox.checked}, function() {
      console.log("search activated");
    });
    changeColor.hidden = !checkbox.checked; 
    regularExpression.hidden = !checkbox.checked; 
    annuler.hidden = !checkbox.checked;
    regLabel.hidden = !checkbox.checked;

    if(checkbox.checked)
    {
      chrome.storage.sync.get(['lastSearch'], function(data) {
        if (data.lastSearch)
          regularExpression.value = data.lastSearch
      });
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {lastSearch: true});
      });
      chrome.runtime.sendMessage({ newIconPath : "images/get_started32.png"});

    }else 
    {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {clearResult: true}, function(response) {});
      });
      chrome.runtime.sendMessage({ newIconPath : "images_inactif/get_started32.png"});

    }
  }


chrome.storage.sync.get(['active'], function(data) {
  var isActivated = data.active;

  changeColor.hidden = !isActivated; 
  regularExpression.hidden = !isActivated; 
  annuler.hidden = !isActivated;
  regLabel.hidden = !isActivated;
  checkbox.checked = isActivated;
  if(isActivated)
  {
    chrome.storage.sync.get(['lastSearch'], function(data) {
      if (data.lastSearch)
        regularExpression.value = data.lastSearch
    });
    chrome.runtime.sendMessage({ newIconPath : "images/get_started32.png"});


    
  }else 
  {
    chrome.runtime.sendMessage({ newIconPath : "images_inactif/get_started32.png"});
  }

  

});





