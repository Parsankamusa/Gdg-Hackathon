function calculateAge() {
    // Reset error messages
    clearErrors();

    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Validate inputs
    if (!validateInputs(day, month, year)) {
        return;
    }

    // Calculate age
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageMonths--;
        ageDays += daysInLastMonth;
    }

    // Animate results
    animateValue('years', ageYears);
    animateValue('months', ageMonths);
    animateValue('days', ageDays);
}

function validateInputs(day, month, year) {
    let isValid = true;

    // Check empty fields
    if (!day || !month || !year) {
        showError('dayError', 'This field is required');
        showError('monthError', 'This field is required');
        showError('yearError', 'This field is required');
        return false;
    }

    // Validate day
    if (day < 1 || day > 31) {
        showError('dayError', 'Must be a valid day');
        isValid = false;
    }

    // Validate month
    if (month < 1 || month > 12) {
        showError('monthError', 'Must be a valid month');
        isValid = false;
    }

    // Validate year
    const currentYear = new Date().getFullYear();
    if (year > currentYear) {
        showError('yearError', 'Must be in the past');
        isValid = false;
    }

    // Validate date
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day) {
        showError('dayError', 'Must be a valid date');
        isValid = false;
    }

    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearErrors() {
    ['dayError', 'monthError', 'yearError'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
}

function animateValue(elementId, value) {
    const element = document.getElementById(elementId);
    anime({
        targets: element,
        innerHTML: [0, value],
        round: 1,
        duration: 2000,
        easing: 'easeInOutExpo'
    });
}