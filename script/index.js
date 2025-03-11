function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then((res) => res.json())
  .then(data => displayCategories(data.categories))
}

function displayCategories(categories) {
    const categoryContainer = document.getElementById("category-container");
    for(let category of categories){
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `
        <button class="btn text-base bg-zinc-300 hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `
        categoryContainer.appendChild(categoryDiv)
    }
}

loadCategories();
