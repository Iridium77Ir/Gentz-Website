if (window.location.pathname.substring(0,6) === "/cp/me") {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "/javascript/fileUpload1.js"
    script.setAttribute("defer", "")
    document.head.appendChild(script)

}
if (window.location.pathname.substring(0,5) === "/cp/i") {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "/javascript/fileUpload2.js"
    script.setAttribute("defer", "")
    document.head.appendChild(script)
}