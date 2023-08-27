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