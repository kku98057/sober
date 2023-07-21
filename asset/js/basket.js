const itemCounter = document.querySelectorAll(".count");
const itemLists = document.querySelectorAll(".basket_list");
const basketContents = document.querySelector(".basket_contents");
const alarm = document.querySelector(".alaram_count");
let NORMAL_PRICE;
let SALE_PRICE;
let LAST_PRICE;

let SINGLE_AMOUNT;
let ALL_AMOUNT;

function setAlarm() {}
itemCounter.forEach((item, idx) => {
  let count = 1;
  const plus = item.querySelector(".plus");
  const minus = item.querySelector(".minus");
  const quantity = item.querySelector(".quantity");

  quantity.innerHTML = count;
  const plusCount = () => {
    count++;
    quantity.innerHTML = count;
  };
  const minusCount = () => {
    if (count <= 1) {
      return;
    } else {
      count--;
      quantity.innerHTML = count;
    }
  };
  plus.addEventListener("click", plusCount);
  minus.addEventListener("click", minusCount);
});
itemLists.forEach((list, idx) => {
  list.dataset.index = idx;
  const close = list.querySelector(".basket_list-close");
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
});

setAlarm();
