const tabBtns = document.querySelectorAll(".tab_btn");
const contents = document.querySelectorAll(".tracking_contents .content");
tabBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const btnTarget = btn.dataset.tab;

    tabBtns.forEach((item) => {
      item.classList.remove("active");
    });

    contents.forEach((item, idx) => {
      const contentTarget = item.dataset.content;
      if (btnTarget === contentTarget) {
        item.classList.add("active");
        btn.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  });
});
