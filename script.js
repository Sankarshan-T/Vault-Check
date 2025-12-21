// ----------------------------
// COMMON PASSWORD LIST
// ----------------------------
const commonPasswords = [
    "password",
    "123456",
    "12345678",
    "qwerty",
    "admin",
    "letmein",
    "welcome",
    "password123"
];

// ----------------------------
// RUN ANALYSIS (BUTTON / ENTER)
// ----------------------------
function runAnalysis() {
    const passwordInput = document.getElementById("password");
    const password = passwordInput.value;

    if (password.trim() === "") return;

    document.getElementById("results").classList.remove("hidden");

    analyzePassword(password);
}

// ----------------------------
// ENTER KEY SUPPORT
// ----------------------------
function handleEnter(event) {
    if (event.key === "Enter") {
        runAnalysis();
    }
}

// ----------------------------
// CLEAR BUTTON
// ----------------------------
function clearPassword() {
    document.getElementById("password").value = "";
    document.getElementById("results").classList.add("hidden");

    document.getElementById("strength-fill").style.width = "0%";
    document.getElementById("strength-text").textContent = "Strength:";

    document.getElementById("common-warning").textContent = "";
    document.getElementById("pattern-warning").textContent = "";

    resetRules();
}

// ----------------------------
// PASSWORD ANALYSIS
// ----------------------------
function analyzePassword(password) {
    const lengthRule = password.length >= 8;
    const upperRule = /[A-Z]/.test(password);
    const lowerRule = /[a-z]/.test(password);
    const numberRule = /[0-9]/.test(password);
    const symbolRule = /[^A-Za-z0-9]/.test(password);

    updateRule("length", lengthRule);
    updateRule("uppercase", upperRule);
    updateRule("lowercase", lowerRule);
    updateRule("number", numberRule);
    updateRule("symbol", symbolRule);

    const score = [
        lengthRule,
        upperRule,
        lowerRule,
        numberRule,
        symbolRule
    ].filter(Boolean).length;

    updateStrength(score);
    checkCommonPassword(password);
    checkRepeatedPatterns(password);
}

// ----------------------------
// UPDATE RULE UI
// ----------------------------
function updateRule(id, passed) {
    const el = document.getElementById(id);
    const text = el.textContent.slice(2);
    el.textContent = (passed ? "✅ " : "❌ ") + text;
}

// ----------------------------
// RESET RULES (ON CLEAR)
// ----------------------------
function resetRules() {
    const rules = ["length", "uppercase", "lowercase", "number", "symbol"];
    rules.forEach(id => {
        const el = document.getElementById(id);
        el.textContent = "❌ " + el.textContent.slice(2);
    });
}

// ----------------------------
// STRENGTH BAR
// ----------------------------
function updateStrength(score) {
    const strengthFill = document.getElementById("strength-fill");
    const strengthText = document.getElementById("strength-text");

    const levels = ["Very Weak", "Weak", "Okay", "Strong", "Very Strong"];
    const colors = ["red", "orange", "gold", "lightgreen", "green"];

    strengthFill.style.width = (score / 5) * 100 + "%";
    strengthFill.style.backgroundColor = colors[score - 1] || "red";
    strengthText.textContent = "Strength: " + (levels[score - 1] || "Very Weak");
}

// ----------------------------
// COMMON PASSWORD CHECK
// ----------------------------
function checkCommonPassword(password) {
    const warning = document.getElementById("common-warning");

    if (commonPasswords.includes(password.toLowerCase())) {
        warning.textContent = "⚠️ This is a very common password.";
    } else {
        warning.textContent = "";
    }
}

// ----------------------------
// REPEATED CHARACTER / PATTERN CHECK
// ----------------------------
function checkRepeatedPatterns(password) {
    const warning = document.getElementById("pattern-warning");

    if (/^(.)\1+$/.test(password)) {
        warning.textContent = "⚠️ Repeated characters detected.";
        return;
    }

    if (/^(.+)\1+$/.test(password)) {
        warning.textContent = "⚠️ Repeating pattern detected.";
        return;
    }

    warning.textContent = "";
}

// ----------------------------
// EYE ICON TOGGLE (SHOW/HIDE)
// ----------------------------
function togglePassword() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
}