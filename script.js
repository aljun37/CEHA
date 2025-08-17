// Countdown Timer
const nextGameDate = new Date("2025-08-20T18:00:00").getTime();
const timerEl = document.getElementById("timer");

setInterval(() => {
  const now = new Date().getTime();
  const distance = nextGameDate - now;
  if (distance <= 0) {
    timerEl.innerHTML = "Game Time!";
    return;
  }
  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60))/(1000*60));
  const seconds = Math.floor((distance % (1000*60))/1000);
  timerEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}, 1000);
