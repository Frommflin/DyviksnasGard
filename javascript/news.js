
function showNewsForm(){
    let str = ``;

    str += `<div class="topRow">`;
    str += `<h1>Nytt på Dyviksnäs Gård</h1>`;
    str += `<button class="btn" onclick="showPage(1)">Avbryt</button>`;
    str += `</div>`;
    str += `<form id="addNewsForm" class="col col-xs-6" method="post" enctype="multipart/form-data">`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Titel</span>`;
    str += `</div>`;
    str += `<input type="text" class="form-control" name="newsName" maxlength="50">`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="newsImg" >`;
    str += `</div>`;
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Meddelande</span>`;
    str += `</div>`;
    str += `<textarea class="form-control" name="newsDescription" placeholder="Berätta om nyheten här" required></textarea>`;
    str += `</div>`;
    str += `<input type="hidden" name="author" value="USERNAME" />`;
    str += `<button class="btn">Publicera</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}
