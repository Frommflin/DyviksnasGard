
function showPopup(str){
    let popup = document.getElementById("popup");
    popup.style.display="flex";
    popup.innerHTML = str;
    
    //Preventing page from scrolling while popup is in focus
    document.body.classList.add("stopScroll");
}

function closePopup(){
    let popup = document.getElementById("popup");
    popup.style.display="none";
    popup.innerHTML = "";

    //Enabling scrolling on page when image is closed
    document.body.classList.remove("stopScroll")
}
