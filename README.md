# NEXRENDER-PNG-VIDEO

this package lets you convert your image sequence to an mp4 video
using nexrender


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
