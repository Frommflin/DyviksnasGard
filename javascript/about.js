function editAboutForm(id, text, image){
    let info = makeParagraphs(text, "newLine");

    let str = ``;
    str += `<form id="updateAbout">`;
    str += `<textarea class="form-control" name="updateAboutDescription" required>${info}</textarea>`;
    
    str += `<div class="input-group">`;
    str += `<div class="input-group-prepend">`;
    str += `<span class="input-group-text">Bild</span>`;
    str += `</div>`;
    str += `<input type="file" class="form-control" name="newAboutImage">`;
    str += `</div>`;
    str += `<span class="hint">`;
    str += `För att behålla bilden, lämna filuppladdningen tom!`;
    str += `</span>`;
    
    str += `<input type="hidden" name="updateAboutId" value="${id}">`;
    str += `<input type="hidden" name="oldAboutImage" value="${image}">`;

    str += `<div class="crudBox">`;
    str += `<button class="btn" onclick="saveAboutEdit()">`;
    str += `<img src="./icons/save-white.png" />`;
    str += `Spara ändring`;
    str += `</button>`;
    str += `<button class="btn" onclick="getAbouts()">`;
    str += `&times Avbryt`;
    str += `</button>`;
    str += `</div>`;

    str += `</form>`;
    document.getElementById(`aboutBox${id}`).innerHTML = str;
}

// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

function getAbouts(){
    $.ajax({
        url: "./php/getAbouts.php",
        method: "POST",
        success: function(data){
            let resultset=data.childNodes[0];

            str = ``;
            // Iterate over all nodes in root node (i.e. abouts)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="about"){
                    let about =  resultset.childNodes.item(i);
                    
                    let info = makeParagraphs(about.attributes["description"].nodeValue, "print");

                    str += `<div class="about">`;                    
                    str += `<img src="./images/${about.attributes["img"].nodeValue}" alt="Om ${about.attributes["name"].nodeValue}">`;
                    str += `<div>`;
                    str += `<div class="topRow">`;
                    str += `<h1>${about.attributes["name"].nodeValue}</h1>`;
                    if(localStorage.getItem("userRole") === "Admin"){
                        str += `<div>`;
                        str += `<button class="crudBtn" onclick="editAboutForm(${about.attributes["id"].nodeValue},'${about.attributes["description"].nodeValue}','${about.attributes["img"].nodeValue}')">`;
                        str += `<img src="./icons/editpost-white.png" />`;
                        str += `Redigera kapitel`;
                        str += `</button>`;
                        str += `</div>`;
                    }
                    str += `</div>`;
                    str += `<div id="aboutBox${about.attributes["id"].nodeValue}">`;
                    str += info;
                    str += `</div>`;
                    str += `</div>`;
                    str += `</div>`;
                }
                document.getElementById("abouts").innerHTML = str;
            }
        },
        error: function (error) {
            alert(`Något gick fel. Testa ladda om sidan.`);
        }
    })
}

function saveAboutEdit(){
    let id = document.querySelector("input[name='updateAboutId']").value;
    let oldImg = document.querySelector("input[name='oldAboutImage']").value;
    let newImg = document.querySelector("input[name='newAboutImage']").files[0];
    let noImg;

    if(document.querySelector("input[name='newAboutImage']").files.length == 0){
        noImg = "true";
    } else {
        noImg = "false";
    }

    let text = document.querySelector("textarea[name='updateAboutDescription']").value;
    let split = text.split("\n");
    let newText = split.join("¤¤");

    let formData = new FormData();
    formData.append("id", id);
    formData.append("newImage", newImg);
    formData.append("oldImage", oldImg);
    formData.append("noImage", noImg);
    formData.append("newDesc", newText);

    // Display the key/value pairs
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    $.ajax({
        url: "./php/editAbout.php",
        method: "POST",
        data: formData,
        contentType:false,
        processData:false,
        success: function(data){
            getAbouts();
            // showPage(2);
        },
        error: function (error) {
            ajaxError(error);
        }
    })
}
