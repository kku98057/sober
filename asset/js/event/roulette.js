document.querySelector(".game").innerHTML = `
<div class="panel">
    <div class="pin"><img src="/asset/imgs/pin.png" alt="pin"/></div>
    <div class="game-bg">
        <div class="rouletter-wacu">
           <img src="/asset/imgs/roulette.png" alt="roulette"/>
        </div>
    </div>
    <div class="rouletter-arrow"></div>
    <button type="button" class="startBtn2 spin-btn"><span>START!</span></button>
</div>
`;
const btns = document.querySelectorAll(".spin-btn");
const chance = document.querySelector(".chance");

const items = async () => {
  return axios.get("/asset/dummy/gift2.json").then((res) => res.data);
};

(async () => {
  const popup = document.querySelector(".popup");
  const popup2 = document.querySelector(".popup2");
  const popup_wrap = popup2.querySelector(".popup_wrap");
  const token = 1;

  const gifts = await items();

  let userChance = 3;
  let rolLength = gifts.length; // 해당 룰렛 콘텐츠 갯수
  let setNum; // 랜덤숫자 담을 변수

  //인덱스부여
  const rIndex = () => {
    let totalProbability = gifts.reduce(
      (total, item) => total + item.probability,
      0
    );
    let randomValue = Math.random() * totalProbability;
    let accumulatedProbability = 0;

    for (let i = 0; i < gifts.length; i++) {
      accumulatedProbability += gifts[i].probability;
      if (randomValue <= accumulatedProbability) {
        return i;
      }
    }

    return gifts.length - 1;
  };

  const rRotate = () => {
    let panel = document.querySelector(".rouletter-wacu");

    let deg = [];
    // 룰렛 각도 설정(rolLength = 6)
    for (let i = 0, len = rolLength; i < len; i++) {
      deg.push((360 / len) * i);
    }

    // 랜덤 생성된 숫자를 히든 인풋에 넣기
    let num = 0;
    setNum = rIndex();

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
    if (num === 0) {
      popup_wrap.innerHTML = `
      <div class="event_img">
                      <img src="/asset/imgs/airpot_max.png" alt="airpot_max">
                  </div>
                  <h3 class="popup2_name">에어팟맥스 당첨!</h3>
                  <p class="popup2_des">(자세한 사항은 페이지 하단을 참조해주세요)</p>
                  <div class="event_btns">
                      <span class="popup2_ok closeBtn">확인</span>
                  </div>
                
      `;
    } else if (num === 1) {
      popup_wrap.innerHTML = `
      <div class="event_img">
                      <img src="/asset/imgs/airpot_3.png" alt="airpot_3">
                  </div>
                  <h3 class="popup2_name">에어팟 3세대 64GB 당첨!</h3>
                  <p class="popup2_des">(자세한 사항은 페이지 하단을 참조해주세요)</p>
                  <div class="event_btns">
                      <span class="popup2_ok closeBtn">확인</span>
                  </div>
              
      `;
    } else if (num === 2) {
      popup_wrap.innerHTML = `
    <div class="event_img">
                    <img src="/asset/imgs/goods.png" alt="goods">
                </div>
                <h3 class="popup2_name">쏘버 굿즈 풀 팩 당첨!</h3>
                <p class="popup2_des">(자세한 사항은 페이지 하단을 참조해주세요)</p>
                <div class="event_btns">
                    <span class="popup2_ok closeBtn">확인</span>
                </div>
              
    `;
    } else if (num === 3) {
      popup_wrap.innerHTML = `
    <div class="event_img">
                    <img src="/asset/imgs/beer.png" alt="beer">
                </div>
                <h3 class="popup2_name">논알콜 맥주 1BOX 당첨!</h3>
                <p class="popup2_des">(자세한 사항은 페이지 하단을 참조해주세요)</p>
                <div class="event_btns">
                    <span class="popup2_ok closeBtn">확인</span>
                </div>
          
    `;
    } else if (num === 4) {
      popup_wrap.innerHTML = `
    <div class="event_img">
                    <img src="/asset/imgs/5000coupon.png" alt="5000coupon">
                </div>
                <h3 class="popup2_name">5천원 쿠폰 당첨!</h3>
                <p class="popup2_des">(친구 초대하고 더 좋은 경품에 도전하세요!)</p>
            
                <div class="event_btns2">
                    <span class="popup2_roulette closeBtn">룰렛 돌리기</span>
                    <a class="popup2_move" href="/coupon/coupon.html">쿠폰함 가기</a>
                </div>
    `;
    } else if (num === 5) {
      popup_wrap.innerHTML = `
    <div class="event_img">
                    <img src="/asset/imgs/1000coupon.png" alt="1000coupon">
                </div>
                <h3 class="popup2_name">1천원 쿠폰 당첨!</h3>
                <p class="popup2_des">(친구 초대하고 더 좋은 경품에 도전하세요!)</p>
          
                <div class="event_btns2">
                    <span class="popup2_roulette closeBtn">룰렛 돌리기</span>
                    <a class="popup2_move" href="/coupon/coupon.html">쿠폰함 가기</a>
                </div>
    `;
    }
    popup2.classList.add("active");
    closeBtnHandler();
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

  // 룰렛 이벤트 클릭 버튼

  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
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

      rRotate();
      rReset();
    });
  });
  // roulette default

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

  // 팝업2 버튼
  const closeBtnHandler = () => {
    const closeBtns = document.querySelectorAll(".closeBtn");
    closeBtns.forEach((closeBtn) => {
      closeBtn.addEventListener("click", () => {
        popup2.classList.remove("active");
      });
    });
  };
})();
