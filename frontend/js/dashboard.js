document.addEventListener('DOMContentLoaded', () => {
  const studentId = sessionStorage.getItem('studentId');

  // Redirect non-students
  if (!studentId) {
    window.location.href = 'index.html';
    return;
  }

  // Get DOM elements
  const mainContent = document.getElementById('mainContent');
  const usernameDisplay = document.getElementById('username');
  const fullNameDisplay = document.getElementById('full-name');
  const emailDisplay = document.getElementById('email');
  const genderDisplay = document.getElementById('gender');
  const mobileNumberDisplay = document.getElementById('mobile-number');
  const birthdateDisplay = document.getElementById('birthdate');
  const ageDisplay = document.getElementById('age');
  const streetAddressDisplay = document.getElementById('street-address');
  const cityDisplay = document.getElementById('city');
  const stateDisplay = document.getElementById('state');
  const zipCodeDisplay = document.getElementById('zip-code');
  const studentIdDisplay = document.getElementById('student-id');
  const courseDisplay = document.getElementById('course');
  const yearLevelDisplay = document.getElementById('year-level');
  const logoutButton = document.getElementById('logoutButton');

  const courseMap = {
    BSA: 'Bachelor of Science in Accountancy',
    BSIS: 'Bachelor of Science in Information Systems',
    BSAIS: 'Bachelor of Science in Accounting Information System',
    BSAT: 'Bachelor of Science in Accounting Technology',
    BSCE: 'Bachelor of Science in Civil Engineering',
    BSBA: 'Bachelor of Science in Business Administration',
    BSHRM: 'Bachelor of Science in Hotel and Restaurant Management',
    BSHM: 'Bachelor of Science in Hospitality Management',
    BAEL: 'Bachelor of Arts in English Language',
    BSPSYCH: 'Bachelor of Science in Psychology',
    BSCRIM: 'Bachelor of Science in Criminology',
    BEED: 'Bachelor of Elementary Education',
    BSED: 'Bachelor of Secondary Education',
    BPED: 'Bachelor of Physical Education',
  };

  async function loadStudentData() {
    try {
      const response = await fetch(`/api/students/${studentId}`);
      if (!response.ok) {
        throw new Error('Failed to load student data');
      }
      const student = await response.json();
      populateStudentData(student);
      mainContent.classList.remove('hidden'); // Show content after loading
    } catch (error) {
      console.error('Error loading student data:', error);
    }
  }

  /**
   * @param {Object} data - Object containing student data
   * @returns {void} - Updates UI elements with student data
   */
  function populateStudentData(data) {
    const {
      first_name,
      middle_name,
      last_name,
      student_id,
      email,
      course,
      year_level,
      mobile_number,
      birthdate,
      gender,
      street_address,
      city,
      state,
      zip_code,
    } = data;

    usernameDisplay.textContent = first_name;
    fullNameDisplay.textContent = `${first_name} ${middle_name || ''} ${last_name}`; // Handle missing middle name
    emailDisplay.textContent = email;
    genderDisplay.textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
    mobileNumberDisplay.textContent = mobile_number;
    birthdateDisplay.textContent = formatDate(birthdate);
    ageDisplay.textContent = calculateAge(birthdate);
    streetAddressDisplay.textContent = street_address;
    cityDisplay.textContent = city;
    stateDisplay.textContent = state;
    zipCodeDisplay.textContent = zip_code;
    studentIdDisplay.textContent = student_id;
    courseDisplay.textContent = courseMap[course?.toUpperCase()] || 'N/A'; // Handle potentially missing or invalid course
    yearLevelDisplay.textContent = formatYearLevel(year_level);
  }

  /**
   * @param {string} dateString - Date string in "YYYY-MM-DD" format
   * @returns {string} Formatted date string in "DD MMMM YYYY" format
   */
  function formatDate(dateString) {
    const birthdateObj = new Date(dateString);
    return birthdateObj.toLocaleDateString('en-GB', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });
  }

  /**
   * @param {string} birthdateString - Date string in "YYYY-MM-DD" format
   * @returns {string} Student age
   */
  function calculateAge(birthdateString) {
    const birthdateObj = new Date(birthdateString);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthdateObj.getFullYear();
    const monthDiff = currentDate.getMonth() - birthdateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthdateObj.getDate())) {
      age--;
    }
    return `${age} Years Old`;
  }

  /**
   * @param {number} year - Year level
   * @returns {string} Formatted year level
   */
  function formatYearLevel(year) {
    const suffix = year === 4 ? 'th' : year === 3 ? 'rd' : year === 2 ? 'nd' : year === 1 ? 'st' : 'th';
    return `${year}${suffix} Year`;
  }

  logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('studentId');
    window.location.href = 'login.html';
  });

  loadStudentData();
});
