function showNewEventForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Lägg till ny aktivitet</h1>`;
    str += `<button class="btn" onclick="showPage(1)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="newActivityForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Titel *</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="activityName" maxlength="50" required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild *</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="activityImg" required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Beskrivning *</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="activityDesc" placeholder="Berätta om aktiviteten här"></textarea required>`;
    str += `</div>`;

    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Pris per tillfälle *</span>`;
    str += `</div>`;
    str += `<input type="number" class="form-control" name="activityPrice" min="0" required>`;
    str += `</div>`;

    str += `<button class="btn">Lägg till aktivitet</button>`;
    str += `</form>`;
    
    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}
