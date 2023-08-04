const marketSwiper = new Swiper(".sale_slider", {
  effect: "coverflow", // 커버플로우 효과 사용
  spaceBetween: 30,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    // depth: 100,
    slideShadows: false,
  },
  pagination: {
    el: ".sale_pagination",
    bulletActiveClass: "active",
    bulletClass: "sale_bullet",
    clickable: true,
  },
  navigation: {
    prevEl: ".sale_prev",
    nextEl: ".sale_next",
  },
});
const slider_items = document.querySelectorAll(".slide");
const planet_name = document.querySelectorAll(".planet-name");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const body = document.querySelector("body");
const names = ["논알콜", "저칼로리", "비건", "과실", "프리미엄", "아이템"];

let selected_item = 0;

function setItemSlider(index) {
  // 선택된 슬라이드의 idx값
  selected_item = index;

  slider_items.forEach((item, idx) => {
    // 슬라이드 번호 - 선택된 슬라이드 번호
    let offset = idx - selected_item;
    if (offset < 0) offset += slider_items.length;
    for (let i = 0; i < slider_items.length; i++) {
      item.classList.remove(`item-${i + 1}`);
      item.classList.add(`item-${offset + 1}`);
    }
  });
}
function planetName() {
  planet_name.forEach((name, idx) => {
    name.innerHTML = `${
      idx === 0
        ? `${names[idx]} <br> <span>(전체상품보기)</span>`
        : `${names[idx]} `
    }`;

    if (selected_item === idx) {
      planet_name[idx].classList.add("active");
    } else {
      planet_name[idx].classList.remove("active");
    }
  });
}
planetName();
slider_items.forEach((item, idx) => {
  item.addEventListener("click", () => {
    setItemSlider(idx);
  });
});
next.addEventListener("click", () => {
  selected_item = selected_item < slider_items.length - 1 ? ++selected_item : 0;
  setItemSlider(selected_item);
  planetName();
});
prev.addEventListener("click", () => {
  selected_item =
    selected_item >= 1 ? --selected_item : slider_items.length - 1;
  setItemSlider(selected_item);
  console.log(selected_item);
  planetName();
});

// popup
// popup
const pops = document.querySelectorAll(".pop");

if (pops) {
  pops.forEach((pop, idx) => {
    const timeCookies = Cookies.get(`pop-${idx}`);
    if (timeCookies) {
      body.classList.remove("active");
      const expiryDate = new Date(timeCookies);
      if (expiryDate > new Date()) {
        pop.classList.add("hidden");
        pop.classList.remove("visible");
      }
    }

    const close = pop.querySelector(".close");
    close.addEventListener("click", () => {
      pop.classList.add("hidden");
      pop.classList.remove("visible");

      // let isVisible = false;
      // pops.forEach((pop) => {
      //   if (pop.classList.contains("visible")) {
      //     isVisible = true;
      //   }
      // });

      // if (isVisible) {
      //   document.body.classList.add("active");
      // } else {
      //   document.body.classList.remove("active");
      // }
    });
    // 더이상 보지않기 체크
    const today = pop.querySelector(".today label input");
    today.addEventListener("click", () => {
      const checked = today.checked;

      if (checked) {
        let expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 24); // 24시간 후로 만료 시간 설정
        Cookies.set(`pop-${idx}`, expiryDate.toISOString(), { expires: 1 }); // 쿠키 만료 시간 설정
      } else {
        Cookies.remove(`pop-${idx}`);
      }
    });
  });
}

gsap.registerPlugin(ScrollTrigger);
const slides = document.querySelectorAll(".slide");
let height = document
  .querySelector(".intro_overlay")
  .getBoundingClientRect().height;
ScrollTrigger.saveStyles(".intro_overlay");

ScrollTrigger.matchMedia({
  "(min-width:421px)": () => {
    slides.forEach((slide, idx) => {
      slide.classList.add(`item-${idx + 1}`);
    });
  },
  "(max-width:420px)": () => {
    gsap.set(
      ".s1_contents",
      {
        zIndex: 1,
      },
      1
    );

    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero",
          pin: true,
          scrub: 0.5,
          end: "+=3000",
        },
      })
      .to(
        {},
        {
          onComplete: () => {
            slides.forEach((slide, idx) => {
              slide.classList.add(`item-${idx + 1}`);
            });
          },
          onReverseComplete: () => {
            slides.forEach((slide, idx) => {
              slide.classList.remove(`item-${idx + 1}`);
            });
          },
        },
        0
      )
      .to(
        ".overlay_1",
        {
          top: -height,
          duration: 2,
          ease: "none",
        },
        0
      )
      .to(
        ".overlay_2",
        {
          bottom: -height,
          duration: 2,
          ease: "none",
        },
        0
      )
      .to(
        ".intro_overlay",
        {
          scale: 0,
          ease: "none",
          duration: 2,
        },
        0
      )
      .to(
        " .video",
        {
          opacity: 0,
          duration: 0.2,
        },
        1
      );

    ScrollTrigger.refresh();
    const loading = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero",
        },
      })

      .from(
        ".overlay_1",
        {
          translateY: "50px",
          duration: 1,
        },
        0
      )
      .from(
        ".overlay_2",
        {
          translateY: "-50px",
          duration: 1,
        },
        0
      )
      .to({}, {});
  },
});

// timer
let timerInterval;
function updateTimer() {
  const future = new Date("2023/07/26 10:07:59");
  const now = new Date();

  const diff = future - now;

  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const h = totalHours.toString().padStart(2, "0");
  const m = mins.toString().padStart(2, "0");
  const s = secs.toString().padStart(2, "0");

  if (diff <= 0) {
    clearInterval(timerInterval);
    document.querySelector(
      ".timer"
    ).innerHTML = `  <span class="hours">00</span>:<span class="minute">00</span>:<span class="second">00</span>`;
    return;
  }

  document.querySelector(
    ".timer"
  ).innerHTML = `  <span class="hours">${h}</span>:<span class="minute">${m}</span>:<span class="second">${s}</span>`;
}

timerInterval = setInterval(updateTimer, 1000);
// review
const getReview = async () => {
  return axios.get("/asset/dummy/review.json").then((res) => res.data);
};
(async () => {
  const review = await getReview();

  const review_contents = document.querySelector(".review_contents");
  let html = "";

  for (let i = 0; i < review.length; i += 2) {
    let reviewItem1 = review[i];
    let reviewItem2 = review[i + 1] ? review[i + 1] : null;

    html += `
    <li class="swiper-slide review_slide">
      <div class="review_inner">
          <div class="review_top">
              <div class="review_img">
                  <img src="${reviewItem1.image}" alt=${reviewItem1.name}>
              </div>
              <h3>${reviewItem1.name}</h3>
          </div>
          <div class="review_center">
           
              <ul class="review_star">
              ${[...Array(reviewItem1.score)]
                .map(() => {
                  return `<li><img src="/asset/imgs/icons/review_star.svg" alt="review_star"></li>`;
                })
                .join("")}
              </ul>
              <div class="review_date">
                  <span>${reviewItem1.date}</span>
              </div>
          </div>
          <ul class="review_bottom">
          ${reviewItem1.tag
            .map((list) => {
              return `    <li>${list}</li>`;
            })
            .join("")}
          </ul>
      </div>
      ${
        reviewItem2
          ? `
      <div class="review_inner">
          <div class="review_top">
              <div class="review_img">
                  <img src="${reviewItem2.image}" alt=${reviewItem2.name}>
              </div>
              <h3>${reviewItem2.name}</h3>
          </div>
          <div class="review_center">
              <ul class="review_star">
              ${[...Array(reviewItem2.score)]
                .map(() => {
                  return `<li><img src="/asset/imgs/icons/review_star.svg" alt="review_star"></li>`;
                })
                .join("")}
              </ul>
              <div class="review_date">
                  <span>${reviewItem2.date}</span>
              </div>
          </div>
          <ul class="review_bottom">
          ${reviewItem2.tag
            .map((list) => {
              return `    <li>${list}</li>`;
            })
            .join("")}
          </ul>
      </div>`
          : ""
      }
    
    </li>`;
  }

  review_contents.innerHTML = html;
  const reviewSlider = new Swiper(".review_slider", {
    spaceBetween: 10,
    slidesOffsetBefore: 20,
    slidesOffsetAfter: 20,
    slidesPerView: 1.1,
  });
})();
