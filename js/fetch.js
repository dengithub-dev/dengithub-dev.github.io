    function post_data(){
        var url = "https://script.google.com/macros/s/AKfycbxkJG_4aZ-zEXlHwxXfbXLKrek9VHeh_dXU-cMR85YcFAuDtgCs/exec";
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;
        var data = "{" + "\"name\":\"" + name + "\",\"email\":\"" + email + "\",\"message\":\"" + message + "\"}";
        //check if the data is empty
        if(name == "" || email == "" || message == "")
        {
            alert("Please fill in all the fields");
            return;
        }
        //check email format
        if(!email.includes("@") || !email.includes("."))
        {
            alert("Please enter a valid email address");
            return;
        }
        //check for the internet connection
        var isOnLine = navigator.onLine;
        if (isOnLine) {
            //do nothing, proceed to try fetch
        } 
        else 
        {
            alert("You have no internet connection, posting data will be aborted...");
            return;
        }
        //try fetch
        try
        {
            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                body: data,
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
                alert("Data sent successfully...");
                //clear the form
                name = "";
                email = "";
                message = "";
            }
        }	
      
