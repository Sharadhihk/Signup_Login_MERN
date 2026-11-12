
// SIGN UP FUNCTIONALITY

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const message = document.getElementById("signupMessage");
        const button = document.getElementById("signupBtn");

        button.disabled = true;
        button.textContent = "Creating Account...";
        message.textContent = "";
        message.className = "message";

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                message.textContent = data.message + " You can now log in.";
                message.classList.add("success");
                signupForm.reset();
            } else {
                message.textContent = data.message;
                message.classList.add("error");
            }

        } catch (error) {
            message.textContent = "Something went wrong. Please try again.";
            message.classList.add("error");
        }

        button.disabled = false;
        button.textContent = "Sign Up";
    });
}


// LOGIN FUNCTIONALITY

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const message = document.getElementById("loginMessage");
        const button = document.getElementById("loginBtn");

        button.disabled = true;
        button.textContent = "Logging In...";
        message.textContent = "";
        message.className = "message";

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("authToken", data.token);

                message.textContent = data.message;
                message.classList.add("success");

                loginForm.reset();

            } else {
                message.textContent = data.message;
                message.classList.add("error");
            }

        } catch (error) {
            message.textContent = "Something went wrong. Please try again.";
            message.classList.add("error");
        }

        button.disabled = false;
        button.textContent = "Log In";
    });
}
