const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const result = document.getElementById("result");
const music = document.getElementById("music");
const hint = document.getElementById("hint");
const underHint = document.getElementById("underHint");
const noOverlay = document.getElementById("noOverlay");

let yesClicks = 0;
let yesEnabled = false;
let noAttempts = 0;

/* Nein Button */
function moveNo() {
  noAttempts += 1;

  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  if (noAttempts === 8) {
    noOverlay.style.display = "block";

    setTimeout(() => {
      noOverlay.style.display = "none";
      hint.innerText = "Jetzt wieder auf Ja drücken";
      underHint.innerText = "";
      noAttempts = 0;
    }, 7000);
  }
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

/* Ja Button */
yesBtn.addEventListener("click", () => {
  yesBtn.classList.remove("wobble");
  void yesBtn.offsetWidth;
  yesBtn.classList.add("wobble");

  if (!yesEnabled) {
    yesClicks += 1;

    hint.innerText = "Drück nochmal";

    const scale = 1 + yesClicks * 0.15;
    yesBtn.style.transform = `scale(${scale})`;

    if (yesClicks >= 5) {
      hint.innerText = "Okay dann jetzt anders";
      underHint.innerText = "Drück mal auf Nein";
      yesEnabled = true;
    }
    return;
  }

  document.querySelector(".buttons").style.display = "none";
  document.querySelector("h1").style.display = "none";
  hint.style.display = "none";
  underHint.style.display = "none";
  result.style.display = "block";

  music.play();
  startHearts();
  startSlideshow();
});

/* Herzen */
function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "♥";
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${3 + Math.random() * 3}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 300);
}

/* Slideshow */
let slideIndex = 0;
function startSlideshow() {
  const images = document.querySelectorAll(".slideshow img");
  images[0].style.display = "block";

  setInterval(() => {
    images[slideIndex].style.display = "none";
    slideIndex = (slideIndex + 1) % images.length;
    images[slideIndex].style.display = "block";
  }, 2500);
}
