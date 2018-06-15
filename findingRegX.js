
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.RegEx != null)
        {
            findMatchingPattern(request.RegEx)
        }else if(request.cancel)
        {
            cancelHighlight()
        }else if(request.lastSearch)
        {
            lastSearch()
        }else if (request.clearResult)
        {
            clearResult()
        }
        if (request.RegExp)
            sendResponse({farewell: "goodbye"});
    });




function extractContent(s) {

    var span= document.createElement('span');
    span.innerHTML= s;
    var children= span.querySelectorAll('*');
    for(var i = 0 ; i < children.length ; i++) {
    if(children[i].textContent)
        children[i].textContent+= ' ';
    else
        children[i].innerText+= ' ';
    }
    return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
  };



  function findMatchingPattern(pattern)
  {
    
    cancelHighlight()
    var RE = new RegExp(pattern,'g')
    var str = extractContent(document.body.innerHTML) // extract the content from the body
    console.log(str)
    var re = RE;
    var trouve = str.match(re);
    
    chrome.storage.sync.set({lastSearch: pattern}, function() {
        console.log("last searched saved");
      });


    if (trouve)
    {
        //console.log(trouve)
        sendToExtension({number: ""+trouve.length})
        highlight(removeDuplicates(trouve))
    }else 
    {
        sendToExtension({number: '0'})
    }
    

    
  }


  function sendToExtension(params)
  {
      console.log(params)
    chrome.runtime.sendMessage(params);
  }


  function highlight(words)
  {
    var str = document.body.innerHTML // extract the content from the body
    for (var w in words)
    {
        
        str = str.replace(new RegExp(words[w],'g'),"<span class ='highlight'>" + words[w] + "</span>")
    }
    document.body.innerHTML = str;
  }
      


function removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}
  

function cancelHighlight()
{
    var highlighted = document.getElementsByClassName("highlight")
    sendToExtension({number: ""})
    chrome.storage.sync.set({lastSearch: ""}, function() {
        console.log("last search erased");
      });

    do
    {
        for (i = 0; i < highlighted.length; i++) 
        {
            highlighted[i].outerHTML = highlighted[i].innerHTML
        } 
        highlighted = document.getElementsByClassName("highlight")

   }while(highlighted.length != 0);
}



chrome.storage.sync.get(['active'], function(data) {
    var isActivated = data.active;
  
    
    if(isActivated)
    {
       lastSearch()
    }
    
});


function lastSearch()
{
    chrome.storage.sync.get(['lastSearch'], function(data) {
        if (data.lastSearch)
            findMatchingPattern(data.lastSearch)
    });
}

function clearResult()
{
    var highlighted = document.getElementsByClassName("highlight")
    sendToExtension({number: ""})
    

    do
    {
        for (i = 0; i < highlighted.length; i++) 
        {
            highlighted[i].outerHTML = highlighted[i].innerHTML
        } 
        highlighted = document.getElementsByClassName("highlight")

   }while(highlighted.length != 0);
}