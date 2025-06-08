let currentOTP = null;
let otpTimeout = null;
let otpRemainingTime = 0;
let otpTimerInterval = null;
let logoutTimer = null;

function generateOTP() {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  currentOTP = otp;
  document.getElementById("otpDisplay").innerText = otp;

  // Ablaufzeit starten
  startOTPTimer(60);
}

function startOTPTimer(seconds) {
  clearTimeout(otpTimeout);
  clearInterval(otpTimerInterval);
  otpRemainingTime = seconds;

  document.getElementById(
    "otpTimer"
  ).innerText = `OTP valid for ${otpRemainingTime} seconds`;

  otpTimerInterval = setInterval(() => {
    otpRemainingTime--;
    if (otpRemainingTime > 0) {
      document.getElementById(
        "otpTimer"
      ).innerText = `OTP valid for ${otpRemainingTime} seconds`;
    } else {
      clearInterval(otpTimerInterval);
      currentOTP = null;
      document.getElementById("otpDisplay").innerText = "";
      document.getElementById("otpTimer").innerText =
        "OTP expired. Please generate a new one.";
    }
  }, 1000);
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username !== "admin") {
    alert("Only 'admin' is allowed as username.");
    return;
  }

  if (currentOTP === null) {
    alert("Please generate OTP first.");
    return;
  }

  if (password === currentOTP) {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("successMessage").style.display = "block";
    startLogoutTimer(30);
  } else {
    alert("Invalid OTP.");
  }
}

function startLogoutTimer(seconds) {
  let timeLeft = seconds;
  document.getElementById(
    "logoutTimer"
  ).innerText = `Auto logout in ${timeLeft} seconds`;

  logoutTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft > 0) {
      document.getElementById(
        "logoutTimer"
      ).innerText = `Auto logout in ${timeLeft} seconds`;
    } else {
      clearInterval(logoutTimer);
      logoutUser();
    }
  }, 1000);
}

function logoutUser() {
  document.getElementById("loginForm").reset();
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("successMessage").style.display = "none";
  document.getElementById("logoutTimer").innerText = "";
}

function changeBackground() {
  const randomColorBody = `hsl(${Math.floor(Math.random() * 360)}, 60%, 80%)`;
  document.body.style.background = `linear-gradient(135deg, ${randomColorBody}, #66a6ff)`;
}

setInterval(changeBackground, 2000);
