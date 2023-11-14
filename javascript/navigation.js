
document.addEventListener("DOMContentLoaded", function() {
    // When the user scrolls the page, execute stickyNav
    window.onscroll = function() {stickyNav()};

    // Get the navbar and content elements
    var navbar = document.getElementById("navbar");
    var content = document.getElementById("content");

    // Get the offset position of the navbar
    var topPos = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function stickyNav() {
    if (window.scrollY >= topPos) {
        navbar.classList.add("stickyNav");
        content.classList.add("stickyPadding");
    } else {
        navbar.classList.remove("stickyNav");
        content.classList.remove("stickyPadding");
    }
    }
})

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
