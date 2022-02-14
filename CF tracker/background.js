

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    
    
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        
        let url="";
        let tab = tabs[0];
        
        if (tab!=undefined){
        url=tab.url
        
        sendResponse(url);
        }
        else if(url=="")
        {
    
        sendResponse("tab changing");
        }
    });
    return true;
});