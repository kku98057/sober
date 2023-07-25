//동의부분
let MESSAGE = "";
const sign_1 = document.querySelector(".sign_1");
const sign_1Btn = document.querySelector(".sign_1_btn");
if (sign_1) {
  let allCheckbox = document.querySelector("#all");
  let otherCheckboxes = document.querySelectorAll(
    "input[type=checkbox]:not(#all)"
  );

  allCheckbox.addEventListener("input", function (e) {
    for (let i = 0; i < otherCheckboxes.length; i++) {
      otherCheckboxes[i].checked = e.target.checked;
    }
  });

  for (let i = 0; i < otherCheckboxes.length; i++) {
    otherCheckboxes[i].addEventListener("input", function (e) {
      let allChecked = true;
      for (let i = 0; i < otherCheckboxes.length; i++) {
        if (!otherCheckboxes[i].checked) {
          allChecked = false;
          break;
        }
      }
      allCheckbox.checked = allChecked;
    });
  }

  let requiredCheckboxes = document.querySelectorAll(".requiredCheckbox");
  sign_1.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼의 기본 제출 동작을 중단

    let isChecked = Array.prototype.slice
      .call(requiredCheckboxes)
      .every((x) => x.checked);

    if (!isChecked) {
      alert("모든 필수 항목을 체크해 주세요.");
    } else {
      window.location.href = "/auth/signup/phone.html"; // 페이지 이동
    }
  });
  sign_1.addEventListener("input", () => {
    let isChecked = Array.prototype.slice
      .call(requiredCheckboxes)
      .every((x) => x.checked);

    if (!isChecked) {
      sign_1Btn.classList.remove("active");
    } else {
      sign_1Btn.classList.add("active");
    }
  });
}
// 휴대폰 인증
const sign_2 = document.querySelector(".sign_2");
if (sign_2) {
  const phone = document.querySelector("#phone");
  const numb = document.querySelector("#numb");
  const phoneBtn = document.querySelector(".phone_btn");
  const checkBtn = document.querySelector(".check_btn");
  const sign_2_btn = document.querySelector(".sign_2_btn");
  let phoneAuthorization = false;
  phone.addEventListener("input", (e) => {
    // 최대길이
    maxLength(11);

    const { value } = e.target;
    if (value.length === 11) {
      phoneBtn.classList.add("active");
      phoneAuthorization = true;
      authorizationCheck();
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
      alaram("인증번호를 입력해주세요.");
      document.querySelector(".sign_2 label:nth-child(2)").style.display =
        "block";
    } else {
      alaram("휴대폰 번호를 입력해주세요.");
    }
  });

  // 인증번호 확인 버튼
  function authorizationCheck() {
    checkBtn.addEventListener("click", () => {
      // 인증번호 확인함수
      if (authorizationNumber !== null) {
        alert("인증 완료되었습니다.");
        checkBtn.style.pointerEvents = "none";
        sign2Checking = true;
        phone.setAttribute("readonly", true);
        numb.setAttribute("readonly", true);
        phoneBtn.style.pointerEvents = "none";
        sign_2_btn.classList.add("active");
      } else {
        alert("인증번호를 입력해주세요.");
      }
    });
  }
  function sign2Next() {
    sign_2_btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (sign2Checking) {
        e.preventDefault();
        window.location.href = "/auth/signup/mail.html";
      } else {
        alert("휴대폰 인증을 먼저 받아주세요.");
      }
    });
  }

  sign2Next();
}

// 이메일 인증
const sign_3 = document.querySelector(".sign_3");
if (sign_3) {
  const emailForm = document.querySelector(".sign_3 label:nth-of-type(1)");
  const pwForm1 = document.querySelector(".sign_3 label:nth-of-type(2)");
  const passwordCheck1 = document.querySelector("#password-check1");
  const passwordCheck2 = document.querySelector("#password-check2");
  const emailId = document.querySelector("#email-id");
  const emailFormSpan = emailForm.querySelector("span");
  const passwordCheck2Span = pwForm1.querySelector("span");
  const sign_3_btn = document.querySelector(".sign_3_btn");
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
  });
  // 비밀번호 체크

  function isPasswordMatch() {
    // 비밀번호가 정규식에 일치하는지 확인합니다.
    const isValid =
      PwRegex.test(passwordCheck1.value) || PwRegex.test(passwordCheck2.value);

    if (!isValid) {
      MESSAGE = "비밀번호가 형식에 맞지 않습니다.";
      return;
    } else {
      sign_3_btn.style.pointerEvents = "initial";
    }
    // 비밀번호가 서로 일치하는지 확인합니다.
    if (passwordCheck1.value === passwordCheck2.value) {
      pwComplete = true;
      sign_3_btn.classList.add("active");
    } else {
      MESSAGE = "비밀번호가 일치하지 않습니다.";
      pwComplete = false;
      sign_3_btn.classList.remove("active");
    }
  }

  passwordCheck1.addEventListener("input", isPasswordMatch);
  passwordCheck2.addEventListener("input", isPasswordMatch);

  // 완료버튼
  sign_3_btn.addEventListener("click", (e) => {
    e.preventDefault();
    completeBtn();
  });
  function completeBtn() {
    if (pwComplete && emailCheck && emailCheck) {
      window.location.href = "/auth/signup/complete.html";
    }
  }
}
function alaram(message) {
  return alert(message);
}
// 최대길이 함수
function maxLength(max) {
  if (phone.value.length > max) {
    phone.value = phone.value.slice(0, max); // 초과된 부분을 잘라냅니다
  }
}
