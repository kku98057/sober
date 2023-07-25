///////////////////카카오로그인
//신규회원인경우
const REDIRECT_URL_NEW = "http://127.0.0.1:5501/auth/signup/complete.html";
// 이미 회원인 경우 'http://sobermarket.co.kr/main/main.php'
const REDIRECT_URL = "http://127.0.0.1:5501/auth/connect_kakao.html";

function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: REDIRECT_URL_NEW,
    state: "userme",
  });
}
function requestUserInfo() {
  Kakao.API.request({
    url: "/v2/user/me",
    data: {
      property_keys: ["kakao_account.email", "kakao_account.gender"],
    },
  })
    .then(function (res) {
      alert(JSON.stringify(res));
      Cookies.set("name", "value");
    })
    .catch(function (err) {
      alert("failed to request user information: " + JSON.stringify(err));
    });
}
//로그인 토큰

///////////////// 카카오 로그인
const code = new URL(window.location.href).searchParams.get("code");
if (code) {
  const getToken = () => {
    return axios
      .post(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: "b2565aa45aaaf613c93d24212cbbde02",
          redirect_uri: REDIRECT_URL,
          code: code,
        },
        {
          headers: {
            "Content-type": " application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then((res) => {
        const { data } = res;
        const { access_token } = data;
        console.log(access_token, "엑세스토큰");
      });
  };

  (async () => {
    const token = await getToken();
  })();
}

const loginData = document.querySelectorAll("#email, #pw");

let userInfo = {
  email: "",
  password: "",
};
////////////////// 이메일 로그인
if (loginData) {
  const LOGIN_URL = "로그인 api";
  const TOKEN_ULR = "토큰 api";
  const loginBtn = document.querySelector(".email_login_btn");
  loginData.forEach((form) => {
    form.addEventListener("input", (e) => {
      const { value, name } = e.target;
      userInfo = {
        ...userInfo,
        [name]: value,
      };
      if (userInfo.email !== "" && userInfo.pw !== "") {
        loginBtn.classList.add("active");
      } else {
        loginBtn.classList.remove("active");
      }
    });
  });
  // 로그인 하기
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      return axios.post(`${LOGIN_URL}`, loginData, {}).then((res) => {
        // 토큰받기
        const { token } = res.data;
        axios
          .post(
            `${TOKEN_ULR}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((res) => {
            Cookies.set("token", res.data.token);
          });
      });
    });
  }
}
