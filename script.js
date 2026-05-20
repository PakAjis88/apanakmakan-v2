const foods = [
  {
    name: "Nasi Lemak",
    emoji: "🍛",
    categories: ["budget", "local", "rice"],
    note: "Your lunch destiny says: nasi lemak power. Sambal, rice, crunch, settle."
  },
  {
    name: "Roti Canai",
    emoji: "🫓",
    categories: ["budget", "local"],
    note: "Crispy, affordable, and perfect for a relaxed mamak lunch mood."
  },
  {
    name: "Mee Goreng Mamak",
    emoji: "🍝",
    categories: ["budget", "local", "noodles"],
    note: "The galaxy picked wok energy, mamak style. Good choice lah."
  },
  {
    name: "Maggi Goreng",
    emoji: "🍜",
    categories: ["budget", "spicy", "noodles"],
    note: "Fast, spicy, and very satisfying when hunger cannot wait."
  },
  {
    name: "Nasi Kandar",
    emoji: "🍚",
    categories: ["local", "rice", "spicy"],
    note: "Rice, curry banjir, and lauk decisions. Your lunch destiny is serious today."
  },
  {
    name: "Tomyam Seafood",
    emoji: "🦐",
    categories: ["spicy"],
    note: "Hot, sour, and bold. The galaxy says bring on the kick."
  },
  {
    name: "Laksa Utara",
    emoji: "🍜",
    categories: ["local", "noodles", "spicy"],
    note: "Tangy, slurpy, and proudly local. Lunch just got interesting."
  },
  {
    name: "Nasi Ayam Penyet",
    emoji: "🍗",
    categories: ["spicy", "rice"],
    note: "Crunchy chicken, sambal, rice. Straight to the point, sedap."
  },
  {
    name: "Spaghetti Carbonara",
    emoji: "🍝",
    categories: ["western", "noodles"],
    note: "Creamy comfort has entered orbit. Western lunch mode unlocked."
  },
  {
    name: "Chicken Chop",
    emoji: "🍽️",
    categories: ["western"],
    note: "Cafe-style comfort with sauce and sides. Solid lunch destiny."
  },
  {
    name: "Nasi Kerabu",
    emoji: "🍚",
    categories: ["local", "rice"],
    note: "Colourful, fragrant, and full of texture. The galaxy has taste."
  },
  {
    name: "Roti John",
    emoji: "🥖",
    categories: ["budget", "local"],
    note: "Messy in the best way. A snacky lunch that still fills the tank."
  },
  {
    name: "Ayam Geprek",
    emoji: "🌶️",
    categories: ["spicy", "rice"],
    note: "The galaxy chose sambal heat. Prepare water, then enjoy."
  },
  {
    name: "Fish and Chips",
    emoji: "🍟",
    categories: ["western"],
    note: "Crispy, familiar, and easy to find nearby. Lunch settled."
  },
  {
    name: "Char Kuey Teow",
    emoji: "🍜",
    categories: ["local", "noodles"],
    note: "Smoky wok flavour has landed. Very hard to say no."
  },
  {
    name: "Nasi Goreng Kampung",
    emoji: "🍳",
    categories: ["budget", "local", "rice", "spicy"],
    note: "Ikan bilis crunch, kampung flavour, and a proper rice meal. Nice."
  }
];

const state = {
  selectedCategory: "all",
  lastPick: null,
  isRolling: false
};

const galaxyEl = document.getElementById("makan-galaxy");
const suggestBtn = document.getElementById("suggest-btn");
const resultCard = document.getElementById("result-card");
const suggestionEl = document.getElementById("suggestion");
const suggestionNote = document.getElementById("suggestion-note");
const mapLink = document.getElementById("map-link");
const categoryButtons = document.querySelectorAll(".category-btn");

function getFoodsByCategory(category) {
  if (category === "all") {
    return foods;
  }

  return foods.filter((food) => food.categories.includes(category));
}

function pickRandomFood(options) {
  if (options.length === 0) {
    return null;
  }

  const availableOptions = options.length > 1
    ? options.filter((food) => food.name !== state.lastPick)
    : options;

  const randomIndex = Math.floor(Math.random() * availableOptions.length);
  return availableOptions[randomIndex];
}

function getOrbitFoods() {
  const matchingFoods = getFoodsByCategory(state.selectedCategory);
  return matchingFoods.slice(0, 8);
}

function renderGalaxy() {
  const orbitFoods = getOrbitFoods();
  const existingCards = galaxyEl.querySelectorAll(".food-orbit-card");
  existingCards.forEach((card) => card.remove());

  orbitFoods.forEach((food, index) => {
    const card = document.createElement("button");
    const angle = (360 / orbitFoods.length) * index;
    const radius = orbitFoods.length > 4 ? "150px" : "122px";

    card.className = "food-orbit-card";
    card.type = "button";
    card.style.setProperty("--angle", `${angle}deg`);
    card.style.setProperty("--radius", radius);
    card.setAttribute("aria-label", food.name);
    card.innerHTML = `
      <span class="food-emoji" aria-hidden="true">${food.emoji}</span>
      <span class="food-name">${food.name}</span>
    `;

    galaxyEl.appendChild(card);
  });
}

function setActiveCategory(button) {
  categoryButtons.forEach((categoryButton) => {
    categoryButton.classList.remove("is-active");
  });

  button.classList.add("is-active");
  state.selectedCategory = button.dataset.category;
  renderGalaxy();
}

function updatePickedCard(food) {
  const cards = galaxyEl.querySelectorAll(".food-orbit-card");

  cards.forEach((card) => {
    const isPicked = food && card.getAttribute("aria-label") === food.name;
    card.classList.toggle("is-picked", isPicked);
    card.classList.toggle("is-muted", food && !isPicked);
  });
}

function showFood(food) {
  if (!food) {
    suggestionEl.textContent = "No makan found yet.";
    suggestionNote.textContent = "Try another category and we will roll again.";
    mapLink.classList.add("is-hidden");
    resultCard.classList.remove("has-result");
    return;
  }

  state.lastPick = food.name;
  suggestionEl.textContent = `${food.emoji} ${food.name}`;
  suggestionNote.textContent = food.note;
  resultCard.classList.add("has-result");
  suggestBtn.textContent = "Roll Again";

  const query = encodeURIComponent(`${food.name} near me`);
  mapLink.href = `https://www.google.com/maps/search/${query}`;
  mapLink.classList.remove("is-hidden");
  updatePickedCard(food);
}

function rollGalaxy() {
  if (state.isRolling) {
    return;
  }

  const matchingFoods = getFoodsByCategory(state.selectedCategory);
  const selectedFood = pickRandomFood(matchingFoods);

  state.isRolling = true;
  suggestBtn.disabled = true;
  suggestBtn.textContent = "Rolling...";
  resultCard.classList.remove("has-result");
  mapLink.classList.add("is-hidden");
  updatePickedCard(null);
  galaxyEl.classList.remove("is-rolling");
  void galaxyEl.offsetWidth;
  galaxyEl.classList.add("is-rolling");

  window.setTimeout(() => {
    galaxyEl.classList.remove("is-rolling");
    showFood(selectedFood);
    suggestBtn.disabled = false;
    state.isRolling = false;
  }, 1700);
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!state.isRolling) {
      setActiveCategory(button);
    }
  });
});

suggestBtn.addEventListener("click", rollGalaxy);

renderGalaxy();
