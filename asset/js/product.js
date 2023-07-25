const accordians = document.querySelectorAll(".product_accordian > div");
accordians.forEach((list) => {
  list.addEventListener("click", () => {
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
view_btn.addEventListener("click", () => {
  const shadow_img = document.querySelector(".shadow_img");
  const detail_page_img = document.querySelector(".detail_page_img");
  view_btn.classList.remove("hidden");
  shadow_img.classList.add("hidden");
  detail_page_img.classList.add("visible");
});

const tabList = document.querySelectorAll(".tab li");
const contents = document.querySelectorAll(".contents_list");

tabList.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
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

const goods = document.querySelectorAll(".good");
goods.forEach((good, idx) => {
  good.addEventListener("click", () => {
    goods.forEach((item) => {
      item.querySelector(".good-noncolor").classList.toggle("active");
      item.querySelector(".good-color").classList.toggle("active");
    });
  });
});
