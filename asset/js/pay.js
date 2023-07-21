const cards = document.querySelectorAll(".pay_content2-card");
cards.forEach((card, idx) => {
  card.addEventListener("click", () => {
    card.classList.remove("active");
    cards.forEach((item) => {
      item.classList.remove("active");
    });
    cards.forEach((item, index) => {
      if (idx === index) {
        item.classList.add("active");
      }
    });
  });
});

const prices = document.querySelectorAll(".price span");
const lastPrice = document.querySelector(".last_price span");
let PRICE_ARRAY = [];

lastPrice.innerHTML = PRICE_ARRAY.reduce((a, b) => a + b).toLocaleString();
