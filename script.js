// Intro typing lines
const introText = [
  "> Ngọc",
  "> today is your birthday",
  "> So I made you this little program"
];

const introEl = document.getElementById("intro");
const cakePage = document.querySelector(".cake-page");
const miniGame = document.querySelector(".mini-game");
const floatingContainer = document.querySelector(".floating-emojis");
const teddyPage = document.querySelector(".teddy-page");
const finalMessage = document.querySelector(".final-message");
const finalTextEl = document.getElementById("finalText");

let introIndex = 0;

// Typing intro with lines staying visible
function typeIntroLine(line, callback) {
  let i = 0;
  const lineEl = document.createElement("div");
  introEl.appendChild(lineEl);

  function typing() {
    if (i < line.length) {
      lineEl.innerHTML += line[i];
      i++;
      setTimeout(typing, 80);
    } else {
      const dots = document.createElement("span");
      dots.classList.add("dots");
      dots.innerText = " ...";
      lineEl.appendChild(dots);
      setTimeout(callback, 800);
    }
  }

  typing();
}

function nextIntroLine() {
  if (introIndex < introText.length) {
    typeIntroLine(introText[introIndex], () => {
      introIndex++;
      nextIntroLine();
    });
  } else {
    introEl.classList.add("hidden");
    showCakePage();
  }
}

// Cake page animation
function showCakePage() {
  cakePage.classList.remove("hidden");
  setTimeout(() => {
    cakePage.classList.add("hidden");
    showMiniGame();
  }, 5000); // show cake 5s
}

// Mini-game floating emojis
function showMiniGame() {
  miniGame.classList.remove("hidden");
  createFloatingEmojis(20);
  setTimeout(() => {
    miniGame.classList.add("hidden");
    showTeddyPage();
  }, 15000); // mini-game 15s
}

function createFloatingEmojis(amount) {
  const emojis = ["💖","🌟","🍰","✨","🎉"];
  const messages = ["Yay! 💖","You’re amazing 🫶","Good girl","Niicee ✨","Bravo 🎉"];
  for (let i = 0; i < amount; i++) {
    const emoji = document.createElement("div");
    emoji.classList.add("emoji");
    emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * 90 + "%";
    emoji.style.top = Math.random() * 70 + "vh";
    emoji.style.animationDuration = (5 + Math.random() * 5) + "s";
    floatingContainer.appendChild(emoji);

    emoji.addEventListener("click", () => {
      popMessage(emoji, messages);
    });
  }
}

function popMessage(emoji, messages) {
  const message = document.createElement("div");
  message.classList.add("pop-message");
  message.innerText = messages[Math.floor(Math.random() * messages.length)];
  message.style.left = emoji.offsetLeft + "px";
  message.style.top = emoji.offsetTop + "px";
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 1000);
}

// Teddy bear page
function showTeddyPage() {
  teddyPage.classList.remove("hidden");
  setTimeout(() => {
    teddyPage.classList.add("hidden");
    showFinalMessage();
  }, 5000); // teddy bear 5s
}

// Final birthday message
function showFinalMessage() {
  finalMessage.classList.remove("hidden");
  const message = `Happy Birthday, Ngọc! 💖
I made this with love for you 🫶✨
I hope today brings you lots of smiles and everything you enjoy 🍿
Can’t wait to hang out and have our little movie break together 🍿
Wishing you a day as amazing as you are 🎉

— Hajar`;

  typeFinalMessage(message, finalTextEl, 0);
}

function typeFinalMessage(text, element, index) {
  if (index < text.length) {
    element.innerHTML += text[index] === "\n" ? "<br>" : text[index];
    setTimeout(() => typeFinalMessage(text, element, index + 1), 50);
  }
}

// Start intro
nextIntroLine();
