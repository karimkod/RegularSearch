
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.RegEx != null)
        {
            findMatchingPattern(new RegExp(request.RegEx,'g'),sendResponse)
        }else if(request.cancel)
        {
            cancelHighlight()
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



  function findMatchingPattern(pattern,reponseFun)
  {
    
    cancelHighlight()

    var str = extractContent(document.body.innerHTML) // extract the content from the body
    console.log(str)
    var re = pattern;
    var trouve = str.match(re);
    
    if (trouve)
    {
        //console.log(trouve)
        sendToExtension(trouve.length)
        highlight(removeDuplicates(trouve))
        return document.getElementsByClassName("highlight")
    }

  }


  function sendToExtension(params)
  {
    chrome.runtime.sendMessage(params, function(response){});
    console.log("Helloooo")
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

    do
    {
        for (i = 0; i < highlighted.length; i++) 
        {
            highlighted[i].removeAttribute("class")
        } 
        highlighted = document.getElementsByClassName("highlight")

   }while(highlighted.length != 0);
}