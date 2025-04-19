const menus = [
  { name: "Nasi Lemak", category: "malaysian" },
  { name: "Roti Canai", category: "budget" },
  { name: "Mee Goreng Mamak", category: "malaysian" },
  { name: "Maggi Goreng", category: "budget" },
  { name: "Nasi Kandar", category: "malaysian" },
  { name: "Tomyam Seafood", category: "spicy" },
  { name: "Laksa Utara", category: "malaysian" },
  { name: "Nasi Ayam Penyet", category: "spicy" },
  { name: "Sushi Bento", category: "western" },
  { name: "Spaghetti Carbonara", category: "western" },
  { name: "Chicken Chop", category: "western" },
  { name: "Salad Bowl", category: "vegetarian" },
  { name: "Vegetarian Fried Rice", category: "vegetarian" },
  { name: "Nasi Kerabu", category: "malaysian" },
  { name: "Nasi Arab Mandy", category: "spicy" },
  { name: "Roti John", category: "budget" },
  { name: "Ayam Geprek", category: "spicy" },
  { name: "Paneer Butter Masala", category: "vegetarian" },
  { name: "Korean Bibimbap", category: "western" },
  { name: "Fish and Chips", category: "western" }
];

let selectedCategory = null;

const suggestBtn = document.getElementById("suggest-btn");
const suggestionEl = document.getElementById("suggestion");
const mapLink = document.getElementById("map-link");
const categoryButtons = document.querySelectorAll(".category-btn");

// Handle category selection
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("ring-4", "ring-black"));
    btn.classList.add("ring-4", "ring-black");
    selectedCategory = btn.getAttribute("data-category");
  });
});

// Suggest menu and show "Find Nearby" every time
suggestBtn.onclick = () => {
  let filteredMenus = menus;

  if (selectedCategory) {
    filteredMenus = menus.filter(item => item.category === selectedCategory);
  }

  const randomItem = filteredMenus[Math.floor(Math.random() * filteredMenus.length)];

  if (randomItem) {
    suggestionEl.innerText = randomItem.name;

    // Always build and show map link
    const query = encodeURIComponent(randomItem.name + " near me");
    mapLink.href = `https://www.google.com/maps/search/${query}`;
    mapLink.classList.remove("hidden"); // Always show
  } else {
    suggestionEl.innerText = "No suggestion found!";
    mapLink.classList.add("hidden"); // Hide only when no result
  }
};
