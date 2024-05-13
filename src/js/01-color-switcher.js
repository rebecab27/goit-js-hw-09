function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let colorInterval;

startButton.addEventListener('click', () => {
  // Dezactivează butonul de start
  startButton.disabled = true;

  // Activează intervalul pentru schimbarea culorii
  colorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  // Oprire interval
  clearInterval(colorInterval);

  // Re-activează butonul de start
  startButton.disabled = false;
});
