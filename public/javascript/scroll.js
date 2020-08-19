var prevScrollpos = window.pageYOffset;
var mybutton = document.getElementById("top-button");

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
    mybutton.style.display = "block";
  } else {
    document.getElementById("header").style.top = "-300px";
    mybutton.style.display = "none";
  }
  prevScrollpos = currentScrollPos;
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      document.getElementById("footer").style.display = "block"
  } else {
      document.getElementById("footer").style.display = "none"
  }
}