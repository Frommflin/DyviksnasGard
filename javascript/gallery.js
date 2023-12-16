
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

function showAlbumForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Skapa nytt album</h1>`;
    str += `<button class="btn" onclick="showPage(6)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newAlbumForm" class="col col-xs-6" method="post">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Namn på album</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="albumName" maxlength="30" placeholder="Album" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Kort beskrivning</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="albumDescription" maxlength="50" placeholder="Beskrivning">`;
    str += `</div>`;
    str += `<button class="btn">Skapa album</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function showImageForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till bilder</h1>`;
    str += `<button class="btn" onclick="showPage(6)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="addImgForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bilder</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="upload[]" id="upload" multiple required>`;
    str += `</div>`;
    str += `<input type="hidden" name="toAlbum" value="albumName" />`;
    str += `<div id="ImgBtnBox">`;
    str += `<button class="btn">Spara</button>`;
    str += `<button class="btn" onclick="addImageDescription()">Lägg till beskrivningar</button>`;
    str += `</div>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function addImageDescription(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till bildtext</h1>`;
    str += `<button class="btn" onclick="showPage(6)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="addDescForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div id="hint">Max 100 tecken per bildbeskrivning.</div>`;
    str += `<div id="cardBox">`;
    str += `<div class="imageCard">`;
    str += `<img src="./images/PlaceholderBigImg.png" />`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="imgDescription" maxlength="100" placeholder="Kort beskrivning" required>`;
    str += `</div>`;
    str += `</div>`;
    str += `</div>`;
    str += `<input type="hidden" name="toAlbum" value="albumName" />`;
    str += `<button class="btn">Spara</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function showImage(img){
    let str = ``;

    str += `<div id="popupImage" class="popupBox">`;
        str += `<div class="close" onclick="closePopup('gallery')">&times;</div>`;
        str += `<div>`;
            str += `<img id="selectedImg" src="./images/${img}" />`;
            str += `<p>Kort beskrivning av bilden här</p>`;
            str += `<hr>`;
            str += `<div class="crudBox">`;
                str += `<button class="crudBtn">`;
                str += `<img src="./icons/editimage-white.png" />`;
                str += `Redigera`;
                str += `</button>`;
                str += `<button class="crudBtn">`;
                str += `<img src="./icons/bin-white.png" />`;
                str += `Ta bort`;
                str += `</button>`;
            str += `</div>`;
        str += `</div>`;
    str += `</div>`;

    showPopup(str);
}
