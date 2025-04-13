document.addEventListener("DOMContentLoaded", () => {
	// Redirect if not admin
	const adminId = sessionStorage.getItem("adminId");
	if (!adminId) return (window.location.href = "index.html");

	const body = document.getElementById("mainContent");
	const tbody = document.getElementById("studentsList");

	// Logout
	const logoutButton = document.getElementById("logoutButton");
	logoutButton.addEventListener("click", () => {
		sessionStorage.removeItem("adminId");
		location.href = "login.html";
	});

	// Search Filter
	const searchInput = document.getElementById("searchInput");
	searchInput.addEventListener("input", () => {
		const term = searchInput.value.trim().toLowerCase();
		const keywords = term.split(/\s+/); // split by space

		const old = tbody.querySelector(".no-data");
		if (old) old.remove();

		const rows = tbody.querySelectorAll("tr");
		if (!term) {
			rows.forEach((r) => (r.style.display = ""));
			return;
		}

		let anyVisible = false;
		rows.forEach((row) => {
			const text = row.textContent.toLowerCase();
			const matchesAll = keywords.every((kw) => text.includes(kw));

			if (matchesAll) {
				row.style.display = "";
				anyVisible = true;
			} else {
				row.style.display = "none";
			}
		});

		if (!anyVisible) {
			tbody.insertAdjacentHTML(
				"beforeend",
				`
	  <tr>
	    <td colspan="6" class="no-data" style="text-align:center">
	      No matching records
	    </td>
	  </tr>
	`
			);
		}
	});

	// Load students
	async function loadStudents() {
		const res = await fetch("/api/students");
		const students = res.ok ? await res.json() : [];

		if (!students.length) {
			tbody.innerHTML = `
        <tr role="row>
          <td role="cell" colspan="6" style="text-align:center" class="no-data">No data</td>
        </tr>
      `;
			body.classList.remove("hidden");
			return;
		}

		tbody.innerHTML = students
			.map((s) => {
				const student_id = s.student_id ?? "No data";
				const first_name = s.first_name ?? "No data";
				const middle_name = s.middle_name ?? "";
				const last_name = s.last_name ?? "No data";
				const email = s.email ?? "No data";
				const course = s.course ? s.course.toUpperCase() : "No data";
				const year_level =
					s.year_level === 4
						? "4th Year"
						: s.year_level === 3
						? "3rd Year"
						: s.year_level === 2
						? "2nd Year"
						: s.year_level === 1
						? "1st Year"
						: "No data";
				return `
          <tr role="row">
            <td role="cell"><strong>${student_id}</strong></td>
            <td role="cell">${last_name}, ${first_name} ${middle_name ? " " + middle_name : ""}</td>
            <td role="cell">${email}</td>
            <td role="cell">${course}</td>
            <td role="cell">${year_level}</td>
            <td class="action-buttons" role="cell">
              <button class="edit-btn"   data-student-id="${student_id}">Edit</button>
              <button class="delete-btn" data-student-id="${student_id}">Delete</button>
            </td>
          </tr>
        `;
			})
			.join("");

		body.classList.remove("hidden");
	}

	// Delete student
	tbody.addEventListener("click", (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("delete-btn")) return;
		const studentId = e.target.dataset.studentId;
		const deleteModal = document.getElementById("deleteModal");
		deleteModal.showModal();

		document.getElementById("cancelDelete").onclick = () => {
			deleteModal.close();
		};
		document.getElementById("confirmDelete").onclick = async () => {
			const studentData = await fetch(`/api/students/${studentId}`, { method: "DELETE" });
			if (studentData.ok) {
				deleteModal.close();
				loadStudents();
			} else {
				console.error("Delete failed", studentData.status);
			}
		};
	});

	// Populate edit form
	tbody.addEventListener("click", async (e) => {
		e.preventDefault();
		if (!e.target.classList.contains("edit-btn")) return;
		const editModal = document.getElementById("editModal");
		editModal.showModal();

		document.getElementById("closeEditModal").onclick = () => {
			document.getElementById("editForm").reset();
			editModal.close();
		};

		const studentId = e.target.dataset.studentId;

		try {
			// Fetch student data
			const res = await fetch(`/api/students/${studentId}`);
			if (!res.ok) throw new Error("Failed to fetch student data");

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
			} = await res.json();

			// Populate form fields
			document.getElementById("editFirstName").value = first_name;
			document.getElementById("editMiddleName").value = middle_name || "";
			document.getElementById("editLastName").value = last_name;
			document.getElementById("editEmail").value = email;
			document.getElementById("editStreetAddress").value = street_address;
			document.getElementById("editCity").value = city;
			document.getElementById("editState").value = state;
			document.getElementById("editZipCode").value = zip_code;

			// Convert birthdate to YYYY-MM-DD format
			const birthdateObj = new Date(birthdate);
			const birthdateISO = birthdateObj.toISOString().split("T")[0];
			document.getElementById("editBirthdate").value = birthdateISO;
			document.getElementById("editStudentID").value = student_id;
			document.getElementById("course").value = course;
			document.getElementById("editYearLevel").value = year_level;
			document.getElementById("editMobileNumber").value = mobile_number;

			editModal.showModal();
		} catch (error) {
			console.error("Error loading student data:", error);
			document.getElementById("editModalError").textContent = "Failed to load student data";
			editModal.showModal();
		}
	});

	// Update student
	const updateBtn = document.getElementById("saveEditModal");
	updateBtn.addEventListener("click", async (e) => {
		e.preventDefault();

		const editModal = document.getElementById("editModal");
		const form = document.getElementById("editForm");
		const formData = new FormData(form);
		const studentInputForm = Object.fromEntries(formData.entries());
		const studentId = studentInputForm.student_id;

		// Validation
		const firstNameErrMsg = document.getElementById("firstNameError");
		const lastNameErrMsg = document.getElementById("lastNameError");
		const emailErrMsg = document.getElementById("emailError");
		const streetAddressErrMsg = document.getElementById("streetAddressError");
		const cityErrMsg = document.getElementById("cityError");
		const stateErrMsg = document.getElementById("stateError");
		const zipCodeErrMsg = document.getElementById("zipCodeError");
		const mobileNumberErrMsg = document.getElementById("mobileNumberError");
		const birthdateErrMsg = document.getElementById("birthdateError");

		// Form validation
		let countError = 0;
		function isValidForm() {
			if (!studentInputForm.first_name) {
				firstNameErrMsg.textContent = "First name is required";
				countError++;
			} else if (!studentInputForm.first_name.length > 3 || !studentInputForm.first_name.match(/^[A-Za-z\s]+$/)) {
				firstNameErrMsg.textContent =
					"First name must be at least 3 characters and contain only letters and spaces";
				countError++;
			}

			if (!studentInputForm.last_name) {
				lastNameErrMsg.textContent = "Last name is required";
				countError++;
			} else if (!studentInputForm.last_name.length > 3 || !studentInputForm.last_name.match(/^[A-Za-z\s]+$/)) {
				lastNameErrMsg.textContent =
					"Last name must be at least 3 characters and contain only letters and spaces";
				countError++;
			}

			if (!studentInputForm.email) {
				emailErrMsg.textContent = "Email is required";
				countError++;
			} else if (!studentInputForm.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
				emailErrMsg.textContent = "Invalid email format";
				countError++;
			}

			if (!studentInputForm.birthdate) {
				birthdateErrMsg.textContent = "Birthdate is required";
				countError++;
			} else if (!studentInputForm.birthdate.match(/^\d{4}-\d{2}-\d{2}$/)) {
				birthdateErrMsg.textContent = "Invalid birthdate format";
				countError++;
			}

			if (!studentInputForm.mobile_number) {
				mobileNumberErrMsg.textContent = "Mobile number is required";
				countError++;
			} else if (!studentInputForm.mobile_number.match(/^09[0-9]{9}$/)) {
				mobileNumberErrMsg.textContent = "Invalid Philippine mobile number";
				countError++;
			}

			if (!studentInputForm.street_address) {
				streetAddressErrMsg.textContent = "Street address is required";
				countError++;
			} else if (!studentInputForm.street_address.match(/^[A-Za-z0-9\s.,#-]+$/)) {
				streetAddressErrMsg.textContent = "Invalid street address format";
				countError++;
			} else if (!studentInputForm.street_address.length > 5) {
				streetAddressErrMsg.textContent = "Street address must be at least 5 characters";
				countError++;
			}

			if (!studentInputForm.city) {
				cityErrMsg.textContent = "City is required";
				countError++;
			} else if (!studentInputForm.city.match(/^[A-Za-z\s]+$/)) {
				cityErrMsg.textContent = "Invalid city format";
				countError++;
			} else if (!studentInputForm.city.length > 3) {
				cityErrMsg.textContent = "City must be at least 3 characters";
				countError++;
			}

			if (!studentInputForm.state) {
				stateErrMsg.textContent = "State is required";
				countError++;
			} else if (!studentInputForm.state.match(/^[A-Za-z\s]+$/)) {
				stateErrMsg.textContent = "Invalid state format";
				countError++;
			} else if (!studentInputForm.state.length > 3) {
				stateErrMsg.textContent = "State must be at least 3 characters";
				countError++;
			}

			if (!studentInputForm.zip_code) {
				zipCodeErrMsg.textContent = "Zip code is required";
				countError++;
			} else if (studentInputForm.zip_code.length < 4 || studentInputForm.zip_code.length > 7) {
				zipCodeErrMsg.textContent = "Invalid zip code format";
				countError++;
			}
		}
		isValidForm();

		const err = document.getElementById("editError");
		function clearError() {
			firstNameErrMsg.textContent = "";
			lastNameErrMsg.textContent = "";
			emailErrMsg.textContent = "";
			streetAddressErrMsg.textContent = "";
			cityErrMsg.textContent = "";
			stateErrMsg.textContent = "";
			zipCodeErrMsg.textContent = "";
			mobileNumberErrMsg.textContent = "";
			birthdateErrMsg.textContent = "";
			err.textContent = "";
		}

		if (countError > 0) {
			err.textContent = "Invalid input";

			setTimeout(() => {
				clearError();
				countError = 0;
			}, 15000);

			return;
		}

		const res = await fetch(`/api/students/${studentId}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				first_name: studentInputForm.first_name,
				middle_name: studentInputForm.middle_name,
				last_name: studentInputForm.last_name,
				email: studentInputForm.email,
				street_address: studentInputForm.street_address,
				city: studentInputForm.city,
				state: studentInputForm.state,
				zip_code: studentInputForm.zip_code,
				course: studentInputForm.course,
				year_level: studentInputForm.year_level,
				birthdate: studentInputForm.birthdate,
				mobile_number: studentInputForm.mobile_number,
			}),
		});

		if (res.ok) {
			editModal.close();
			loadStudents(); // refresh the table
		} else {
			const err = await res.text();
			document.getElementById("editModalError").textContent = "Update failed: " + err;
		}
	});

	function AddTableARIA() {
		try {
			var allTables = document.querySelectorAll("table");
			for (var i = 0; i < allTables.length; i++) {
				allTables[i].setAttribute("role", "table");
			}
			var allCaptions = document.querySelectorAll("caption");
			for (var i = 0; i < allCaptions.length; i++) {
				allCaptions[i].setAttribute("role", "caption");
			}
			var allRowGroups = document.querySelectorAll("thead, tbody, tfoot");
			for (var i = 0; i < allRowGroups.length; i++) {
				allRowGroups[i].setAttribute("role", "rowgroup");
			}
			var allRows = document.querySelectorAll("tr");
			for (var i = 0; i < allRows.length; i++) {
				allRows[i].setAttribute("role", "row");
			}
			var allCells = document.querySelectorAll("td");
			for (var i = 0; i < allCells.length; i++) {
				allCells[i].setAttribute("role", "cell");
			}
			var allHeaders = document.querySelectorAll("th");
			for (var i = 0; i < allHeaders.length; i++) {
				allHeaders[i].setAttribute("role", "columnheader");
			}
			// this accounts for scoped row headers
			var allRowHeaders = document.querySelectorAll("th[scope=row]");
			for (var i = 0; i < allRowHeaders.length; i++) {
				allRowHeaders[i].setAttribute("role", "rowheader");
			}
		} catch (e) {
			console.log("AddTableARIA(): " + e);
		}
	}

	AddTableARIA();

	loadStudents();
});
