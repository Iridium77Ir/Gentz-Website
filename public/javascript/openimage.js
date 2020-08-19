function modaldisplay(elem) {
    var name = elem.id
    var modal = document.getElementById(name +"_Modal");
    var modalImg = document.getElementById(name+"_img");
    console.log(modalImg)
    var captionText = document.getElementById(name + "_caption");

    modal.style.display = "block";
    modalImg.src = elem.src;
    captionText.innerHTML = name; 
    
}
function closemodal() {
    var modal = document.getElementsByClassName("modal")

    for (var i = 0; i < modal.length; i++) {
        modal[i].style.display = "none";
    } 
}
