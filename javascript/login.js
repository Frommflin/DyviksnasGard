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
    // Saving user role
    localStorage.setItem("userRole",user.role);
    localStorage.setItem("userName",user.name);
    checkUser();
    //Navigate back to start-page
    showPage(1); 
}

function logOut(){
    // Removing user from storage
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    checkUser();
    // Navigate back to start-page
    showPage(1); 
}

function checkUser(){
    let welcome = document.getElementById("welcomeUser");
    if(("userName" in localStorage) && ("userRole" in localStorage)){
        let user = localStorage.getItem("userName");
        let role = localStorage.getItem("userRole");

        //Toggling which button is shown
        document.getElementById("link8").style.display = "none";
        document.getElementById("logOutLink").style.display = "block";

        // Printing welcome text
        welcome.innerHTML = `Välkommen ${user}!`;
        if(role === "Admin"){
            //Print admin buttons
            let str = ``;

            // Creating button for adding news, Page 1
            str += `<button class="crudBtn" onclick="showNewsForm('${user}')">`;
            str += `<img src="./icons/addpost-white.png" />`;
            str += `Lägg till nyhet`;
            str += `</button>`;
            document.getElementById("post").innerHTML = str;
            
            // Creating button for adding a new horse, Page 4
            str = `<button class="crudBtn" onclick="showNewHorseForm()">`;
            str += `<img src="./icons/addhorse-white.png" />`;
            str += `Lägg till ny häst`;
            str += `</button>`;
            document.getElementById("horse").innerHTML = str;
            
            // Creating button for adding albums, Page 6
            str = `<button id="albumBtn" class="crudBtn" onclick="showAlbumForm()">`;
            str += `<img src="./icons/addalbum-white.png" />`;
            str += `Nytt album`;
            str += `</button>`;
            document.getElementById("album").innerHTML = str;
        } else {
            hideAdmins();
        }
    } else {
        //Toggling which button is shown
        document.getElementById("link8").style.display = "block";
        document.getElementById("logOutLink").style.display = "none";

        // Removing welcome text
        welcome.innerHTML = "";

        hideAdmins();
    }
}

function hideAdmins(){
    document.getElementById("post").innerHTML = "";
    document.getElementById("horse").innerHTML = "";
    document.getElementById("album").innerHTML = "";
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
        },
        error: function (error) {
            alert(`Något gick fel.`);
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
        },
        error: function (error) {
            alert(`Felaktig mail eller lösenord.`);
        }
    })
}