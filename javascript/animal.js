function showNewAnimalForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Nytt djur på gården</h1>`;
    str += `<button class="btn" onclick="showPage(10)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newAnimalForm" class="col col-xs-6 animalForm" method="post" enctype="multipart/form-data">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Namn *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="animalName" maxlength="30" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Ras *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="animalBreed" maxlength="20" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Födelseår *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="animalYOB" maxlength="4" placeholder="ÅÅÅÅ" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild *</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="animalImg" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="animalDesc" placeholder="Berätta om djuret här (valfritt)"></textarea>`;
    str += `</div>`;
    str += `<button class="btn">Lägg till</button>`;
    str += `</form>`;
    
    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function editAnimalForm(id, name, breed, year, img, text){

    let info = makeParagraphs(text, "newline");

    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Redigera</h1>`;
    str += `<button class="btn" onclick="showPage(10)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="editAnimalForm" class="col col-xs-6 animalForm imageEditForm" method="post" enctype="multipart/form-data">`;
    str += `<div class="formcontent">`;

    str += `<div class="formImage">`;
    str += `<img src="./images/animalUploads/${img}" alt="Nuvarande profilbild på ${name}">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="newAnimalImage">`;
    str += `</div>`;
    str += `<span class="hint">`;
    str += `För att behålla bilden, lämna filuppladdningen tom!`;
    str += `</span>`;
    str += `<input type="hidden" value="${img}" name="oldAnimalImage" >`;
    str += `</div>`;

    str += `<div class="formInputs">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Namn *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="updateAnimalName" maxlength="30" value="${name}" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Ras *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="updateAnimalBreed" maxlength="20" value="${breed}" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Födelseår *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="updateAnimalYOB" maxlength="4" value="${year}" placeholder="ÅÅÅÅ" required>`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="updateAnimalDesc" placeholder="Berätta om hästen här (valfritt)">${info}</textarea>`;
    str += `</div>`;
    str += `</div>`;

    str += `</div>`;
    str += `<input type="hidden" value="${id}" name="AnimalId" >`;
    str += `<button class="btn">Spara ändringar</button>`;
    str += `</form>`;
    
    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}

function deleteHorse(id, img){
    let str = ``;

    str += `<div class="popupBox">`;
    str += `<form id="deleteAnimalForm" class="col col-xs-6" method="post">`;
    str += `<h1>Är du säker på att du vill ta bort det här djuret?</h1>`;
    str += `<input type="hidden" name="animalDeleteId" value="${id}" />`;
    str += `<input type="hidden" name="animalDeleteImg" value="${img}" />`;
    str += `<div class="confirmBtns">`;
    str += `<button type="submit" id="cancelAnimalDelete" class="btn">Avbryt</button>`;
    str += `<button type="submit" id="confirmAnimalDelete" class="btn">Ta bort</button>`;
    str += `</div>`;
    str += `</div>`;

    showPopup(str);
}

$(document).on("click", "#cancelAnimalDelete", function(event){
    event.preventDefault();
    closePopup();
});

// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// Add a new animal
$(document).on("submit", "#newAnimalForm", function(event){
    event.preventDefault();


    let name = document.querySelector("input[name='animalName']").value;
    let breed = document.querySelector("input[name='animalBreed']").value;
    let year = document.querySelector("input[name='animalYOB']").value;
    let img = document.querySelector("input[name='animalImg']").files[0];

    let text = document.querySelector("textarea[name='animalDesc']").value;
    let split = text.split("\n");
    let newText = split.join("¤¤");

    let formData = new FormData();
    formData.append("animalName", name);
    formData.append("animalBreed", breed);
    formData.append("animalYOB", year);
    formData.append("animalImg", img);
    formData.append("animalDesc", newText);

    $.ajax({
        url: "./php/createAnimal.php",
        method: "POST",
        data: formData,
        contentType:false,
        processData:false,
        success: function(data){
            getAnimals();
            showPage(10);
        },
        error: function (error) {
            ajaxError(error);
        }
    })
});

function getAnimals(){
    $.ajax({
        url: "./php/getAllAnimals.php",
        method: "POST",
        success: function(data){
            let resultset = data.childNodes[0];
            
            let str = ``;
            // Iterate over all nodes in root node (i.e. animals)
            for (let i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="animal"){
                    let animal = resultset.childNodes.item(i);
                    const currentYear = new Date().getFullYear();
                    let age = currentYear - animal.attributes["yob"].nodeValue;
                    let text = makeParagraphs(animal.attributes["description"].nodeValue, "print");

                    // Creating cards on page 10
                    str += `<div class="animalCard">`;
                    str += `<img src="./images/animalUploads/${animal.attributes["img"].nodeValue}" alt="${animal.attributes["name"].nodeValue}"/>`;
                    str += `<div class="animalInfo">`;
                    str += `<h1>${animal.attributes["name"].nodeValue}</h1>`;
                    str += `<div>`;
                    str += `Ras: ${animal.attributes["breed"].nodeValue}`;
                    str += `</div>`;
                    str += `<div>`;
                    str += `Ålder: ${age} år`;
                    str += `</div>`;
                    str += text;
                    str += `</div>`;
                    if(localStorage.getItem("userRole") == "Admin"){
                        str += `<div class="crudBox">`;
                        str += `<hr>`;
                        str += `<button class="crudBtn" onclick="editAnimalForm(${animal.attributes["id"].nodeValue},'${animal.attributes["name"].nodeValue}','${animal.attributes["breed"].nodeValue}','${animal.attributes["yob"].nodeValue}','${animal.attributes["img"].nodeValue}','${animal.attributes["description"].nodeValue}')">`;
                        str += `<img src="./icons/editpet-white.png" />`;
                        str += `Redigera`;
                        str += `</button>`;
                        str += `<button class="crudBtn" onclick="deleteHorse(${animal.attributes["id"].nodeValue},'${animal.attributes["img"].nodeValue}')">`;
                        str += `<img src="./icons/bin-white.png" />`;
                        str += `Ta bort`;
                        str += `</button>`;
                        str += `</div>`;
                    }
                    str += `</div>`;
                }
            }
            document.getElementById("animalBox").innerHTML = str;
        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}

// Edit animal
$(document).on("submit", "#editAnimalForm", function(event){
    event.preventDefault();

    let id = document.querySelector("input[name='AnimalId']").value;
    let name = document.querySelector("input[name='updateAnimalName']").value;
    let breed = document.querySelector("input[name='updateAnimalBreed']").value;
    let year = document.querySelector("input[name='updateAnimalYOB']").value;
    let oldimg = document.querySelector("input[name='oldAnimalImage']").value;
    let img = document.querySelector("input[name='newAnimalImage']").files[0];
    let noImg;

    if(document.querySelector("input[name='newAnimalImage']").files.length == 0){
        noImg = "true";
    } else {
        noImg = "false";
    }

    let text = document.querySelector("textarea[name='updateAnimalDesc']").value;
    let split = text.split("\n");
    let newText = split.join("¤¤");

    let formData = new FormData();
    formData.append("animalId", id);
    formData.append("newName", name);
    formData.append("newBreed", breed);
    formData.append("newYOB", year);
    formData.append("newImage", img);
    formData.append("oldImage", oldimg);
    formData.append("newDesc", newText);
    formData.append("noNewImage", noImg);

    $.ajax({
        url: "./php/editAnimal.php",
        method: "POST",
        data: formData,
        contentType:false,
        processData:false,
        success: function(data){
            getAnimals();
            showPage(10);
        },
        error: function (error) {
            ajaxError(error);
        }
    })
});

// Delete animal
$(document).on("click", "#confirmAnimalDelete", function(event){
    event.preventDefault();
    let id = document.querySelector("input[name='animalDeleteId']").value;
    let img = document.querySelector("input[name='animalDeleteImg']").value;

    // First delete all images in table using horse as foreign key
    $.ajax({
        url: "./php/deleteAnimal.php",
        method: "POST",
        data: {
            animalId: id,
            image: img
        },
        success: function(data){
            closePopup();
            getAnimals();
        },
        error: function (error) {
            ajaxError(error);
        }
    }) 
});