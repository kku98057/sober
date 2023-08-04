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
    controlPopup(true);
  } else {
    alert("구매진행에 필요한 동의가 필요합니다.");
  }
}
payBtn.addEventListener("click", acsessPayment);
payInfo.addEventListener("click", (e) => {
  isChecked = e.target.checked;
});

// 소버 포인트
const soberPoint = document.querySelector(".sober_point_input input");
const usePoint = document.querySelector(".use_sober_point");
let CAN_USE_POINT = 100;

usePoint.innerHTML = CAN_USE_POINT.toLocaleString();
soberPoint.addEventListener("input", function (e) {
  var max = CAN_USE_POINT;
  var min = 0;
  var value = parseInt(e.target.value);

  if (value > max) {
    e.target.value = max;
  }
  if (value < min) {
    e.target.value = min;
  }
});

// 팝업
const popup = document.querySelector(".popup");
const okBtn = document.querySelector(".okBtn");
const moreBtn = document.querySelector(".moreBtn");
okBtn.addEventListener("click", () => {
  // 결제 진행
  alert("결제진행");
});
moreBtn.addEventListener("click", () => {
  window.location.href = "../../basket/";
});

function controlPopup(pop) {
  if (pop) {
    popup.classList.add("active");
  } else {
    popup.classList.remove("active");
  }
}
