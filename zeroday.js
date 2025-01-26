// Zero-Day Exploit Concept Demonstrations
function demonstrateZeroDay() {
    const zeroDayDemo = document.getElementById('zeroDayDemo');
    zeroDayDemo.innerHTML = `
        <div class="text-center">
            <p class="mb-2">Unknown Vulnerability:</p>
            <code class="bg-gray-200 px-2 py-1 rounded">Buffer Overflow in Module X</code>
            <p class="mt-2 mb-2">Exploitation:</p>
            <div class="bg-gray-200 px-2 py-1 rounded">
                [Exploit Code Injected]
            </div>
        </div>
    `;
}

function demonstrateMitigation() {
    const mitigationDemo = document.getElementById('mitigationDemo');
    mitigationDemo.innerHTML = `
        <ul class="list-disc list-inside text-sm">
            <li>Use Intrusion Detection Systems (IDS)</li>
            <li>Apply security patches promptly</li>
            <li>Employ behavior-based threat detection</li>
            <li>Conduct regular vulnerability assessments</li>
        </ul>
    `;
}

// Zero-Day Exploit Simulation
const zeroDaySystemVulnerabilitySlider = document.getElementById('systemVulnerability');
const zeroDaySystemVulnerabilityValue = document.getElementById('systemVulnerabilityValue');
const zeroDayExploitSophisticationSlider = document.getElementById('exploitSophistication');
const zeroDayExploitSophisticationValue = document.getElementById('exploitSophisticationValue');
const zeroDaySimulationArea = document.getElementById('zeroDaySimulationArea');
const zeroDaySuccessfulExploitsBar = document.getElementById('successfulExploitsBar');
const zeroDaySuccessfulExploitsValue = document.getElementById('successfulExploitsValue');
const zeroDayPreventedExploitsBar = document.getElementById('preventedExploitsBar');
const zeroDayPreventedExploitsValue = document.getElementById('preventedExploitsValue');
const zeroDayExplanation = document.getElementById('zeroDayExplanation');

let zeroDaySimulationInterval;

function updateZeroDaySimulation() {
    const systemVulnerability = parseInt(zeroDaySystemVulnerabilitySlider.value);
    const exploitSophistication = parseInt(zeroDayExploitSophisticationSlider.value);

    zeroDaySystemVulnerabilityValue.textContent = systemVulnerability;
    zeroDayExploitSophisticationValue.textContent = exploitSophistication;

    // Clear previous simulation
    clearInterval(zeroDaySimulationInterval);
    zeroDaySimulationArea.innerHTML = '';

    // Start the simulation
    runZeroDaySimulation();
}

function runZeroDaySimulation() {
    const systemVulnerability = parseInt(zeroDaySystemVulnerabilitySlider.value);
    const exploitSophistication = parseInt(zeroDayExploitSophisticationSlider.value);

    let successfulExploits = 0;
    let totalAttempts = 0;

    zeroDaySimulationInterval = setInterval(() => {
        totalAttempts++;

        const isSuccessful = Math.random() < (exploitSophistication / 10) * (systemVulnerability / 10);
        
        if (isSuccessful) {
            successfulExploits++;
            zeroDaySimulationArea.innerHTML += `<p class="text-red-500">[Attempt ${totalAttempts}] Exploit successful: Vulnerability exploited!</p>`;
        } else {
            zeroDaySimulationArea.innerHTML += `<p>[Attempt ${totalAttempts}] Exploit failed: System defenses blocked the attack.</p>`;
        }

        zeroDaySimulationArea.scrollTop = zeroDaySimulationArea.scrollHeight;

        const successRate = (successfulExploits / totalAttempts) * 100;
        const preventionRate = 100 - successRate;

        zeroDaySuccessfulExploitsBar.style.width = `${successRate}%`;
        zeroDaySuccessfulExploitsValue.textContent = `${successRate.toFixed(1)}%`;

        zeroDayPreventedExploitsBar.style.width = `${preventionRate}%`;
        zeroDayPreventedExploitsValue.textContent = `${preventionRate.toFixed(1)}%`;

        zeroDayExplanation.textContent = `${successfulExploits} out of ${totalAttempts} Zero-Day Exploit attempts were successful. Lower system vulnerability and less sophisticated exploits reduce the risk of successful attacks.`;

        if (totalAttempts >= 20) {
            clearInterval(zeroDaySimulationInterval);
        }
    }, 1000);
}

// Event listeners
zeroDaySystemVulnerabilitySlider.addEventListener('input', updateZeroDaySimulation);
zeroDayExploitSophisticationSlider.addEventListener('input', updateZeroDaySimulation);

// Initialize demonstrations and simulation
document.addEventListener('DOMContentLoaded', () => {
    demonstrateZeroDay();
    demonstrateMitigation();
    updateZeroDaySimulation();
});