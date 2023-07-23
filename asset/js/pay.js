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

// lastPrice.innerHTML = PRICE_ARRAY.reduce((a, b) => a + b).toLocaleString();

// pay버튼
const payBtn = document.querySelector(".payBtn");
const payInfo = document.querySelector("#payAgree");
let isChecked = false;
function acsessPayment() {
  if (isChecked) {
    alert("결제시작");
  } else {
    alert("구매진행에 필요한 동의가 필요합니다.");
  }
}
payBtn.addEventListener("click", acsessPayment);
payInfo.addEventListener("click", (e) => {
  isChecked = e.target.checked;
});
