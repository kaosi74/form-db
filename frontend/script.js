const form = document.getElementById("signupForm");
const userList = document.getElementById('userList');
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const user = {
    username: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (user) {
    res.status(201).json(user)
    res.redirect("")
  }

  await fetch("http://localhost:3000/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  form.reset();
  loadUsers();
});

async function loadUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  userList.innerHTML = users
    .map((u) => `<li>${u.username} (${u.email})</li>`)
    .join("");
}

loadUsers(); // Load users when the page loads
