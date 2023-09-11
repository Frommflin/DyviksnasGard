function changePwd(){
    document.getElementById('loginBox').style.display='none';
    document.getElementById('forgotPwdBox').style.display='block';
}

$(document).on('submit', '#forgotPwdForm', function(event){
    event.preventDefault();
    document.getElementById('loginBox').style.display='flex';
    document.getElementById('forgotPwdBox').style.display='none';
});