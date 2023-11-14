
function showPopup(name, str){
    let popup = document.getElementById(name + "Popup");
    popup.style.display="flex";
    if(str != ""){
        popup.innerHTML = str;
    }
    
    disableScrolling();
}

function disableScrolling(){
    //Preventing page from scrolling while popup is in focus
    document.body.classList.add("stopScroll");
}

function closePopup(name){
    document.getElementById(name + "Popup").style.display="none";
    document.getElementById(name + "Popup").innerHTML = "";

    //Enabling scrolling on page when image is closed
    document.body.classList.remove("stopScroll")
}
