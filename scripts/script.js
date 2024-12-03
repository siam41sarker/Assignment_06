function categorySpin(info) {
  const spin = document.getElementById("spin");
  const main_portion = document.getElementById("main_portion");
  main_portion.classList.remove("flex");
  main_portion.classList.add("hidden");
  spin.classList.remove("hidden");
  setTimeout(function () {
    const spin = document.getElementById("spin");
    spin.classList.add("hidden");
    const main_portion = document.getElementById("main_portion");
    main_portion.classList.add("flex");
    main_portion.classList.remove("hidden");
    categoryData(info);
  }, 2000);
}
//view more
const btn_view = document.getElementById("btn_view_more");
const btn_view_less = document.getElementById("btn_view_less");
const pet_image = document.getElementById("pet_image");
btn_view.addEventListener("click", () => {
  const details_p = document.getElementById("details_p");
  let span = document.createElement("span");
  span.id = "spanId";
  span.classList.remove("hidden");
    span.innerText =
    "Finding the perfect pet for your family is just the beginning. Our animals are more than pets. They are future companions. They are ready to bring joy, love and a unforgettable moments. Whether you're looking for a playful kitten, a loyal dog, or a unique furry friend, we have the ideal match for you. By adopting, you're not only gibing a pet a loving home but also gaining a new family member who will bring comfort and happiness into your life. Each pet comes with its own personality and charm, making them a perfect addition to any household. The adoption process os not just about providing a home, it;s about forming a lifelong bond with a pet whp will offer you unconditional love. Start your adoption journey today and make a lasting impact in a pet's life, while enriching your own with the joy and companionship only a pet can provide.";
  details_p.appendChild(span);
  pet_image.classList.add("hidden");
  btn_view.classList.add("hidden");
  btn_view_less.classList.remove("hidden");
});
//View Less
const viewLess = () => {
  const spanId = document.getElementById("spanId");
  spanId.classList.add("hidden");
  pet_image.classList.remove("hidden");
  btn_view.classList.remove("hidden");
  btn_view_less.classList.add("hidden");
};
//data according to category
const removeActive = () => {
  const removeClass = document.getElementsByClassName("btn-remove-active");
  for (let num of removeClass) {
    num.classList.remove("active");
  }
};
const categoryData = (id) => {
  const fetchedCategory = fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${id}`
  )
    .then((taken) => taken.json())
    .then((reveal) => {
      //Remove other active class
      removeActive();
      //other active class are removed
      const dynId = document.getElementById(`btn-${id}`);
      dynId.classList.add("active");
      showAllData(reveal.data);
    })
    .catch((error) => console.log(error));
};
//create button according to category
const loadCategories = () => {
  const api = fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => showCategories(data.categories))
    .catch((error) => console.log(error));
};
const showCategories = (categories) => {
  console.log(categories);
  const nav_btn = document.getElementById("nav_btn");
  categories.forEach((data) => {
    console.log(data.category);
    const category_btn = document.createElement("div");
    category_btn.innerHTML = `
        <button id="btn-${data.category}" onclick="categorySpin('${data.category}')" class="btn btn-remove-active flex justify-center items-center w-44 h-14">
            <img class="w-8 it h-8" src="${data.category_icon}" alt="icon"/>
            <span class="interFont text-2xl rounded-xl font-bold text-[rgb(19,19,19)]">${data.category}</span>
        </button>
      `;
    nav_btn.appendChild(category_btn);
  });
};
loadCategories();
//get all items
const getAllData = () => {
  const values = fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => showAllData(data.pets))
    .catch((error) => console.log(error));
};
const showAllData = (gotData) => {
  console.log(gotData);
  const main_card = document.getElementById("main_card");
  main_card.innerHTML = "";
  if (gotData.length === 0) {
    main_card.classList.remove("grid");
    main_card.innerHTML = `
            <div class="w-full h-[491px] bg-[rgba(19,19,19,0.03)] rounded-2xl flex flex-col justify-center items-center gap-1">
                <img src="assets/error.webp" alt="error"/>
                <h1 class="text-[rgb(19,19,19)] text-[32px] font-bold interFont">No Information Available</h1>
                <p class="text-[rgba(19,19,19,0.7)] text-center">Currently, we do not have any birds available for adoption. We are constantly updating our listings. So, please check back soon.</p>
            </div>
          `;
    return;
  } else {
    main_card.classList.add("grid");
  }

  gotData.forEach((eachData) => {
    console.log(eachData);
    const div = document.createElement("div");
    div.classList =
      "card card-compact p-5 border border-solid border-[rgba(19,19,19,0.1)]";
    div.innerHTML = ` 
        <figure>
        <img class="w-full h-[160px]"
            src=${eachData.image}
            alt="Shoes" />
        </figure>
        <div class="mt-6">
            <h2 class="text-xl font-bold interFont text-[rgb(19,19,19)]">${
              eachData.pet_name
            }</h2>
            <div class="flex flex-col gap-1 mt-3 mb-4">
              <div class="flex gap-2">
                  <i class="fa-solid fa-dice-four w-4 h-4 mt-[5px]"></i>
                  <h3>Breed:${
                    eachData.breed === undefined || eachData.breed === null
                      ? "Not available"
                      : eachData.breed
                  }</h3>
              </div>
              <div class="flex gap-2">
                <img class="w-4 h-4 mt-1" src="https://cdn-icons-png.flaticon.com/128/6697/6697509.png"/>
                <h3>Birth: ${
                  eachData.date_of_birth === undefined ||
                  eachData.date_of_birth === null
                    ? "Not available"
                    : eachData.date_of_birth
                }</h3>
              </div>
              <div class="flex gap-2">
                  <i class="fa-regular fa-venus mt-1"></i>
                  <h3>Gender: ${
                    eachData.gender === undefined
                      ? "Not available"
                      : eachData.gender
                  }</h3>
              </div>
              <div class="flex gap-2">
                <i class="fa-solid fa-dollar-sign mt-1"></i>
                <h3>Price: ${
                  eachData.price === null ? "Not available" : eachData.price + "$"
                }</h3>
              </div>
            </div>
              <hr class="h-5">
            <div class="grid grid-cols-2 lg:flex lg:justify-between gap-2 lg:gap-1">
              <button onclick="thumbsActive('${
                eachData.image
              }')" class="btn text-[18px] font-bold border border-solid border-[rgba(14,122,129,0.15)] rounded-lg hover:bg-[rgb(14,122,129)] hover:text-white"><i class="fa-light fa-thumbs-up"></i></button>
              <button id="adapt_${
                eachData.pet_name
              }" class="btn text-[18px] text-[rgb(14,122,129)] font-bold border border-solid border-[rgba(14,122,129,0.15)] rounded-lg hover:bg-[rgb(14,122,129)] hover:text-white">Adopt</button>
              <button onclick="detailCategory('${
                eachData.petId
              }')" class="btn text-[18px] text-[rgb(14,122,129)] font-bold border border-solid border-[rgba(193,249,253,0.15)] rounded-lg hover:bg-[rgb(14,122,129)] hover:text-white">Details</button>
            </div>
        </div>`;
    main_card.appendChild(div);
    const adaptId = document.getElementById(`adapt_${eachData.pet_name}`);
    adaptId.addEventListener("click", function () {
      adopted_model.showModal();
      let stopCount;
      const countdown = document.getElementById("countdown");
      let Countdown_value = 3;
      countdown.innerText = Countdown_value;
      clearInterval(stopCount);
      stopCount = setInterval(timeFunction, 1000);
      function timeFunction() {
        Countdown_value--;
        countdown.innerText = Countdown_value;
        if (Countdown_value === 0) {
          countdown.innerText = 1;
          adopted_model.close();
          clearInterval(stopCount);
          adaptId.innerText = "Adopted";
          adaptId.style.backgroundColor = "#cccccc";
          adaptId.style.color = "#666666";
          adaptId.style.opacity = 0.6;
          adaptId.style.border = "1px solid #cccccc";
          adaptId.style.pointerEvents = "none";
        }
      }
    });
  });
};
const thumbsActive = (img) => {
  const sidebar = document.getElementById("sidebar");
  const div = document.createElement("div");
  div.innerHTML = `
      <img class="rounded-xl" src=${img} alt="side image"/>
    `;
  sidebar.appendChild(div);
};
getAllData();
async function detailCategory(id) {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  detailModal(data.petData);
}
const detailModal = (detail) => {
  modals.showModal();
  const modal_body = document.getElementById("modal_body");
  modal_body.innerHTML = `
           <div>
             <img class="w-full h-auto" src = ${detail.image} alt="image"/>
             <h1 class="text-xl mt-5 font-bold interFont text-[rgb(19,19,19)]">${
               detail.pet_name
             }</h1>
             <div class="grid grid-cols-2 gap-2 mt-3 mb-4">
              <div class="flex gap-2">
                  <i class="fa-solid fa-dice-four w-4 h-4 mt-[5px]"></i>
                  <h3>Breed:${
                    detail.breed === undefined || detail.breed === null
                      ? "Not available"
                      : detail.breed
                  }</h3>
              </div>
              <div class="flex gap-2">
                <img class="w-4 h-4 mt-1" src="https://cdn-icons-png.flaticon.com/128/6697/6697509.png"/>
                <h3>Birth: ${
                  detail.date_of_birth === undefined ||
                  detail.date_of_birth === null
                    ? "Not available"
                    : detail.date_of_birth
                }</h3>
              </div>
              <div class="flex gap-2">
                  <i class="fa-regular fa-venus mt-1"></i>
                  <h3>Gender: ${
                    detail.gender === undefined
                      ? "Not available"
                      : detail.gender
                  }</h3>
              </div>
              <div class="flex gap-2">
                <i class="fa-solid fa-dollar-sign mt-1"></i>
                <h3>Price: ${
                  detail.price === null ? "Not available" : detail.price + "$"
                }</h3>
              </div>
            </div>
             <div class="flex gap-2 mt-[-7px]">
                  <i class="fa-regular fa-venus mt-1"></i>
                  <h3>Vaccinated Status: ${
                    detail.vaccinated_status === null ||
                    detail.vaccinated_status === undefined
                      ? "Not available"
                      : detail.vaccinated_status
                  } </h3>
              </div>
              <hr class="h-5 mt-4">
              <div class="grid grid-cols-1 gap-3">
              <h3 class="text-[rgb(19,19,19)] font-semibold interFont">Details Information</h3>
              <p class="text-[rgba(19,19,19,0.7)] interFont text-justify">${
                detail.pet_details
              }</p>
              </div>
           </div>

           `;
};
const sortByPrice = () => {
  const spin = document.getElementById("spin");
  const main_portion = document.getElementById("main_portion");
  spin.classList.remove("hidden");
  main_portion.classList.remove("flex");
  main_portion.classList.add("hidden");
  setTimeout(() => {
    spin.classList.add("hidden");
    main_portion.classList.add("flex");
    main_portion.classList.remove("hidden");
    loadingByPrice();
  }, 2000);
};
const loadingByPrice = () => {
  const url = "https://openapi.programming-hero.com/api/peddy/pets";
  fetch(url)
    .then((res) => res.json())
    .then((info) => sortingData(info.pets))
    .catch((e) => console.log(e));
};
const sortingData = (data) => {
  const removeClass = document.getElementsByClassName("btn-remove-active");
  for (let num of removeClass) {
    num.classList.remove("active");
  }
  data.sort((obj1, obj2) => obj2.price - obj1.price);
  showAllData(data);
};
