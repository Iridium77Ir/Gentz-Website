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

if (window.location.pathname.substring(0,3) === "/cp") {
    document.getElementById("incont").style.marginTop = "100px"
    document.getElementById("incont").style.marginBottom = "100px"
}