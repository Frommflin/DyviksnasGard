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