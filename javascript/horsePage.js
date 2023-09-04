function fillPage(name){
    // TODO: Create and connect to database for filling page dynamically
    document.getElementById('name').innerHTML = name;
}

function showHorseImgForm(){
    let str = '';

    str += `<div class="popupBox">`;
    str += `<div class="close"><span onclick='closePopup("horse")'>X</span></div>`;
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
    str += `</div>`;

    showPopup('horse', str);
}
