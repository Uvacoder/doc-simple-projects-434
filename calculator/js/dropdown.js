const themeClasses = document.getElementsByClassName("background");
for (let index = 1; index < themeClasses.length; index++) {
  if (index === 0) {
    themeClasses[index].style.display = "block";
  } else {
    themeClasses[index].style.display = "none";
  }
}
function selectTheme(theme) {
  const themeClasses = document.getElementsByClassName("background");
  if (theme === "Bubbles") {
    for (let index = 0; index < themeClasses.length; index++) {
      if (index === 0) {
        themeClasses[index].style.display = "block";
      } else {
        themeClasses[index].style.display = "none";
      }
    }
  } else if (theme === "Number Bubbles") {
    for (let index = 0; index < themeClasses.length; index++) {
      if (index === 1) {
        themeClasses[index].style.display = "block";
      } else {
        themeClasses[index].style.display = "none";
      }
    }
  }
}
