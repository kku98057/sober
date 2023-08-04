const token = Cookies.get("token");

const BASKETLENGTH = 0;

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
     <div class="header_right">
     ${
       token
         ? `    <a href="" class="loginBtn">로그아웃</a>`
         : `    <a href="" class="loginBtn">로그인</a>`
     }
     <div class="menu_btn">
         <span>MENU</span>
     </div>
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
                    <a href="/">
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
                    <div class="basket_count">${BASKETLENGTH}</div>
                        <div class="bottomTab_img footer_img-basket">
                            <img src="/asset/imgs/icons/basket.svg" alt="basket">
                        </div>
                        <span">장바구니</span>
                    </a>
                </li>
                <li>
                    <a href="/">
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

const marquee = document.querySelector(".marquee");

const sale_marquee = document.querySelector(".sale_marquee");

if (marquee) {
  marquee.innerHTML = `<div class="marquee_wrap">
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>현재 5만원 이상 무료배송</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>오픈이벤트 웰컴 쿠폰팩 9,000원 증정!</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>룰렛 1회권 증정!</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    </div>`;
}
if (sale_marquee) {
  sale_marquee.innerHTML = `<div class="marquee_wrap marquee_wrap_2">
<ul class="marquee-line">
    <li><img src="/asset/imgs/banners/b_1.png" alt="b_1"></li>
    <li><img src="/asset/imgs/banners/b_2.png" alt="b_2"></li>
    <li><img src="/asset/imgs/banners/b_3.png" alt="b_3"></li>
    <li><img src="/asset/imgs/banners/b_4.png" alt="b_4"></li>
    <li><img src="/asset/imgs/banners/b_5.png" alt="b_5"></li>
    <li><img src="/asset/imgs/banners/b_6.png" alt="b_6"></li>
    <li><img src="/asset/imgs/banners/b_7.png" alt="b_7"></li>
    <li><img src="/asset/imgs/banners/b_8.png" alt="b_8"></li>
    <li><img src="/asset/imgs/banners/b_9.png" alt="b_9"></li>
    <li><img src="/asset/imgs/banners/b_10.png" alt="b_10"></li>
    <li><img src="/asset/imgs/banners/b_11.png" alt="b_11"></li>
</ul>
<ul class="marquee-line">
    <li><img src="/asset/imgs/banners/b_1.png" alt="b_1"></li>
    <li><img src="/asset/imgs/banners/b_2.png" alt="b_2"></li>
    <li><img src="/asset/imgs/banners/b_3.png" alt="b_3"></li>
    <li><img src="/asset/imgs/banners/b_4.png" alt="b_4"></li>
    <li><img src="/asset/imgs/banners/b_5.png" alt="b_5"></li>
    <li><img src="/asset/imgs/banners/b_6.png" alt="b_6"></li>
    <li><img src="/asset/imgs/banners/b_7.png" alt="b_7"></li>
    <li><img src="/asset/imgs/banners/b_8.png" alt="b_8"></li>
    <li><img src="/asset/imgs/banners/b_9.png" alt="b_9"></li>
    <li><img src="/asset/imgs/banners/b_10.png" alt="b_10"></li>
    <li><img src="/asset/imgs/banners/b_11.png" alt="b_11"></li>
</ul>
<ul class="marquee-line">
    <li><img src="/asset/imgs/banners/b_1.png" alt="b_1"></li>
    <li><img src="/asset/imgs/banners/b_2.png" alt="b_2"></li>
    <li><img src="/asset/imgs/banners/b_3.png" alt="b_3"></li>
    <li><img src="/asset/imgs/banners/b_4.png" alt="b_4"></li>
    <li><img src="/asset/imgs/banners/b_5.png" alt="b_5"></li>
    <li><img src="/asset/imgs/banners/b_6.png" alt="b_6"></li>
    <li><img src="/asset/imgs/banners/b_7.png" alt="b_7"></li>
    <li><img src="/asset/imgs/banners/b_8.png" alt="b_8"></li>
    <li><img src="/asset/imgs/banners/b_9.png" alt="b_9"></li>
    <li><img src="/asset/imgs/banners/b_10.png" alt="b_10"></li>
    <li><img src="/asset/imgs/banners/b_11.png" alt="b_11"></li>
</ul>

</div>`;
}

const menuTop = document.querySelector(".menuTop");
if (menuTop) {
  menuTop.innerHTML = `
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
              <button type="submit"><img src="/asset/imgs/icons/search.svg" alt="search"></button>
          </label>
      </form>
      <div class="menu_bottom">
          <ul class="menu_ul">
              <li class=""><a href="/">HOME</a></li>
              <li><a href="">저칼로리</a></li>
              <li><a href="">비건</a></li>
              <li><a href="">논알콜</a></li>
              <li><a href="">프리미엄</a></li>
              <li><a href="">과실</a></li>
              <li><a href="#">이벤트/기획전</a></li>
              <li><a href="#">매거진</a></li>
          </ul> 
          <ul class="auth_ul">
          ${
            token
              ? ` <li>
                <a href="">로그아웃</a>
              </li>`
              : ` <li>
                <a href="/auth/login.html">로그인</a>
              </li>`
          }
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
    menuTop.classList.add("active");
    body.classList.add("active");
    tl.play();
  });
  menu_close.addEventListener("click", () => {
    setTimeout(() => {
      menuTop.classList.remove("active");
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

// topBtn
const topBtn = document.querySelector(".topBtn");
if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  });
}

// wrap
const bodydd = document.querySelector("body");
const leftDiv = document.createElement("div");
const rightDiv = document.createElement("div");
leftDiv.className = "left-wrap";
rightDiv.className = "right-wrap";
bodydd.prepend(leftDiv);
bodydd.append(rightDiv);

if (leftDiv) {
  leftDiv.innerHTML = `<div class="wrap_inner left-inner">
  <div class="left-wrap-img">
      <img src="/asset/imgs/char/wrap_char.svg" alt="wrap_char">
  </div>
</div>`;
}
if (rightDiv) {
  rightDiv.innerHTML = `<div class="wrap_inner right-inner">
  <div class="wrap_video">
      <video autoplay playsinline muted loop poster="/asset/imgs/space-poster.jpg">
          <source src="/main.mp4">
      </video>
  </div>
  <div class="wrap_data">
      <div class="wrap_logo">
          <img src="/asset/imgs/icons/logo-color.png" alt="logo-color">
      </div>
      <p>국내에 있는 논알콜은 더욱 저렴하게<br>
          국내에 없는 논알콜은 더욱 쉽게 구매하자!
      </p>
      <div class="wrap_contents">
          <span>지금 바로 쏘버와 함께 논알콜 여행을 떠나보세요!</span>
          <div class="wrap_content">
              <a href="/asset/imgs/qr.png" download class="qr">
                  <img src="/asset/imgs/qr.png" alt="qr">
                  <span>QR코드 다운로드</span>
              </a>
              <div class="app">
                  <a href="" class="playStore_btn"></a>
                  <a href="" class="appStore_btn"></a>
                  <span>앱스토어 다운로드</span>
              </div>
          </div>
      </div>
  </div>
</div>`;
}
