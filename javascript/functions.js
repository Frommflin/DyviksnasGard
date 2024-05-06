
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

function makeParagraphs(text){
    let paragarphs = text.split("¤¤");
    let str = "";
    paragarphs.forEach(paragraph => {
        if(paragraph != ""){
            str += `<p>${paragraph}</p>`;
        }
    });
    return str;
}
