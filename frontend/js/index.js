document.addEventListener("DOMContentLoaded", () => {
	// Redirect if already logged in
	const studentId = sessionStorage.getItem("studentId");
	const adminId = sessionStorage.getItem("adminId");
	if (studentId) return (window.location.href = "dashboard.html");
	if (adminId) return (window.location.href = "admin.html");

	const body = document.getElementById("mainContent");
	const form = document.getElementById("loginForm");
	const loginError = document.getElementById("loginError");

	// show form
	body.classList.remove("hidden");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();
		loginError.textContent = "";

		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value;

		// Admin credentials
		if (email === "admin@admin.com" && password === "Admin123") {
			sessionStorage.setItem("adminId", "true");
			return (window.location.href = "admin.html");
		}

		// Student login
		try {
			const res = await fetch("/api/students/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			const data = await res.json();

			if (!res.ok) throw new Error(data.error || "Login failed");

			sessionStorage.setItem("studentId", data.student.student_id);
			window.location.href = "dashboard.html";
		} catch (err) {
			console.error("Login error:", err);
			loginError.textContent = "Invalid Email or Password";
			setTimeout(() => (loginError.textContent = ""), 3000);
		}
	});
});
