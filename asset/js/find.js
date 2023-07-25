let MESSAGE = "";
// 비밀번호 찾기
const sign_2 = document.querySelector(".sign_2");
if (sign_2) {
  const phone = document.querySelector("#phone");
  const numb = document.querySelector("#numb");
  const phoneBtn = document.querySelector(".phone_btn");
  const checkBtn = document.querySelector(".check_btn");
  const findPwBtn = document.querySelector(".findPwBtn");
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
      alert("인증번호를 입력해주세요.");
      document.querySelector(".sign_2 label:nth-child(2)").style.display =
        "block";
    } else {
      alert("휴대폰 번호를 입력해주세요.");
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
        findPwBtn.classList.add("active");
      } else {
        alert("인증번호를 입력해주세요.");
      }
    });
  }
  function sign2Next() {
    findPwBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (sign2Checking) {
        window.location.href = "/auth/find/newPw.html";
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
//비밀번호 재설정
const sign_3 = document.querySelector(".sign_3");
if (sign_3) {
  const pwForm1 = document.querySelector(".sign_3 label:nth-of-type(1)");
  const passwordCheck1 = document.querySelector("#password-check1");
  const passwordCheck2 = document.querySelector("#password-check2");

  const passwordCheck2Span = pwForm1.querySelector("span");
  const sign_3_btn = document.querySelector(".sign_3_btn");
  const PwRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;

  let pwComplete = false;
  let emailCheck = false;

  // 비밀번호 체크

  function isPasswordMatch() {
    // 비밀번호가 정규식에 일치하는지 확인
    const isValid =
      PwRegex.test(passwordCheck1.value) || PwRegex.test(passwordCheck2.value);

    if (!isValid) {
      MESSAGE = "비밀번호가 형식에 맞지 않습니다.";
      return;
    } else {
      sign_3_btn.style.pointerEvents = "initial";
    }
    // 비밀번호가 서로 일치하는지 확인
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
    if (pwComplete) {
      // 새로운 비밀번호 입력 후
      alert("비밀번호가 바뀌었습니다.");
      window.location.href = "/auth/login_mail.html";
    } else {
      alert(MESSAGE);
    }
  }
}
