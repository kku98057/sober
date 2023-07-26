const bundleProduct = document.querySelector(".bundle_product");
const individualProduct = document.querySelector(".individual_product");
const itemList = [
  {
    id: 1,
    name: "하이트 제로0.0 350ml",
    amount: 1,
    product_number: "A",
    type: "can",
    price: 1000,
    discount: 100,
    image: "../asset/imgs/hite.png",
  },
  {
    id: 5,
    name: "바바리아 오리지널 350ml",
    amount: 1,
    product_number: "B",
    type: "can",
    price: 2000,
    discount: 0,
    image: "../asset/imgs/baba.png",
  },
  {
    id: 9,
    name: "볼파스엔젤맨 파스브라우스 레몬맛",
    amount: 1,
    product_number: "C",
    type: "can",
    price: 3000,
    discount: 0,
    image: "../asset/imgs/angel.png",
  },
];

const setItemList = [
  {
    id: 2,
    name: "하이트 제로0.0 350ml 6캔",
    amount: 6,
    product_number: "A_6",
    type: "can",
    price: 6000,
    discount: 30,
    image: "../asset/imgs/hite.png",
  },
  // {
  //   id: 3,
  //   name: "하이트 제로0.0 350ml 12캔",
  //   amount: 12,
  //   product_number: "A_12",
  //   type: "can",
  //   price: 12000,
  //   discount: 70,
  //   image: "../asset/imgs/hite.png",
  // },
  // {
  //   id: 4,
  //   name: "하이트 제로0.0 350ml 24캔",
  //   amount: 24,
  //   product_number: "A_24",
  //   type: "can",
  //   price: 24000,
  //   discount: 120,
  //   image: "../asset/imgs/hite.png",
  // },
  // {
  //   id: 6,
  //   name: "바바리아 오리지널 350ml 6캔",
  //   amount: 6,
  //   product_number: "B_6",
  //   type: "can",
  //   price: 12000,
  //   discount: 30,
  //   image: "../asset/imgs/baba.png",
  // },
  // {
  //   id: 7,
  //   name: "바바리아 오리지널 350ml 12캔",
  //   amount: 12,
  //   product_number: "B_12",
  //   type: "can",
  //   price: 24000,
  //   discount: 60,
  //   image: "../asset/imgs/baba.png",
  // },
  // {
  //   id: 8,
  //   name: "바바리아 오리지널 350ml 24캔",
  //   amount: 24,
  //   product_number: "B_24",
  //   type: "can",
  //   price: 48000,
  //   discount: 120,
  //   image: "../asset/imgs/baba.png",
  // },
  // {
  //   id: 9,
  //   name: "볼파스엔젤맨 파스브라우스 레몬맛 6캔",
  //   amount: 6,
  //   product_number: "C_6",
  //   type: "can",
  //   price: 18000,
  //   discount: 30,
  //   image: "../asset/imgs/angel.png",
  // },
  // {
  //   id: 10,
  //   name: "볼파스엔젤맨 파스브라우스 레몬맛 12캔",
  //   amount: 12,
  //   product_number: "C_12",
  //   type: "can",
  //   price: 36000,
  //   discount: 60,
  //   image: "../asset/imgs/angel.png",
  // },
  // {
  //   id: 11,
  //   name: "볼파스엔젤맨 파스브라우스 레몬맛 24캔",
  //   amount: 24,
  //   product_number: "C_24",
  //   type: "can",
  //   price: 72000,
  //   discount: 120,
  //   image: "../asset/imgs/angel.png",
  // },
];

bundleProduct.innerHTML = setItemList
  .map((item) => {
    const price = item.price.toLocaleString();
    return `   <li class="basket_list">
    <div class="basket_list-img">
        <img src=${item.image} alt="beer">
    </div>
    <div class="basket_list-text">
        <div class="basket_list-top">
            <div class="basket_text">
                <h3>${item.name}</h3>
                <div class="basket_list-close">
                    <img src="../asset/imgs/icons/close.svg" alt="close">
                </div>
            </div>
            <h4 class="price">${price}<span>원</span></h4>
            <div class="item_idx" hidden>${item.id}</div>
        </div>

        <div class="count">
            <button class="minus" type="button"><img src="../asset/imgs/icons/minus.svg" alt="minus"></button>
            <span class="quantity">1</span>
            <button class="plus" type="button"><img src="../asset/imgs/icons/plus.svg" alt="plus"></button>
        </div>
    </div>
</li>`;
  })
  .join("");
individualProduct.innerHTML = itemList
  .map((item) => {
    const price = item.price.toLocaleString();
    return `   <li class="basket_list">
    <div class="basket_list-img">
        <img src=${item.image} alt="beer">
    </div>
    <div class="basket_list-text">
        <div class="basket_list-top">
            <div class="basket_text">
                <h3>${item.name}</h3>
                <div class="basket_list-close">
                    <img src="../asset/imgs/icons/close.svg" alt="close">
                </div>
            </div>
            <h4 class="price">${price}<span>원</span></h4>
            <div class="item_idx" hidden>${item.id}</div>
        </div>

        <div class="count">
            <button class="minus" type="button"><img src="../asset/imgs/icons/minus.svg" alt="minus"></button>
            <span class="quantity">1</span>
            <button class="plus" type="button"><img src="../asset/imgs/icons/plus.svg" alt="plus"></button>
        </div>
    </div>
</li>`;
  })
  .join("");

itemList.forEach((item) => (item.quantity = item.amount));
setItemList.forEach((item) => (item.quantity = item.amount));

const updateBundlePop = () => {
  // Calculate the total quantity of bundle products
  const totalBundleQuantity = setItemList.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Update the text of the bundle pop element based on the total quantity
  const bundlePopElement = document.querySelector(".bundle_pop");
  if (totalBundleQuantity === 0) {
    bundlePopElement.style.display = "none";
  } else {
    bundlePopElement.style.display = "block";
    if (totalBundleQuantity >= 24) {
      bundlePopElement.textContent = "[묶음배송 혜택] 12% 최대 할인 혜택 적용!";
    } else if (totalBundleQuantity >= 12) {
      bundlePopElement.textContent =
        "[묶음배송 혜택] 12캔 묶음 추가 구매시 12% 할인!";
    } else if (totalBundleQuantity >= 6) {
      bundlePopElement.textContent =
        "[묶음배송 혜택] 6캔 묶음 추가 구매시 7% 할인!";
    }
  }
};

const handleButtonClick = (event) => {
  let target = event.target;
  while (target && target.nodeName !== "BUTTON" && target.nodeName !== "IMG") {
    target = target.parentElement;
  }

  const listItem = target.closest(".basket_list");
  if (!listItem) return; // If the clicked element is not within a list item, ignore it

  const itemId = Number(listItem.querySelector(".item_idx").textContent);
  const item =
    itemList.find((item) => item.id === itemId) ||
    setItemList.find((item) => item.id === itemId);

  if (
    target.classList.contains("basket_list-close") ||
    target.parentElement.classList.contains("basket_list-close")
  ) {
    // If the close button is clicked, remove the item from the list and the HTML
    const index = itemList.indexOf(item);
    if (index !== -1) {
      itemList.splice(index, 1);
    } else {
      const setIndex = setItemList.indexOf(item);
      setItemList.splice(setIndex, 1);
    }
    listItem.remove();
  } else if (target.nodeName === "BUTTON") {
    if (target.classList.contains("plus")) {
      item.quantity += item.amount;
    } else if (
      target.classList.contains("minus") &&
      item.quantity > item.amount
    ) {
      item.quantity -= item.amount;
    }

    const quantityElement = listItem.querySelector(".count span");
    quantityElement.textContent = item.quantity / item.amount;
  }

  updateBundlePop();
};

bundleProduct.addEventListener("click", handleButtonClick);
individualProduct.addEventListener("click", handleButtonClick);

window.addEventListener("load", updateBundlePop);
