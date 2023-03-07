function showPage(p) {
    // Step 1 - Hide all pages and clear active-tags on navlinks
    pageArr = document.getElementsByClassName("page");
    linkArr = document.getElementsByClassName("spaLink");
    for (let i = 0; i < pageArr.length; i++) {
        pageArr[i].style.display = "none";
        linkArr[i].classList.remove("active");
    }
    // Step 2 - Show the selected page and mark navlink as active
    document.getElementById("page" + p).style.display = "block";
    document.getElementById("link" + p).classList.add("active");
}

function findPage(){
    let page = localStorage.getItem('goTo');
    if(page === null){
        showPage(1);
    } else {
        showPage(page);
        localStorage.clear();
    }
}

function storePage(p){
    localStorage.setItem('goTo', p);
}