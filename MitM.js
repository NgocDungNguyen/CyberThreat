// MitM Concept Demonstrations
function demonstrateMitMConcept() {
    const mitmConceptDemo = document.getElementById('mitmConceptDemo');
    mitmConceptDemo.innerHTML = `
        <div class="flex items-center justify-between w-full">
            <div class="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div class="w-8 h-8 bg-red-500 rounded-full"></div>
            <div class="w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
    `;
}

function demonstrateEncryption() {
    const encryptionDemo = document.getElementById('encryptionDemo');
    encryptionDemo.innerHTML = `
        <div class="flex items-center space-x-2">
            <div class="text-2xl">🔓</div>
            <div class="text-2xl">➡️</div>
            <div class="text-2xl">🔒</div>
        </div>
    `;
}

// MitM Attack Simulation
const attackerCapabilitySlider = document.getElementById('attackerCapability');
const attackerCapabilityValue = document.getElementById('attackerCapabilityValue');
const encryptionLevelSlider = document.getElementById('encryptionLevel');
const encryptionLevelValue = document.getElementById('encryptionLevelValue');
const mitmSimulationArea = document.getElementById('mitmSimulationArea');
const interceptedPacketsBar = document.getElementById('interceptedPacketsBar');
const interceptedPacketsValue = document.getElementById('interceptedPacketsValue');
const secureTransmissionsBar = document.getElementById('secureTransmissionsBar');
const secureTransmissionsValue = document.getElementById('secureTransmissionsValue');
const mitmExplanation = document.getElementById('mitmExplanation');

let dataPackets = [];
let mitmInterval;

function updateMitMSimulation() {
    const attackerCapability = parseInt(attackerCapabilitySlider.value);
    const encryptionLevel = parseInt(encryptionLevelSlider.value);

    attackerCapabilityValue.textContent = attackerCapability;
    encryptionLevelValue.textContent = encryptionLevel;

    // Clear existing packets
    dataPackets.forEach(packet => packet.remove());
    dataPackets = [];

    // Start the simulation
    clearInterval(mitmInterval);
    runMitMSimulation();
}

function createDataPacket() {
    const packet = document.createElement('div');
    packet.className = 'data-packet absolute w-4 h-4 bg-yellow-400 rounded-full';
    packet.style.left = '40px';
    packet.style.top = `${Math.random() * 80 + 10}%`;
    mitmSimulationArea.appendChild(packet);
    dataPackets.push(packet);
}

function runMitMSimulation() {
    const attackerCapability = parseInt(attackerCapabilitySlider.value);
    const encryptionLevel = parseInt(encryptionLevelSlider.value);

    let interceptedPackets = 0;
    let totalPackets = 0;

    mitmInterval = setInterval(() => {
        createDataPacket();
        totalPackets++;

        dataPackets.forEach(packet => {
            const rect = packet.getBoundingClientRect();
            const simulationRect = mitmSimulationArea.getBoundingClientRect();

            if (rect.right > simulationRect.right) {
                packet.remove();
                dataPackets = dataPackets.filter(p => p !== packet);
            } else {
                const newLeft = rect.left - simulationRect.left + 5;
                packet.style.left = `${newLeft}px`;

                // Check for interception
                if (newLeft > simulationRect.width / 2 - 20 && newLeft < simulationRect.width / 2 + 20) {
                    if (Math.random() < attackerCapability / 10 - encryptionLevel / 20) {
                        packet.classList.remove('bg-yellow-400');
                        packet.classList.add('bg-red-500');
                        interceptedPackets++;
                    }
                }
            }
        });

        const interceptedPercentage = (interceptedPackets / totalPackets) * 100;
        const securePercentage = 100 - interceptedPercentage;

        interceptedPacketsBar.style.width = `${interceptedPercentage}%`;
        interceptedPacketsValue.textContent = `${interceptedPercentage.toFixed(1)}%`;

        secureTransmissionsBar.style.width = `${securePercentage}%`;
        secureTransmissionsValue.textContent = `${securePercentage.toFixed(1)}%`;

        mitmExplanation.textContent = `${interceptedPackets} out of ${totalPackets} data packets were intercepted. Higher encryption levels reduce the risk of successful MitM attacks.`;
    }, 500);
}

// Event listeners
attackerCapabilitySlider.addEventListener('input', updateMitMSimulation);
encryptionLevelSlider.addEventListener('input', updateMitMSimulation);

// Initialize demonstrations and simulation
document.addEventListener('DOMContentLoaded', () => {
    demonstrateMitMConcept();
    demonstrateEncryption();
    updateMitMSimulation();
});