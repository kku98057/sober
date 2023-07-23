const REDIRECT_URL = "http://127.0.0.1:5501/auth/login.html";
function loginWithKakao() {
  Kakao.Auth.authorize({
    redirectUri: REDIRECT_URL,
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
    })
    .catch(function (err) {
      alert("failed to request user information: " + JSON.stringify(err));
    });
}

// 아래는 데모를 위한 UI 코드입니다.

function displayToken() {
  var token = getCookie("authorize-access-token");
  if (token) {
    Kakao.Auth.setAccessToken(token);
    document.querySelector("#token-result").innerText =
      "login success, ready to request API";
    document.querySelector("button.api-btn").style.visibility = "visible";
  }
}
displayToken();
function getCookie(name) {
  var parts = document.cookie.split(name + "=");
  if (parts.length === 2) {
    return parts[1].split(";")[0];
  }
}
// const code = new URL(window.location.href).searchParams.get("code");
// if (code) {
//   const getToken = async () => {
//     axios
//       .get("https://kauth.kakao.com/oauth/authorize", {
//         grant_type: "authorization_code",
//         response_type: code,
//         redirect_uri: REDIRECT_URL,
//         client_id: "b2565aa45aaaf613c93d24212cbbde02",
//       })
//       .then((res) => res.data)
//       .catch((error) => console.error(error));
//   };

//   (async () => {
//     const token = await getToken();
//     console.log(token);
//   })();
// }
