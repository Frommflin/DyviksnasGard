function changePwd(){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("forgotPwdBox").style.display="block";
}

function showLogin(){
    document.getElementById("loginBox").style.display="flex";
    document.getElementById("forgotPwdBox").style.display="none";
}

$(document).on("submit", "#forgotPwdForm", function(event){
    // TODO: Add functionality to save new password
    event.preventDefault();
    showLogin();
});

function comparePwds(name){
    let pwd1 = document.getElementById(name + "Pwd1").value;
    let pwd2 = document.getElementById(name + "Pwd2").value;
    let button = document.getElementById(name + "Btn");
    let errorMessage = document.getElementById(name + "PwdError");

    if(pwd1 === pwd2){
        button.disabled=false;
        errorMessage.style.display="none";
    } else {
        button.disabled=true;
        errorMessage.style.display="block";
    }
}

function logIn(user){
    //Navigate back to start-page
    showPage(1); 

    // Saving user role
    localStorage.setItem("userRole",user.role);
    localStorage.setItem("userName",user.name);

    checkUser();
}

function logOut(){
    //Navigate back to start-page
    showPage(1); 

    // Removing user from storage
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    
    checkUser();
}

function checkUser(){
    let welcome = document.getElementById("welcomeUser");
    if(("userName" in localStorage)){
        let user = localStorage.getItem("userName");

        //Toggling which button is shown
        document.getElementById("link8").style.display = "none";
        document.getElementById("logOutLink").style.display = "block";

        // Printing welcome text
        welcome.innerHTML = `Välkommen ${user}!`;
    } else {
        //Toggling which button is shown
        document.getElementById("link8").style.display = "block";
        document.getElementById("logOutLink").style.display = "none";

        // Removing welcome text
        welcome.innerHTML = "";
    }
}

// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

//Create account
$(document).on("submit", "#newAccountForm", function(event){
    event.preventDefault();

    // Collecting neccesary data from form to log in after creation
    let email = document.getElementById("createEmail").value;
    let pwd = document.getElementById("createAccPwd1").value;

    let userLogin = new FormData();
    userLogin.append("loginEmail", email);
    userLogin.append("loginPwd", pwd);

    $.ajax({
        url: "./php/createUser.php",
        method: "POST",
        data: new FormData(this),
        contentType:false,
        processData:false,
        success: function(data){
            for (i = 0; i < data.childNodes.length; i++) {
                if(data.childNodes.item(i).nodeName=="created"){
                    getUser(userLogin);
                }
            } 
        }
    })
});

//Sign in to existing account
$(document).on("submit", "#loginForm", function(event){
    event.preventDefault();
    let userLogin = new FormData(this);
    getUser(userLogin);
});

function getUser(incomingLogin){
    $.ajax({
        url: "./php/getUser.php",
        method: "POST",
        data: incomingLogin,
        contentType:false,
        processData:false,
        success: function(data){
            let resultset=data.childNodes[0];
            let user;

            // Iterate over all nodes in root node (i.e. users)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="user"){
                    let userXML =  resultset.childNodes.item(i);
                    user = {
                        email: userXML.attributes["email"].nodeValue,
                        name: userXML.attributes["name"].nodeValue,
                        role: userXML.attributes["role"].nodeValue
                    };
                }
            }
            logIn(user);
        }
    })
}