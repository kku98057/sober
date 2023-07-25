let MESSAGE = "";
// 이메일이 존재여부
let emailInfo = true;
// 이메일 찾기
const sign_2 = document.querySelector(".sign_2");
if (sign_2) {
  const phone = document.querySelector("#phone");
  const numb = document.querySelector("#numb");
  const phoneBtn = document.querySelector(".phone_btn");
  const checkBtn = document.querySelector(".check_btn");
  const findPwBtn = document.querySelector(".findPwBtn");
  const re_btn = document.querySelector(".re_btn");
  let phoneAuthorization = false;
  phone.addEventListener("input", (e) => {
    // 최대길이
    maxLength(11);
    const { value } = e.target;

    if (value.length === 11) {
      phoneBtn.classList.add("active");
      phoneAuthorization = true;
    } else {
      phoneBtn.classList.remove("active");
      phoneAuthorization = false;
    }
  });

  // 인증번호 확인
  let authorizationNumber = null;
  let sign2Checking = false;
  numb.addEventListener("input", (e) => {
    const { value } = e.target;
    authorizationNumber = value;
    if (value.length > 0) {
      checkBtn.classList.add("active");
    } else {
      checkBtn.classList.remove("active");
    }

    // 인증함수
  });
  phoneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // 인증함수
    if (phoneAuthorization) {
      alert("인증번호를 입력해주세요.");
      document.querySelector(".sign_2 label:nth-child(2)").style.display =
        "block";
      re_btn.style.display = "flex";
      phoneBtn.style.display = "none";
    } else {
      alert("휴대폰 번호를 입력해주세요.");
    }
  });
  re_btn.addEventListener("click", () => {
    alert("인증번호를 재전송하였습니다. 새로운 인증번호를 입력해주세요.");
    numb.value = "";
    authorizationNumber = null;

    checkBtn.style.pointerEvents = "initial";
    sign2Checking = false;

    phone.removeAttribute("readonly");
    numb.removeAttribute("readonly");
    phoneBtn.style.pointerEvents = "initial";
    findPwBtn.classList.remove("active");
    checkBtn.classList.remove("active");
  });
  // 인증번호 확인 버튼
  checkBtn.addEventListener("click", () => {
    if (phoneAuthorization && authorizationNumber !== null) {
      // 인증번호 확인함수
      alert("인증 완료되었습니다.");
      checkBtn.style.pointerEvents = "none";
      sign2Checking = true;
      phone.setAttribute("readonly", true);
      numb.setAttribute("readonly", true);
      phoneBtn.style.pointerEvents = "none";
      findPwBtn.classList.add("active");
      return;
    } else {
      alert("인증번호를 입력해주세요.");
    }
  });

  function sign2Next() {
    findPwBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (sign2Checking) {
        if (emailInfo) {
          // 이메일이 존재하는경우
          window.location.href = "/auth/find/email_found.html";
        } else {
          // 이메일이 존재하지않는경우
          window.location.href = "/auth/find/email_notfound.html";
        }
      } else {
        alert("휴대폰 인증을 먼저 받아주세요.");
      }
    });
  }

  sign2Next();
  function maxLength(max) {
    if (phone.value.length > max) {
      phone.value = phone.value.slice(0, max); // 초과된 부분을 잘라냅니다
    }
  }
}
// 비밀번호 찾기
const sign_3 = document.querySelector(".sign_3");
if (sign_3) {
  const emailForm = document.querySelector(".sign_3 label:nth-of-type(1)");
  const emailId = document.querySelector("#email-id");
  const emailFormSpan = emailForm.querySelector("span");
  const sign_3_btn = document.querySelector(".sign_3_btn");
  let EMAIL_MESSAGE = "";
  let emailCheck = false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // email 검증
  emailId.addEventListener("input", (e) => {
    const { value } = e.target;
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

  // 완료버튼
  sign_3_btn.addEventListener("click", (e) => {
    e.preventDefault();
    completeBtn();
  });

  function completeBtn() {
    if (emailCheck) {
      document.querySelector(".popup").classList.add("active");
    }
  }

  // 이메일 및 비밀번호 모두 통과

  function isConfirm() {
    if (emailCheck) {
      sign_3_btn.classList.add("active");
      sign_3_btn.style.pointerEvents = "initial";
    } else {
      sign_3_btn.classList.remove("active");
      sign_3_btn.style.pointerEvents = "none";
    }
  }
}
