
function showNewsForm(user){
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
    str += `<input type="text" class="form-control" name="newsName" maxlength="50" required>`;
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
    str += `<input type="hidden" name="author" value="${user}" />`;
    str += `<button class="btn">Publicera</button>`;
    str += `</form>`;

    document.getElementById("formBox").innerHTML = str;
    showPage(9);
}


// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// Create a new newspost
$(document).on("submit", "#addNewsForm", function(event){
    event.preventDefault();
    $.ajax({
        url: "./php/createNewspost.php",
        method: "POST",
        data: new FormData(this),
        contentType:false,
        processData:false,
        success: function(data){
            getPosts();
            showPage(1);
        }
    })
});

// Get all newsposts
function getPosts(){
    $.ajax({
        url: "./php/getNewsposts.php",
        method: "POST",
        success: function(data){
            let resultset=data.childNodes[0];
            
            let str = ``;
            // Iterate over all nodes in root node (i.e. newsposts)
            for (i = 0; i < resultset.childNodes.length; i++){
                if(resultset.childNodes.item(i).nodeName=="post"){
                    let post = resultset.childNodes.item(i);

                    str += `<div class="newsCard">`;
                    str += `<div class="postDetails">`;
                    str += `<span>${post.attributes["date"].nodeValue}</span>`;
                    str += `<span>${post.attributes["author"].nodeValue}</span>`;
                    str += `</div>`;
                    str += `<hr>`;
                    str += `<div class="postContent">`;
                    if(post.attributes["image"].nodeValue != ""){
                        str += `<img src="./images/newsUploads/${post.attributes["image"].nodeValue}" />`;
                    }
                    str += `<div id="post${i}" class="article">`;
                    str += `<h3>${post.attributes["title"].nodeValue}</h3>`;
                    str += `<p>${post.attributes["article"].nodeValue}</p>`;
                    str += `</div>`;
                    str += `</div>`;

                    if(localStorage.getItem("userRole") == "Admin"){
                        str += `<hr>`;
                        str += `<div id="newsBtnBox" class="crudBox">`;
                        str += `<button class="crudBtn">`;
                        str += `<img src="./icons/editpost-white.png" />`;
                        str += `Redigera`;
                        str += `</button>`;
                        str += `<button class="crudBtn">`;
                        str += `<img src="./icons/bin-white.png" />`;
                        str += `Ta bort`;
                        str += `</button>`;
                        str += `</div>`;
                    }
                    str += `</div>`;
                }
            }
            document.getElementById("newsLetter").innerHTML = str;
        }
    })
}