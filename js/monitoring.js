function getBrowser() {
    // Get the user agent string.
    var userAgent = navigator.userAgent;

    // Match the user agent string against known browser strings.
    var match = userAgent.match(/(Chrome|Firefox|Safari|Opera|Edge)/);

    // If a match was found, return the browser name.
    if (match) {
        return match[1];
    } else {
        return "Unknown";
    }
}

function isMobile() {
    // Get the maxTouchPoints property.
    var maxTouchPoints = navigator.maxTouchPoints;

    // If the maxTouchPoints property is greater than 0, then the device is likely a mobile device.
    if (maxTouchPoints > 0) {
        return true;
    } else {
        return false;
    }
}

function screeenWidthHeight() {
    const width = window.screen.width;
    const height = window.screen.height;
    return `${width}x${height}`;
}

// fetch for posting
async function PostBaseInfo() {
    fetch(monitoringapiLink, { //v14
        method: "POST",
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            browser: getBrowser(),
            ip: moment.tz.guess(),
            ismobile: isMobile() + " - " + screeenWidthHeight(),
            page: document.title,
            agent: navigator.userAgent
        }),

    }) //thenable
        .then((response) => {
            
            return response;
        })
        .then((item) => {
            // console.log(item); 
        });
}

// call PostBaseInfo function
PostBaseInfo();