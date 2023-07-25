const URL = "http://sobermarket.co.kr/main";
const IMAGE = "/asset/imgs/icons/logo-color.png";
const CONTAINER = ".inviteBtn";
console.log(IMAGE);
Kakao.Share.createDefaultButton({
  container: CONTAINER,
  objectType: "feed",
  content: {
    title: "SOBER - 룰렛",
    description: "룰렛을 돌리고 상품을 받아가자.",
    imageUrl: IMAGE,
    link: {
      mobileWebUrl: URL,
      webUrl: URL,
    },
  },
  //   social: {
  //     likeCount: 10,
  //     commentCount: 20,
  //     sharedCount: 30,
  //   },
  buttons: [
    {
      title: "이동",
      link: {
        mobileWebUrl: URL,
        webUrl: URL,
      },
    },
  ],
});
