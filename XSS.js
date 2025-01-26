function demonstrateXssConcept() {
    const xssConceptDemo = document.getElementById('xssConceptDemo');
    xssConceptDemo.innerHTML = `
        <div class="text-center">
            <p class="mb-2">Normal Input:</p>
            <code class="bg-gray-200 px-2 py-1 rounded">Hello, World!</code>
            <p class="mt-2 mb-2">Malicious Input:</p>
            <code class="bg-gray-200 px-2 py-1 rounded">&lt;script&gt;alert('Hacked!')&lt;/script&gt;</code>
        </div>
    `;
}

function demonstrateXssPrevention() {
    const xssPreventionDemo = document.getElementById('xssPreventionDemo');
    xssPreventionDemo.innerHTML = `
        <ul class="list-disc list-inside text-sm">
            <li>Sanitize user inputs</li>
            <li>Escape special characters</li>
            <li>Implement Content Security Policies (CSP)</li>
            <li>Use secure frameworks</li>
        </ul>
    `;
}

// XSS Attack Simulation
const inputSanitizationSlider = document.getElementById('inputSanitization');
const inputSanitizationValue = document.getElementById('inputSanitizationValue');
const scriptSophisticationSlider = document.getElementById('scriptSophistication');
const scriptSophisticationValue = document.getElementById('scriptSophisticationValue');
const xssSimulationArea = document.getElementById('xssSimulationArea');
const successfulXssBar = document.getElementById('successfulXssBar');
const successfulXssValue = document.getElementById('successfulXssValue');
const blockedAttemptsBar = document.getElementById('blockedAttemptsBar');
const blockedAttemptsValue = document.getElementById('blockedAttemptsValue');
const xssExplanation = document.getElementById('xssExplanation');

let xssInterval;

function updateXssSimulation() {
    const inputSanitization = parseInt(inputSanitizationSlider.value);
    const scriptSophistication = parseInt(scriptSophisticationSlider.value);

    inputSanitizationValue.textContent = inputSanitization;
    scriptSophisticationValue.textContent = scriptSophistication;

    // Clear previous simulation
    clearInterval(xssInterval);
    xssSimulationArea.innerHTML = '';

    // Start the simulation
    runXssSimulation();
}

function runXssSimulation() {
    const inputSanitization = parseInt(inputSanitizationSlider.value);
    const scriptSophistication = parseInt(scriptSophisticationSlider.value);

    let successfulXss = 0;
    let totalAttempts = 0;

    xssInterval = setInterval(() => {
        totalAttempts++;

        const isSuccessful = Math.random() < (scriptSophistication / 10) * (1 - inputSanitization / 10);
        
        if (isSuccessful) {
            successfulXss++;
            xssSimulationArea.innerHTML += `<p class="text-red-500">[Attempt ${totalAttempts}] XSS successful: Malicious script executed!</p>`;
        } else {
            xssSimulationArea.innerHTML += `<p>[Attempt ${totalAttempts}] XSS blocked: Input sanitized successfully.</p>`;
        }

        xssSimulationArea.scrollTop = xssSimulationArea.scrollHeight;

        const successRate = (successfulXss / totalAttempts) * 100;
        const blockRate = 100 - successRate;

        successfulXssBar.style.width = `${successRate}%`;
        successfulXssValue.textContent = `${successRate.toFixed(1)}%`;

        blockedAttemptsBar.style.width = `${blockRate}%`;
        blockedAttemptsValue.textContent = `${blockRate.toFixed(1)}%`;

        xssExplanation.textContent = `${successfulXss} out of ${totalAttempts} XSS attempts were successful. Higher input sanitization levels reduce the risk of successful attacks.`;

        if (totalAttempts >= 20) {
            clearInterval(xssInterval);
        }
    }, 1000);
}

// Event listeners
inputSanitizationSlider.addEventListener('input', updateXssSimulation);
scriptSophisticationSlider.addEventListener('input', updateXssSimulation);

// Initialize demonstrations and simulation
document.addEventListener('DOMContentLoaded', () => {
    demonstrateXssConcept();
    demonstrateXssPrevention();
    updateXssSimulation();
});