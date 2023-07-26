const deliveryAddBtn = document.querySelector(".delivery_addBtn");
const deliveryTexts = document.querySelectorAll(".delivery_form input");

let deliveryData = {
  title: "",
  addr1: "",
  addr2: "",
  name: "",
  tel: "",
};
if (deliveryAddBtn) {
  deliveryAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const checke = Object.values(deliveryData).every((field) => field !== "");
    if (checke) {
      alert("배송지가 추가되었습니다.");
      //   추가API
      window.location.href = "/delivery/delivery_info.html";
    } else {
      alert("모두 입력해주세요.");
    }
  });

  const textHandler = (e) => {
    const { value, name } = e.target;

    deliveryData = {
      ...deliveryData,
      [name]: value,
    };
  };
  deliveryTexts.forEach((deliveryText) => {
    deliveryText.addEventListener("input", textHandler);
  });
}
const deleteBtn = document.querySelector(".deleteBtn");
const basicPlaces = document.querySelectorAll(".basic input[type='radio']");
if (deleteBtn) {
  deleteBtn.addEventListener("click", () => {
    const result = window.confirm("정말 삭제하시겠습니까?");
    if (result) {
      // 삭제
      alert("삭제되었습니다.");
      window.location.reload();
    }
  });

  let lastChecked = null;

  basicPlaces.forEach((basicPlace, idx) => {
    basicPlace.addEventListener("click", (e) => {
      if (e.target.checked) {
        const result = window.confirm("기본배송지로 설정하시겠습니까?");
        if (result) {
          // 기본배송지 설정
          alert("기본배송지로 설정되었습니다.");
          lastChecked = e.target;
        } else if (!result) {
          if (lastChecked) {
            lastChecked.checked = true;
          }
          e.target.checked = false;
        }
      }
    });
  });
}

const deliveryUpdateBtn = document.querySelector(".delivery_updateBtn");
if (deliveryUpdateBtn) {
  deliveryUpdateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const checke = Object.values(deliveryData).every((field) => field !== "");
    if (checke) {
      alert("배송지가 수정되었습니다.");
      //   수정 API
      window.location.href = "/delivery/delivery_info.html";
    } else {
      alert("모두 입력해주세요.");
    }
  });

  const textHandler = (e) => {
    const { value, name } = e.target;

    deliveryData = {
      ...deliveryData,
      [name]: value,
    };
  };
  deliveryTexts.forEach((deliveryText) => {
    deliveryText.addEventListener("input", textHandler);
  });
}
