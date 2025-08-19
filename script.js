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


// Carousel Buttons TEAMS NEW
const carousel = document.getElementById('teamCarousel');
const prevBtn = document.getElementById('prevTeam');
const nextBtn = document.getElementById('nextTeam');

// Scroll carousel left/right
prevBtn.onclick = () => { carousel.scrollBy({ left: -220, behavior: 'smooth' }); };
nextBtn.onclick = () => { carousel.scrollBy({ left: 220, behavior: 'smooth' }); };

// Zoom center card effect
function zoomCenterCard() {
  const cards = document.querySelectorAll('.team-card');
  const carouselRect = carousel.getBoundingClientRect();
  const centerX = carouselRect.left + carouselRect.width / 2;

  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const offset = Math.abs(centerX - cardCenter);

    if (offset < cardRect.width / 2) {
      card.classList.add('centered'); // zoom & shadow
    } else {
      card.classList.remove('centered');
    }
  });
}

// Run on scroll and on load
carousel.addEventListener('scroll', zoomCenterCard);
window.addEventListener('load', zoomCenterCard);

// Modal functions (already in your script)
function openModal(teamKey) {
  const team = teams[teamKey];
  const membersHTML = team.members.map(m => `
    <div class="flex flex-col items-center text-center">
      <img src="${m.img}" class="w-12 h-12 rounded-full mb-1" />
      <p class="text-gray-200 text-xs">${m.name}</p>
      <p class="text-gray-400 text-[0.55rem]">${m.role}</p>
    </div>
  `).join("");

  document.getElementById("modalContent").innerHTML = `
    <h3 class="text-xl font-semibold text-white mb-2">${team.name}</h3>
    <p class="text-gray-300 mb-1"><strong>Location:</strong> ${team.location}</p>
    <p class="text-gray-300 mb-1"><strong>Coach:</strong> ${team.coach}</p>
    <p class="text-gray-300 mb-1"><strong>Founded:</strong> ${team.founded}</p>
    <p class="text-gray-300 mb-1"><strong>Colors:</strong> ${team.colors}</p>
    <h4 class="text-lg font-semibold text-yellow-500 mt-4 mb-2">Team Members</h4>
    <div class="grid grid-cols-3 gap-2">${membersHTML}</div>
  `;
  document.getElementById("teamModal").classList.remove("hidden");
  document.getElementById("teamModal").classList.add("flex");
}

function closeModal() {
  document.getElementById("teamModal").classList.add("hidden");
  document.getElementById("teamModal").classList.remove("flex");
}

