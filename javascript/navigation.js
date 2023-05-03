function showPage(p, h) {
    // Step 1 - Hide all pages and clear active-tags on navlinks
    pageArr = document.getElementsByClassName("page");
    linkArr = document.getElementsByClassName("spaLink");
    for (let i = 0; i < pageArr.length; i++) {
        pageArr[i].style.display = "none";
    }
    for (let i = 0; i < linkArr.length; i++) {
        linkArr[i].classList.remove("active");
    }

    // Step 2 - Show the selected page and mark navlink as active
    document.getElementById("page" + p).style.display = "block";

    if(p == 4 || p == 5){
        document.getElementById("collectionLink").classList.add("active");
        document.getElementById("nestedLink" + h).classList.add("active");
    } else {
        document.getElementById("link" + p).classList.add("active");
    }
}