// const token = Cookies.get("token");
// if (!token) {
//   window.location.href = "/auth/needLogin.html";
// }

const basketContents = document.querySelector(".basket_contents");
const getItems = async () => {
  return axios
    .get("/asset/dummy/basket.json")
    .then((res) => res.data)
    .catch((error) => console.error(error));
};
(async () => {
  let items = await getItems();

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
                        <img src="/asset/imgs/icons/close.svg" alt="close">
                    </div>
                </div>
                <h4 class="price">${price}<span>원</span></h4>
            </div>
    
            <div class="count">
                <button class="minus" type="button"><img src="/asset/imgs/icons/minus.svg" alt="minus"></button>
                <span class="quantity">1</span>
                <button class="plus" type="button"><img src="/asset/imgs/icons/plus.svg" alt="plus"></button>
            </div>
        </div>
    </li>`;
    })
    .join("");

  const itemCounter = document.querySelectorAll(".count");
  const itemLists = document.querySelectorAll(".basket_list");

  const alarm = document.querySelector(".alaram_count");
  const normalPrice = document.querySelector(".normal_price");
  let NORMAL_AMOUNT = [];
  let SALE_PRICE;
  let LAST_PRICE;

  let SINGLE_AMOUNT;
  let ALL_AMOUNT;

  function setAlarm() {}

  itemLists.forEach((list, idx) => {
    list.dataset.index = idx;
    const close = list.querySelector(".basket_list-close");
    // 삭제
    close.addEventListener("click", (e) => {
      if (idx === Number(list.dataset.index)) {
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
    const priceDiv = list.querySelector(".price");
    let sum = 0;
    let sumToLocale;

    const plusCount = () => {
      count++;
      sum = price * count;
      quantity.innerHTML = count;
      itemAmount(sum);
    };

    const minusCount = () => {
      if (count <= 1) {
        return;
      } else {
        count--;
        sum = price * count;
        quantity.innerHTML = count;
        itemAmount(sum);
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
    const normalAmount = (sum, idx) => {};
    // 상품의 총합(최종주문금액)
    const AllAmount = (sum) => {};
  });

  setAlarm();
})();
