/*
  Folder setup:
  vicgauthreaux.com/
  ├── index.html
  ├── styles.css
  ├── scrip.js
  └── slides/
      ├── slide001.jpg
      ├── slide002.jpg
      ├── slide003.jpg
      └── slide116.jpg
*/

const totalSlides = 118;
const fileExtension = "jpg";
const slideTime = 9000;
const slides = [];

for (let i = 1; i <= totalSlides; i++) {
  const number = String(i).padStart(3, "0");
  slides.push(`slides/slide${number}.${fileExtension}`);
}

const transitions = [
  "transition-fade",
  "transition-zoom-in",
  "transition-zoom-out",
  "transition-slide-left",
  "transition-slide-right",
  "transition-slide-up",
  "transition-slide-down",
  "transition-blur",
  "transition-rotate",
  "transition-shatter"
];

let currentIndex = 0;
let showingA = true;
let shuffledSlides = shuffleArray([...slides]);

const slideA = document.getElementById("slideA");
const slideB = document.getElementById("slideB");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function getRandomTransition() {
  return transitions[Math.floor(Math.random() * transitions.length)];
}

function clearTransitionClasses(element) {
  transitions.forEach(transition => {
    element.classList.remove(transition);
  });
}

function showNextSlide() {
  currentIndex++;

  if (currentIndex >= shuffledSlides.length) {
    shuffledSlides = shuffleArray([...slides]);
    currentIndex = 0;
  }

  const currentSlide = showingA ? slideA : slideB;
  const nextSlide = showingA ? slideB : slideA;

  clearTransitionClasses(currentSlide);
  clearTransitionClasses(nextSlide);

  const transition = getRandomTransition();

  nextSlide.src = shuffledSlides[currentIndex];
  nextSlide.className = "slide " + transition;

  void nextSlide.offsetWidth;

  currentSlide.classList.remove("active");
  currentSlide.classList.add("previous");

  nextSlide.classList.add("active");
  nextSlide.classList.remove("previous");

  showingA = !showingA;
}

function startSlideshow() {
  slideA.src = shuffledSlides[currentIndex];
  setInterval(showNextSlide, slideTime);
}

startSlideshow();
