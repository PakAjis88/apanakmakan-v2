const foods = [
  {
    name: "Nasi Lemak",
    categories: ["budget", "local", "rice"],
    note: "A classic local favourite that works for breakfast, lunch, or any emergency craving."
  },
  {
    name: "Roti Canai",
    categories: ["budget", "local"],
    note: "Crispy, affordable, and very hard to argue with."
  },
  {
    name: "Mee Goreng Mamak",
    categories: ["budget", "local", "noodles"],
    note: "A reliable noodle choice when you want something bold and filling."
  },
  {
    name: "Maggi Goreng",
    categories: ["budget", "spicy", "noodles"],
    note: "Simple, punchy, and perfect when lunch needs to happen fast."
  },
  {
    name: "Nasi Kandar",
    categories: ["local", "rice", "spicy"],
    note: "Go big with rice, curry, and whatever lauk is calling your name."
  },
  {
    name: "Tomyam Seafood",
    categories: ["spicy"],
    note: "Hot, sour, and great when you need lunch with a kick."
  },
  {
    name: "Laksa Utara",
    categories: ["local", "noodles", "spicy"],
    note: "Tangy, comforting, and proudly local."
  },
  {
    name: "Nasi Ayam Penyet",
    categories: ["spicy", "rice"],
    note: "Crunchy chicken, sambal, rice. Very direct. Very satisfying."
  },
  {
    name: "Spaghetti Carbonara",
    categories: ["western", "noodles"],
    note: "Creamy and comforting when you want a Western lunch mood."
  },
  {
    name: "Chicken Chop",
    categories: ["western"],
    note: "A cafe-style favourite with sauce, sides, and plenty of comfort."
  },
  {
    name: "Nasi Kerabu",
    categories: ["local", "rice"],
    note: "Colourful, fragrant, and full of texture."
  },
  {
    name: "Roti John",
    categories: ["budget", "local"],
    note: "Messy in the best way, especially when you want something snacky but filling."
  },
  {
    name: "Ayam Geprek",
    categories: ["spicy", "rice"],
    note: "For the days when sambal is the whole point."
  },
  {
    name: "Fish and Chips",
    categories: ["western"],
    note: "Crispy, familiar, and easy to find nearby."
  },
  {
    name: "Char Kuey Teow",
    categories: ["local", "noodles"],
    note: "Smoky wok flavour when noodles are the answer."
  },
  {
    name: "Nasi Goreng Kampung",
    categories: ["budget", "local", "rice", "spicy"],
    note: "A dependable rice meal with ikan bilis crunch and kampung energy."
  }
];

const state = {
  selectedCategory: "all",
  lastPick: null
};

const suggestBtn = document.getElementById("suggest-btn");
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

function setActiveCategory(button) {
  categoryButtons.forEach((categoryButton) => {
    categoryButton.classList.remove("is-active");
  });

  button.classList.add("is-active");
  state.selectedCategory = button.dataset.category;
}

function showFood(food) {
  if (!food) {
    suggestionEl.textContent = "No lunch found yet.";
    suggestionNote.textContent = "Try another category and we will look again.";
    mapLink.classList.add("is-hidden");
    return;
  }

  state.lastPick = food.name;
  suggestionEl.textContent = food.name;
  suggestionNote.textContent = food.note;

  const query = encodeURIComponent(`${food.name} near me`);
  mapLink.href = `https://www.google.com/maps/search/${query}`;
  mapLink.classList.remove("is-hidden");
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveCategory(button);
  });
});

suggestBtn.addEventListener("click", () => {
  const matchingFoods = getFoodsByCategory(state.selectedCategory);
  const selectedFood = pickRandomFood(matchingFoods);
  showFood(selectedFood);
});
