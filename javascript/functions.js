
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

function makeParagraphs(text, type){
    let paragraphs = text.split("¤¤");
    let str = "";

    for(i = 0; i<paragraphs.length; i++){
        if(type == "print"){
            if(paragraphs[i] != ""){
                str += `<p>${paragraphs[i]}</p>`;
            }
        } else {
            str += `${paragraphs[i]}`;
            if(i != paragraphs.length-1){
                str += `\r\n`;
            }
        }
    }
    return str;
}

function ajaxError(error){
    console.log(`Error: ${error.responseText}`);
    alert(`Något gick fel. Testa ladda om sidan och försök igen, annars skicka bild på följande felkod till Klara. \n\n Error: ${error.responseText}`);
}
