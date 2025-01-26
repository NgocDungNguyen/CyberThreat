 // DDoS Concept Demonstrations
 function demonstrateServerLoad() {
    const loadBar = document.getElementById('loadBar');
    let load = 0;
    const loadInterval = setInterval(() => {
        load += 10;
        loadBar.style.width = `${load}%`;
        if (load >= 100) {
            clearInterval(loadInterval);
            setTimeout(() => {
                load = 0;
                loadBar.style.width = '0%';
                demonstrateServerLoad();
            }, 1000);
        }
    }, 200);
}

function demonstrateBandwidth() {
    const bandwidthFlow = document.getElementById('bandwidthFlow');
    let width = 0;
    const flowInterval = setInterval(() => {
        width += 2;
        bandwidthFlow.style.width = `${width}%`;
        if (width >= 100) {
            width = 0;
            bandwidthFlow.style.width = '0%';
        }
    }, 50);
}

function demonstrateResponseTime() {
    const responseTime = document.getElementById('responseTime');
    let time = 0;
    const responseInterval = setInterval(() => {
        time += 50;
        responseTime.textContent = `${time}ms`;
        if (time >= 1000) {
            clearInterval(responseInterval);
            setTimeout(() => {
                responseTime.textContent = '0ms';
                demonstrateResponseTime();
            }, 1000);
        }
    }, 50);
}

// DDoS Attack Simulation
const packetRateSlider = document.getElementById('packetRate');
const packetRateValue = document.getElementById('packetRateValue');
const attackerCountSlider = document.getElementById('attackerCount');
const attackerCountValue = document.getElementById('attackerCountValue');
const ddosSimulationArea = document.getElementById('ddosSimulationArea');
const server = document.getElementById('server');
const serverLoadBar = document.getElementById('serverLoadBar');
const serverLoadValue = document.getElementById('serverLoadValue');
const bandwidthBar = document.getElementById('bandwidthBar');
const bandwidthValue = document.getElementById('bandwidthValue');
const responseTimeBar = document.getElementById('responseTimeBar');
const responseTimeValue = document.getElementById('responseTimeValue');
const ddosExplanation = document.getElementById('ddosExplanation');

let packets = [];
let ddosAnimationId;

function updateDDoSSimulation() {
    const packetRate = parseInt(packetRateSlider.value);
    const attackerCount = parseInt(attackerCountSlider.value);

    packetRateValue.textContent = packetRate;
    attackerCountValue.textContent = attackerCount;

    // Clear existing packets
    packets.forEach(packet => packet.remove());
    packets = [];

    // Cancel the previous animation frame
    if (ddosAnimationId) {
        cancelAnimationFrame(ddosAnimationId);
    }

    // Create new packets
    for (let i = 0; i < attackerCount; i++) {
        createPacket();
    }

    // Start the animation
    animateDDoS();

    // Update server metrics
    const totalPackets = packetRate * attackerCount;
    const serverLoad = Math.min(totalPackets / 10, 100);
    const bandwidth = totalPackets * 0.1; // Assuming each packet is 0.1 Mbps
    const responseTime = Math.min(totalPackets, 1000);

    serverLoadBar.style.width = `${serverLoad}%`;
    serverLoadValue.textContent = `${serverLoad.toFixed(1)}%`;

    bandwidthBar.style.width = `${(bandwidth / 100) * 100}%`;
    bandwidthValue.textContent = `${bandwidth.toFixed(1)} Mbps`;

    responseTimeBar.style.width = `${(responseTime / 1000) * 100}%`;
    responseTimeValue.textContent = `${responseTime.toFixed(0)} ms`;

    // Update explanation
    if (serverLoad < 30) {
        ddosExplanation.textContent = "The server is handling the traffic well. No significant impact on performance.";
    } else if (serverLoad < 70) {
        ddosExplanation.textContent = "The server is under stress. Some users may experience slower response times.";
    } else {
        ddosExplanation.textContent = "The server is overwhelmed. Most users cannot access the service. This is a successful DDoS attack.";
    }

    // Apply shake effect to server when under heavy load
    if (serverLoad > 70) {
        server.style.animation = 'shake 0.5s infinite';
    } else {
        server.style.animation = 'none';
    }
}

function createPacket() {
    const packet = document.createElement('div');
    packet.className = 'packet';
    packet.style.left = `${Math.random() * 100}%`;
    packet.style.top = '-10px';
    ddosSimulationArea.appendChild(packet);
    packets.push(packet);
}

function animateDDoS() {
    packets.forEach(packet => {
        const rect = packet.getBoundingClientRect();
        if (rect.top > ddosSimulationArea.clientHeight) {
            packet.style.top = '-10px';
        } else {
            packet.style.top = `${rect.top + 5}px`;
        }
    });

    ddosAnimationId = requestAnimationFrame(animateDDoS);
}

// Malware Concept Demonstrations
function demonstrateNetwork() {
    const networkDemo = document.getElementById('networkDemo');
    networkDemo.innerHTML = ''; // Clear existing network
    // Create a simple network visualization
    for (let i = 0; i < 10; i++) {
        const computer = document.createElement('div');
        computer.className = 'w-4 h-4 bg-purple-500 rounded-full absolute';
        computer.style.left = `${Math.random() * 90}%`;
        computer.style.top = `${Math.random() * 90}%`;
        networkDemo.appendChild(computer);
    }
}

function demonstrateInfectionRate() {
    const infectionRateDemo = document.getElementById('infectionRateDemo');
    infectionRateDemo.innerHTML = ''; // Clear existing demonstration
    const totalComputers = 10;
    
    for (let i = 0; i < totalComputers; i++) {
        const computer = document.createElement('div');
        computer.className = 'w-4 h-4 bg-green-500 rounded-full inline-block mx-1';
        infectionRateDemo.appendChild(computer);
    }

    let infectedCount = 0;
    const infectionInterval = setInterval(() => {
        if (infectedCount < totalComputers) {
            infectionRateDemo.children[infectedCount].className = 'w-4 h-4 bg-red-500 rounded-full inline-block mx-1';
            infectedCount++;
        } else {
            clearInterval(infectionInterval);
            setTimeout(() => {
                infectedCount = 0;
                Array.from(infectionRateDemo.children).forEach(comp => {
                    comp.className = 'w-4 h-4 bg-green-500 rounded-full inline-block mx-1';
                });
                demonstrateInfectionRate();
            }, 1000);
        }
    }, 500);
}

// Malware Propagation Simulation
const infectionRateSlider = document.getElementById('infectionRate');
const infectionRateValue = document.getElementById('infectionRateValue');
const networkSizeSlider = document.getElementById('networkSize');
const networkSizeValue = document.getElementById('networkSizeValue');
const malwareSimulationArea = document.getElementById('malwareSimulationArea');
const infectedBar = document.getElementById('infectedBar');
const infectedValue = document.getElementById('infectedValue');
const timeElapsed = document.getElementById('timeElapsed');
const malwareExplanation = document.getElementById('malwareExplanation');

let computers = [];
let malwareInterval;
let malwareStartTime;

function updateMalwareSimulation() {
    const infectionRate = parseInt(infectionRateSlider.value);
    const networkSize = parseInt(networkSizeSlider.value);

    infectionRateValue.textContent = `${infectionRate}%`;
    networkSizeValue.textContent = `${networkSize} computers`;

    // Clear existing computers
    malwareSimulationArea.innerHTML = '';
    computers = [];

    // Create new computers
    for (let i = 0; i < networkSize; i++) {
        const computer = document.createElement('div');
        computer.className = 'computer absolute w-4 h-4 bg-green-500 rounded-full';
        computer.style.left = `${Math.random() * 95}%`;
        computer.style.top = `${Math.random() * 95}%`;
        malwareSimulationArea.appendChild(computer);
        computers.push(computer);
    }

    // Infect first computer
    computers[0].classList.remove('bg-green-500');
    computers[0].classList.add('bg-red-500', 'infected');

    // Start the simulation
    clearInterval(malwareInterval);
    malwareStartTime = Date.now();
    runMalwareSimulation();
}

function runMalwareSimulation() {
    const infectionRate = parseInt(infectionRateSlider.value) / 100;

    malwareInterval = setInterval(() => {
        const infectedComputers = computers.filter(c => c.classList.contains('infected'));
        const healthyComputers = computers.filter(c => !c.classList.contains('infected'));

        if (healthyComputers.length === 0) {
            clearInterval(malwareInterval);
            malwareExplanation.textContent = "All computers have been infected. The malware has spread throughout the entire network.";
            return;
        }

        infectedComputers.forEach(infected => {
            healthyComputers.forEach(healthy => {
                if (Math.random() < infectionRate) {
                    healthy.classList.remove('bg-green-500');
                    healthy.classList.add('bg-red-500', 'infected');
                }
            });
        });

        const infectedCount = computers.filter(c => c.classList.contains('infected')).length;
        const infectedPercentage = (infectedCount / computers.length) * 100;
        infectedBar.style.width = `${infectedPercentage}%`;
        infectedValue.textContent = `${infectedPercentage.toFixed(1)}%`;

        const elapsedTime = Math.floor((Date.now() - malwareStartTime) / 1000);
        timeElapsed.textContent = `${elapsedTime} seconds`;

        malwareExplanation.textContent = `${infectedCount} out of ${computers.length} computers have been infected in ${elapsedTime} seconds.`;
    }, 1000);
}

// Ransomware Concept Demonstrations
function demonstrateEncryption() {
    const encryptionDemo = document.getElementById('encryptionDemo');
    encryptionDemo.innerHTML = ''; // Clear existing demonstration
    const file = document.createElement('div');
    file.className = 'w-16 h-20 bg-blue-500 rounded flex items-center justify-center text-white text-2xl';
    file.innerHTML = '<i class="fas fa-file"></i>';
    encryptionDemo.appendChild(file);

    setInterval(() => {
        file.classList.toggle('bg-blue-500');
        file.classList.toggle('bg-red-500');
        file.innerHTML = file.classList.contains('bg-red-500') ? '<i class="fas fa-lock"></i>' : '<i class="fas fa-file"></i>';
    }, 2000);
}

function demonstrateEncryptionSpeed() {
    const encryptionSpeedDemo = document.getElementById('encryptionSpeedDemo');
    encryptionSpeedDemo.innerHTML = ''; // Clear existing demonstration
    const totalFiles = 10;

    for (let i = 0; i < totalFiles; i++) {
        const file = document.createElement('div');
        file.className = 'w-4 h-5 bg-blue-500 rounded inline-block mx-1';
        encryptionSpeedDemo.appendChild(file);
    }

    let encryptedFiles = 0;
    const encryptionInterval = setInterval(() => {
        if (encryptedFiles < totalFiles) {
            encryptionSpeedDemo.children[encryptedFiles].className = 'w-4 h-5 bg-red-500 rounded inline-block mx-1';
            encryptedFiles++;
        } else {
            clearInterval(encryptionInterval);
            setTimeout(() => {
                encryptedFiles = 0;
                Array.from(encryptionSpeedDemo.children).forEach(file => {
                    file.className = 'w-4 h-5 bg-blue-500 rounded inline-block mx-1';
                });
                demonstrateEncryptionSpeed();
            }, 1000);
        }
    }, 300);
}

// Ransomware Attack Simulation
const encryptionSpeedSlider = document.getElementById('encryptionSpeed');
const encryptionSpeedValue = document.getElementById('encryptionSpeedValue');
const fileCountSlider = document.getElementById('fileCount');
const fileCountValue = document.getElementById('fileCountValue');
const ransomwareSimulationArea = document.getElementById('ransomwareSimulationArea');
const encryptedBar = document.getElementById('encryptedBar');
const encryptedValue = document.getElementById('encryptedValue');
const ransomwareTimeElapsed = document.getElementById('ransomwareTimeElapsed');
const ransomwareExplanation = document.getElementById('ransomwareExplanation');

let files = [];
let ransomwareInterval;
let ransomwareStartTime;

function updateRansomwareSimulation() {
    const encryptionSpeed = parseInt(encryptionSpeedSlider.value);
    const fileCount = parseInt(fileCountSlider.value);

    encryptionSpeedValue.textContent = `${encryptionSpeed} files/sec`;
    fileCountValue.textContent = `${fileCount} files`;

    // Clear existing files
    ransomwareSimulationArea.innerHTML = '';
    files = [];

    // Create new files
    for (let i = 0; i < fileCount; i++) {
        const file = document.createElement('div');
        file.className = 'file absolute w-3 h-4 bg-blue-500 rounded';
        file.style.left = `${Math.random() * 95}%`;
        file.style.top = `${Math.random() * 95}%`;
        ransomwareSimulationArea.appendChild(file);
        files.push(file);
    }

    // Start the simulation
    clearInterval(ransomwareInterval);
    ransomwareStartTime = Date.now();
    runRansomwareSimulation();
}

function runRansomwareSimulation() {
    const encryptionSpeed = parseInt(encryptionSpeedSlider.value);
    let encryptedCount = 0;

    ransomwareInterval = setInterval(() => {
        for (let i = 0; i < encryptionSpeed; i++) {
            if (encryptedCount >= files.length) {
                clearInterval(ransomwareInterval);
                ransomwareExplanation.textContent = "All files have been encrypted. The ransomware attack is complete.";
                return;
            }

            files[encryptedCount].classList.remove('bg-blue-500');
            files[encryptedCount].classList.add('bg-red-500', 'encrypted');
            encryptedCount++;
        }

        const encryptedPercentage = (encryptedCount / files.length) * 100;
        encryptedBar.style.width = `${encryptedPercentage}%`;
        encryptedValue.textContent = `${encryptedPercentage.toFixed(1)}%`;

        const elapsedTime = Math.floor((Date.now() - ransomwareStartTime) / 1000);
        ransomwareTimeElapsed.textContent = `${elapsedTime} seconds`;

        ransomwareExplanation.textContent = `${encryptedCount} out of ${files.length} files have been encrypted in ${elapsedTime} seconds.`;
    }, 1000);
}

// Event listeners
packetRateSlider.addEventListener('input', updateDDoSSimulation);
attackerCountSlider.addEventListener('input', updateDDoSSimulation);
infectionRateSlider.addEventListener('input', updateMalwareSimulation);
networkSizeSlider.addEventListener('input', updateMalwareSimulation);
encryptionSpeedSlider.addEventListener('input', updateRansomwareSimulation);
fileCountSlider.addEventListener('input', updateRansomwareSimulation);

// Use Intersection Observer to trigger demonstrations when sections come into view
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            switch (sectionId) {
                case 'ddos':
                    demonstrateServerLoad();
                    demonstrateBandwidth();
                    demonstrateResponseTime();
                    updateDDoSSimulation();
                    break;
                case 'malware':
                    demonstrateNetwork();
                    demonstrateInfectionRate();
                    updateMalwareSimulation();
                    break;
                case 'ransomware':
                    demonstrateEncryption();
                    demonstrateEncryptionSpeed();
                    updateRansomwareSimulation();
                    break;
            }
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Start only DDoS demonstrations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    demonstrateServerLoad();
    demonstrateBandwidth();
    demonstrateResponseTime();
    updateDDoSSimulation();
});