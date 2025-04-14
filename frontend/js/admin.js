document.addEventListener("DOMContentLoaded", () => {
	// Redirect non-admins
	function checkAdmin() {
		const adminId = sessionStorage.getItem("adminId");
		if (!adminId) window.location.href = "index.html";
	}

	// DOM Elements
	const body = document.getElementById("mainContent");
	const tbody = document.getElementById("studentsList");
	const logoutButton = document.getElementById("logoutButton");
	const searchInput = document.getElementById("searchInput");

	// Modals
	const deleteModal = document.getElementById("deleteModal");
	const confirmDeleteButton = document.getElementById("confirmDelete");
	const cancelDeleteButton = document.getElementById("cancelDelete");
	const editModal = document.getElementById("editModal");
	const closeEditModalButton = document.getElementById("closeEditModal");
	const editForm = document.getElementById("editForm");
	const saveEditModalButton = document.getElementById("saveEditModal");
	const editModalError = document.getElementById("editModalError");

	// Input fields in the edit form
	const editFirstNameInput = document.getElementById("editFirstName");
	const editMiddleNameInput = document.getElementById("editMiddleName");
	const editLastNameInput = document.getElementById("editLastName");
	const editEmailInput = document.getElementById("editEmail");
	const editStreetAddressInput = document.getElementById("editStreetAddress");
	const editCityInput = document.getElementById("editCity");
	const editStateInput = document.getElementById("editState");
	const editZipCodeInput = document.getElementById("editZipCode");
	const editMobileNumberInput = document.getElementById("editMobileNumber");
	const editBirthdateInput = document.getElementById("editBirthdate");

	// Validation Error Messages
	const firstNameErrMsg = document.getElementById("firstNameError");
	const middleNameErrMsg = document.getElementById("middleNameError");
	const lastNameErrMsg = document.getElementById("lastNameError");
	const emailErrMsg = document.getElementById("emailError");
	const streetAddressErrMsg = document.getElementById("streetAddressError");
	const cityErrMsg = document.getElementById("cityError");
	const stateErrMsg = document.getElementById("stateError");
	const zipCodeErrMsg = document.getElementById("zipCodeError");
	const mobileNumberErrMsg = document.getElementById("mobileNumberError");
	const birthdateErrMsg = document.getElementById("birthdateError");
	const generalErrorMsg = document.getElementById("editError");

	function handleLogout() {
		sessionStorage.removeItem("adminId");
		location.href = "login.html";
	}

	// Search Functionality
	function filterStudents() {
		const term = searchInput.value.trim().toLowerCase();
		const keywords = term.split(/\s+/);
		const noDataRow = tbody.querySelector(".no-data");

		if (noDataRow) noDataRow.remove();

		const rows = tbody.querySelectorAll("tr");
		if (!term) {
			rows.forEach((row) => (row.style.display = ""));
			return;
		}

		let anyVisible = false;
		rows.forEach((row) => {
			const text = row.textContent.toLowerCase();
			const matchesAll = keywords.every((kw) => text.includes(kw));
			row.style.display = matchesAll ? "" : "none";
			if (matchesAll) anyVisible = true;
		});

		if (!anyVisible) {
			tbody.insertAdjacentHTML(
				"beforeend",
				`
          <tr role="row">
            <td role="cell" colspan="6" class="no-data" style="text-align:center">
              No matching records
            </td>
          </tr>
        `
			);
		}
	}

	/**
	 *
	 * @param {Object} student - Object containing student data
	 * @returns
	 */
	function generateStudentRow(student) {
		const {
			student_id = "No data",
			first_name = "No data",
			middle_name = "",
			last_name = "No data",
			email = "No data",
			course = "No data",
			year_level,
		} = student;

		const formattedCourse = course ? course.toUpperCase() : "No data";
		const formattedYearLevel =
			year_level === 4
				? "4th Year"
				: year_level === 3
				? "3rd Year"
				: year_level === 2
				? "2nd Year"
				: year_level === 1
				? "1st Year"
				: "No data";

		return `
      <tr role="row">
        <td role="cell"><strong>${student_id}</strong></td>
        <td role="cell">${last_name}, ${first_name} ${middle_name ? " " + middle_name : ""}</td>
        <td role="cell">${email}</td>
        <td role="cell">${formattedCourse}</td>
        <td role="cell">${formattedYearLevel}</td>
        <td class="action-buttons" role="cell">
          <button class="edit-btn" data-student-id="${student_id}">Edit</button>
          <button class="delete-btn" data-student-id="${student_id}">Delete</button>
        </td>
      </tr>
    `;
	}

	async function loadStudents() {
		const response = await fetch("/api/students");
		const students = response.ok ? await response.json() : [];

		if (!students.length) {
			tbody.innerHTML = `
        <tr role="row">
          <td role="cell" colspan="6" class="no-data">No data</td>
        </tr>
      `;
		} else {
			tbody.innerHTML = students.map(generateStudentRow).join("");
		}
		body.classList.remove("hidden");
	}

	// Delete Functionality
	function handleDeleteClick(e) {
		if (!e.target.classList.contains("delete-btn")) return;
		const studentId = e.target.dataset.studentId;
		deleteModal.showModal();

		cancelDeleteButton.onclick = () => deleteModal.close();
		confirmDeleteButton.onclick = async () => {
			const studentData = await fetch(`/api/students/${studentId}`, { method: "DELETE" });
			if (studentData.ok) {
				deleteModal.close();
				loadStudents();
			} else {
				console.error("Delete failed", studentData.status);
			}
		};
	}

	async function populateEditForm(studentId) {
		try {
			const response = await fetch(`/api/students/${studentId}`);
			if (!response.ok) throw new Error("Failed to fetch student data");
			const studentData = await response.json();
			const {
				first_name,
				middle_name,
				last_name,
				email,
				street_address,
				city,
				state,
				zip_code,
				student_id,
				course,
				year_level,
				birthdate,
				mobile_number,
			} = studentData;

			document.getElementById("editFirstName").value = first_name;
			document.getElementById("editMiddleName").value = middle_name || "";
			document.getElementById("editLastName").value = last_name;
			document.getElementById("editEmail").value = email;
			document.getElementById("editStreetAddress").value = street_address;
			document.getElementById("editCity").value = city;
			document.getElementById("editState").value = state;
			document.getElementById("editZipCode").value = zip_code;
			document.getElementById("editBirthdate").value = new Date(birthdate).toISOString().split("T")[0];
			document.getElementById("editStudentID").value = student_id;
			document.getElementById("course").value = course;
			document.getElementById("editYearLevel").value = year_level;
			document.getElementById("editMobileNumber").value = mobile_number;

			editModal.showModal();
			editModalError.textContent = "";
			clearValidationErrors(); // Clear previous errors when opening
			resetInputStyles(); // Reset any previous error styles
		} catch (error) {
			console.error("Error loading student data:", error);
			editModalError.textContent = "Failed to load student data";
			editModal.showModal();
		}
	}

	function handleEditClick(e) {
		if (!e.target.classList.contains("edit-btn")) return;
		const studentId = e.target.dataset.studentId;
		populateEditForm(studentId);
	}

	function closeEditModal() {
		editForm.reset();
		editModal.close();
		clearValidationErrors();
		resetInputStyles();
	}

	function clearValidationErrors() {
		firstNameErrMsg.textContent = "";
		middleNameErrMsg.textContent = "";
		lastNameErrMsg.textContent = "";
		emailErrMsg.textContent = "";
		streetAddressErrMsg.textContent = "";
		cityErrMsg.textContent = "";
		stateErrMsg.textContent = "";
		zipCodeErrMsg.textContent = "";
		mobileNumberErrMsg.textContent = "";
		birthdateErrMsg.textContent = "";
		generalErrorMsg.textContent = "";
		resetInputStyles();
	}

	function resetInputStyles() {
		const inputs = editForm.querySelectorAll("input");
		inputs.forEach((input) => input.classList.remove("error-input"));
	}

	function displayValidationError(element, message) {
		element.textContent = message;
		const inputField = element.previousElementSibling; // Assuming the input is the previous sibling
		if (inputField && inputField.tagName === "INPUT") {
			inputField.classList.add("error-input");
		}
	}

	function validateInput(inputField, errorElement) {
		const name = inputField.name;
		const value = inputField.value.trim();
		errorElement.textContent = "";
		inputField.classList.remove("error-input");
		let errorMessage = "";

		switch (name) {
			case "first_name":
				if (!value) errorMessage = "First name is required";
				else if (value.length < 3 || !/^[A-Za-z\s]+$/.test(value))
					errorMessage = "First name must be at least 3 characters and contain only letters and spaces";
				break;
			case "middle_name":
				if (value && (value.length < 3 || !/^[A-Za-z\s]+$/.test(value)))
					errorMessage = "Middle name must be at least 3 characters and contain only letters and spaces";
				break;
			case "last_name":
				if (!value) errorMessage = "Last name is required";
				else if (value.length < 3 || !/^[A-Za-z\s]+$/.test(value))
					errorMessage = "Last name must be at least 3 characters and contain only letters and spaces";
				break;
			case "email":
				if (!value) errorMessage = "Email is required";
				else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
					errorMessage = "Invalid email format (ex. myname@example.com)";
				break;
			case "birthdate":
				if (!value) errorMessage = "Birthdate is required";
				else if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) errorMessage = "Invalid birthdate format";
				break;
			case "mobile_number":
				if (!value) errorMessage = "Mobile number is required";
				else if (!/^09[0-9]{9}$/.test(value))
					errorMessage = "Invalid Philippine mobile number (eg. 09123456789)";
				break;
			case "street_address":
				if (!value) errorMessage = "Street address is required";
				else if (!/^[A-Za-z0-9\s.,#-]+$/.test(value) || value.length < 5)
					errorMessage = "Street address must be at least 5 characters and contain valid characters";
				break;
			case "city":
				if (!value) errorMessage = "City is required";
				else if (!/^[A-Za-z\s]+$/.test(value) || value.length < 3)
					errorMessage = "City must be at least 3 characters and contain only letters and spaces";
				break;
			case "state":
				if (!value) errorMessage = "State is required";
				else if (!/^[A-Za-z\s]+$/.test(value) || value.length < 3)
					errorMessage = "State must be at least 3 characters and contain only letters and spaces";
				break;
			case "zip_code":
				if (!value) errorMessage = "Zip code is required";
				else if (value.length < 4) errorMessage = "Invalid zip code format";
				break;
		}

		if (errorMessage) {
			displayValidationError(errorElement, errorMessage);
			return false;
		}
		return true;
	}

	async function handleUpdateStudent(e) {
		e.preventDefault();
		const formData = new FormData(editForm);
		const studentInputForm = Object.fromEntries(formData.entries());
		const studentId = studentInputForm.student_id;
		let isFormValid = true;

		// Perform instant validation before submitting
		isFormValid = validateInput(editFirstNameInput, firstNameErrMsg) && isFormValid;
		isFormValid = validateInput(editMiddleNameInput, middleNameErrMsg) && isFormValid;
		isFormValid = validateInput(editLastNameInput, lastNameErrMsg) && isFormValid;
		isFormValid = validateInput(editEmailInput, emailErrMsg) && isFormValid;
		isFormValid = validateInput(editStreetAddressInput, streetAddressErrMsg) && isFormValid;
		isFormValid = validateInput(editCityInput, cityErrMsg) && isFormValid;
		isFormValid = validateInput(editStateInput, stateErrMsg) && isFormValid;
		isFormValid = validateInput(editZipCodeInput, zipCodeErrMsg) && isFormValid;
		isFormValid = validateInput(editMobileNumberInput, mobileNumberErrMsg) && isFormValid;
		isFormValid = validateInput(editBirthdateInput, birthdateErrMsg) && isFormValid;

		if (!isFormValid) {
			generalErrorMsg.textContent = "Please correct the invalid fields.";
			setTimeout(() => (generalErrorMsg.textContent = ""), 5000);
			return;
		}

		const response = await fetch(`/api/students/${studentId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(studentInputForm),
		});

		if (response.ok) {
			editModal.close();
			loadStudents();
		} else {
			const error = await response.text();
			editModalError.textContent = "Update failed: " + error;
		}
	}

	// Accessibility
	function addTableARIA() {
		try {
			document.querySelectorAll("table").forEach((table) => table.setAttribute("role", "table"));
			document.querySelectorAll("caption").forEach((caption) => caption.setAttribute("role", "caption"));
			document.querySelectorAll("thead, tbody, tfoot").forEach((group) => group.setAttribute("role", "rowgroup"));
			document.querySelectorAll("tr").forEach((row) => row.setAttribute("role", "row"));
			document.querySelectorAll("td").forEach((cell) => cell.setAttribute("role", "cell"));
			document.querySelectorAll("th").forEach((header) => header.setAttribute("role", "columnheader"));
			document
				.querySelectorAll("th[scope=row]")
				.forEach((rowHeader) => rowHeader.setAttribute("role", "rowheader"));
		} catch (e) {
			console.log("AddTableARIA(): " + e);
		}
	}

	/**
	 * @param {string} str - String to capitalize
	 * @returns {string} Capitalized string
	 */
	function capitalizeWords(str) {
		return str.replace(/\b\w/g, (char) => char.toUpperCase());
	}

	// Capitalize input values on blur for elements with the autocapitalize attribute
	document.querySelectorAll("input[autocapitalize]").forEach((input) => {
		input.addEventListener("blur", function () {
			this.value = capitalizeWords(this.value);
		});
	});

	// Event Listeners for Instant Validation
	editFirstNameInput.addEventListener("blur", () => validateInput(editFirstNameInput, firstNameErrMsg));
	editMiddleNameInput.addEventListener("blur", () => validateInput(editMiddleNameInput, middleNameErrMsg));
	editLastNameInput.addEventListener("blur", () => validateInput(editLastNameInput, lastNameErrMsg));
	editEmailInput.addEventListener("blur", () => validateInput(editEmailInput, emailErrMsg));
	editStreetAddressInput.addEventListener("blur", () => validateInput(editStreetAddressInput, streetAddressErrMsg));
	editCityInput.addEventListener("blur", () => validateInput(editCityInput, cityErrMsg));
	editStateInput.addEventListener("blur", () => validateInput(editStateInput, stateErrMsg));
	editZipCodeInput.addEventListener("blur", () => validateInput(editZipCodeInput, zipCodeErrMsg));
	editMobileNumberInput.addEventListener("blur", () => validateInput(editMobileNumberInput, mobileNumberErrMsg));
	editBirthdateInput.addEventListener("blur", () => validateInput(editBirthdateInput, birthdateErrMsg));

	// Event Listeners
	checkAdmin();
	logoutButton.addEventListener("click", handleLogout);
	searchInput.addEventListener("input", filterStudents);
	tbody.addEventListener("click", handleDeleteClick);
	tbody.addEventListener("click", handleEditClick);
	closeEditModalButton.addEventListener("click", closeEditModal);
	saveEditModalButton.addEventListener("click", handleUpdateStudent);

	// Initialization
	addTableARIA();
	loadStudents();
});
