function showAlbum(a) {
    // Reset all to 'normal' button look
    buttons = document.getElementsByClassName("galleryBtn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("activeBtn");
    }

    // Mark selected Album-button
    //TODO: Show relevant album-content
    document.getElementById("album" + a).classList.add("activeBtn");

}

function showImage(img){
    let popup = document.getElementById('galleryPopup');
    let str = '';

    str += `<div id="popupContent">`;
    str += `<div><span onclick='closeImage()'>X</span></div>`;
    str += `<img src="./images/${img}" />`;
    str += `<p>Kort beskrivning av bilden här</p>`;
    str += `</div>`;

    popup.style.display='flex';
    popup.innerHTML = str;

    //Preventing page from scrolling while image is in focus
    document.body.classList.add('stopScroll');
    document.body.bind('touchmove', function(e){
        e.preventDefault()
    });
}

function closeImage(){
    document.getElementById('galleryPopup').style.display='none';
    document.getElementById('galleryPopup').innerHTML = '';

    //Enabling scrolling on page when image is closed
    document.body.classList.remove('stopScroll')
    document.body.unbind('touchmove')
}
