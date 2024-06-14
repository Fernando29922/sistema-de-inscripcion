document.addEventListener('DOMContentLoaded', (event) => {
    const clearButton = document.getElementById('clear-button');
    const registerButton = document.getElementById('register-button');
    const form = document.getElementById('personal-data-form');

    loadFormData();

    clearButton.addEventListener('click', () => {
        form.reset();
        clearValidationErrors();
        localStorage.removeItem('formData');
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        clearValidationErrors();
        if (validateForm()) {
            saveFormData();
            window.location.href = 'subject-selection.html';
        }
    });

    function clearValidationErrors() {
        const errorMessages = document.querySelectorAll('.validation-error');
        errorMessages.forEach(msg => msg.remove());
    }

    function validateForm() {
        let isValid = true;
        const fields = form.querySelectorAll('input, select');
        fields.forEach(field => {
            if (!field.checkValidity()) {
                isValid = false;
                showError(field, field.validationMessage);
            }
        });
        return isValid;
    }

    function showError(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error text-danger';
        errorDiv.innerText = message;
        field.parentNode.appendChild(errorDiv);
    }

    function saveFormData() {
        const formData = new FormData(form);
        let data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        localStorage.setItem('formData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const data = JSON.parse(savedData);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    form.elements[key].value = data[key];
                }
            }
        }
    }
});