const completeBtn = document.querySelector(".completeBtn");
const couponCode = document.querySelector(".couponCode");
const closeBtn = document.querySelector(".closeBtn");
const addCoupon = document.querySelector(".addCoupon");
const couponCount = document.querySelector(".canuse_coupon span");

const popup = document.querySelector(".popup");
const content2 = document.querySelectorAll(".content_2 li");
const canUseCoupon = document.querySelectorAll(".content_1 li");
console.log(canUseCoupon);
let CODE = "";
addCoupon.addEventListener("click", () => {
  popup.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});
couponCode.addEventListener("input", (e) => {
  CODE = e.target.value;
  console.log(e.target);
});
completeBtn.addEventListener("click", () => {
  if (CODE === "") {
    alert("코드를 입력해주세요");
  } else {
    alert("쿠폰을 등록하였습니다.");
    popup.classList.remove("active");
  }
});
content2.forEach((list) => {
  const getBtn = list.querySelector(".getBtn");

  console.log(list.classList.contains("used"));

  getBtn.addEventListener("click", () => {
    if (list.classList.contains("used")) {
      return;
    } else {
      alert("쿠폰이 발급되었습니다.");
      list.classList.add("used");
    }
    canUseCouponCount();
  });
});
function canUseCouponCount() {
  couponCount.innerHTML = canUseCoupon.length;
}
canUseCouponCount();
