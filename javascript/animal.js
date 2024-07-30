function showNewAnimalForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Nytt djur på gården</h1>`;
    str += `<button class="btn" onclick="showPage(10)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newAnimalForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
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
            // Iterate over all nodes in root node (i.e. horses)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="animal"){
                    let animal = resultset.childNodes.item(i);
                    //${animal.attributes["id"].nodeValue}
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
