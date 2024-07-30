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
            //TODO: undate page with animals
            showPage(10);
        },
        error: function (error) {
            ajaxError(error);
        }
    })
});