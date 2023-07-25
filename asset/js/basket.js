const basketContents = document.querySelector(".basket_contents");
const itemList = [
  {
    "id" : 1,
    "name": "하이트 제로0.0 350ml",
    'amount' : 1,
    'product_number' : 'A',
    'type' : 'can',
    "price": 1000,
    'discount' : 100,
    "image": "../asset/imgs/hite.png"
  },
  {
    "id" : 5,
    "name": "바바리아 오리지널 350ml",
    'amount' : 1,
    'product_number' : 'B',
    'type' : 'can',
    "price": 2000,
    'discount' : 0,
    "image": "../asset/imgs/baba.png"
  },
  {
    "id" : 9,
    "name": "볼파스엔젤맨 파스브라우스 레몬맛",
    'amount' : 1,
    'product_number' : 'C',
    'type' : 'can',
    "price": 3000,
    'discount' : 0,
    "image": "../asset/imgs/angel.png"
  }
];

const setItemList = [
  {
    "id" : 2,
    "name": "하이트 제로0.0 350ml 6캔",
    'amount' : 6,
    'product_number' : 'A_6',
    'type' : 'can',
    'price': 6000,
    'discount' : 30,
    "image": "../asset/imgs/hite.png"
  },
  {
    "id" : 3,
    "name": "하이트 제로0.0 350ml 12캔",
    'amount' : 12,
    'product_number' : 'A_12',
    'type' : 'can',
    'price': 12000,
    'discount' : 70,
    "image": "../asset/imgs/hite.png"
  },
  {
    "id" : 4,
    "name": "하이트 제로0.0 350ml 24캔",
    'amount' : 24,
    'product_number' : 'A_24',
    'type' : 'can',
    'price': 24000,
    'discount' : 120,
    "image": "../asset/imgs/hite.png"
  },
  {
    "id" : 6,
    "name": "바바리아 오리지널 350ml 6캔",
    'amount' : 6,
    'product_number' : 'B_6',
    'type' : 'can',
    "price": 12000,
    'discount' : 30,
    "image": "../asset/imgs/baba.png"
  },
  {
    "id" : 7,
    "name": "바바리아 오리지널 350ml 12캔",
    'amount' : 12,
    'product_number' : 'B_12',
    'type' : 'can',
    "price": 24000,
    'discount' : 60,
    "image": "../asset/imgs/baba.png"
  },
  {
    "id" : 8,
    "name": "바바리아 오리지널 350ml 24캔",
    'amount' : 24,
    'product_number' : 'B_24',
    'type' : 'can',
    "price": 48000,
    'discount' : 120,
    "image": "../asset/imgs/baba.png"
  },
  {
    "id" : 9,
    "name": "볼파스엔젤맨 파스브라우스 레몬맛 6캔",
    'amount' : 6,
    'product_number' : 'C_6',
    'type' : 'can',
    "price": 18000,
    'discount' : 30,
    "image": "../asset/imgs/angel.png"
  },
  {
    "id" : 10,
    "name": "볼파스엔젤맨 파스브라우스 레몬맛 12캔",
    'amount' : 12,
    'product_number' : 'C_12',
    'type' : 'can',
    "price": 36000,
    'discount' : 60,
    "image": "../asset/imgs/angel.png"
  },
  {
    "id" : 11,
    "name": "볼파스엔젤맨 파스브라우스 레몬맛 24캔",
    'amount' : 24,
    'product_number' : 'C_24',
    'type' : 'can',
    "price": 72000,
    'discount' : 120,
    "image": "../asset/imgs/angel.png"
  },
]

const cartItemList = [];

const otherDiscount = 50; // 퍼센트로 바꾸셔야합니다.

const getItems = async () => {
  return axios
    .get(itemList)
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

(async () => {
  let items = itemList;

  basketContents.innerHTML = items
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

  const itemCounter = document.querySelectorAll(".count");
  const itemLists = document.querySelectorAll(".basket_list");

  const alarm = document.querySelector(".alarm");
  const normalPrice = document.querySelector(".normal_price");
  const salePrice = document.querySelector(".sale_price");
  const lastPrice = document.querySelector(".last_price");
  // let NORMAL_AMOUNT = [];
  let NORMAL_PRICE = 0;
  let SALE_PRICE = 0;
  let LAST_PRICE = 0;

  let SINGLE_AMOUNT;
  let ALL_AMOUNT;

  let sum = 0;
  let discountSum = 0;
  let totalSum = 0;
  let sumToLocale;
  let discountToLocale;
  let allToLocale;

  let allQuantity = 0;

  function setAlarm() {}

  itemLists.forEach((list, idx) => {
    list.dataset.index = idx;
    const close = list.querySelector(".basket_list-close");
    // 삭제
    close.addEventListener("click", (e) => {
      if (idx === Number(list.dataset.index)) {

        // 삭제할때 해당하는 물품 금액을 빼줍니다.
        let itemId = list.querySelector(".item_idx");
        let quantity = list.querySelector(".quantity");
        

        let itemData = itemList.filter( data => data['id'] ===  Number(itemId.textContent));

        let thisQuantity = Number(quantity.textContent);

        let thisPrice = Number(itemData[0].price) * thisQuantity;
        let thisDiscount = Number(itemData[0].discount) * thisQuantity;

        console.log(`현재 가격 : ${sum}`);

        let removePrice = sum - thisPrice;
        let removeDiscount = discountSum - thisDiscount;
        let removeTotalPrice = totalSum - (thisPrice - thisDiscount);


        console.log(`아이템 가격 : ${itemData[0].price}`);
        console.log(removePrice);
        normalPrice.innerHTML = `  ${removePrice.toLocaleString()}<span>원</span>`;
        if(removeDiscount > 0) {
          salePrice.innerHTML = `  -${removeDiscount.toLocaleString()}<span>원</span>`;
         } else {
          salePrice.innerHTML = `  -(${removeDiscount.toLocaleString()})<span>원</span>`;
         }

        lastPrice.innerHTML = `  ${removeTotalPrice.toLocaleString()}<span>원</span>`;
        
        sum = removePrice;
        discountSum = removeDiscount;
        totalSum = removeTotalPrice;
        // console.log(`상품 금액 :  ${thisPrice.textContent}  | 상품 갯수 : ${thisQuanity.textContent}`, );
        list.remove();
      }
      if (basketContents.children.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = "비어있습니다.";
        p.style.cssText = "text-align:center";
        basketContents.append(p);
      }
    });

    // 카운트
    let count = 1;
    const plus = list.querySelector(".plus");
    const minus = list.querySelector(".minus");
    const quantity = list.querySelector(".quantity");
    const price = items[idx].price;
    const discount = items[idx].discount;
    const priceDiv = list.querySelector(".price");
    const special = document.querySelector(".special");

    const initCount = () => {
      // speical_price.style.display = "none";
      const thisCount = quantity.textContent;
      sum += price * thisCount;
      discountSum += discount * thisCount;

      allQuantity += Number(thisCount);
      normalAmount(sum);
      saleAmount(discountSum);
      allAmount();
      checkAlarm();
    }

   

    const plusCount = () => {
      count++;
      sum += price;
      discountSum += discount;
      quantity.innerHTML = count;

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
        sum -= price ;
        discountSum -= discount;
        quantity.innerHTML = count;
        allQuantity--;
        normalAmount(sum);
        saleAmount(discountSum);
        allAmount();
        checkAlarm();
      }
    };


    plus.addEventListener("click", plusCount);
    minus.addEventListener("click", minusCount);

    // 각 상품의 합계
    const itemAmount = (sum) => {
      sumToLocale = sum.toLocaleString();
      normalAmount(sum, idx);
      return (priceDiv.innerHTML = `  ${sumToLocale}<span>원</span>`);
    };

    // 상품의 총합(정상가)
    const normalAmount = (sum) => {
      sumToLocale = sum.toLocaleString();
      console.log(`정상가 합계 : ${sumToLocale}`);
      return (normalPrice.innerHTML = `  ${sumToLocale}<span>원</span>`);
      console.log(`가격 총합 : ${sum} | 인덱스 : ${idx}`);
    };

    const saleAmount = (discount) => {
      if(discount > 0) {
      discountToLocale = discount.toLocaleString();
      return (salePrice.innerHTML = `  -${discountToLocale}<span>원</span>`);
     } else {
      return (salePrice.innerHTML = `  -(${discountToLocale})<span>원</span>`);
     }
    }
    // 상품의 총합(최종주문금액)
    const allAmount = () => {
      console.log(`가격 총합 : ${sum}`);
      totalSum = sum - discountSum;
      allToLocale = totalSum.toLocaleString();
      return (lastPrice.innerHTML = `  ${allToLocale}<span>원</span>`);
    };

    const checkAlarm = () => {
      let remain = 0; 


      if (11 > allQuantity) {
        remain = 12 - allQuantity;
        alarm.style.display = 'flex';
        return (alarm.innerHTML = `  [골라담기 혜택] ${remain}캔 더 담을 시 5% 추가 할인`);
      } else if ( 12 === allQuantity) {
        special.style.display = "flex";
        return (alarm.innerHTML = `  [12캔 골라담기 혜택] 5% 추가 할인 적용!`);
      } else {
        special.style.display = "flex";
        return (alarm.innerHTML = `  [12캔 골라담기 혜택] 5% 추가 할인 적용!`);
      }
      // if(11 < allQuantity) {

      //   if( 23 < allQuantity) {
      //     console.log(` 24개 : ${allQuantity}`);
      //     alarm.style.display = 'none';
      //   } else {          
      //     remain = 24 - allQuantity;
      //     alarm.style.display = 'flex';
      //     return (alarm.innerHTML = `  ${remain}캔 더 구매시 더 싸개 24캔 묶음 배송 가능!`);
      //   }

      // } else if (5 < allQuantity) {
      //   remain = 12 - allQuantity;
      //   alarm.style.display = 'flex';
      //   return (alarm.innerHTML = `  ${remain}캔 더 구매시 더 싸개 12캔 묶음 배송 가능!`);
      // } else {
      //   remain = 6 - allQuantity;
      //   alarm.style.display = 'flex';
      
      //   return (alarm.innerHTML = `  ${remain}캔 더 구매시 더 싸개 6캔 묶음 배송 가능!`);
      // }

    }
    initCount();
  });

  setAlarm();
  const btnPay = document.querySelector(".pay_btn");
  const goToPayment = () => {
     location.href = '/payment/pay.html';
  };

  btnPay.addEventListener('click', goToPayment);


})();
