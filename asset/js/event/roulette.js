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
  const gifts = await items();

  let userChance = 0;
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
    console.log(deg);
    // 랜덤 생성된 숫자를 히든 인풋에 넣기
    let num = 0;
    setNum = rIndex();
    console.log(setNum);
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

  // 룰렛 이벤트 클릭 버튼

  btns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const token = Cookies.get("token");
      if (!token) {
        window.location.href = "/auth/login_mail.html";
        return;
      }

      if (userChance <= 0) {
        return alert("기회가없습니다.");
      }
      rRotate();
      rReset();
      //   기회 감소
      if (userChance > 0) {
        userChance--;
        chance.innerHTML = userChance;
      }
    });
  });
  // roulette default

  //   기회
  chance.innerHTML = userChance;
})();
