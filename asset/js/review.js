const stars = document.querySelectorAll(".stars label input");

stars.forEach((star, index) => {
  star.addEventListener("change", function () {
    if (this.checked) {
      // 현재 별과 이전 별을 모두 체크
      for (let i = 0; i <= index; i++) {
        stars[i].checked = true;
      }
      // 현재 별 이후의 별을 모두 해제
      for (let i = index + 1; i < stars.length; i++) {
        stars[i].checked = false;
      }
    } else {
      // 현재 별과 이후의 별을 모두 해제
      for (let i = index; i < stars.length; i++) {
        stars[i].checked = false;
      }
    }
  });
});

// 유효성검사
const completeBtn = document.querySelector(".review_contents");

completeBtn.addEventListener("submit", (e) => {
  const stars = document.querySelectorAll(".stars label input");
  const taste = document.querySelectorAll(".taste_list label input");
  const quantity = document.querySelectorAll(".quantity_list label input");
  const delivery = document.querySelectorAll(".delivery_list label input");

  const starIsChecked = Array.from(stars).some((star) => star.checked);
  const tasteIsChecked = Array.from(taste).some((star) => star.checked);
  const quantityIsChecked = Array.from(quantity).some((star) => star.checked);
  const deliveryIsChecked = Array.from(delivery).some((star) => star.checked);

  if (!starIsChecked) {
    e.preventDefault();
    alert("별점을 선택해 주세요.");
    return;
  }
  if (!tasteIsChecked) {
    e.preventDefault();
    alert("맛 선택해 주세요.");
    return;
  }
  if (!quantityIsChecked) {
    e.preventDefault();
    alert("가격을 선택해 주세요.");
    return;
  }
  if (!deliveryIsChecked) {
    e.preventDefault();
    alert("뱌송을 선택해 주세요.");
    return;
  }
});
