chrome.runtime.onInstalled.addListener(function (){
    chrome.contextMenus.create({
        title: "Edit with Open Office Writer online",
        id: "openofficewriterUpload",
        contexts: ["link"]
    });
});


chrome.contextMenus.onClicked.addListener(function(info, tab){
    if (info.menuItemId === "openofficewriterUpload") {
    	//alert(JSON.stringify(info, null, 40));
        var imgUrl = info.linkUrl;
        openofficewriterUpload(imgUrl);
    }
});


chrome.webRequest.onBeforeRequest.addListener(
        interceptRequest,
        { urls: ["*://*/*.doc", "*://*/*.docx",
                "*://*/*.odt", "*://*/*.rtf", 
                ]},
        ['blocking']
);

function openofficewriterUpload(urlxx) {      
     
  	 var filenamex = Math.floor(Math.random() * 2000000) + "";
  	
  	if ( (urlxx.indexOf("http://") !=-1) || (urlxx.indexOf("https://") !=-1)) {
  		//alert("vamos directos con url de imagen");
  		finalurl =  "http://www.offidocs.com/edit-openofficewriter.php?fileurl="+ encodeURIComponent(urlxx)+"&filename="+ filenamex ;
    	//alert(finalurl);
    	window.open(finalurl,'_blank');
  	}		
}

function interceptRequest(request)
{
    if (request && request.url) {
        if (request.type == "main_frame") {
            if (
                 ( request.url.indexOf("docs.google.com") == -1 )
                   && (request.url.indexOf("offidocs.com") == -1)
                ) 
            {
                var filenamex = Math.floor(Math.random() * 2000000) + "";
  				var finalurl = "http://www.offidocs.com/edit-openofficewriter.php?fileurl="+ encodeURIComponent(request.url)+"&filename="+ filenamex;
                //window.open(finalurl,'_blank');
                return {
                    redirectUrl: finalurl
                };
            }
        }
    }
}



