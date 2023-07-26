// const token = Cookies.get("token");
// if (!token) {
//   window.location.href = "/auth/needLogin.html";
// }

const bundleProduct = document.querySelector(".bundle_product");
const individualProduct = document.querySelector(".individual_product");


const normalPrice = document.querySelector(".normal_price");
const salePrice = document.querySelector(".sale_price");
const lastPrice = document.querySelector(".last_price");
const delliveryPrice = document.querySelector(".delivery_price");

let delPrice = 3000;

let sum = 0;
let discountSum = 0;
let totalSum = 0;
let sumToLocale;
let discountToLocale;
let allToLocale;

let allQuantity = 0;

let removePrice = 0;
let removeDiscount = 0;
let removeTotalPrice = 0;

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

const otherDiscount = 50; // 퍼센트로 바꾸셔야합니다.

const getItems = async () => {
  return axios
    .get(itemList)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

(async () => {
  let bundleItems = setItemList;
  let pickItems = itemList;
  // 묶음이랑 개별이랑 나눠서..
  if(bundleItems.length) {

  bundleProduct.innerHTML = bundleItems
    .map((item) => {
      const price = item.price.toLocaleString();
      return `   <li id="bundle_list" class="basket_list">
        <div class="basket_list-img">
            <img src=${item.image} alt="beer">
        </div>
        <div class="basket_list-text">
            <div class="basket_list-top">
                <div class="basket_text">
                    <h3>${item.name}</h3>
                    <div id="bundle_basket_list-close" class="basket_list-close">
                        <img src="../asset/imgs/icons/close.svg" alt="close">
                    </div>
                </div>
                <h4 id="bundle_price" class="price">${price}<span>원</span></h4>
                <div id="bundle_item_idx" class="item_idx" hidden>${item.id}</div>
                <div id="bundle_amount" class="bundle_amount" hidden>${item.amount}</div>
            </div>
    
            <div id="bundle_count" class="count">
                <button id="bundle_minus"class="minus" type="button"><img src="../asset/imgs/icons/minus.svg" alt="minus"></button>
                <span id="bundle_quantity" class="quantity">1</span>
                <button id="bundle_plus"class="plus" type="button"><img src="../asset/imgs/icons/plus.svg" alt="plus"></button>
            </div>
        </div>
    </li>`;
    })
    .join("");
    
  const itemLists = document.querySelectorAll("#bundle_list");
  const special = document.querySelector("#special_bundle");
  const alarm = document.querySelector("#bundle_alarm");
  const alarm2 = document.querySelector('.alarm2');

  itemLists.forEach((list, idx) => {
    list.dataset.index = idx;
    const close = list.querySelector("#bundle_basket_list-close");
    // 삭제
    close.addEventListener("click", (e) => {
      if (idx === Number(list.dataset.index)) {
        // 삭제할때 해당하는 물품 금액을 빼줍니다.
        let itemId = list.querySelector("#bundle_item_idx");
        let quantity = list.querySelector("#bundle_quantity");

        let itemData = bundleItems.filter(
          (data) => data["id"] === Number(itemId.textContent)
        );

        let thisQuantity = Number(quantity.textContent);

        let thisPrice = Number(itemData[0].price) * itemData[0].amount;
        let thisDiscount = Number(itemData[0].discount) * itemData[0].amount;

        console.log(`현재 가격 : ${sum}`);

        removePrice = sum - thisPrice;
        removeDiscount = discountSum - thisDiscount;
        removeTotalPrice = totalSum - (thisPrice - thisDiscount);

        console.log(`아이템 가격 : ${itemData[0].price}`);
        console.log(removePrice);
        normalPrice.innerHTML = `  ${removePrice.toLocaleString()}<span>원</span>`;
        if (removeDiscount > 0) {
          salePrice.innerHTML = `  -${removeDiscount.toLocaleString()}<span>원</span>`;
        } else {
          salePrice.innerHTML = `  -(${removeDiscount.toLocaleString()})<span>원</span>`;
        }

        lastPrice.innerHTML = `  ${removeTotalPrice.toLocaleString()}<span>원</span>`;

        sum = removePrice;
        discountSum = removeDiscount;
        totalSum = removeTotalPrice;

        allQuantity -= itemData[0].amount;

        if(totalSum > 49999) {
          delPrice = 0;
        } else {
          delPrice = 3000;
          totalSum = totalSum + delPrice;
        }
        allToLocale = totalSum.toLocaleString();
        delToLocale = delPrice.toLocaleString();
  
        delliveryPrice.innerHTML =  `  ${delPrice}<span>원</span>`;
        lastPrice.innerHTML = `  ${allToLocale}<span>원</span>`;
        // console.log(`상품 금액 :  ${thisPrice.textContent}  | 상품 갯수 : ${thisQuanity.textContent}`, );
        list.remove();
      }
      if (bundleProduct.children.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = "비어있습니다.";
        p.style.cssText = "text-align:center";
        special.style.display = "none";
        alarm.style.display = "none";
        alarm2.style.display = "none";
        bundleProduct.append(p);
      }
    });

    // 카운트
    let count = 1;
    const plus = list.querySelector("#bundle_plus");
    const minus = list.querySelector("#bundle_minus");
    const quantity = list.querySelector("#bundle_quantity");

    // const bundle_amount = list.querySelector('#bundle_amount');
    const price = bundleItems[idx].price;
    const discount = bundleItems[idx].discount;
    const amount = bundleItems[idx].amount; 
    const specialBundleText = document.querySelector(".special_bundle_text");

    let bundleQuantity = 0;

    const initCount = () => {
      // speical_price.style.display = "none";
      sum += price * amount;
      discountSum += discount * amount;
      bundleQuantity = amount * count;
      allQuantity += amount;
      normalAmount(sum);
      saleAmount(discountSum);
      allAmount();
      checkAlarm();
    };

    const plusCount = () => {
      count++;
      sum += price * amount;
      discountSum += discount * amount;
      quantity.innerHTML = count;
      
      bundleQuantity = amount * count;
      allQuantity += bundleQuantity;
      normalAmount(sum);
      saleAmount(discountSum);
      allAmount();
      checkAlarm();
    };

    const minusCount = () => {
      if (count <= 1) {
        return;
      } else {
        count--;
        sum -= price * amount;;
        discountSum -= discount * amount;
        quantity.innerHTML = count;

        bundleQuantity = amount * count;
        allQuantity -= bundleQuantity;
        normalAmount(sum);
        saleAmount(discountSum);
        allAmount();
        checkAlarm();
      }
    };

    plus.addEventListener("click", plusCount);
    minus.addEventListener("click", minusCount);

    // 상품의 총합(정상가)
    const normalAmount = (sum) => {
      sumToLocale = sum.toLocaleString();
      console.log(`정상가 합계 : ${sumToLocale}`);
      return (normalPrice.innerHTML = `  ${sumToLocale}<span>원</span>`);
      console.log(`가격 총합 : ${sum} | 인덱스 : ${idx}`);
    };

    const saleAmount = (discount) => {
      if (discount > 0) {
        discountToLocale = discount.toLocaleString();
        return (salePrice.innerHTML = `  -${discountToLocale}<span>원</span>`);
      } else {
        return (salePrice.innerHTML = `  -(${discountToLocale})<span>원</span>`);
      }
    };

    // 상품의 총합(최종주문금액)
    const allAmount = () => {

      
      totalSum = sum - discountSum;
      console.log(`가격 총합 : ${totalSum}`);
      if(totalSum > 49999) {
        delPrice = 0;
      } else {
        delPrice = 3000;
        totalSum = totalSum + delPrice;
      }
      allToLocale = totalSum.toLocaleString();
      delToLocale = delPrice.toLocaleString();

      delliveryPrice.innerHTML =  `  ${delPrice}<span>원</span>`;
      return (lastPrice.innerHTML = `  ${allToLocale}<span>원</span>`);
    };

    const checkAlarm = () => {
      if (6 === bundleQuantity) {
        alarm.style.display = "flex";
        alarm2.style.display = "block";
        alarm2.innerHTML = "현재 묶음 배송 3% 할인 혜택 적용";

        special.style.display = "flex";
        specialBundleText.innerHTML = "묶음배송 3% 할인 혜택";
        return (alarm.innerHTML = `  [묶음배송 혜택] 6캔 묶음 추가 구매시 7% 할인!`);
      } else if (12 === bundleQuantity || 18 === bundleQuantity) {
        alarm.style.display = "flex";
        alarm2.style.display = "block";
        alarm2.innerHTML = "현재 묶음 배송 7% 할인 혜택 적용";

        special.style.display = "flex";
        specialBundleText.innerHTML = "묶음배송 7% 할인 혜택";
        return (alarm.innerHTML = `  [묶음배송 혜택] 6캔 묶음 추가 구매시 12% 할인!`);
      } else if (24 === bundleQuantity){
        special.style.display = "flex";
        specialBundleText.innerHTML = "묶음배송 12% 할인 혜택";
        alarm2.style.display = "none";
        return (alarm.innerHTML = `  [묶음배송 혜택] 12% 추가 할인 적용!`);
      } else if (0 === bundleQuantity){
        special.style.display = "none";
        alarm.style.display = "none";
        alarm2.style.display = "none";
        return ;
      }

      };
      initCount();
    });
  }

  individualProduct.innerHTML = pickItems
    .map((item) => {
      const price = item.price.toLocaleString();
      return `   <li id="pick_item_list" class="basket_list">
        <div class="basket_list-img">
            <img src=${item.image} alt="beer">
        </div>
        <div class="basket_list-text">
            <div class="basket_list-top">
                <div class="basket_text">
                    <h3>${item.name}</h3>
                    <div id="pick_basket_list-close" class="basket_list-close">
                        <img src="../asset/imgs/icons/close.svg" alt="close">
                    </div>
                </div>
                <h4 class="price">${price}<span>원</span></h4>
                <div id="pick_tiem_idx" class="item_idx" hidden>${item.id}</div>
            </div>
    
            <div class="count">
                <button id="pick_minus" class="minus" type="button"><img src="../asset/imgs/icons/minus.svg" alt="minus"></button>
                <span id="pick_quantity" class="quantity">1</span>
                <button id="pick_plus" class="plus" type="button"><img src="../asset/imgs/icons/plus.svg" alt="plus"></button>
            </div>
        </div>
    </li>`;
  }).join("");

  const itemLists = document.querySelectorAll("#pick_item_list");
  const special = document.querySelector("#special_pick");
  const alarm = document.querySelector("#pick_alarm");
  
  let pickQuantity = 0;

  itemLists.forEach((list, idx) => {
    list.dataset.index = idx;
    const close = list.querySelector("#pick_basket_list-close");
    // 삭제
    close.addEventListener("click", (e) => {
      if (idx === Number(list.dataset.index)) {
        // 삭제할때 해당하는 물품 금액을 빼줍니다.
        let itemId = list.querySelector("#pick_tiem_idx");
        let quantity = list.querySelector("#pick_quantity");

        let itemData = pickItems.filter(
          (data) => data["id"] === Number(itemId.textContent)
        );

        let thisQuantity = Number(quantity.textContent);

        let thisPrice = Number(itemData[0].price) * thisQuantity;
        let thisDiscount = Number(itemData[0].discount) * thisQuantity;

        console.log(`현재 가격 : ${sum}`);

        removePrice = sum - thisPrice;
        removeDiscount = discountSum - thisDiscount;
        removeTotalPrice = totalSum - (thisPrice - thisDiscount);

        console.log(`아이템 가격 : ${itemData[0].price}`);
        console.log(removePrice);
        normalPrice.innerHTML = `  ${removePrice.toLocaleString()}<span>원</span>`;
        if (removeDiscount > 0) {
          salePrice.innerHTML = `  -${removeDiscount.toLocaleString()}<span>원</span>`;
        } else {
          salePrice.innerHTML = `  -(${removeDiscount.toLocaleString()})<span>원</span>`;
        }

        lastPrice.innerHTML = `  ${removeTotalPrice.toLocaleString()}<span>원</span>`;

        sum = removePrice;
        discountSum = removeDiscount;
        totalSum = removeTotalPrice;

        allQuantity -= thisQuantity;

        if(totalSum > 49999) {
          delPrice = 0;
        } else {
          delPrice = 3000;
          totalSum = totalSum + delPrice;
        }
        allToLocale = totalSum.toLocaleString();
        delToLocale = delPrice.toLocaleString();
  
        delliveryPrice.innerHTML =  `  ${delPrice}<span>원</span>`;
        lastPrice.innerHTML = `  ${allToLocale}<span>원</span>`;
        // console.log(`상품 금액 :  ${thisPrice.textContent}  | 상품 갯수 : ${thisQuanity.textContent}`, );
        list.remove();
      }
      if (bundleProduct.children.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = "비어있습니다.";
        p.style.cssText = "text-align:center";
        special.style.display = "none";
        alarm.style.display = "none";
        bundleProduct.append(p);
      }
    });

    // 카운트
    let count = 1;
    const plus = list.querySelector("#pick_plus");
    const minus = list.querySelector("#pick_minus");
    const quantity = list.querySelector("#pick_quantity");

    // const bundle_amount = list.querySelector('#bundle_amount');
    const price = pickItems[idx].price;
    const discount = pickItems[idx].discount;
    const amount = pickItems[idx].amount; 



    const initCount = () => {
      // speical_price.style.display = "none";
      sum += price * amount;
      discountSum += discount * amount;
      pickQuantity += Number(quantity.textContent);
      allQuantity += Number(quantity.textContent);
      normalAmount(sum);
      saleAmount(discountSum);
      allAmount();
      checkAlarm();
    };

    const plusCount = () => {
      count++;
      sum += price * amount;
      discountSum += discount * amount;
      quantity.innerHTML = count;
      
      pickQuantity++;
      allQuantity++;
      normalAmount(sum);
      saleAmount(discountSum);
      allAmount();
      checkAlarm();
    };

    const minusCount = () => {
      if (count <= 1) {
        return;
      } else {
        count--;
        sum -= price * amount;;
        discountSum -= discount * amount;
        quantity.innerHTML = count;

        pickQuantity--;
        allQuantity--;
        normalAmount(sum);
        saleAmount(discountSum);
        allAmount();
        checkAlarm();
      }
    };

    plus.addEventListener("click", plusCount);
    minus.addEventListener("click", minusCount);

    // 상품의 총합(정상가)
    const normalAmount = (sum) => {
      sumToLocale = sum.toLocaleString();
      console.log(`정상가 합계 : ${sumToLocale}`);
      return (normalPrice.innerHTML = `  ${sumToLocale}<span>원</span>`);
      console.log(`가격 총합 : ${sum} | 인덱스 : ${idx}`);
    };

    const saleAmount = (discount) => {
      if (discount > 0) {
        discountToLocale = discount.toLocaleString();
        return (salePrice.innerHTML = `  -${discountToLocale}<span>원</span>`);
      } else {
        return (salePrice.innerHTML = `  -(${discountToLocale})<span>원</span>`);
      }
    };

    // 상품의 총합(최종주문금액)
    const allAmount = () => {
      totalSum = sum - discountSum;

      console.log(`가격 총합 : ${totalSum}`);
      if(totalSum > 49999) {
        delPrice = 0;
      } else {
        delPrice = 3000;
        totalSum = totalSum + delPrice;
      }
      allToLocale = totalSum.toLocaleString();
      delToLocale = delPrice.toLocaleString();

      delliveryPrice.innerHTML =  `  ${delPrice}<span>원</span>`;
      return (lastPrice.innerHTML = `  ${allToLocale}<span>원</span>`);
    };

    const checkAlarm = () => {
      if (12 === pickQuantity) {
        alarm.style.display = "flex";
        special.style.display = "flex";
        return (alarm.innerHTML = `  [12캔 골라담기 혜택] 5% 추가 할인 적용!`);
      } else if (11 >= pickQuantity) {
        alarm.style.display = "flex";
        let remain = 12 - pickQuantity;
        console.log(`{남은 숫자 : ${remain}} {골라 담은 숫자 : ${pickQuantity}} `);
        special.style.display = "flex";
        special.style.display = "none";
        return (alarm.innerHTML = `  [골라담기 혜택] ${remain}캔 더 담을 시 5% 추가 할인!`);
      } else if (0 === pickQuantity){
        special.style.display = "none";
        alarm.style.display = "none";
        return ;
      }

      };
      initCount();
    });
  

  const btnPay = document.querySelector(".pay_btn");
  const popup = document.querySelector(".popup");
  const btnPopup = document.querySelector(".popup_btn");

  const goToPayment = () => {

    console.log(` 현재 갯수 : ${allQuantity}`);
    if(allQuantity < 6) {
      popup.style.display = "flex";
    } else {
      location.href = "/payment/pay.html";      
    }
  };

  btnPay.addEventListener("click", goToPayment);
  btnPopup.addEventListener("click", () => {
    popup.style.display = "none";
  });
})();
