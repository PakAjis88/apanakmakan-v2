const menus = [
    { name: "Nasi Lemak", category: "malaysian" },
    { name: "Chicken Chop", category: "western" },
    { name: "Vegetarian Fried Rice", category: "vegetarian" },
    { name: "Mee Goreng Mamak", category: "malaysian" },
    { name: "Tomyam Seafood", category: "spicy" },
    { name: "Roti John", category: "budget" },
    { name: "Spicy Korean Ramen", category: "spicy" },
  ];
  
  let selectedCategory = null;
  
  const suggestBtn = document.getElementById("suggest-btn");
  const suggestionEl = document.getElementById("suggestion");
  const categoryButtons = document.querySelectorAll(".category-btn");
  
  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Highlight selected button
      categoryButtons.forEach((b) => b.classList.remove("ring-4", "ring-black"));
      btn.classList.add("ring-4", "ring-black");
  
      // Set selected category
      selectedCategory = btn.getAttribute("data-category");
    });
  });
  
  suggestBtn.onclick = () => {
    let filteredMenus = menus;
  
    if (selectedCategory) {
      filteredMenus = menus.filter((item) => item.category === selectedCategory);
    }
  
    const randomItem = filteredMenus[Math.floor(Math.random() * filteredMenus.length)];
    suggestionEl.innerText = randomItem ? randomItem.name : "No suggestion found!";
  };
  