const nickUpdateBtn = document.querySelector(".nick-update");
const nickCancleBtn = document.querySelector(".nick_cancle");
const nickChangeBtn = document.querySelector(".nick_change");
const nickChanger = document.querySelector(".nick_changer");
const nickValidation = document.querySelector(".popup_text_validation");
let NICK_NAME_CHECKED = false;
const popup = document.querySelector(".popup");
let NICKNAME = "";
nickUpdateBtn.addEventListener("click", () => {
  popup.classList.add("visible");
  nickChanger.focus();
});
nickCancleBtn.addEventListener("click", () => {
  popup.classList.remove("visible");
});
nickChanger.addEventListener("input", (e) => {
  const { value } = e.target;
  const validate = /^[가-힣A-Za-z0-9]{2,7}$/;
  if (validate.test(value)) {
    nickValidation.style.color = "#fff";
    NICKNAME = value;
    NICK_NAME_CHECKED = true;
  } else {
    NICKNAME = "";
    nickValidation.style.color = "red";
    NICK_NAME_CHECKED = false;
  }
});
nickChangeBtn.addEventListener("click", changeNickname);
function changeNickname() {
  if (NICK_NAME_CHECKED) {
    const nickname = document.querySelector(".nickname");
    nickname.innerHTML = NICKNAME;
    popup.classList.remove("visible");
  } else {
    alert("닉네임은 2~7자리 한글,영문,숫자만 가능해요.");
  }
}
