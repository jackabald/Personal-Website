// Creates typewriter effect on AboutMe page.
var messageArray = ["Jack Archibald - Programmer"];
var textPosition = 0;
var speed = 100;
typewriter = () => {
  document.querySelector("#title").innerHTML =
    messageArray[0].substring(0, textPosition) + "<span>\u25ae</span>";
  if (textPosition++ != messageArray[0].length) {
    setTimeout(typewriter, speed);
  }
};
window.addEventListener("load", typewriter);
