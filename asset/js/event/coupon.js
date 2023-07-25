const coupon_btn = document.querySelector(".coupon_btn");
const token = Cookies.get("token");
coupon_btn.addEventListener("click", () => {
  if (!token) {
    window.location.href = "/auth/needlogin.html";
    return;
  } else {
    return (
      axios.post(
        "api",
        {},
        {
          headers: {
            //   Authorization: `Bearer ${token}`,
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      ),
      then((res) => {
        alert("쿠폰이 발행되었습니다.");
      })
    );
  }
});
