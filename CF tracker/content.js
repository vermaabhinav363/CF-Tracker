let displaySeconds ;
let displayMinutes ;
let displayHours ;
let seconds ;
let minutes ;
let hours ;

let str;
let url = window.location.href;
let ptr ;

var n = document.getElementById('header');

ptr=n.innerHTML;

if (url.includes("problem/") && !ptr.includes("Enter")) {

   
    ptr.indexOf('profile');
    ptr=n.innerHTML.substring(ptr.indexOf('profile')+8,ptr.indexOf('profile')+14);
    ptr += url[url.length-1]+url[url.length-2];
    var removedText = url.replace(/\D+/g, '');
    ptr+= removedText;
    let i = 0;
    
    let div = document.createElement("div");
    var bodyTag = document.getElementById('sidebar');
    
    bodyTag.parentNode.insertBefore(div, bodyTag);
    div.innerHTML = '\n';
    



    chrome.storage.local.get(ptr, function (result) {

        if (result[ptr]) {


            str = result[ptr];

        }
        else {

            str = "00:00:00";
        }




         displaySeconds = str[6] + str[7];
         displayMinutes = str[3] + str[4];
         displayHours = str[0] + str[1];


        seconds = parseInt(str[6] + str[7]);
        minutes = parseInt(str[3] + str[4]);
        hours = parseInt(str[0] + str[1]);



        function stopWatch() {
            let url = window.location.href;
            chrome.runtime.sendMessage({ text: "hey" }, function (response) {

                if (response == url) {

                    seconds++;

                    if (seconds / 60 == 1) {
                        seconds = 0;
                        minutes++;

                        if (minutes / 60 == 1) {
                            minutes = 0;
                            hours++;
                        }
                    }

                    if (seconds < 10) {
                        displaySeconds = "0" + seconds.toString();
                    } else {
                        displaySeconds = seconds;
                    }

                    if (minutes < 10) {
                        displayMinutes = "0" + minutes.toString();
                    } else {
                        displayMinutes = minutes;
                    }

                    if (hours < 10) {
                        displayHours = "0" + hours.toString();
                    } else {
                        displayHours = hours;
                    }

                    div.innerHTML = "</br></br><img src='\https://i.ibb.co/P1rdwFM/icon.png\'>" + '' + displayHours + ":" + displayMinutes + ":" + displaySeconds ;



                    var time = displayHours + ":" + displayMinutes + ":" + displaySeconds;

                    i++;





                    if (i == 5) {

                        let obj = {};
                        obj[ptr] = time;
                        chrome.storage.local.set(obj);
                        i = 0;
                    }

                }
            });
        }

        window.setInterval(stopWatch, 1000);
    })
  
}
