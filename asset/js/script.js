const marketSwiper = new Swiper(".sale_slider", {
  // effect: "coverflow", // 커버플로우 효과 사용
  // coverflowEffect: {
  //   rotate: 0,
  //   stretch: 0,
  //   // depth: 100,
  //   slideShadows: false,
  // },
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

  // on: {
  //   slideChange: (e, a) => {
  //     const nubs = document.querySelectorAll(".sale_nub");
  //     nubs.forEach((nub)=>{
  //       nub.innerHTML = `${e.activeIndex}/${e.slides.length}`;
  //     })

  //   },
  // },
});
const slider_items = document.querySelectorAll(".slide");
const planet_name = document.querySelectorAll(".planet-name");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const names = ["저칼로리", "비건", "논알콜"];
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
    name.innerHTML = names[idx];

    if (selected_item === idx) {
      planet_name[idx].classList.add("active");
    } else {
      planet_name[idx].classList.remove("active");
    }
  });
}
planetName();
slider_items.forEach((item, idx) => {
  item.innerHTML = names[idx];
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

gsap.registerPlugin(ScrollTrigger);
let height = document
  .querySelector(".intro_overlay")
  .getBoundingClientRect().height;
ScrollTrigger.saveStyles(".intro_overlay");

// ScrollTrigger.matchMedia({
//   "(min-width:421px)": () => {},
//   "(max-width:420px)": () => {
//     const loading = gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: ".hero",
//         },
//       })
//       .from(
//         "video",
//         {
//           opacity: 0,
//           duration: 2,
//           onComplete: () => {
//             gsap.set(
//               ".s1_contents",
//               {
//                 zIndex: 1,
//               },
//               1
//             );

//             const tl = gsap
//               .timeline({
//                 scrollTrigger: {
//                   trigger: ".hero",
//                   pin: true,

//                   scrub: 0.5,
//                   end: "+=3000",
//                 },
//               })
//               .to(
//                 ".overlay_1",
//                 {
//                   top: -height,
//                   duration: 2,
//                   ease: "none",
//                 },
//                 0
//               )
//               .to(
//                 ".overlay_2",
//                 {
//                   bottom: -height,
//                   duration: 2,
//                   ease: "none",
//                 },
//                 0
//               )
//               .to(
//                 ".intro_overlay",
//                 {
//                   scale: 0,
//                   ease: "none",
//                   duration: 2,
//                 },
//                 0
//               )

//               .to(
//                 " .video",
//                 {
//                   opacity: 0,
//                   duration: 0.2,
//                 },
//                 1
//               );
//             ScrollTrigger.refresh();
//           },
//         },
//         0
//       )
//       .from(
//         ".overlay_1",
//         {
//           translateY: "50px",
//           duration: 1,
//         },
//         0
//       )
//       .from(
//         ".overlay_2",
//         {
//           translateY: "-50px",
//           duration: 1,
//         },
//         0
//       )
//       .to({}, {});
//   },
// });
