# NEXRENDER-PNG-VIDEO

this package lets you convert your image sequence to an mp4 video
using nexrender, you can also specify an errorCallback Url, the current job uid
would be appended to your callbackUrl then the error parameters

if the job uid is 12RFX8S8yHJJJ and
https://wwww.google.com is the error callbackUrl then the call would go to https://wwww.google.com/12RFX8S8yHJJJ
if you include parameters then they would be appended to the url


Sample job
```
 {
        "module": "nexrender-png-video",
        "input": "png",
        "params": {
            "frame": 29.97,
            "output": "98c1adb3-0e5d-4ed3-9e35-38af21ab648e",
            "OnError":{
                  "errorCallback":"https://yourErrorUrl.com",
                  "params":{
                       "renderblockid":"0",
                       .....
                  }
            }
        }
    }
```
