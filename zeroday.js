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

function demonstrateTimeline() {
    const timelineDemo = document.getElementById('timelineDemo');
    timelineDemo.innerHTML = `
        <div class="relative w-full h-full p-4">
            <!-- Timeline Track -->
            <div class="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 transform -translate-y-1/2">
                <div class="absolute top-0 left-0 h-full bg-blue-500 timeline-progress"></div>
            </div>

            <!-- Phase Nodes -->
            <div class="flex justify-between items-center relative h-full">
                <!-- Discovery Phase -->
                <div class="phase-node" data-phase="discovery">
                    <div class="w-12 h-12 bg-blue-500 rounded-full pulse-effect flex items-center justify-center">
                        <i class="fas fa-search text-white"></i>
                    </div>
                    <div class="packet-animation"></div>
                    <p class="mt-2 text-sm font-bold">Discovery</p>
                </div>

                <!-- Analysis Phase -->
                <div class="phase-node" data-phase="analysis">
                    <div class="w-12 h-12 bg-yellow-500 rounded-full pulse-effect flex items-center justify-center">
                        <i class="fas fa-microscope text-white"></i>
                    </div>
                    <div class="packet-animation"></div>
                    <p class="mt-2 text-sm font-bold">Analysis</p>
                </div>

                <!-- Detection Phase -->
                <div class="phase-node" data-phase="detection">
                    <div class="w-12 h-12 bg-red-500 rounded-full pulse-effect flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-white"></i>
                    </div>
                    <div class="packet-animation"></div>
                    <p class="mt-2 text-sm font-bold">Detection</p>
                </div>

                <!-- Patch Phase -->
                <div class="phase-node" data-phase="patch">
                    <div class="w-12 h-12 bg-green-500 rounded-full pulse-effect flex items-center justify-center">
                        <i class="fas fa-shield-alt text-white"></i>
                    </div>
                    <p class="mt-2 text-sm font-bold">Patch</p>
                </div>
            </div>
        </div>
    `;

    animateTimeline();
}

function demonstrateThreatIntelligence() {
    const threatIntelligenceDemo = document.getElementById('threatIntelligenceDemo');
    threatIntelligenceDemo.innerHTML = `
        <div class="relative w-full h-full bg-gray-900 p-4 overflow-hidden">
            <!-- Network Grid -->
            <div class="network-grid"></div>
            
            <!-- Scanning Effect -->
            <div class="scan-line"></div>
            
            <!-- Threat Indicators -->
            <div class="threat-indicators"></div>
            
            <!-- Alert Overlay -->
            <div class="alert-overlay hidden">
                <div class="alert-content">
                    <i class="fas fa-exclamation-triangle text-yellow-500"></i>
                    <span>Threat Detected</span>
                </div>
            </div>
        </div>
    `;

    createNetworkGrid();
    animateThreatDetection();
}

function animateTimeline() {
    let currentPhase = 0;
    const phases = document.querySelectorAll('.phase-node');
    const progress = document.querySelector('.timeline-progress');

    function updatePhase() {
        phases.forEach((phase, index) => {
            if (index === currentPhase) {
                phase.classList.add('active');
                phase.querySelector('.pulse-effect').classList.add('animate-pulse');
            } else {
                phase.classList.remove('active');
                phase.querySelector('.pulse-effect').classList.remove('animate-pulse');
            }
        });

        progress.style.width = `${(currentPhase + 1) * (100/4)}%`;
        
        currentPhase = (currentPhase + 1) % 4;
    }

    setInterval(updatePhase, 3000);
}

function createNetworkGrid() {
    const grid = document.querySelector('.network-grid');
    for (let i = 0; i < 50; i++) {
        const node = document.createElement('div');
        node.className = 'network-node';
        node.style.left = `${Math.random() * 100}%`;
        node.style.top = `${Math.random() * 100}%`;
        grid.appendChild(node);
    }
}

function animateThreatDetection() {
    const indicators = document.querySelector('.threat-indicators');
    
    function createThreat() {
        const threat = document.createElement('div');
        threat.className = 'threat-point';
        threat.style.left = `${Math.random() * 100}%`;
        threat.style.top = `${Math.random() * 100}%`;
        indicators.appendChild(threat);

        setTimeout(() => {
            threat.remove();
        }, 2000);
    }

    setInterval(createThreat, 1000);
}

// Add required CSS
const style = document.createElement('style');
style.textContent = `
    .timeline-progress { transition: width 0.5s ease-in-out; }
    .phase-node { position: relative; z-index: 1; }
    .pulse-effect { transition: all 0.3s ease; }
    .packet-animation { position: absolute; width: 100%; height: 2px; }
    
    .network-grid { position: relative; width: 100%; height: 100%; }
    .network-node {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(59, 130, 246, 0.5);
        border-radius: 50%;
    }
    
    .scan-line {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 2px;
        background: rgba(59, 130, 246, 0.8);
        animation: scan 3s linear infinite;
    }
    
    .threat-point {
        position: absolute;
        width: 8px;
        height: 8px;
        background: rgba(239, 68, 68, 0.8);
        border-radius: 50%;
        animation: pulse 1s ease-out;
    }
    
    @keyframes scan {
        0% { top: 0; }
        100% { top: 100%; }
    }
    

`;

document.head.appendChild(style);

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
            zeroDaySimulationArea.innerHTML += `<p class="text-red-500 animate-pulse">[Attempt ${totalAttempts}] Exploit successful: Vulnerability exploited!</p>`;
        } else {
            zeroDaySimulationArea.innerHTML += `<p class="animate-bounce">[Attempt ${totalAttempts}] Exploit failed: System defenses blocked the attack.</p>`;
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
    demonstrateTimeline();
    demonstrateThreatIntelligence();
    updateZeroDaySimulation();
});