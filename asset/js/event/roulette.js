const btns = document.querySelectorAll(".spin-btn");
const chance = document.querySelector(".chance");

const items = [
  { name: "아이패드 10세대 64GB" },
  { name: "에어팟 3세대" },
  { name: " 굿즈 풀 패키지" },
  { name: "논알콜 맥주 1박스" },
  { name: "쿠폰 1,000원" },
  { name: " 쿠폰 5,000원" },
];

const popup = document.querySelector(".popup");

const gifts = items;

let userChance = 0;
let rolLength = gifts.length; // 해당 룰렛 콘텐츠 갯수
let setNum; // 랜덤숫자 담을 변수

const rRotate = (idx) => {
  let panel = document.querySelector(".rouletter-wacu");

  let deg = [];
  // 룰렛 각도 설정(rolLength = 6)
  for (let i = 0, len = rolLength; i < len; i++) {
    deg.push((360 / len) * i);
  }

  // 랜덤 생성된 숫자를 히든 인풋에 넣기
  let num = 0;
  setNum = idx;

  // 애니설정
  let ani = setInterval(() => {
    num++;
    panel.style.transform = "rotate(" + 360 * num + "deg)";
    btns.forEach((btn) => {
      btn.disabled = true; //button,input
      btn.style.pointerEvents = "none"; //a 태그
    });

    // 총 50에 다달했을때, 즉 마지막 바퀴를 돌고나서
    if (num === 50) {
      clearInterval(ani);
      panel.style.transform = `rotate(${-deg[setNum]}deg)`;
    }
  }, 50);
};

// 정해진 alert띄우기, custom modal등
const rLayerPopup = (num) => {
  alert(`축하드립니다. ${gifts[num].name}에 당첨되셨습니다.`);
};

// reset
const rReset = () => {
  setTimeout(() => {
    btns.forEach((btn) => {
      btn.disabled = false;
      btn.style.pointerEvents = "auto";
    });
    rLayerPopup(setNum);
  }, 5500);
};

//   기회
chance.innerHTML = userChance;

const conformBtnHandler = () => {
  const confirmBtn = document.querySelector(".confirm_btn");
  confirmBtn.addEventListener("click", () => {
    if (userChance <= 0 && token) {
      popup.classList.remove("active");
    } else {
      window.location.href = "/auth/login.html";
    }
  });
};
const popupHandler = () => {
  popup.classList.add("active");
  if (userChance <= 0 && token) {
    popup.querySelector(
      ".popup_wrap"
    ).innerHTML = `<h3>룰렛권을 모두 소진하셨네요!<br>
      다양한 이벤트로 룰렛권을 획득 하세요!</h3>
  <button type="button" class="confirm_btn"><span>확인</span></button>`;
  } else if (!token) {
    popup.querySelector(
      ".popup_wrap"
    ).innerHTML = `<h3>회원 가입이 필요한 서비스입니다.<br>
      회원가입 후 다양한 이벤트에 참여하기!</h3>
  <button type="button" class="confirm_btn"><span>3초만에 가입하고 이벤트 참여하기!</span></button>`;
  }
  conformBtnHandler();
};

function startRoulette(idx) {
  if (!token) {
    // 로그인 안되어있을때
    popupHandler();
    return;
  }

  if (userChance <= 0 && token) {
    // 기회가 0이하 + 로그인되어있을대
    popup.classList.add("active");
    popupHandler();
    return;
  }

  //   기회 감소 + 로그인되어있을대
  if (userChance > 0 && token) {
    userChance--;
    chance.innerHTML = userChance;
  }

  rRotate(idx);
  rReset();
}
