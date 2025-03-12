function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoriesVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button onclick="loadCategoriesVideos(${category.category_id})" class="btn text-base bg-zinc-300 hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = '';
  videos.forEach((video) => {
    console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML = `
      <div class="bg-base-100">
        <figure class="relative">
          <img class="rounded-lg w-full h-[250px] object-cover" src=${video.thumbnail} alt="Shoes" />
          <span
            class="absolute bg-[#171717] text-white px-2 py-1 rounded bottom-2 right-2 text-xs"
            >3hrs 56 min ago</span
          >
        </figure>
        <div class="flex gap-3 mt-6">
          <div class="">
            <div class="avatar">
              <div
                class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2"
              >
                <img
                  src=${video.authors[0].profile_picture}
                />
              </div>
            </div>
          </div>
          <div class="space-y-1">
            <h2 class="text-base font-bold">Shape of You</h2>
            <p class="text-sm text-gray-400 flex gap-2 items-center">
            ${video.authors[0].profile_name}
              <img
              class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                alt=""
              />
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
        </div>
      </div>
    `;

    videoContainer.appendChild(videoCard);
  });
};

loadCategories();

// loadVideos()

// load videos by category
