function changePwd(){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("forgotPwdBox").style.display="block";
}

function showLogin(){
    document.getElementById("loginBox").style.display="flex";
    document.getElementById("forgotPwdBox").style.display="none";
}

$(document).on("submit", "#forgotPwdForm", function(event){
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