/* TOGGLE */

function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("signupBox").style.display = "none";
  document.getElementById("loginBox").style.display = "block";
}

/* SIGNUP */

function signup() {
  const username = su_username.value;
  const email = su_email.value;
  const password = su_password.value;

  if (!username || !email || !password) {
    alert("All fields required");
    return;
  }

  fetch("http://localhost:5000/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    if (data.message === "Signup successful") showLogin();
  });
}

function login() {
  const email = document.getElementById("li_email").value;
  const password = document.getElementById("li_password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Login response:", data); // 🔍 DEBUG LINE

    // ✅ REDIRECT ON ANY SUCCESS MESSAGE
    if (data.message && data.message.toLowerCase().includes("success")) {
      window.location.href = "dashboard.html";
    } else {
      alert(data.message);
    }
  })
  .catch(err => {
    console.error("Login error:", err);
    alert("Login failed");
  });
}


/* LOGOUT */

function logout() {
  window.location.href = "auth.html";
}
