// 이메일 인증
const sign_3 = document.querySelector(".sign_3");
if (sign_3) {
  const emailForm = document.querySelector(".sign_3 label:nth-of-type(1)");
  const pwForm1 = document.querySelector(".sign_3 label:nth-of-type(2)");
  const passwordCheck1 = document.querySelector("#password-check1");

  const emailId = document.querySelector("#email-id");
  const emailFormSpan = emailForm.querySelector("span");
  const passwordCheck2Span = pwForm1.querySelector("span");
  const sign_3_btn = document.querySelector(".sign_3_btn");
  const check_comment_1 = document.querySelector(".check_comment_1");

  const PwRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
  let EMAIL_MESSAGE = "";
  let pwComplete = false;
  let emailCheck = false;

  // email 검증
  emailId.addEventListener("input", (e) => {
    const { value } = e.target;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(value)) {
      emailForm.classList.remove("active");
      emailCheck = true;
      EMAIL_MESSAGE = "이메일 아이디";
    } else {
      emailForm.classList.add("active");
      emailCheck = false;
      EMAIL_MESSAGE = "이메일이 올바르지 않습니다.";
    }
    emailFormSpan.innerHTML = EMAIL_MESSAGE;
    isConfirm();
  });
  // 비밀번호 체크

  function isPasswordMatch() {
    // 비밀번호가 정규식에 일치하는지 확인합니다.
    const isValid = PwRegex.test(passwordCheck1.value);
    if (!isValid) {
      check_comment_1.innerHTML = "비밀번호가 형식에 맞지 않습니다.";
      check_comment_1.classList.add("active");
      pwComplete = false;
    } else {
      check_comment_1.innerHTML = "비밀번호가 형식에 맞습니다.";
      check_comment_1.classList.remove("active");
      pwComplete = true;
    }
    isConfirm();
  }

  passwordCheck1.addEventListener("input", isPasswordMatch);

  // 완료버튼
  sign_3_btn.addEventListener("click", (e) => {
    e.preventDefault();
    completeBtn();
  });

  function completeBtn() {
    if (pwComplete && emailCheck) {
      window.location.href = "/auth/signup/complete.html";
    }
  }

  // 이메일 및 비밀번호 모두 통과
  function isConfirm() {
    console.log(pwComplete, "chck");
    if (pwComplete && emailCheck) {
      sign_3_btn.style.pointerEvents = "initial";
      sign_3_btn.classList.add("active");
    } else {
      sign_3_btn.style.pointerEvents = "none";
      sign_3_btn.classList.remove("active");
    }
  }
}
function alaram(message) {
  return alert(message);
}
