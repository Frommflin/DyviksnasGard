
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

function createPagination(){
    const content = document.querySelector("#newsLetter"); 
    const itemsPerPage = 5; // set number of items per page
    let currentPage = 0;
    const items = Array.from(content.getElementsByClassName("newsCard")).slice(0);

    if(items.length > 5 ){ //Run code only if num of post exceeds first page
        function showNewspage(page) {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            items.forEach((item, index) => {
            item.classList.toggle("hidden", index < startIndex || index >= endIndex);
            });
            updateActiveButtonStates();
        }
        
        function createPageButtons() {
            const totalPages = Math.ceil(items.length / itemsPerPage);
            const paginationContainer = document.createElement("nav");
            const paginationNav = document.body.appendChild(paginationContainer);
            paginationContainer.classList.add("pagination");
            paginationContainer.classList.add("pagination-sm");
            paginationContainer.classList.add("justify-content-center");
    
            const paginationList = document.createElement("ul");
            paginationNav.appendChild(paginationList);
        
            // Add page buttons
            for (let i = 0; i < totalPages; i++) {
                const listItem = document.createElement("li");
                listItem.classList.add("page-item");
    
                const pageButton = document.createElement("a");
                pageButton.classList.add("page-link");
                pageButton.textContent = i + 1;
    
                pageButton.addEventListener("click", () => {
                    currentPage = i;
                    showNewspage(currentPage);
                    updateActiveButtonStates();
                });
            
                content.appendChild(paginationContainer);
                paginationList.appendChild(listItem);
                listItem.appendChild(pageButton);
            }
        }
        
        function updateActiveButtonStates() {
            const pageButtons = document.querySelectorAll(".pagination ul li a");
            pageButtons.forEach((button, index) => {
            if (index === currentPage) {
                button.classList.add("activepgn");
            } else {
                button.classList.remove("activepgn");
            }
            });
        }
      
        createPageButtons(); // Call this function to create the page buttons initially
        showNewspage(currentPage);
    }
}

function editPostForm(number, id, title, text){
    let str1 = ``;
    str1 += `<form id="updateNewsPost">`;
    str1 += `<input type="text" class="form-control" name="updateNewsName" id="updateNewsName" maxlength="50" value="${title}" required>`;
    str1 += `<textarea class="form-control" name="updateNewsDescription" id="updateNewsDescription" required>${text}</textarea>`;
    str1 += `<input type="hidden" name="updatePostId" id="updatePostId" value="${id}">`;
    str1 += `</form>`;
    document.getElementById(`post${number}`).innerHTML = str1;

    let str2 = ``;
    str2 += `<button class="btn" onclick="editPost()">`;
    str2 += `<img src="./icons/save-white.png" />`;
    str2 += `Spara ändring`;
    str2 += `</button>`;
    str2 += `<button class="btn" onclick="getPosts()">`;
    str2 += `&times Avbryt`;
    str2 += `</button>`;
    document.getElementById("newsBtnBox").innerHTML = str2;
}

function confirmDelete(id, image){
    let str = ``;

    str += `<div class="popupBox">`;
    str += `<form id="deleteNewsForm" class="col col-xs-6" method="post">`;
    str += `<h1>Är du säker på att du vill ta bort den här nyheten?</h1>`;
    str += `<input type="hidden" name="postId" id="postId" value="${id}" />`;
    str += `<input type="hidden" name="image" id="image" value="${image}" />`;
    str += `<div class="confirmBtns">`;
    str += `<button type="submit" id="cancelDelete" class="btn">Avbryt</button>`;
    str += `<button type="submit" id="confirmDelete" class="btn">Ta bort</button>`;
    str += `</div>`;
    str += `</div>`;

    showPopup(str);
}

$(document).on("click", "#cancelDelete", function(event){
    event.preventDefault();
    closePopup();
});

// --------------------------------------------------
// --------------      AJAX CALLS      --------------
// --------------------------------------------------

// Create a new newspost
$(document).on("submit", "#addNewsForm", function(event){
    event.preventDefault();

    let message = document.querySelector("textarea[name='newsDescription']").value;
    let split = message.split("\n");
    let newMessage = split.join("¤¤");

    let title = document.querySelector("input[name='newsName']").value;
    let img = document.querySelector("input[name='newsImg']").files[0];
    let author = document.querySelector("input[name='author']").value;
    let noImg;

    let formData = new FormData();
    if(document.querySelector("input[name='newsImg']").files.length == 0){
        noImg = true;
    } else {
        noImg = false;
    }
    formData.append("newsName", title);
    formData.append("newsDescription", newMessage);
    formData.append("author", author);
    formData.append("noImage", noImg);
    formData.append("newsImg", img);

    $.ajax({
        url: "./php/createNewspost.php",
        method: "POST",
        data: formData,
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
                    let paragraphs = makeParagraphs(post.attributes["article"].nodeValue, "print");

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
                    str += `<div>${paragraphs}</div>`;
                    str += `</div>`;
                    str += `</div>`;

                    if(localStorage.getItem("userRole") == "Admin"){
                        str += `<hr>`;
                        str += `<div id="newsBtnBox" class="crudBox">`;
                        str += `<button class="crudBtn" onclick="editPostForm(${i},${post.attributes["id"].nodeValue},'${post.attributes["title"].nodeValue}','${post.attributes["article"].nodeValue}')">`;
                        str += `<img src="./icons/editpost-white.png" />`;
                        str += `Redigera`;
                        str += `</button>`;
                        str += `<button class="crudBtn" onclick="confirmDelete(${post.attributes["id"].nodeValue}, '${post.attributes["image"].nodeValue}')">`;
                        str += `<img src="./icons/bin-white.png" />`;
                        str += `Ta bort`;
                        str += `</button>`;
                        str += `</div>`;
                    }
                    str += `</div>`;
                }
            }
            document.getElementById("newsLetter").innerHTML = str;
            createPagination();
        }
    })
}

function editPost(){
    let id = document.getElementById("updatePostId").value;
    let title = document.getElementById("updateNewsName").value;
    let text = document.getElementById("updateNewsDescription").value;

    $.ajax({
        url: "./php/editNewspost.php",
        method: "POST",
        data: {
            postId: id, 
            title: title,
            description: text
        },
        success: function(data){
            getPosts();
        }
    })
}

// Delete a post
$(document).on("click", "#confirmDelete", function(event){
    event.preventDefault();
    let id = document.getElementById("postId").value;
    let img = document.getElementById("image").value;

    $.ajax({
        url: "./php/deleteNewspost.php",
        method: "POST",
        data: {
            postId: id, 
            image: img
        },
        success: function(data){
            getPosts();
            closePopup();
        }
    })
});
