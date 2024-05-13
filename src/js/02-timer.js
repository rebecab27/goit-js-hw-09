import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      alert('Please choose a date in the future');
      return;
    }
    startButton.disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', () => {
  const selectedDate = new Date(
    document.querySelector('#datetime-picker').value
  );
  const currentDate = new Date();
  const difference = selectedDate - currentDate;

  startButton.disabled = true;

  if (difference <= 0) {
    alert('Please choose a date in the future');
    startButton.disabled = false;
    return;
  }

  function updateCountdown() {
    const time = convertMs(selectedDate - new Date());
    daysSpan.textContent = addLeadingZero(time.days);
    hoursSpan.textContent = addLeadingZero(time.hours);
    minutesSpan.textContent = addLeadingZero(time.minutes);
    secondsSpan.textContent = addLeadingZero(time.seconds);

    if (time.total <= 0) {
      clearInterval(countdownInterval);
      alert('Countdown finished!');
      startButton.disabled = false;
    }
  }

  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return {
    total: ms,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value;
}
