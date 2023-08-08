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
const popup3 = document.querySelector(".popup3");

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
if (popup3) {
  timerInterval = setInterval(updateTimer, 1000);
}
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

// interations
const titleAnimation = () => {
  ScrollTrigger.saveStyles(".title-animation, .review_title");
  ScrollTrigger.matchMedia({
    "(min-width:421px)": () => {
      const titles = gsap.utils.toArray(".title-animation, .review_title");
      titles.forEach((title) => {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: title,
              start: "0 70%",
              toggleActions: "play reverse play reverse",
            },
          })
          .from(title.querySelector(".common_title-line"), {
            opacity: 0,
            yPercent: 25,
          })
          .from(
            title.querySelector(".common_title-fill"),
            { opacity: 0, yPercent: 25 },
            ">-0.25"
          )
          .from(
            title.querySelector(".common_title-sub"),
            { yPercent: 50, opacity: 0 },
            ">-0.25"
          );
      });
    },
    "(max-width:420px)": () => {
      const titles = gsap.utils.toArray(".title-animation");
      titles.forEach((title) => {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: title,
              start: "0 70%",
              toggleActions: "play reverse play reverse",
            },
          })
          .from(title.querySelector(".common_title-line"), {
            opacity: 0,
            yPercent: 25,
          })
          .from(
            title.querySelector(".common_title-fill"),
            { opacity: 0, yPercent: 25 },
            ">-0.25"
          )
          .from(
            title.querySelector(".common_title-sub"),
            { yPercent: 50, opacity: 0 },
            ">-0.25"
          );
      });
    },
  });
};
const saleAnimation = () => {
  ScrollTrigger.saveStyles(".sale_marquee, .sale .sale_slides");
  ScrollTrigger.matchMedia({
    all: () => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".sale",
            toggleActions: "play reverse play reverse",
            start: "0 70%",
          },
        })

        .from(".sale_marquee", {
          opacity: 0,
        })
        .from(
          ".sale .sale_slides",
          {
            opacity: 0,
          },
          ">-0.75"
        );
    },
  });
};
const weeklyAnimation = () => {
  ScrollTrigger.saveStyles(".weekly_list");
  ScrollTrigger.matchMedia({
    all: () => {
      const lists = gsap.utils.toArray(".weekly_list");
      lists.forEach((list) => {
        const tl = gsap
          .timeline({
            scrollTrigger: {
              trigger: list,
              start: "0 70%",
              toggleActions: "play reverse play reverse",
            },
          })
          .from(list, {
            opacity: 0,
            duration: 1,
            ease: "power4.inout",
          });
      });
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".best_btn",
            start: "0 70%",
            toggleActions: "play reverse play reverse",
          },
        })
        .from(".best_btn", {
          opacity: 0,
          duration: 1,
          ease: "power4.inout",
        });
    },
  });
};
const reviewAnimation = () => {
  ScrollTrigger.matchMedia({
    "(min-width:421px)": () => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".review_wrap",
            start: "0 70%",
            toggleActions: "play reverse play reverse",
          },
        })
        .from(".review_slider", {
          opacity: 0,
          duration: 1,
          ease: "power4.inout",
        });
    },
  });
};
// transitions
const transitionsAnimation = () => {
  class CanvasAni {
    constructor(canvas, ctx, total, imgSrc) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.frames = {
        frame: 0,
      };
      this.total = total;
      this.imgSrc = imgSrc;
      this.imgs = [];

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // 이미지 배열에 추가
      for (let i = 0; i < total; i++) {
        const img = new Image();
        img.src = this.imgSrc(i);
        this.imgs.push(img);
      }

      this.load();

      window.addEventListener("resize", () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.render();
      });
    }
    animate() {
      ScrollTrigger.matchMedia({
        "(max-width:420px)": () => {
          const tl = gsap
            .timeline({
              scrollTrigger: {
                trigger: "article",
                scrub: 1,
                pin: true,
                end: `+=${window.innerWidth * 10}`,
              },
            })
            .from(".transitions", {
              opacity: 0,
            })
            .to(
              this.frames,
              {
                duration: 10,
                onUpdate: () => {
                  this.render();
                },
                frame: this.total - 1,
                snap: "frame",
                ease: "none",
              },
              1
            )
            .to(".transitions", {
              opacity: 0,
            })
            .from(".review", {
              opacity: 0,
            })
            .to({}, {});
        },
      });
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    load() {
      this.imgs[0].addEventListener("load", () => {
        this.render();
      });
    }
    render() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(
        this.imgs[this.frames.frame],
        window.innerWidth <= 600
          ? window.innerWidth / 2 - this.canvas.width
          : 0,
        0,
        window.innerWidth <= 600 ? this.canvas.width * 2 : this.canvas.width,
        this.canvas.height
      );
    }
  }

  const can = document.querySelector("#imgVid");

  const ctx = can.getContext("2d");

  const imgSrc = (index) => `/asset/imgs/frames/${(index + 1).toString()}.jpg`;

  const canAni1 = new CanvasAni(can, ctx, 148, imgSrc);

  canAni1.animate();
};
const patternAnimation = () => {
  ScrollTrigger.matchMedia({
    all: () => {
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: ".pattern_img",
            start: "0 70%",
            toggleActions: "play reverse play reverse",
          },
        })
        .from(".pattern_img", {
          opacity: 0,
          duration: 1,
          ease: "power4.inout",
        })
        .from(
          ".pattern_btn",
          {
            opacity: 0,
            duration: 1,
            ease: "power4.inout",
          },
          ">-0.75"
        );
    },
  });
};
titleAnimation();
saleAnimation();
weeklyAnimation();
reviewAnimation();
transitionsAnimation();
patternAnimation();
