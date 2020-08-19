var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-300px";
  }
  prevScrollpos = currentScrollPos;
  if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight + 200) {
      document.getElementById("footer").style.display = "block"
  } else {
      document.getElementById("footer").style.display = "none"
  }
}