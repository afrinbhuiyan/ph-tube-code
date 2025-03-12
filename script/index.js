const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
}

function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoriesVideos = (id) => {
  showLoader();
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickButton = document.getElementById(`btn-${id}`);
      clickButton.classList.add("active");
      displayVideos(data.category);
    });
};

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  console.log(video);
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
  </div>
</div>
  `;
};

function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
        <button id="btn-${category.category_id}" onclick="loadCategoriesVideos(${category.category_id})" class="btn text-base bg-zinc-300 hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full flex flex-col items-center text-center py-32">
      <img src="assets/Icon.png" alt="">
      <h2 class="text-3xl font-bold py-5 leading-10">Oops!! Sorry, There is no <br> content here</h2>
    </div>
    `;
    hideLoader();
    return;
  }
  videos.forEach((video) => {
    // console.log(video);

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
        <div class="flex gap-3 my-6">
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
            <h2 class="text-base font-bold">${video.title}</h2>
            <p class="text-sm text-gray-400 flex gap-2 items-center">
            ${video.authors[0].profile_name}
              ${video.authors[0].verified == true ? `
                <img
                class="w-5 h-5"
                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"
                alt=""
               />`
                 : ``
                }
            </p>
            <p class="text-sm text-gray-400">${video.others.views} views</p>
          </div>
        </div>
        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show details</button>
      </div>
    `;

    videoContainer.appendChild(videoCard);
  });
  hideLoader();
};

document.getElementById("search-input").addEventListener(("keyup"), (e) => {
   const input = e.target.value;
   loadVideos(input);
})

loadCategories();