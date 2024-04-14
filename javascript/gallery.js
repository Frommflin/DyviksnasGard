let galleryImageArray = [];

// Album
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

function showImageForm(albumId){
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
    str += `<input type="file" class="form-control" name="galleryUploads[]" id="galleryUploads" multiple required>`;
    str += `</div>`;
    str += `<input type="hidden" name="toAlbum" id="toAlbum" value="${albumId}" />`;
    str += `<div id="ImgBtnBox">`;
    str += `<button type="submit" id="addGalImg" class="btn">Spara</button>`;
    str += `<button type="submit" id="addGalDesc" class="btn">Lägg till beskrivningar</button>`;
    str += `</div>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function addImageDescription(images,albumId){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till bildtext</h1>`;
    str += `<button class="btn" onclick="undoUploadedImages()">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="addDescForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div id="hint">Max 100 tecken per bildbeskrivning.</div>`;
    str += `<div id="cardBox">`;
    for( i = 0; i < images.length; i++ ) {
        str += `<div class="imageCard">`;
        str += `<img src="./images/galleryUploads/${images[i]}" />`;
        str += `<div>`;
        str += `<input type="hidden" name="imgName${i}" id="imgName${i}" value="${images[i]}">`;
        str += `<div class="input-group">`;
        str += `<div class="input-group-prepend">`;
        str += `<span class="input-group-text">Beskrivning</span>`;
        str += `</div>`;
        str += `<input type="text" class="form-control" name="imgDescription${i}" id="imgDescription${i}" maxlength="100" onkeydown="countChars('imgDescription${i}', 'charCounter${i}')" placeholder="Kort beskrivning">`;
        str += `</div>`;
        str += `<div id="charCounter${i}" class="counters">0/100</div>`;
        str += `</div>`;
        str += `</div>`;
        
    }
    str += `</div>`;
    str += `<input type="hidden" name="sendToAlbum" id="sendToAlbum" value="${albumId}" />`;
    str += `<button class="btn">Spara</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function confirmDeleteAlbum(id){
    let str = ``;

    str += `<div class="popupBox">`;
    str += `<form id="deleteAlbumForm" class="col col-xs-6" method="post">`;
    str += `<h1>Är du säker på att du vill ta bort detta albumet?</h1>`;
    str += `<input type="hidden" name="albumId" id="albumId" value="${id}" />`;
    str += `<div class="confirmBtns">`;
    str += `<button type="submit" id="cancelAlbumDelete" class="btn">Avbryt</button>`;
    str += `<button type="submit" id="confirmAlbumDelete" class="btn">Ta bort</button>`;
    str += `</div>`;
    str += `</div>`;

    showPopup(str);
}

$(document).on("click", "#cancelAlbumDelete", function(event){
    event.preventDefault();
    closePopup();
});

function clearGallery(){
    document.getElementById("galleryBtns").innerHTML = "";
    document.getElementById("galleryBox").innerHTML = "";
    document.getElementById("galleryDescription").innerHTML = "";
}

// Single image
function showImage(img, description, album){
    let str = ``;

    str += `<div id="popupImage" class="popupBox">`;
    str += `<div class="close"><span onclick="closePopup()">&times</span></div>`;
    str += `<img id="selectedImg" src="./images/galleryUploads/${img}" />`;
    str += `<div id="imageDescription">`;
    str += `<p>${description}</p>`;
    str += `</div>`;
    if(localStorage.getItem("userRole") == "Admin"){
        str += `<hr class="divider">`;
        str += `<div id="galImgBtnBox" class="crudBox">`;

        str += `<button class="crudBtn" onclick="editImageTextForm('${description}','${img}','${album}')">`;
        str += `<img src="./icons/editimage-white.png" />`;
        str += `Redigera`;
        str += `</button>`;

        str += `<button class="crudBtn" onclick="confirmDeleteGalImg('${img}','${album}')">`;
        str += `<img src="./icons/bin-white.png" />`;
        str += `Ta bort`;
        str += `</button>`;

        str += `</div>`;
    }
    str += `</div>`;

    showPopup(str);
}

function editImageTextForm(text, img, album){
    let str1 = ``;

    str1 += `<form>`;
    str1 += `<input type="text" name="imgDesc" id="imgDesc" maxlength="100" onkeydown="countChars('imgDesc', 'charCounter')" value="${text}">`;
    str1 += `<span id="charCounter"></span>`;
    str1 += `</form>`;
    document.getElementById("imageDescription").innerHTML = str1;

    countChars("imgDesc", "charCounter");

    let str2 = ``;
    str2 += `<button class="btn" onclick="editImageText('${img}','${album}')">`;
    str2 += `<img src="./icons/save-white.png" />`;
    str2 += `Spara ändring`;
    str2 += `</button>`;
    document.getElementById("galImgBtnBox").innerHTML = str2;
}

function countChars(element, counter){
    let input = document.getElementById(element).value;
    document.getElementById(counter).innerHTML = `${input.length}/100`;
}

function confirmDeleteGalImg(file, album){
    let str = ``;

    str += `<div class="popupBox">`;
    str += `<form id="deleteGalleryImgForm" class="col col-xs-6" method="post">`;
    str += `<h1>Är du säker på att du vill ta bort den här bilden?</h1>`;
    str += `<input type="hidden" name="galImg" id="galImg" value="${file}" />`;
    str += `<input type="hidden" name="imgAlbum" id="imgAlbum" value="${album}" />`;
    str += `<div class="confirmBtns">`;
    str += `<button type="submit" id="cancelGalImgDelete" class="btn">Avbryt</button>`;
    str += `<button type="submit" id="confirmGalImgDelete" class="btn">Ta bort</button>`;
    str += `</div>`;
    str += `</div>`;

    showPopup(str);
}

$(document).on("click", "#cancelGalImgDelete", function(event){
    event.preventDefault();
    closePopup();
});


// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

//Album related CRUD actions

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
            getAlbums();
            showPage(6);
        }
    })
});

//Function to add gallery images to db without descriptions
$(document).on("click", "#addGalImg", function(event){
    event.preventDefault();

    let albumId = document.getElementById("toAlbum").value;
    let formData = new FormData();
    formData.append("toAlbum", albumId);

    // Read selected files
    let totalfiles = document.getElementById("galleryUploads").files.length;
    for (let i = 0; i < totalfiles; i++) {
        formData.append("galleryUploads[]", document.getElementById("galleryUploads").files[i]);
    }

    $.ajax({
        url: "./php/createGalleryImages.php",
        method: "POST",
        data: formData,
        contentType:false,
        processData:false,
        success: function(data){
            getGallery(albumId);
            showPage(6);
        }
    })
});

//Function to move to second form to add descriptions before adding images to db
$(document).on("click", "#addGalDesc", function(event){
    event.preventDefault();

    let albumId = document.getElementById("toAlbum").value;
    let formData = new FormData();
    formData.append("toAlbum", albumId);

    // Read selected files
    let totalfiles = document.getElementById("galleryUploads").files.length;
    for (let i = 0; i < totalfiles; i++) {
        formData.append("galleryUploads[]", document.getElementById("galleryUploads").files[i]);
    }
    
    $.ajax({
        url: "./php/uploadMultipleImages.php",
        method: "POST",
        data: formData,
        dataType: "json",
        contentType:false,
        processData:false,
        success: function(response){
            galleryImageArray = [];
            response.forEach(image => {
                galleryImageArray.push(image)
            });

            addImageDescription(galleryImageArray,albumId);
        }
    })
});

function undoUploadedImages(){

    $.ajax({
        url: "./php/unlinkMutlipleImages.php",
        method: "POST",
        data: { 
            images: JSON.stringify(galleryImageArray)
        },
        success: function(data){
            showPage(6);
        }
    })
}

//Function to add description to multiple image uploads
$(document).on("submit", "#addDescForm", function(event){
    event.preventDefault();
    let albumId = document.getElementById("sendToAlbum").value;

    let formData = new FormData();
    formData.append("sendToAlbum", albumId);
    
    let imageCards = document.getElementsByClassName("imageCard");
    let images = [];
    for( let i = 0; i < imageCards.length; i++){
        images.push({ name: document.getElementById("imgName" + i).value, description: document.getElementById("imgDescription" + i).value })
    };
    formData.append("images", JSON.stringify(images));

    $.ajax({
        url: "./php/createGalleryImageDescs.php",
        method: "POST",
        data: formData,
        contentType:false,
        processData:false
    })
    .always(function(){
        getGallery(albumId);
        showPage(6);
    });
    
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
                    str += `<button id="album${album.attributes["id"].nodeValue}" class="btn galleryBtn" onclick="showAlbum('${album.attributes["id"].nodeValue}', '${album.attributes["description"].nodeValue}')">${album.attributes["name"].nodeValue}</button>`;
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
                str += `<button id="imgBtn" class="crudBtn" onclick="showImageForm(${albumId})">`;
                str += `<img src="./icons/addimage-white.png" />Lägg till bilder</button>`;
                str += `<button id="deleteAlbum" class="crudBtn" onclick="confirmDeleteAlbum(${albumId})">`;
                str += `<img src="./icons/bin-white.png" />Ta bort detta album</button>`;
                str += `</div>`;

                document.getElementById("galleryBtns").innerHTML = str;
            }

            let str2 = ``;
            if(resultLength == 1){
                //If there is no images in this gallery
                str2 += `Det finns inga bilder i det här albumet ännu!`;
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

                        str2 += `<img src="./images/galleryUploads/${image.file}" onclick="showImage('${image.file}','${image.desc}','${albumId}')" />`;
                    }
                }
            }
            document.getElementById("galleryBox").innerHTML = str2;
        }
    })
}

// Delete Album
$(document).on("click", "#confirmAlbumDelete", function(event){
    event.preventDefault();
    let id = document.getElementById("albumId").value;

    $.ajax({
        url: "./php/deleteGalleryImages.php",
        method: "POST",
        data: {
            albumId: id,
            images: JSON.stringify(galleryImageArray)
        },
        success: function(data){
            $.ajax({
                url: "./php/deleteAlbum.php",
                method: "POST",
                data: {
                    albumId: id
                },
                success: function(data){
                    clearGallery();
                    closePopup();
                    getAlbums();
                    showPage(6);
                }
            })
        }
    }) 
});


// Single image related CRUD actions

function editImageText(image, album){
    let newDesc = document.getElementById("imgDesc").value;

    $.ajax({
        url: "./php/editGalleryImage.php",
        method: "POST",
        data: { 
            image: image,
            description: newDesc
        },
        success: function(data){
            showImage(image, newDesc, album);
        }
    })
}

// Delete image from gallery
$(document).on("click", "#confirmGalImgDelete", function(event){
    event.preventDefault();
    let img = document.getElementById("galImg").value;
    let album = document.getElementById("imgAlbum").value;

    $.ajax({
        url: "./php/deleteGalleryImage.php",
        method: "POST",
        data: {
            image: img
        },
        success: function(data){
            closePopup();
            getGallery(album);
        }
    }) 
});
