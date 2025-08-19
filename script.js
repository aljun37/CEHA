// ===========================
// Countdown Timer
// ===========================
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

// ===========================
// Main Teams Carousel
// ===========================
const carousel = document.getElementById('teamCarousel');
const prevBtn = document.getElementById('prevTeam');
const nextBtn = document.getElementById('nextTeam');

prevBtn.onclick = () => { carousel.scrollBy({ left: -220, behavior: 'smooth' }); };
nextBtn.onclick = () => { carousel.scrollBy({ left: 220, behavior: 'smooth' }); };

function zoomCenterCard() {
  const cards = document.querySelectorAll('.team-card');
  const carouselRect = carousel.getBoundingClientRect();
  const centerX = carouselRect.left + carouselRect.width / 2;

  cards.forEach(card => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const offset = Math.abs(centerX - cardCenter);
    if (offset < cardRect.width / 2) card.classList.add('centered');
    else card.classList.remove('centered');
  });
}

carousel.addEventListener('scroll', zoomCenterCard);
window.addEventListener('load', zoomCenterCard);

// ===========================
// Teams Data
// ===========================
const teams = {
  auto: {
    name: "AUTO Aesthetics",
    location: "Countryville Cabantian",
    coach: "John Doe",
    founded: "2010",
    colors: "Blue & White",
    members: [
      {name: "Alice", role: "Forward", img:"https://via.placeholder.com/64"},
      {name: "Bob", role: "Goalkeeper", img:"https://via.placeholder.com/64"},
      {name: "Charlie", role: "Defender", img:"https://via.placeholder.com/64"},
    ]
  },
  stitch: {
    name: "Stitch and Wear",
    location: "Bansalan",
    coach: "Jane Smith",
    founded: "2012",
    colors: "Red & Black",
    members: [
      {name: "Dave", role: "Midfielder", img:"https://via.placeholder.com/64"},
      {name: "Eve", role: "Forward", img:"https://via.placeholder.com/64"},
    ]
  },
  soe: {
    name: "Secret Of Eve",
    location: "Emily Homes",
    coach: "Mark Johnson",
    founded: "2015",
    colors: "Green & White",
    members: [
      {name: "Fiona", role: "Defender", img:"https://via.placeholder.com/64"},
      {name: "George", role: "Goalkeeper", img:"https://via.placeholder.com/64"},
    ]
  },
  wadab: {
    name: "Wadab GuitarSpa",
    location: "Northcrest",
    coach: "Anna Lee",
    founded: "2013",
    colors: "Yellow & Gray",
    members: [
      {name: "Hank", role: "Forward", img:"https://via.placeholder.com/64"},
      {name: "Ivy", role: "Midfielder", img:"https://via.placeholder.com/64"},
    ]
  },
  spmc: {
    name: "SPMC Radiology",
    location: "Pikit Cotabato",
    coach: "Tom Brown",
    founded: "2009",
    colors: "Blue & Gray",
    members: [
      {name: "Jack", role: "Defender", img:"https://via.placeholder.com/64"},
      {name: "Kim", role: "Forward", img:"https://via.placeholder.com/64"},
    ]
  }
};

// ===========================
// Modal with Carousel for Members
// ===========================
let currentIndex = 0;

function openModal(teamKey) {
  const team = teams[teamKey];
  currentIndex = 0;

  // Team info
  document.getElementById("modalTeamName").innerText = team.name;
  document.getElementById("modalTeamLocation").innerText = team.location;
  document.getElementById("modalTeamCoach").innerText = team.coach;
  document.getElementById("modalTeamFounded").innerText = team.founded;
  document.getElementById("modalTeamColors").innerText = team.colors;

  // Members carousel
  const carousel = document.getElementById("carouselInner");
  carousel.innerHTML = team.members.map(m => `
    <div class="flex flex-col items-center text-center min-w-[70px] mr-2">
      <img src="${m.img}" class="w-12 h-12 rounded-full mb-1" />
      <p class="text-gray-200 text-xs">${m.name}</p>
      <p class="text-gray-400 text-[0.55rem]">${m.role}</p>
    </div>
  `).join("");

  // Show modal
  const modal = document.getElementById("teamModal");
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  updateCarousel();
}

function updateCarousel() {
  const carousel = document.getElementById("carouselInner");
  const offset = currentIndex * 78; // width + margin
  carousel.style.transform = `translateX(-${offset}px)`;
}

// Modal carousel navigation
document.getElementById("prevMember").onclick = () => {
  if(currentIndex > 0) currentIndex--;
  updateCarousel();
};
document.getElementById("nextMember").onclick = () => {
  const carousel = document.getElementById("carouselInner");
  if(currentIndex < carousel.children.length - 3) currentIndex++;
  updateCarousel();
};

// Close modal
function closeModal() {
  const modal = document.getElementById("teamModal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}
