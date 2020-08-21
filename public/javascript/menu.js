function openMenu() {
    var links = document.getElementsByClassName("nav-links-burger")
    for (var i = 0; i < links.length; i++) {
        if (links[i].style.display === "block") {
            links[i].style.display = "none"
        } else {
            links[i].style.display = "block"
        }
    } 
}