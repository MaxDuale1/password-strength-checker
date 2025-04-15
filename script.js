const passwordInput = document.getElementById("password");
const meter = document.getElementById("strengthMeter");
const feedback = document.getElementById("feedback");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const rawScore = getPasswordScore(password);
  const maxScore = 85; // total possible score
  const normalizedScore = Math.min(100, Math.round((rawScore / maxScore) * 100));
  updateMeter(normalizedScore);
});

function getPasswordScore(password) {
  let score = 0;

  const lengthBonus = password.length >= 12 ? 25 : password.length >= 8 ? 15 : 0;
  const varietyBonus = [/[A-Z]/, /[a-z]/, /[0-9]/, /[^A-Za-z0-9]/]
    .reduce((acc, regex) => acc + (regex.test(password) ? 1 : 0), 0) * 10;

  const penalty = /^[a-z]+$/.test(password) || /^[0-9]+$/.test(password) ? -20 : 0;

  score = lengthBonus + varietyBonus + penalty;
  return Math.max(0, score);
}

function updateMeter(score) {
  meter.style.width = `${score}%`;

  let color = "red";
  let label = "Very Weak 😬";

  if (score >= 80) {
    color = "green";
    label = "Strong 💪";
  } else if (score >= 60) {
    color = "yellowgreen";
    label = "Good 🙂";
  } else if (score >= 40) {
    color = "orange";
    label = "Fair 😐";
  } else if (score >= 20) {
    color = "orangered";
    label = "Weak 😟";
  }

  meter.style.backgroundColor = color;
  feedback.textContent = `Strength: ${label}`;
}
