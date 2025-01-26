function demonstrateSocialEngineering() {
    const socialEngineeringDemo = document.getElementById('socialEngineeringDemo');
    socialEngineeringDemo.innerHTML = `
        <div class="text-center">
            <p class="mb-2">Common Techniques:</p>
            <ul class="list-disc list-inside text-sm text-left">
                <li>Phishing emails</li>
                <li>Pretexting (false scenarios)</li>
                <li>Baiting with free offers</li>
                <li>Tailgating in secure areas</li>
            </ul>
        </div>
    `;
}

function demonstratePrevention() {
    const preventionDemo = document.getElementById('preventionDemo');
    preventionDemo.innerHTML = `
        <ul class="list-disc list-inside text-sm">
            <li>Regular security awareness training</li>
            <li>Implement strict verification procedures</li>
            <li>Encourage reporting of suspicious activities</li>
            <li>Conduct simulated phishing exercises</li>
        </ul>
    `;
}

// Social Engineering Attack Simulation
const socialEmployeeAwarenessSlider = document.getElementById('employeeAwareness');
const socialEmployeeAwarenessValue = document.getElementById('employeeAwarenessValue');
const socialAttackSophisticationSlider = document.getElementById('attackSophistication');
const socialAttackSophisticationValue = document.getElementById('attackSophisticationValue');
const socialEngineeringSimulationArea = document.getElementById('socialEngineeringSimulationArea');
const socialSuccessfulAttacksBar = document.getElementById('successfulAttacksBar');
const socialSuccessfulAttacksValue = document.getElementById('successfulAttacksValue');
const socialPreventedAttemptsBar = document.getElementById('preventedAttemptsBar');
const socialPreventedAttemptsValue = document.getElementById('preventedAttemptsValue');
const socialEngineeringExplanation = document.getElementById('socialEngineeringExplanation');

let socialSimulationInterval;

const attackTypes = [
    "Phishing email",
    "Pretexting phone call",
    "Baiting with USB drive",
    "Tailgating attempt",
    "Impersonation of IT support"
];

function updateSocialEngineeringSimulation() {
    const employeeAwareness = parseInt(socialEmployeeAwarenessSlider.value);
    const attackSophistication = parseInt(socialAttackSophisticationSlider.value);

    socialEmployeeAwarenessValue.textContent = employeeAwareness;
    socialAttackSophisticationValue.textContent = attackSophistication;

    // Clear previous simulation
    clearInterval(socialSimulationInterval);
    socialEngineeringSimulationArea.innerHTML = '';

    // Start the simulation
    runSocialEngineeringSimulation();
}

function runSocialEngineeringSimulation() {
    const employeeAwareness = parseInt(socialEmployeeAwarenessSlider.value);
    const attackSophistication = parseInt(socialAttackSophisticationSlider.value);

    let successfulAttacks = 0;
    let totalAttempts = 0;

    socialSimulationInterval = setInterval(() => {
        totalAttempts++;

        const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
        const isSuccessful = Math.random() < (attackSophistication / 10) * (1 - employeeAwareness / 10);
        
        if (isSuccessful) {
            successfulAttacks++;
            socialEngineeringSimulationArea.innerHTML += `<p class="text-red-500">[Attempt ${totalAttempts}] ${attackType} successful: Employee compromised!</p>`;
        } else {
            socialEngineeringSimulationArea.innerHTML += `<p>[Attempt ${totalAttempts}] ${attackType} failed: Employee recognized and reported the attempt.</p>`;
        }

        socialEngineeringSimulationArea.scrollTop = socialEngineeringSimulationArea.scrollHeight;

        const successRate = (successfulAttacks / totalAttempts) * 100;
        const preventionRate = 100 - successRate;

        socialSuccessfulAttacksBar.style.width = `${successRate}%`;
        socialSuccessfulAttacksValue.textContent = `${successRate.toFixed(1)}%`;

        socialPreventedAttemptsBar.style.width = `${preventionRate}%`;
        socialPreventedAttemptsValue.textContent = `${preventionRate.toFixed(1)}%`;

        socialEngineeringExplanation.textContent = `${successfulAttacks} out of ${totalAttempts} social engineering attempts were successful. Higher employee awareness reduces the risk of successful attacks, while increased attack sophistication makes them more likely to succeed.`;

        if (totalAttempts >= 20) {
            clearInterval(socialSimulationInterval);
        }
    }, 1000);
}

// Event listeners
socialEmployeeAwarenessSlider.addEventListener('input', updateSocialEngineeringSimulation);
socialAttackSophisticationSlider.addEventListener('input', updateSocialEngineeringSimulation);

// Initialize demonstrations and simulation
document.addEventListener('DOMContentLoaded', () => {
    demonstrateSocialEngineering();
    demonstratePrevention();
    updateSocialEngineeringSimulation();
});