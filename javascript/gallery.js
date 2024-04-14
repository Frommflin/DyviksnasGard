let galleryImageArray = [];

function showAlbum(id, description) {
    // Reset all to 'normal' button look
    buttons = document.getElementsByClassName("galleryBtn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("activeBtn");
    }

    // Mark selected Album-button
    document.getElementById("album" + id).classList.add("activeBtn");

    if(description != ""){
        document.getElementById("galleryDescription").innerHTML = description;
    }
    
    getGallery(id);
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
        str += `<div class="close" onclick="closePopup()">&times;</div>`;
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


// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// Create new album
$(document).on("submit", "#newAlbumForm", function(event){
    event.preventDefault();
    $.ajax({
        url: "./php/createAlbum.php",
        method: "POST",
        data: new FormData(this),
        contentType:false,
        processData:false,
        success: function(data){
            showPage(6);
        }
    })
});

function getAlbums(){
    $.ajax({
        url: "./php/getAlbums.php",
        method: "POST",
        success: function(data){
            let resultset=data.childNodes[0];

            str = ``;
            // Iterate over all nodes in root node (i.e. albums)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="album"){
                    let album =  resultset.childNodes.item(i);
                    str += `<button id="album${album.attributes["id"].nodeValue}" class="btn galleryBtn" onclick="showAlbum('${album.attributes["id"].nodeValue}')">${album.attributes["name"].nodeValue}</button>`;
                }
            }
            document.getElementById("galleryNav").innerHTML = str;
        }
    })
}

function getGallery(albumId){
    galleryImageArray = [];  //Clearing out any previously saved images
    $.ajax({
        url: "./php/getGalleryImages.php",
        method: "POST",
        data: { 
            albumID: albumId
        },
        success: function(data){
            let resultset=data.childNodes[0];
            let resultLength = resultset.childNodes.length;

            if(localStorage.getItem("userRole") === "Admin"){
                let str = ``;

                str += `<div>`;
                str += `<button id="imgBtn" class="crudBtn" onclick="showImageForm()">`;
                str += `<img src="./icons/addimage-white.png" />Lägg till bilder</button>`;
                str += `<button id="deleteAlbum" class="crudBtn"">`;
                str += `<img src="./icons/bin-white.png" />Ta bort detta album</button>`;
                str += `</div>`;

                document.getElementById("galleryBtns").innerHTML = str;
            }

            let str2 = ``;
            if(resultLength == 1){
                //If there is no images in this gallery
                str2 += `<p>Det finns inga bilder i det här albumet ännu!</p>`;
            } else {
                // Iterate over all nodes in root node (i.e. gallery)
                for (i = 0; i < resultset.childNodes.length; i++){
                    if(resultset.childNodes.item(i).nodeName=="image"){
                        let item =  resultset.childNodes.item(i);

                        let image = {
                            file: item.attributes["name"].nodeValue,
                            desc: item.attributes["description"].nodeValue
                        };

                        galleryImageArray.push(image.file);

                        str2 += `<img src="./images/galleryUploads/${image.file}" onclick="showImage('${image.file}')" />`;
                    }
                }
            }
            document.getElementById("galleryBox").innerHTML = str2;
        }
    })
}
