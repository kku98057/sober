// 문의 옵션창 오픈
const selector = document.querySelector(".selector");
if (selector) {
  selector.addEventListener("click", () => {
    selector.classList.toggle("open");
  });

  // 문의 옵션창 셀렉트
  const selectorLists = document.querySelectorAll(
    ".selector_options ul li span"
  );
  selectorLists.forEach((list) => {
    list.addEventListener("click", (e) => {
      const selectedOption = document.querySelector(".selector_select h3");
      const text = list.textContent;
      selectedOption.innerHTML = text;
    });
  });
}
