const token = Cookies.get("token");
if (!token) {
  window.location.href = "/auth/login_mail.html";
}
