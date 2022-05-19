const staysEl = document.querySelector(".stays");
const searchIconEl = document.querySelector(".s-icon");
const navbarEl = document.querySelector(".navbar");
const closeBtn = document.querySelector(".close");
const adultPlusBtn = document.querySelector(".adult-plus");
const adultMinusBtn = document.querySelector(".adult-minus");
const childrenPlusBtn = document.querySelector(".children-plus");
const childrenMinusBtn = document.querySelector(".children-minus");
const adultsTotal = document.querySelector(".age-total-adults");
const childrenTotal = document.querySelector(".age-total-children");
const customizelocationsEl = document.querySelector(".customize-location");
const locationsEl = document.querySelector(".locations");
const guestsEl = document.querySelector(".customize-guests");
const agesEl = document.querySelector(".ages");
const defaultLoc = document.querySelector(".location-default");
const navLocation = document.querySelector(".location");
const searchEl = document.querySelector(".customize-search");
const totalStays = document.querySelector(".total-num");
const popupEl = document.querySelector(".popup");

let reArray = [];
let count1 = 0;
let count2 = 0;
let maxGuest = 0;
let data = [];

const getData = async function () {
  const response = await fetch("./stays.json");
  data = await response.json();
  reArray = [...data];
  addToDOM(data);

  const stayEl = document.querySelectorAll(".stay-features");
  superHost([...stayEl], data);
};

function addToDOM(array) {
  array.forEach((item) => {
    const stayEl = `
        <div class="stay">
        <div class="stay-img">
          <img
            src=${item.photo}
            alt=""
            class="stay-image"
          />
        </div>
        <div class="stay-features flex justify-between items-center">
          
          <div class="feature-apt">${item.type}</div>
          <div class="rating">
            <span class="star"><i class="fa-solid fa-star"></i></span>
            <span class="rate-num">${item.rating}</span>
          </div>
        </div>
        <h2 class="style font-small">
          ${item.title}
        </h2>
      </div>
        `;

    staysEl.insertAdjacentHTML("beforeend", stayEl);
  });
}

function superHost(Elarray, array) {
  for (let i = 0; i < array.length; i++) {
    const stayEl = Elarray[i];
    if (array[i].superHost) {
      const superEl = `<div class="host">${
        array[i].superHost ? "SUPERHOST" : ""
      }</div>`;
      stayEl.insertAdjacentHTML("afterbegin", superEl);
    }
  }
}

getData();

searchIconEl.addEventListener("click", function () {
  popupEl.classList.add("active");
});

console.log(closeBtn);

closeBtn.addEventListener("click", function () {
  popupEl.classList.remove("active");
});

customizelocationsEl.addEventListener("click", function () {
  agesEl.classList.remove("active");
  locationsEl.classList.add("active");
  customizelocationsEl.classList.add("active");
  guestsEl.classList.remove("active");
});

guestsEl.addEventListener("click", function () {
  agesEl.classList.add("active");
  locationsEl.classList.remove("active");
  customizelocationsEl.classList.remove("active");
  guestsEl.classList.add("active");
});

childrenMinusBtn.addEventListener("click", function () {
  if (count2 < 1) {
    count2 = 0;
  } else {
    count2--;
  }
  childrenTotal.textContent = count2;
  maxGuest = count1 + count2;
});

childrenPlusBtn.addEventListener("click", function () {
  count2++;
  childrenTotal.textContent = count2;
  maxGuest = count1 + count2;
});

adultMinusBtn.addEventListener("click", function () {
  if (count1 < 1) {
    count1 = 0;
  } else {
    count1--;
  }
  adultsTotal.textContent = count1;
  maxGuest = count1 + count2;
});

adultPlusBtn.addEventListener("click", function () {
  count1++;
  adultsTotal.textContent = count1;
  maxGuest = count1 + count2;
});

locationsEl.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("location-name")) {
    defaultLoc.textContent = target.textContent;
    navLocation.textContent = target.textContent;
  }
});

searchEl.addEventListener("click", function () {
  reArray = data.filter((item) => {
    const arr = defaultLoc.textContent.split(",");
    if (arr[0] === "Whole") {
      return item.maxGuests >= maxGuest;
    }
    if (item.city === arr[0] && item.maxGuests >= maxGuest) return item;
  });
  staysEl.innerHTML = "";
  addToDOM(reArray);
  const stayEl = document.querySelectorAll(".stay-features");
  superHost([...stayEl], reArray);
  totalStays.textContent = `${reArray.length}`;
});
