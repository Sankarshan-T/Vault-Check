// Common passwords list (small demo list)
const commonPasswords = [
    "password", "123456", "qwerty", "admin", "letmein"
];

// Toggle show / hide password
function togglePassword() {
    const input = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// Enter key triggers analysis
function handleEnter(event) {
    if (event.key === "Enter") {
        runAnalysis();
    }
}

// Clear everything
function clearPassword() {
    document.getElementById("password").value = "";
    document.getElementById("results").classList.add("hidden");

    document.getElementById("strength-fill").style.width = "0%";
    document.getElementById("strength-text").textContent = "Strength:";

    document.getElementById("common-warning").textContent = "";
    document.getElementById("pattern-warning").textContent = "";

    document.querySelectorAll(".rules li").forEach(li => {
        li.textContent = "❌ " + li.textContent.slice(2);
    });

    // Clear suggestions
    document.querySelectorAll(".suggestpasswords li").forEach(li => {
        li.textContent = "-";
    });
}

// Main analysis function
function runAnalysis() {
    const password = document.getElementById("password").value;
    if (!password) return;

    document.getElementById("results").classList.remove("hidden");

    let score = 0;

    // Rule checks
    const rules = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    };

    for (let rule in rules) {
        const el = document.getElementById(rule);
        if (rules[rule]) {
            el.textContent = "✅ " + el.textContent.slice(2);
            score++;
        } else {
            el.textContent = "❌ " + el.textContent.slice(2);
        }
    }

    // Strength bar
    const strengthFill = document.getElementById("strength-fill");
    const strengthText = document.getElementById("strength-text");

    const percent = (score / 5) * 100;
    strengthFill.style.width = percent + "%";

    if (score <= 2) {
        strengthFill.style.background = "red";
        strengthText.textContent = "Strength: Weak";
    } else if (score === 3 || score === 4) {
        strengthFill.style.background = "orange";
        strengthText.textContent = "Strength: Medium";
    } else {
        strengthFill.style.background = "green";
        strengthText.textContent = "Strength: Strong";
    }

    // Common password warning
    const commonWarning = document.getElementById("common-warning");
    if (commonPasswords.includes(password.toLowerCase())) {
        commonWarning.textContent = "⚠ This is a very common password.";
    } else {
        commonWarning.textContent = "";
    }

    // Generate suggestions
    generateSuggestions(password);
}

// Suggestions generator
function generateSuggestions(base) {
    const suggestions = [];

    const randNum = Math.floor(Math.random() * 100);
    const symbols = ["!", "@", "#", "_"];

    suggestions.push(
        base.charAt(0).toUpperCase() + base.slice(1) + symbols[0] + randNum
    );
    suggestions.push(base + symbols[1] + "2025");
    suggestions.push(
        base.replace(/a/gi, "@").replace(/s/gi, "$") + randNum
    );
    suggestions.push(base + "_" + randNum + "A");
    suggestions.push("P" + base + symbols[2] + randNum);

    const listItems = document.querySelectorAll(".suggestpasswords li");

    listItems.forEach((li, index) => {
        const textSpan = li.querySelector(".suggest-text");
        textSpan.textContent = suggestions[index] || "-";
    });
}

function copySuggestion(button) {
    const text = button.parentElement
        .querySelector(".suggest-text")
        .textContent;

    if (text === "-" || !text) return;

    navigator.clipboard.writeText(text);

    // Feedback
    button.textContent = "Copied!";
    setTimeout(() => {
        button.textContent = "Copy";
    }, 1200);
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