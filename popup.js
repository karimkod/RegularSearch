let changeColor = document.getElementById('changeColor');
let checkbox = document.getElementById('dynsearch'); 
let regularExpression = document.getElementById('regX'); 
let annuler = document.getElementById("annuler")

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
/*
      chrome.storage.sync.set({lastSearch: regularExpression}, function() {
        console.log("last searched saved");
      });*/

  };

  annuler.onclick = function (param) { 
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {cancel: true}, function(response) {});
      });
     /* chrome.storage.sync.set({lastSearch: ""}, function() {
        console.log("last searched saved");
      });*/

   }

  checkbox.onclick = function(element)
  {
    if (checkbox.checked) 
    {
        changeColor.hidden = true;
    } else {
        changeColor.hidden = false;
    }
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.browserAction.setBadgeText({text: ""+request})
      });
 






