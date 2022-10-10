$("#sendMessageButton").on("click", () => {
    let sendMessageButton = document.getElementById("sendMessageButton");
    let url = "https://script.google.com/macros/s/AKfycbyyrjKxTLmrgjtIpX4LcMbZlXVqQJRxfIZU_wley7FwFfKym3Q/exec";
    let name = $("#name").val();
    let email = $("#email").val();
    let message = $("#message").val();
    let location = moment.tz.guess();
    let data = {
        name: name,
        email: email,
        message: message,
        location: location
    };
    sendMessageButton.disabled = true;

        if(name == "" || email == "" || message == "")
        {
            $("#result").html("Please fill all the fields");
            $("#result").css("color", "red");
            sendMessageButton.disabled = false;
            return;
        }
        //check email format
        if(!email.includes("@") || !email.includes("."))
        {
            $("#result").html("Please enter a valid email address");
            $("#result").css("color", "red");
            sendMessageButton.disabled = false;
            return;
        }
        //check if the name and email is too short
        if(name.length < 3 || email.length < 3)
        {
            $("#result").html("Please enter a valid name and email");
            $("#result").css("color", "red");
            sendMessageButton.disabled = false;
            return;
        }
        //check if the message is too short and too long
        if(message.length < 3 || message.length > 500)
        {
            
            $("#result").html("Please enter a valid messages");
            $("#result").css("color", "red");
            sendMessageButton.disabled = false;
            return;
        }
        //check for the internet connection
        let isOnLine = navigator.onLine;
        if (isOnLine) {
            //do nothing, proceed to try fetch
        } 
        else 
        {
            $("#result").html("Please check your internet connection");
            $("#result").css("color", "red");
            sendMessageButton.disabled = false;
            return;
        }
        //try fetch
        try
        {
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                }
            })
            .then(function(response) {
                if (!response.ok) {
                    return Promise.reject('promise reject done...');
                }
                return response.json(); 
                })
                .then(function(json) {
                    console.log(json);
                })
                .catch (function(error) {
                    console.log(error);
                });
            }
            catch(err){
                console.log(err);
            }
            finally 
            {
                $("#result").html("Message sent successfully");
                $("#result").css("color", "green");
                //clear the form
                $("#name").val("");
                $("#email").val("");
                $("#message").val("");
                //set time out
                setTimeout(function(){
                    $("#result").html("");
                }
                , 6000);

                sendMessageButton.disabled = false;
            }
});
