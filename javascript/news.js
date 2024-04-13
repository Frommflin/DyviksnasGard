
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
            createPagination();
        }
    })
}