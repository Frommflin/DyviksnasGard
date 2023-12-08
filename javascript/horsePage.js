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
    str += `<h1>Ny häst på gården</h1>`;
    str += `<button class="btn" onclick="showPage(5,2)">Avbryt</button>`; //TODO: Adjust second parameter to show to previously clicked horse
    str += `</div>`;
    str += `<form id="HorseImageForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<h1>Lägg till bilder på {name}</h1>`;
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
