const getBasket = () => {
  return axios.get("/asset/dummy/basket.json").then((res) => res.data);
};
(async () => {
  const basket = await getBasket();

  const header = document.querySelector("header");
  const bottomTab = document.querySelector(".bottomTab");
  const footer = document.querySelector("footer");
  if (header) {
    header.innerHTML = `
    <div class="container">
 <div class="marquee">
 
 </div>
 <div class="header_wrap common_wrap">
     <a href="/" class="logo"><img src="/asset/imgs/icons/logo.svg" alt="logo"></a>
     <div class="menu_btn">
         <span>MENU</span>
     </div>
 </div>
 </div>`;
    const header_wrap = document.querySelector(".header_wrap");
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > 70) {
        header_wrap.style.backgroundColor = "#000000";
      } else {
        header_wrap.style.backgroundColor = "#00000070";
      }
    });
  }
  if (footer) {
    footer.innerHTML = `     <div class="container">
<div class="footer_wrap">
    <div class="footer_logo">
        <img src="/asset/imgs/icons/logo.svg" alt="footer-logo">
    </div>
    <ul class="footer_top">
        <li><span>(주)비어벨트코리아｜대표 손연식</span></li>
        <li><span>경기 고양시 덕양구 삼송로136번길 3, 2층</span></li>
        <li><span>Tel : 031-974-1960 | Fax : 02-371-1965</span></li>
        <li><span>Email : minsoung.son@ballbeer.co.kr</span></li>
    </ul>
    <ul class="footer_bottom">
        <li><span>사업자등록번호 214-81-33278</span></li>
        <li><span>통신판매업신고 제 2020-고양덕양구-2394 호 </span></li>
        <li><span>개인정보관리책임자 손민성</span></li>
        <li><span>전화번호 031-974-1960</span></li>
    </ul>
    <ul class="footer_policy">
        <li><a href="/">이용약관</a></li>
        <li><a href="/">개인정보처리방침</a></li>
    </ul>
    <p class='copyright'>Copyright ⓒ 2023 비어벨트코리아 All rights reserved.</p>
</div>
</div>`;
  }
  if (bottomTab) {
    bottomTab.innerHTML = `
    <div class="container">
        <div class="common_wrap">
            <ul>
                <li>
                    <a href="/">
                        <div class="bottomTab_img footer_img-home">
                            <img src="/asset/imgs/icons/Home.svg" alt="home">
                        </div>
                        <span>home</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div class="bottomTab_img footer_img-funding">
                            <img src="/asset/imgs/icons/heart.svg" alt="heart">
                        </div>
                        <span>펀딩</span>
                    </a>
                </li>
                <li class="bottomTab_center">
                    <a href="/event/roulette.html">
                        <div class="bottomTab_img footer_img-event">
                            <img src="/asset/imgs/icons/event.svg" alt="event">
                        </div>
                        <span>이벤트</span>
                    </a>
                </li>
                <li>
                    <a href="/basket/">
                    <div class="basket_count">${basket.length}</div>
                        <div class="bottomTab_img footer_img-basket">
                            <img src="/asset/imgs/icons/basket.svg" alt="basket">
                        </div>
                        <span">장바구니</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <div class="bottomTab_img footer_img-profile">
                            <img src="/asset/imgs/icons/Profile.svg" alt="Profile">
                        </div>
                        <span>마이페이지</span>
                        </a>
                </li>
            </ul>
        </div>
    </div>`;
  }

  const marquee = document.querySelector(".marquee")
    ? document.querySelector(".marquee")
    : null;
  const sale_marquee = document.querySelector(".sale_marquee")
    ? document.querySelector(".sale_marquee")
    : null;
  if (marquee) {
    marquee.innerHTML = `<div class="marquee_wrap">
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>FREE SHIPPING OVER 50,000</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>FREE SHIPPING OVER 50,000</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>FREE SHIPPING OVER 50,000</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    </div>`;
  }
  if (sale_marquee) {
    sale_marquee.innerHTML = `<div class="marquee_wrap">
<ul class="marquee-line">
    <li><img src="/asset/imgs/sale/hite.png" alt="planet"></li>
    <li><img src="/asset/imgs/sale/brand-logo.png" alt=""></li>
    <li><img src="/asset/imgs/sale/cass.png" alt="planet"></li>
</ul>
<ul class="marquee-line">
    <li><img src="/asset/imgs/sale/hite.png" alt="planet"></li>
    <li><img src="/asset/imgs/sale/brand-logo.png" alt=""></li>
    <li><img src="/asset/imgs/sale/cass.png" alt="planet"></li>
</ul>
<ul class="marquee-line">
    <li><img src="/asset/imgs/sale/hite.png" alt="planet"></li>
    <li><img src="/asset/imgs/sale/brand-logo.png" alt=""></li>
    <li><img src="/asset/imgs/sale/cass.png" alt="planet"></li>
</ul>
</div>`;
  }

  const menu = document.querySelector(".menu");
  if (menu) {
    menu.innerHTML = `

    <div class="container">
  <div class="menu_wrap">
      <div class="menu_top">
          <div></div>
          <div class="menu-logo">
              <img src="/asset/imgs/icons/menu-logo.svg" alt="menu-logo">
          </div>
          <div class="menu-close">
              <img src="/asset/imgs/icons/menu-close.svg" alt="menu-close">
          </div>
      </div>
      <form class="menu_search">
          <label for="search">
              <input type="text" id="search" placeholder="검색어를 입력해주세요!">
              <button type="submit"><img src="/asset/imgs/icons/search.svg" alt="search"/></button>
          </label>
      </form>
      <div class="menu_bottom">
          <ul class="menu_ul">
              <li class=""><a href="">HOME</a></li>
              <li><a href="">다이어트</a></li>
              <li><a href="">비건</a></li>
              <li><a href="">무알콜</a></li>
              <li><a href="">꽃향기</a></li>
              <li><a href="">프리미엄</a></li>
              <li><a href="">이벤트/기획전</a></li>
              <li><a href="">매거진</a></li>
          </ul> 
          <ul class="auth_ul">
              <li><a href="/auth/login.html">로그인</a></li>
              <li><a href="">브랜드스토리</a></li>
          </ul>
  
      </div>
  </div>
  </div>`;
    const menuBtn = document.querySelector(".menu_btn");
    const auth_ul = document.querySelector(".auth_ul");
    const body = document.querySelector("body");
    const menu_close = document.querySelector(".menu-close");
    const tl = gsap.timeline({ paused: true });
    tl.to(".menu_bottom li a", {
      yPercent: -100,
      stagger: 0.1,
    }).to(
      auth_ul,
      {
        yPercent: -30,
        opacity: 1,
        duration: 0.1,
      },
      ">-0.2"
    );
    menuBtn.addEventListener("click", () => {
      menu.classList.add("active");
      body.classList.add("active");
      tl.play();
    });
    menu_close.addEventListener("click", () => {
      setTimeout(() => {
        menu.classList.remove("active");
        body.classList.remove("active");
      }, 1250);
      tl.reverse();
    });
  }

  // back
  function backBtn() {
    window.history.back();
  }

  if (document.querySelector(".back")) {
    const back = document.querySelector(".back");
    back.addEventListener("click", backBtn);
  }
})();
