const reason = document.querySelectorAll(".reason_radio");
const reason_text = document.querySelector(".reason_text");
const input_check = document.querySelector("#refund_check-input");
const refund_btn = document.querySelector(".refund_btn");
let REASON_VALUE = "";
let REASON_TEXT = "";
let CHECKED = false;
reason.forEach((radio) => {
  radio.addEventListener("click", () => {
    console.dir(radio);
    if (radio.checked) {
      REASON_VALUE = radio.value;
    }
  });
});
reason_text.addEventListener("input", (e) => {
  const { value } = e.target;
  REASON_TEXT = value;
});

input_check.addEventListener("click", () => {
  if (REASON_VALUE === "" || REASON_TEXT === "") {
    // 취소사유 및 안내사항 미동의(통과실패)
    alert("취소사유를 입력해주세요");
    input_check.checked = false;
    refund_btn.classList.add("disable");
  } else {
    // 모두 체크 되었을떄 (통과)
    CHECKED = input_check.checked;
    refund_btn.classList.remove("disable");
    // 환불 api 입력
  }
});
