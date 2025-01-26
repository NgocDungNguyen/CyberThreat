function demonstrateCredentialStuffing() {
    const credentialStuffingDemo = document.getElementById('credentialStuffingDemo');
    credentialStuffingDemo.innerHTML = `
        <div class="text-center">
            <p class="mb-2">Stolen Credentials:</p>
            <code class="bg-gray-200 px-2 py-1 rounded">username1:password123<br>username2:qwerty</code>
            <p class="mt-2 mb-2">Automated Login Attempts:</p>
            <div class="bg-gray-200 px-2 py-1 rounded">
                [Website A] → [Website B] → [Website C]
            </div>
        </div>
    `;
}

function demonstratePrevention() {
    const preventionDemo = document.getElementById('preventionDemo');
    preventionDemo.innerHTML = `
        <ul class="list-disc list-inside text-sm">
            <li>Use unique passwords for each account</li>
            <li>Implement multi-factor authentication</li>
            <li>Use CAPTCHAs to prevent automation</li>
            <li>Monitor for suspicious login attempts</li>
        </ul>
    `;
}

// Credential Stuffing Attack Simulation
const securityLevelSlider = document.getElementById('securityLevel');
const securityLevelValue = document.getElementById('securityLevelValue');
const credentialListSizeSlider = document.getElementById('credentialListSize');
const credentialListSizeValue = document.getElementById('credentialListSizeValue');
const credentialStuffingSimulationArea = document.getElementById('credentialStuffingSimulationArea');
const successfulBreachesBar = document.getElementById('successfulBreachesBar');
const successfulBreachesValue = document.getElementById('successfulBreachesValue');
const preventedAttemptsBar = document.getElementById('preventedAttemptsBar');
const preventedAttemptsValue = document.getElementById('preventedAttemptsValue');
const credentialStuffingExplanation = document.getElementById('credentialStuffingExplanation');

let simulationInterval;

function updateCredentialStuffingSimulation() {
    const securityLevel = parseInt(securityLevelSlider.value);
    const credentialListSize = parseInt(credentialListSizeSlider.value);

    securityLevelValue.textContent = securityLevel;
    credentialListSizeValue.textContent = credentialListSize;

    // Clear previous simulation
    clearInterval(simulationInterval);
    credentialStuffingSimulationArea.innerHTML = '';

    // Start the simulation
    runCredentialStuffingSimulation();
}

function runCredentialStuffingSimulation() {
    const securityLevel = parseInt(securityLevelSlider.value);
    const credentialListSize = parseInt(credentialListSizeSlider.value);

    let successfulBreaches = 0;
    let totalAttempts = 0;

    simulationInterval = setInterval(() => {
        totalAttempts++;

        const isSuccessful = Math.random() < (credentialListSize / 10000) * (1 - securityLevel / 10);
        
        if (isSuccessful) {
            successfulBreaches++;
            credentialStuffingSimulationArea.innerHTML += `<p class="text-red-500">[Attempt ${totalAttempts}] Account breach successful: Unauthorized access gained!</p>`;
        } else {
            credentialStuffingSimulationArea.innerHTML += `<p>[Attempt ${totalAttempts}] Login attempt failed: Credentials invalid or account protected.</p>`;
        }

        credentialStuffingSimulationArea.scrollTop = credentialStuffingSimulationArea.scrollHeight;

        const successRate = (successfulBreaches / totalAttempts) * 100;
        const preventionRate = 100 - successRate;

        successfulBreachesBar.style.width = `${successRate}%`;
        successfulBreachesValue.textContent = `${successRate.toFixed(1)}%`;

        preventedAttemptsBar.style.width = `${preventionRate}%`;
        preventedAttemptsValue.textContent = `${preventionRate.toFixed(1)}%`;

        credentialStuffingExplanation.textContent = `${successfulBreaches} out of ${totalAttempts} credential stuffing attempts were successful. Higher security levels and smaller stolen credential lists reduce the risk of successful attacks.`;

        if (totalAttempts >= Math.min(credentialListSize, 100)) {
            clearInterval(simulationInterval);
        }
    }, 100);
}

// Event listeners
securityLevelSlider.addEventListener('input', updateCredentialStuffingSimulation);
credentialListSizeSlider.addEventListener('input', updateCredentialStuffingSimulation);

// Initialize demonstrations and simulation
document.addEventListener('DOMContentLoaded', () => {
    demonstrateCredentialStuffing();
    demonstratePrevention();
    updateCredentialStuffingSimulation();
});