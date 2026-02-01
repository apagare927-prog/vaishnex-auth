const sendOtpBtn = document.getElementById("sendOtpBtn");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");
const resendBtn = document.getElementById("resendBtn");

const userInput = document.getElementById("userInput");
const otpInput = document.getElementById("otpInput");

const inputError = document.getElementById("inputError");
const otpError = document.getElementById("otpError");

const otpSection = document.getElementById("otpSection");
const timerText = document.getElementById("timerText");
const welcomeText = document.getElementById("welcomeText");

let timer = 30;
let interval = null;

const DEMO_OTP = "123456";

/* Random welcome lines */
const welcomeLines = [
  "Welcome to Vaishnex",
  "Vaishnex welcomes you",
  "Secure login by Vaishnex",
  "Vaishnex OTP verification",
  "Welcome back to Vaishnex"
];

welcomeText.innerText =
  welcomeLines[Math.floor(Math.random() * welcomeLines.length)];

/* Validation */
function isValidInput(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{7,15}$/;
  return emailRegex.test(value) || phoneRegex.test(value);
}

/* Timer */
function startTimer() {
  timer = 30;
  resendBtn.disabled = true;
  timerText.innerText = `Resend OTP in ${timer}s`;

  interval = setInterval(() => {
    timer--;
    timerText.innerText = `Resend OTP in ${timer}s`;

    if (timer <= 0) {
      clearInterval(interval);
      timerText.innerText = "You can resend OTP";
      resendBtn.disabled = false;
    }
  }, 1000);
}

/* Send OTP */
sendOtpBtn.onclick = () => {
  inputError.innerText = "";

  if (!isValidInput(userInput.value.trim())) {
    inputError.innerText = "Enter valid email or mobile number";
    return;
  }

  otpSection.classList.remove("hidden");
  startTimer();
};

/* Verify OTP */
verifyOtpBtn.onclick = () => {
  otpError.innerText = "";

  if (otpInput.value.trim() === "") {
    otpError.innerText = "OTP cannot be empty";
    return;
  }

  if (otpInput.value !== DEMO_OTP) {
    otpError.innerText = "Invalid OTP";
    return;
  }

  alert("Login successful!");
};

/* Resend OTP */
resendBtn.onclick = () => {
  startTimer();
};
