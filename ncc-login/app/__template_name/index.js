// 登录
function login() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  //登录代码写在这里
  var userInfo = {
    "userId":username,
    "passwd":password
  };
  localStorage.setItem("userInfo",JSON.stringify(userInfo));
  //window.location = "../modules/index.html"
}

