document.getElementById('cs-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default submit action

    const form = event.target;
    const formData = new FormData(form);
    const statusDiv = document.getElementById('form-status');
    const successMessage = document.getElementById('success-message');
    const spinner = document.getElementById('spinner');
    const captchaAnswer = document.getElementById('captcha').value; // Get CAPTCHA answer
    startLoading();

    // Validate CAPTCHA answer
    const parsedAnswer = parseInt(captchaAnswer, 10); // Convert CAPTCHA answer to an integer

    if (parsedAnswer !== captchaSolution) {
        alert('Bitte beantworten Sie die Mathematikfrage korrekt.');
        stopLoading();
        return; // Prevent form submission if CAPTCHA is incorrect
    }

    // Convert form data to JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        const response = await fetch('https://kqhvajmsv5.execute-api.eu-central-1.amazonaws.com/release/formsubmission?domain=cosmo-digital.at', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jsonData),
        });

        if (response.ok) {
            // Redirect to the success page
            window.location.href = '/anfrage-erhalten'; // Adjust this URL to your success page
        } else {
            alert('Etwas ist schiefgelaufen, bitte versuchen Sie es später erneut.');
        }
    } catch (error) {
        console.log(error);
        alert('Etwas ist schiefgelaufen, bitte versuchen Sie es später erneut.');
    }
});

let captchaSolution = null;

function generateCaptcha() {
    // Randomly choose the operation
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    var num1 = Math.floor(Math.random() * 10) + 1;  // Random number between 1 and 10
    var num2 = Math.floor(Math.random() * 10) + 1;  // Random number between 1 and 10

    // Ensure subtraction does not result in a negative number
    if (operation === '-' && num2 > num1) {
        // Swap num1 and num2 to ensure the result is positive
        [num1, num2] = [num2, num1];
    }

    // Generate the math question and solution
    let question = `${num1} ${operation} ${num2}`;
    captchaSolution = operation === '+' ? num1 + num2 : num1 - num2;

    // Display the question in the form
    document.getElementById('captcha-question').textContent = `Was ist ${question}?`;

    // Debugging: Log the generated question and solution
    console.log(`Generated CAPTCHA: ${question}`);
    console.log(`Solution: ${captchaSolution}`);
}

// Generate CAPTCHA when the page loads
window.onload = function() {
    generateCaptcha();
};

function startLoading() {
    const form = document.getElementById('cs-form');
    const spinner = document.getElementById('spinner');
    const container = document.querySelector('#cs-contact .cs-container');
    const rightSection = document.querySelector('.cs-right-section');

    // Hide irrelevant parts during loading
    form.style.display = 'none';
    rightSection.style.display = 'none';
    spinner.style.display = 'flex';

    container.style.justifyContent = 'center';

    // Scroll to the spinner
    spinner.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function stopLoading() {
    const form = document.getElementById('cs-form');
    const spinner = document.getElementById('spinner');
    const rightSection = document.querySelector('.cs-right-section');

    // Show form and hide spinner
    form.style.display = 'flex';
    rightSection.style.display = 'block';
    spinner.style.display = 'none';
}