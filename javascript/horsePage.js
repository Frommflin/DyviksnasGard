function fillPage(name){
    // TODO: Create and connect to database for filling page dynamically
    document.getElementById("name").innerHTML = name;
}

function showNewHorseForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Ny häst på gården</h1>`;
    str += `<button class="btn" onclick="showPage(4)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newHorseForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Namn</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="horseName" maxlength="30" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Smeknamn</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="nickname" maxlength="15">`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Färg</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="color" maxlength="15" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Ras</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="breed" maxlength="20">`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Mankhöjd</span>`;
    str += `</div>`;
    str += `<input type="number" class="form-control" name="height" min="0" placeholder="i centimeter" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Födelseår</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="yearOfBirth" maxlength="4" placeholder="ÅÅÅÅ">`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="profileImg" >`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="description" placeholder="Berätta om hästen här"></textarea>`;
    str += `</div>`;
    str += `<button class="btn">Spara häst</button>`;
    str += `</form>`;
    
    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function showHorseImgForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till bilder på {namn}</h1>`;
    str += `<button class="btn" onclick="showPage(5,2)">Avbryt</button>`; //TODO: Adjust second parameter to show to previously clicked horse
    str += `</div>`;
    str += `<form id="HorseImageForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bilder</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="uploadHorse[]" id="uploadHorse" multiple required>`;
    str += `</div>`;
    str += `<input type="hidden" name="horseId" value="horseID" />`;
    str += `<button class="btn">Spara bilder</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}


// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// page4 - All horses

// Add a new horse
$(document).on("submit", "#newHorseForm", function(event){
    event.preventDefault();
    $.ajax({
        url: "./php/createHorse.php",
        method: "POST",
        data: new FormData(this),
        contentType:false,
        processData:false,
        success: function(data){
            showPage(4);
        }
    })
});

function getHorses(){
    $.ajax({
        url: "./php/getAllHorses.php",
        method: "POST",
        success: function(data){
            let resultset = data.childNodes[0];
            
            let str1 = ``;
            let str2 = ``;
            // Iterate over all nodes in root node (i.e. horses)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="horse"){
                    let horse = resultset.childNodes.item(i);

                    // Creating navigation links
                    str1 += `<a id="nestedLink${horse.attributes["id"].nodeValue}" `;
                    str1 += `class="dropdown-item spaLink" href="#" `;
                    str1 += `onclick="showPage(5,${horse.attributes["id"].nodeValue}); `;
                    str1 += `getHorse('${horse.attributes["id"].nodeValue}')" >`;
                    str1 += `${horse.attributes["name"].nodeValue}`;
                    str1 += `</a>`;

                    // Creating profile cards on page 4
                    str2 += `<div class="card profileCard" `;
                    str2 += `onclick="showPage(5,${horse.attributes["id"].nodeValue}); `;
                    str2 += `fillPage('${horse.attributes["name"].nodeValue}')" >`;
                    str2 += `<img class="card-img-top" `;
                    str2 += `src="./images/horseProfiles/${horse.attributes["image"].nodeValue}" `;
                    str2 += `alt="${horse.attributes["name"].nodeValue}">`;
                    str2 += `<div class="cardBody">`;
                    str2 += `<h2>${horse.attributes["name"].nodeValue}</h2>`;
                    str2 += `</div>`;
                    str2 += `</div>`;
                }
            }
            document.getElementById("horseLinks").innerHTML = str1;
            document.getElementById("cardContainer").innerHTML = str2;
        }
    })
}
