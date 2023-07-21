const header = document.querySelector("header");
const footer = document.querySelector("footer");
header.innerHTML = `    <div class="container">
<div class="marquee">

</div>
<div class="header_wrap common_wrap">
    <div class="logo"><img src="/asset/imgs/icons/logo.svg" alt="logo"></div>
    <div class="menu_btn">
        <span>MENU</span>
    </div>
</div>
</div>`;

footer.innerHTML = `   <div class="container">
<div class="common_wrap">
    <ul>
        <li>
            <div class="footer_img footer_img-home">
                <img src="/asset/imgs/icons/Home.svg" alt="home">
            </div>
            <span>home</span>
        </li>
        <li>
            <div class="footer_img footer_img-funding">
                <img src="/asset/imgs/icons/heart.svg" alt="heart">
            </div>
            <span>펀딩</span>
        </li>
        <li class="footer_center">
            <div class="footer_img footer_img-game">
                <img src="/asset/imgs/icons/game.svg" alt="game">
            </div>
            <span>game</span>
        </li>
        <li>
            <div class="footer_img footer_img-basket">
                <img src="/asset/imgs/icons/basket.svg" alt="basket">
            </div>
            <span>장바구니</span>
        </li>
        <li>
            <div class="footer_img footer_img-profile">
                <img src="/asset/imgs/icons/Profile.svg" alt="Profile">
            </div>
            <span>마이페이지</span>
        </li>

    </ul>
</div>
</div>`;

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
        <li><span>FREE SHIPPING OVER 20,000</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>FREE SHIPPING OVER 20,000</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
    </ul>
    <ul class="marquee-line">
        <li><span>ALCOHOL FREE</span></li>
        <li><img src="/asset/imgs/icons/planet.svg" alt="planet"></li>
        <li><span>FREE SHIPPING OVER 20,000</span></li>
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
menu.innerHTML = `<div class="container">
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
    <div class="menu_bottom">
        <ul>
            <li class="active"><a href="">HOME</a></li>
            <li><a href="">다이어트</a></li>
            <li><a href="">비건</a></li>
            <li><a href="">무알콜</a></li>
            <li><a href="">꽃향기</a></li>
            <li><a href="">프리미엄</a></li>
            <li><a href="">이벤트/기획전</a></li>
            <li><a href="">매거진</a></li>
        </ul>
    </div>
</div>
</div>`;
const menuBtn = document.querySelector(".menu_btn");
const menu_close = document.querySelector(".menu-close");
const tl = gsap.timeline({ paused: true });
tl.to(".menu_bottom li a", {
  yPercent: -100,

  stagger: 0.1,
});
menuBtn.addEventListener("click", () => {
  menu.classList.add("active");
  tl.play();
});
menu_close.addEventListener("click", () => {
  setTimeout(() => {
    menu.classList.remove("active");
  }, 1000);
  tl.reverse();
});
