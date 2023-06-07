const circleContainer = document.querySelector(".circles");
const colors = [
  "aqua",
  "aquamarine",
  "crimson",
  "blue",
  "dodgerblue",
  "gold",
  "greenyellow",
  "teal",
];

let win_message = document.querySelector(".win");
let refresh= document.querySelector(".button")

const colorsPicklist = [...colors, ...colors];
const circleCount = colorsPicklist.length;

let revealedCount = 0;
let activeCircle = null;
let awaitingEndOfMove = false;

function buildCircle(color) {
  const element = document.createElement("div");

  element.classList.add("circle");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (awaitingEndOfMove || revealed === "true" || element == activeCircle) {
      return;
    }

    element.style.backgroundColor = color;

    if (!activeCircle) {
      activeCircle = element;

      return;
    }

    const colorToMatch = activeCircle.getAttribute("data-color");

    if (colorToMatch === color) {
      element.setAttribute("data-revealed", "true");
      activeCircle.setAttribute("data-revealed", "true");

      activeCircle = null;
      awaitingEndOfMove = false;
      revealedCount += 2;

      if (revealedCount === circleCount) {
        win_message.style.display = "flex";
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      activeCircle.style.backgroundColor = null;
      element.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeCircle = null;
    }, 1000);
  });

  return element;
}

for (let i = 0; i < circleCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const circle = buildCircle(color);

  colorsPicklist.splice(randomIndex, 1);
  circleContainer.appendChild(circle);
}
