// Core Data Structures
const scenarios = {
    awareness: [{
        situation: "Security awareness training session",
        choices: [
            { text: "Complete training now", correct: true },
            { text: "Skip for later", correct: false },
            { text: "Delegate to someone else", correct: false }
        ]
    }],
    phoneCall: [{
        situation: "Someone claiming to be IT support requests your password",
        choices: [
            { text: "Provide password", correct: false },
            { text: "Verify caller's identity", correct: true },
            { text: "Report to security", correct: true }
        ]
    }, {
        situation: "Caller claims to be your bank requiring urgent account verification",
        choices: [
            { text: "Provide account details", correct: false },
            { text: "Hang up and call bank directly", correct: true },
            { text: "Share partial information only", correct: false }
        ]
    }],
    socialMedia: [{
        situation: "Received friend request from CEO's apparent account",
        choices: [
            { text: "Accept immediately", correct: false },
            { text: "Verify through official channels", correct: true },
            { text: "Ignore/Report", correct: true }
        ]
    }, {
        situation: "Direct message offering exclusive company investment",
        choices: [
            { text: "Click provided link", correct: false },
            { text: "Report to IT security", correct: true },
            { text: "Share with colleagues", correct: false }
        ]
    }],
    physical: [{
        situation: "Someone without badge asks to hold the door",
        choices: [
            { text: "Let them in", correct: false },
            { text: "Ask for credentials", correct: true },
            { text: "Direct to security desk", correct: true }
        ]
    }, {
        situation: "USB drive found in parking lot",
        choices: [
            { text: "Plug it in to check contents", correct: false },
            { text: "Turn it in to IT security", correct: true },
            { text: "Throw it away", correct: false }
        ]
    }]
};

const attackTypes = [
    "Phishing email attack",
    "Vishing (voice phishing) call",
    "Tailgating attempt",
    "USB baiting attack",
    "Impersonation attempt",
    "Dumpster diving operation",
    "Social media engineering",
    "Fake software update",
    "Pretexting scenario",
    "QR code phishing",
    "Smishing (SMS phishing)",
    "Watering hole attack"
];

let simulationStats = {
    totalAttempts: 0,
    successfulAttacks: 0,
    preventedAttempts: 0,
    currentAwareness: 5,
    currentSophistication: 5,
    lastUpdateTime: new Date()
};

function initializeAttackSimulation() {
    const simulationArea = document.getElementById('socialEngineeringSimulationArea');
    if (!simulationArea) return;
    
    simulationArea.innerHTML = `
        <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-semibold mb-2">Active Attack Simulation</h3>
            <div id="attackSimulation" class="min-h-[200px] overflow-y-auto">
                <div class="text-gray-500 text-sm">
                    Simulation will begin when sliders are adjusted...
                </div>
            </div>
        </div>
    `;
}

// Update initializeVisualizations function
function initializeVisualizations() {
    try {
        initializeSocialEngineeringDemo();
        initializePreventionDemo();
        initializeAttackSimulation();
    } catch (error) {
        console.error('Error initializing visualizations:', error);
    }
}

function initializeSocialEngineeringDemo() {
    const demo = document.getElementById('socialEngineeringDemo');
    if(!demo) return;
    
    demo.innerHTML = `
        <div class="relative h-full flex items-center justify-center">
            <div class="grid grid-cols-3 gap-4 w-full">
                <div class="text-center">
                    <i class="fas fa-user-secret text-4xl text-red-500"></i>
                    <p>Attacker</p>
                </div>
                <div class="text-center">
                    <i class="fas fa-arrow-right text-4xl text-gray-400"></i>
                </div>
                <div class="text-center">
                    <i class="fas fa-user text-4xl text-blue-500"></i>
                    <p>Target</p>
                </div>
            </div>
        </div>
    `;
}

function initializePreventionDemo() {
    const demo = document.getElementById('preventionDemo');
    if(!demo) return;
    
    demo.innerHTML = `
        <div class="grid grid-cols-3 gap-4 h-full">
            <div class="prevention-item flex flex-col items-center justify-center">
                <i class="fas fa-shield-alt text-3xl text-green-500"></i>
                <p>Education</p>
            </div>
            <div class="prevention-item flex flex-col items-center justify-center">
                <i class="fas fa-lock text-3xl text-green-500"></i>
                <p>Policies</p>
            </div>
            <div class="prevention-item flex flex-col items-center justify-center">
                <i class="fas fa-users text-3xl text-green-500"></i>
                <p>Awareness</p>
            </div>
        </div>
    `;
}

// Simulation Control Functions
function updateSocialEngineeringSimulation() {
    const awareness = parseInt(document.getElementById('employeeAwareness').value);
    const sophistication = parseInt(document.getElementById('attackSophistication').value);
    
    simulationStats.currentAwareness = awareness;
    simulationStats.currentSophistication = sophistication;
    
    updateDisplayValues();
    resetSimulation();
    runSimulationCycle();
}

function updateDisplayValues() {
    document.getElementById('employeeAwarenessValue').textContent = simulationStats.currentAwareness;
    document.getElementById('attackSophisticationValue').textContent = simulationStats.currentSophistication;
}

function resetSimulation() {
    clearInterval(window.simulationInterval);
    const simulationArea = document.getElementById('socialEngineeringSimulationArea');
    if(simulationArea) simulationArea.innerHTML = '';
    
    simulationStats = {
        ...simulationStats,
        totalAttempts: 0,
        successfulAttacks: 0,
        preventedAttempts: 0,
        lastUpdateTime: new Date()
    };
}

function runSimulationCycle() {
    window.simulationInterval = setInterval(() => {
        const successChance = calculateSuccessChance();
        const attackResult = simulateAttack(successChance);
        updateSimulationDisplay(attackResult);
        updateStats(attackResult);
        
        if(simulationStats.totalAttempts >= 20) {
            clearInterval(window.simulationInterval);
        }
    }, 1000);
}

function calculateSuccessChance() {
    return (simulationStats.currentSophistication / 10) * 
           (1 - simulationStats.currentAwareness / 10);
}

function simulateAttack(successChance) {
    const isSuccessful = Math.random() < successChance;
    const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
    
    return {
        type: attackType,
        successful: isSuccessful,
        timestamp: new Date()
    };
}

function updateSimulationDisplay(attackResult) {
    const simulationArea = document.getElementById('socialEngineeringSimulationArea');
    if(!simulationArea) return;

    const resultHtml = `
        <div class="mb-2 ${attackResult.successful ? 'text-red-600' : 'text-green-600'}">
            [${attackResult.timestamp.toLocaleTimeString()}] ${attackResult.type}: 
            ${attackResult.successful ? 'Attack succeeded!' : 'Attack prevented!'}
        </div>`;
        
    simulationArea.innerHTML = resultHtml + simulationArea.innerHTML;
}

// Statistics Functions
function updateStats(attackResult) {
    simulationStats.totalAttempts++;
    if(attackResult.successful) {
        simulationStats.successfulAttacks++;
    } else {
        simulationStats.preventedAttempts++;
    }
    
    updateProgressBars();
    updateExplanationText();
}

function updateProgressBars() {
    const successRate = (simulationStats.successfulAttacks / simulationStats.totalAttempts) * 100 || 0;
    const preventionRate = (simulationStats.preventedAttempts / simulationStats.totalAttempts) * 100 || 0;

    document.getElementById('successfulAttacksBar').style.width = `${successRate}%`;
    document.getElementById('successfulAttacksValue').textContent = `${successRate.toFixed(1)}%`;
    
    document.getElementById('preventedAttemptsBar').style.width = `${preventionRate}%`;
    document.getElementById('preventedAttemptsValue').textContent = `${preventionRate.toFixed(1)}%`;
}

function updateExplanationText() {
    const explanation = document.getElementById('socialEngineeringExplanation');
    if(!explanation) return;
    
    explanation.textContent = 
        `With ${simulationStats.currentAwareness}/10 employee awareness and ` +
        `${simulationStats.currentSophistication}/10 attack sophistication, ` +
        `${simulationStats.successfulAttacks} out of ${simulationStats.totalAttempts} attacks succeeded.`;
}

// Scenario Management Functions
function renderScenario(type, scenario) {
    // Map scenario types to HTML IDs
    const idMapping = {
        phoneCall: 'phoneCall',
        socialMedia: 'socialMedia',
        physical: 'physicalSecurity', // Match HTML ID
        awareness: 'awareness'
    };

    const mappedType = idMapping[type];
    const scenarioDiv = document.getElementById(`${mappedType}Scenario`);
    const choicesDiv = document.getElementById(`${mappedType}Choices`);
    
    if(!scenarioDiv || !choicesDiv) {
        console.log(`Could not find elements for type: ${type}, mapped: ${mappedType}`);
        return;
    }

    scenarioDiv.innerHTML = `
        <div class="bg-white p-4 rounded-lg shadow-sm mb-4">
            <h5 class="font-semibold text-gray-800 mb-3">${scenario.situation}</h5>
            <div id="${mappedType}Result" class="mt-4"></div>
        </div>
    `;
    
    choicesDiv.innerHTML = scenario.choices.map((choice, index) => `
        <button 
            class="w-full p-3 mb-2 text-left border rounded-lg hover:bg-gray-50 
                   transition-colors duration-200 ease-in-out focus:outline-none 
                   focus:ring-2 focus:ring-blue-500"
            onclick="evaluateChoice('${mappedType}', ${index}, ${choice.correct})"
        >
            <span class="inline-block w-6 h-6 mr-2 text-center rounded-full 
                         border-2 border-gray-300">${index + 1}</span>
            ${choice.text}
        </button>
    `).join('');
}

function evaluateChoice(type, choiceIndex, correct) {
    const resultDiv = document.getElementById(`${type}Result`);
    if(!resultDiv) return;

    simulationStats.totalAttempts++;
    
    if(correct) {
        simulationStats.preventedAttempts++;
        resultDiv.innerHTML = `
            <div class="p-3 bg-green-50 border border-green-200 rounded">
                <p class="text-green-700">✓ Correct response! Good security practice.</p>
                <p class="text-sm text-green-600 mt-1">You successfully prevented a security breach.</p>
            </div>`;
    } else {
        simulationStats.successfulAttacks++;
        resultDiv.innerHTML = `
            <div class="p-3 bg-red-50 border border-red-200 rounded">
                <p class="text-red-700">✗ Incorrect - Security breach!</p>
                <p class="text-sm text-red-600 mt-1">This response could lead to a security compromise.</p>
            </div>`;
    }
    
    updateStats({ successful: !correct });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    try {
        initializeVisualizations();
        
        // Render all scenarios for each type
        Object.keys(scenarios).forEach(type => {
            try {
                // Render each scenario in the type
                scenarios[type].forEach((scenario, index) => {
                    renderScenario(type, scenario);
                });
            } catch (error) {
                console.error(`Error rendering scenario type ${type}:`, error);
            }
        });

        // Finally add event listeners
        const awarenessSlider = document.getElementById('employeeAwareness');
        const sophisticationSlider = document.getElementById('attackSophistication');

        if (awarenessSlider && sophisticationSlider) {
            awarenessSlider.addEventListener('input', updateSocialEngineeringSimulation);
            sophisticationSlider.addEventListener('input', updateSocialEngineeringSimulation);
            updateSocialEngineeringSimulation();
        }
    } catch (error) {
        console.error('Error in initialization:', error);
    }
});