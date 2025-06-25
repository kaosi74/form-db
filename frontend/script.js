const form = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const user = {
      username: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      console.log("User created successfully!");
      form.reset();
      window.location.href = "./login.html";
    } catch (error) {
      console.error("Error during signup:", error.message);
    }
  })
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);

    if (!formData.get("email") || !formData.get("password")) {
      console.error("Email and password are required");
      return;
    }
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      window.location.href = "./dashboard.html";
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  });
}
