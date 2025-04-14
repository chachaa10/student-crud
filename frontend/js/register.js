document.addEventListener("DOMContentLoaded", () => {
	// Redirect if already logged in
	const studentId = sessionStorage.getItem("studentId");
	const adminId = sessionStorage.getItem("adminId");
	if (studentId) return (window.location.href = "dashboard.html");
	if (adminId) return (window.location.href = "admin.html");

	// Show the form if not logged in
	const body = document.getElementById("mainContent");
	body.classList.remove("hidden");

	// Input and Select elements
	const firstNameInput = document.getElementById("first-name");
	const middleNameInput = document.getElementById("middle-name");
	const lastNameInput = document.getElementById("last-name");
	const birthdateInput = document.getElementById("birthdate");
	const genderInput = document.getElementById("gender");
	const emailInput = document.getElementById("email");
	const mobileNumberInput = document.getElementById("mobile-number");
	const streetAddressInput = document.getElementById("street-address");
	const cityInput = document.getElementById("city");
	const stateInput = document.getElementById("state");
	const zipCodeInput = document.getElementById("zip-code");
	const studentIdInput = document.getElementById("student-id");
	const courseInput = document.getElementById("course");
	const yearLevelInput = document.getElementById("year-level");
	const passwordInput = document.getElementById("password");

	// Error messages
	const firstNameError = document.getElementById("firstNameError");
	const middleNameError = document.getElementById("middleNameError");
	const lastNameError = document.getElementById("lastNameError");
	const birthdateError = document.getElementById("birthdateError");
	const genderError = document.getElementById("genderError");
	const emailError = document.getElementById("emailError");
	const mobileNumberError = document.getElementById("mobileNumberError");
	const streetAddressError = document.getElementById("streetAddressError");
	const cityError = document.getElementById("cityError");
	const stateError = document.getElementById("stateError");
	const zipCodeError = document.getElementById("zipCodeError");
	const studentIdError = document.getElementById("studentIdError");
	const courseError = document.getElementById("courseError");
	const yearLevelError = document.getElementById("yearLevelError");
	const passwordError = document.getElementById("password-requirements");

	function displayValidationError(element, message) {
		element.textContent = message;
		element.classList.add("error-message"); // Add the error-message class to the span
		const inputField = element.previousElementSibling; // Assuming the input is the previous sibling
		if (inputField && (inputField.tagName === "INPUT" || inputField.tagName === "SELECT")) {
			inputField.classList.add("error-input");
		}
	}

	function validateInput(inputField, errorElement) {
		const fieldName = inputField.name;
		const value = inputField.value.trim();
		errorElement.textContent = "";
		inputField.classList.remove("error-input");
		let errorMessage = "";

		switch (fieldName) {
			case "first_name":
				if (!value) errorMessage = "First name is required";
				else if (value.length < 3 || !/^[A-Za-z\s]+$/.test(value))
					errorMessage =
						"First name must be at least 3 characters and contain only letters and spaces";
				break;
			case "middle_name":
				if (value && (value.length < 3 || !/^[A-Za-z\s]+$/.test(value)))
					errorMessage =
						"Middle name must be at least 3 characters and contain only letters and spaces";
				break;
			case "last_name":
				if (!value) errorMessage = "Last name is required";
				else if (value.length < 3 || !/^[A-Za-z\s]+$/.test(value))
					errorMessage =
						"Last name must be at least 3 characters and contain only letters and spaces";
				break;
			case "email":
				if (!value) errorMessage = "Email is required";
				else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
					errorMessage = "Invalid email format (ex. myname@example.com)";
				break;
			case "birthdate":
				if (!value) errorMessage = "Birthdate is required";
				else if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
					errorMessage = "Invalid birthdate format";
				break;
			case "mobile_number":
				if (!value) errorMessage = "Mobile number is required";
				else if (!/^09[0-9]{9}$/.test(value))
					errorMessage = "Invalid Philippine mobile number (eg. 09123456789)";
				break;
			case "street_address":
				if (!value) errorMessage = "Street address is required";
				else if (!/^[A-Za-z0-9\s.,#-]+$/.test(value) || value.length < 5)
					errorMessage =
						"Street address must be at least 5 characters and contain valid characters";
				break;
			case "city":
				if (!value) errorMessage = "City is required";
				else if (!/^[A-Za-z\s]+$/.test(value) || value.length < 3)
					errorMessage =
						"City must be at least 3 characters and contain only letters and spaces";
				break;
			case "state":
				if (!value) errorMessage = "State is required";
				else if (!/^[A-Za-z\s]+$/.test(value) || value.length < 3)
					errorMessage =
						"State must be at least 3 characters and contain only letters and spaces";
				break;
			case "zip_code":
				if (!value) errorMessage = "Zip code is required";
				else if (value.length < 4) errorMessage = "Invalid zip code format";
				break;
			case "student_id":
				if (!value) errorMessage = "Student ID is required";
				else if (value.length < 8 || !/^\d{8}$/.test(value))
					errorMessage = "Invalid student ID format (ex. 20251234)";
				break;
			case "password":
				if (
					!value ||
					value.length < 6 ||
					!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)
				)
					errorMessage =
						"Password must contain at least: 6 characters, 1 uppercase, 1 lowercase, and 1 number";
				break;
			case "gender":
				if (!value) errorMessage = "Gender is required";
				break;
			case "year_level":
				if (!value) errorMessage = "Year level is required";
				break;
			case "course":
				if (!value) errorMessage = "Course is required";
				break;
		}

		if (errorMessage) {
			displayValidationError(errorElement, errorMessage);
			return false;
		}
		return true;
	}

	myForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		// Get form data
		const formData = new FormData(e.target);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch("/api/students", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Registration failed");

			// Show success dialog
			const successDialog = document.getElementById("successDialog");
			successDialog.showModal();
			successDialog.classList.add("showing"); // Add the showing class
			e.target.reset();
		} catch (error) {
			console.error("Error:", error);
			alert("Registration failed. Please try again.");
		}
	});

	// Close dialog handler
	const closeDialog = document.getElementById("closeDialog");
	closeDialog.addEventListener("click", () => {
		const successDialog = document.getElementById("successDialog");
		if (successDialog.classList.contains("showing")) {
			successDialog.classList.remove("showing"); //remove class showing before closing.
		}
		successDialog.close();
		window.location.href = "index.html"; // Redirect to login
	});

	function capitalizeWords(str) {
		return str.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	document.querySelectorAll("input[autocapitalize]").forEach((input) => {
		input.addEventListener("blur", function () {
			this.value = capitalizeWords(this.value);
		});
	});

	// Event Listeners for Instant Validation
	firstNameInput.addEventListener("blur", () => validateInput(firstNameInput, firstNameError));
	middleNameInput.addEventListener("blur", () => validateInput(middleNameInput, middleNameError));
	lastNameInput.addEventListener("blur", () => validateInput(lastNameInput, lastNameError));
	emailInput.addEventListener("blur", () => validateInput(emailInput, emailError));
	streetAddressInput.addEventListener("blur", () =>
		validateInput(streetAddressInput, streetAddressError)
	);
	cityInput.addEventListener("blur", () => validateInput(cityInput, cityError));
	stateInput.addEventListener("blur", () => validateInput(stateInput, stateError));
	zipCodeInput.addEventListener("blur", () => validateInput(zipCodeInput, zipCodeError));
	mobileNumberInput.addEventListener("blur", () =>
		validateInput(mobileNumberInput, mobileNumberError)
	);
	birthdateInput.addEventListener("blur", () => validateInput(birthdateInput, birthdateError));
	studentIdInput.addEventListener("blur", () => validateInput(studentIdInput, studentIdError));
	passwordInput.addEventListener("blur", () => validateInput(passwordInput, passwordError));
	genderInput.addEventListener("blur", () => validateInput(genderInput, genderError));
	yearLevelInput.addEventListener("blur", () => validateInput(yearLevelInput, yearLevelError));
	courseInput.addEventListener("blur", () => validateInput(courseInput, courseError));
});
