const itemList = [
  {
    id: 1,
    name: "하이트 제로0.0 350ml",
    amount: 1,
    product_number: "A",
    type: "can",
    price: 1000,
    discount: 100,
    image: "/asset/imgs/hite.png",
    sale: 3,
  },
  {
    id: 5,
    name: "바바리아 오리지널 350ml",
    amount: 1,
    product_number: "B",
    type: "can",
    price: 2000,
    discount: 0,
    image: "/asset/imgs/baba.png",
    sale: 5,
  },
  {
    id: 9,
    name: "볼파스엔젤맨 파스브라우스 레몬맛",
    amount: 1,
    product_number: "C",
    type: "can",
    price: 3000,
    discount: 0,
    image: "/asset/imgs/angel.png",
    sale: 7,
  },
];

const accordians = document.querySelectorAll(".product_accordian > div");
accordians.forEach((list) => {
  list.addEventListener("click", (e) => {
    e.stopPropagation();
    list.classList.toggle("active");
  });
});
const inners = document.querySelectorAll(".accordian_inner");
inners.forEach((inner) => {
  const height = inner.getBoundingClientRect().height;
  inner.style.setProperty("--height", `${height}px`);
  inner.style.height = 0;
});

// 펼치기 버튼
const view_btn = document.querySelector(".view_btn");
view_btn.addEventListener("click", (e) => {
  e.stopPropagation();
  const shadow_img = document.querySelector(".shadow_img");
  const detail_page_img = document.querySelector(".detail_page_img");
  view_btn.classList.remove("hidden");
  shadow_img.classList.add("hidden");
  detail_page_img.classList.add("visible");
});

const tabList = document.querySelectorAll(".tab li");
const contents = document.querySelectorAll(".contents_list");

// 탭
tabList.forEach((tab, idx) => {
  tab.addEventListener("click", (e) => {
    e.stopPropagation();
    const tabTarget = tab.dataset.tabIndex;

    tabList.forEach((list) => {
      list.classList.remove("active");
    });
    contents.forEach((content) => {
      const contentTarget = content.dataset.contentIndex;

      if (tabTarget === contentTarget) {
        content.classList.add("active");
        tab.classList.add("active");
      } else {
        content.classList.remove("active");
      }
    });
  });
});

// 찜버튼
const good = document.querySelector(".good");

good.addEventListener("click", (e) => {
  e.stopPropagation();
  good.querySelector(".good-noncolor").classList.toggle("active");
  good.querySelector(".good-color").classList.toggle("active");
});

// 배송 및 반품정보 탭
const delivery = document.querySelector(".delivery");
const delivery_data = document.querySelector(".delivery_data");
const delivery_data_height = delivery_data.getBoundingClientRect().height;
delivery.addEventListener("click", (e) => {
  e.stopPropagation();
  delivery.classList.toggle("active");
});
delivery_data.style.setProperty("--height", `${delivery_data_height}px`);

delivery_data.style.height = 0;

// 옵션 탭
const selectBtn = document.querySelector(".option_select");
const selectOptionWrap = document.querySelector(".select_option_wrap");
const selectOption = selectOptionWrap.querySelector(".select_option");
let count = 0;
let putItem = false;
let openTab = false;
selectOption.innerHTML = itemList
  .map((item) => {
    return `
  <li>
    <div class="option_inner">
        <p>${item.name} <span class="option_inner-percent">${
      item.sale
    }</span><span class="option_inner-text">% 할인</span>
        </p>
        <p>
            <span class="option_inner-line"><span class="option_inner-sale">${item.discount.toLocaleString()}</span>원</span>
            <span ><span class="option_inner-last">${item.price.toLocaleString()}</span>원</span>
        </p>
    </div>
</li>`;
  })
  .join("");

selectBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  selectBtn.classList.toggle("active");
  selectOptionWrap.classList.toggle("active");
});
const optionItems = document.querySelectorAll(".select_option li");

const buyItemsWrap = document.querySelector(".buy_items");
let SELECTED_ITEMS = [];

optionItems.forEach((optionItem, idx) => {
  optionItem.addEventListener("click", (e) => {
    console.log(itemList[idx]);
    if (!SELECTED_ITEMS.find((item) => item.name === itemList[idx].name)) {
      let itemWithQuantity = { ...itemList[idx], quantity: 1 };
      SELECTED_ITEMS.push(itemWithQuantity);
      addItems();
    } else {
      alert("이미 선택한 항목입니다.");
    }
  });
});

const addItems = () => {
  buyItemsWrap.innerHTML = SELECTED_ITEMS.map((item) => {
    return `<li>
  <div class="close">
      <img src="/asset/imgs/icons/close-noline.svg" alt="close">
  </div>
  <div class="item_wrap">
      <div class="item_top">
          <h3>${item.name} <span class="sale"><span class="sale_percent">${item.sale}</span>% 할인</span></h3>
      </div>
      <div class="quantity_wrap">
          <div class="quantity">
              <button class="minus"  type="button"><img src="/asset/imgs/icons/minus.svg" alt="minus"></button>
              <span class="quantity_quantity">${item.quantity}</span>
              <button  class="plus" type="button"><img src="/asset/imgs/icons/plus.svg" alt="plus"></button>
          </div>
          <div class="price">
              <span class="price_sale"><span class="price_sale-price">${item.discount}</span>원</span>
              <span class="price_money"><span class="price_money-price">${item.price}</span>원</span>
          </div>
      </div>
  </div>
  </li>`;
  }).join("");
  const lists = buyItemsWrap.querySelectorAll("li");
  countHandler(lists);
  removeItemHandler(lists);
  updatePriceSummary();

  SELECTED_ITEMS.length > 0 ? (putItem = true) : (putItem = false);
};

const countHandler = (lists) => {
  lists.forEach((list, idx) => {
    const quantityEl = list.querySelector(".quantity_quantity");
    const plus = list.querySelector(".plus");
    const minus = list.querySelector(".minus");

    plus.addEventListener("click", (e) => {
      e.stopPropagation();
      SELECTED_ITEMS[idx].quantity++;
      quantityEl.textContent = SELECTED_ITEMS[idx].quantity;
      updatePriceSummary(); // 이 줄 추가
    });
    minus.addEventListener("click", (e) => {
      e.stopPropagation();
      if (SELECTED_ITEMS[idx].quantity > 1) {
        SELECTED_ITEMS[idx].quantity--;
        quantityEl.textContent = SELECTED_ITEMS[idx].quantity;
        updatePriceSummary(); // 이 줄 추가
      }
    });
  });
};
// 상품 항목 제거
const removeItemHandler = (lists) => {
  lists.forEach((list, idx) => {
    const close = list.querySelector(".close");
    close.addEventListener("click", (e) => {
      e.stopPropagation();
      SELECTED_ITEMS.splice(idx, 1);
      addItems();
    });
  });
};
const updatePriceSummary = () => {
  const totalQuantity = SELECTED_ITEMS.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalProductPrice = SELECTED_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = SELECTED_ITEMS.reduce(
    (sum, item) => sum + item.discount * item.quantity,
    0
  );
  const bundleDiscount = totalProductPrice * 0.03; // 묶음배송 할인은 3%

  document.querySelector(
    ".option_product-price"
  ).textContent = `${totalQuantity}개 상품 금액 ${totalProductPrice.toLocaleString()}원`;
  document.querySelector(
    ".option_sale-price"
  ).textContent = `- ${totalDiscount.toLocaleString()}원`;
  document.querySelector(
    ".option_add-price"
  ).textContent = `- ${bundleDiscount.toLocaleString()}원`;

  const finalPrice = totalProductPrice - totalDiscount - bundleDiscount;
  document.querySelector(
    ".option_amount-price"
  ).textContent = `${finalPrice.toLocaleString()}원`;
};
const optionTab = document.querySelector(".option_Tab");
const tabClose = document.querySelector(".tab_close");
const basket = document.querySelector(".basket");
const buyBtn = document.querySelector(".buy_btn");
const optionBtn = document.querySelector(".optionBtn");
tabClose.addEventListener("click", (e) => {
  e.stopPropagation();
  optionTab.classList.remove("active");
});

const settingButtons = () => {
  buyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    e.stopPropagation();
    if (putItem && openTab) {
      // 탭이 열려있고 아이템이 있을때(결제페이지동)
      window.location.href = "/payment/pay.html";
      openTab = false;
    } else if (!openTab) {
      // 탭이 닫혀을떄
      optionTab.classList.add("active");
      openTab = true;
    } else if (openTab) {
      // 탭이 열려있을때
      optionTab.classList.remove("active");
      openTab = false;
    }
  });
  basket.addEventListener("click", (e) => {
    e.stopPropagation();
    if (putItem && openTab) {
      // 탭이 열려있고 아이템이 있을때 (장바구니에 담김)
      alert("장바구니에 담았습니다.");
      openTab = false;
    } else if (!openTab) {
      // 탭이 닫혀을떄
      optionTab.classList.add("active");
      openTab = true;
    } else if (openTab) {
      // 탭이 열려있을때
      optionTab.classList.remove("active");
      openTab = false;
    }
  });
  optionBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    optionTab.classList.add("active");
    openTab = true;
  });
};
settingButtons();

window.addEventListener("click", (e) => {
  if (e.target === optionTab || optionTab.contains(e.target)) {
    console.log(e.target);
    return;
  } else {
    optionTab.classList.remove("active");
    openTab = false;
  }
});
