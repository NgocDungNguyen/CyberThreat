// Import zxcvbn library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/zxcvbn/4.4.2/zxcvbn.js';
document.head.appendChild(script);

// DOM Elements
const UI = {
    securityLevel: document.getElementById('securityLevel'),
    securityLevelValue: document.getElementById('securityLevelValue'),
    credentialListSize: document.getElementById('credentialListSize'),
    credentialListSizeValue: document.getElementById('credentialListSizeValue'),
    simulationArea: document.getElementById('credentialStuffingSimulationArea'),
    successBar: document.getElementById('successfulBreachesBar'),
    successValue: document.getElementById('successfulBreachesValue'),
    preventedBar: document.getElementById('preventedAttemptsBar'),
    preventedValue: document.getElementById('preventedAttemptsValue'),
    explanation: document.getElementById('credentialStuffingExplanation'),
    passwordInput: document.getElementById('passwordInput'),
    strengthDisplay: document.getElementById('passwordStrength'),
    crackTimeDisplay: document.getElementById('crackTime'),
    commonPasswords: document.getElementById('commonPasswords'),
    rateLimitStatus: document.getElementById('rateLimitStatus'),
    rateLimitBar: document.getElementById('rateLimitBar'),
    resetTimer: document.getElementById('resetTimer')
};

// Constants and Databases
const PASSWORD_DATABASE = {
    common: {
        'password': '2.5M occurrences',
        '123456': '23.2M occurrences',
        'qwerty': '3.8M occurrences',
        'admin': '1.2M occurrences',
        'welcome': '0.9M occurrences'
    },
    breached: new Set([
        'user1:password123',
        'admin:admin123',
        'john:welcome1',
        'mary:qwerty123'
    ])
};

// Rate Limiter Class
class RateLimiter {
    constructor(maxAttempts = 10, timeWindow = 60000) {
        this.attempts = new Map();
        this.maxAttempts = maxAttempts;
        this.timeWindow = timeWindow;
    }

    isRateLimited(ip) {
        const now = Date.now();
        const attempts = this.attempts.get(ip) || [];
        const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
        this.attempts.set(ip, recentAttempts);
        return recentAttempts.length >= this.maxAttempts;
    }

    addAttempt(ip) {
        const attempts = this.attempts.get(ip) || [];
        attempts.push(Date.now());
        this.attempts.set(ip, attempts);
    }

    getRemainingAttempts(ip) {
        const attempts = this.attempts.get(ip) || [];
        const now = Date.now();
        const recentAttempts = attempts.filter(time => now - time < this.timeWindow);
        return Math.max(0, this.maxAttempts - recentAttempts.length);
    }

    reset() {
        this.attempts.clear();
    }
}

// Password Analyzer Class
class PasswordAnalyzer {
    static analyzeStrength(password) {
        if (!password) {
            return {
                score: 0,
                message: 'No password provided',
                crackTimes: this.getDefaultCrackTimes(),
                feedback: { warning: '', suggestions: [] }
            };
        }

        try {
            const result = zxcvbn(password);
            return {
                score: result.score,
                crackTimes: this.calculateCrackTimes(result),
                feedback: result.feedback,
                warning: result.feedback.warning,
                suggestions: result.feedback.suggestions
            };
        } catch (error) {
            console.error('Password analysis error:', error);
            return {
                score: 0,
                crackTimes: this.getDefaultCrackTimes(),
                feedback: { 
                    warning: 'Error analyzing password', 
                    suggestions: ['Please try again'] 
                }
            };
        }
    }

    static calculateCrackTimes(result) {
        const times = result.crack_times_seconds || {};
        return {
            offline_fast: this.formatTime(times.offline_fast_hashing_1e10 || 0),
            offline_slow: this.formatTime(times.offline_slow_hashing_1e4_per_second || 0),
            online_throttled: this.formatTime(times.online_throttling_100_per_hour || 0),
            online_unthrottled: this.formatTime(times.online_no_throttling_10_per_second || 0)
        };
    }

    static getDefaultCrackTimes() {
        return {
            offline_fast: '0 seconds',
            offline_slow: '0 seconds',
            online_throttled: '0 seconds',
            online_unthrottled: '0 seconds'
        };
    }

    static formatTime(seconds) {
        if (seconds === 0) return '0 seconds';
        if (seconds === Infinity) return 'centuries';

        const units = [
            { limit: 60, unit: 'second' },
            { limit: 3600, unit: 'minute', divisor: 60 },
            { limit: 86400, unit: 'hour', divisor: 3600 },
            { limit: 31536000, unit: 'day', divisor: 86400 },
            { limit: Infinity, unit: 'year', divisor: 31536000 }
        ];

        for (const { limit, unit, divisor = 1 } of units) {
            if (seconds < limit) {
                const value = Math.round(seconds / divisor);
                return `${value} ${unit}${value !== 1 ? 's' : ''}`;
            }
        }
    }
}

// Simulation Controller Class
class SimulationController {
    constructor() {
        this.rateLimiter = new RateLimiter();
        this.simulationInterval = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        UI.passwordInput?.addEventListener('input', this.handlePasswordInput.bind(this));
        UI.securityLevel?.addEventListener('input', this.updateSimulation.bind(this));
        UI.credentialListSize?.addEventListener('input', this.updateSimulation.bind(this));
        document.addEventListener('DOMContentLoaded', this.initialize.bind(this));
    }

    handlePasswordInput(event) {
        const analysis = PasswordAnalyzer.analyzeStrength(event.target.value);
        this.updatePasswordStrengthUI(analysis);
    }

    updatePasswordStrengthUI(analysis) {
        const colors = ['red', 'orange', 'yellow', 'green', 'darkgreen'];
        
        UI.strengthDisplay.innerHTML = `
            <div class="flex items-center">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="h-2.5 rounded-full" 
                         style="width: ${(analysis.score + 1) * 20}%; 
                                background-color: ${colors[analysis.score]}">
                    </div>
                </div>
                <span class="ml-2">Score: ${analysis.score}/4</span>
            </div>
        `;

        UI.crackTimeDisplay.innerHTML = `
            <div class="mt-2">
                <p class="font-semibold">Estimated crack times:</p>
                <ul class="mt-1 text-sm space-y-1">
                    <li>⚡ Fast hash (GPU): ${analysis.crackTimes?.offline_fast || 'calculating...'}</li>
                    <li>🐌 Slow hash (CPU): ${analysis.crackTimes?.offline_slow || 'calculating...'}</li>
                    <li>🌐 Online (throttled): ${analysis.crackTimes?.online_throttled || 'calculating...'}</li>
                    <li>🚀 Online (unthrottled): ${analysis.crackTimes?.online_unthrottled || 'calculating...'}</li>
                </ul>
                ${analysis.warning ? 
                    `<p class="mt-2 text-red-500">${analysis.warning}</p>` : ''}
                ${(analysis.suggestions || []).map(s => 
                    `<p class="mt-1 text-gray-600">• ${s}</p>`).join('')}
            </div>
        `;
    }

    updateSimulation() {
        const securityLevel = parseInt(UI.securityLevel.value);
        const credentialListSize = parseInt(UI.credentialListSize.value);

        UI.securityLevelValue.textContent = securityLevel;
        UI.credentialListSizeValue.textContent = credentialListSize;

        clearInterval(this.simulationInterval);
        UI.simulationArea.innerHTML = '';

        this.runSimulation(securityLevel, credentialListSize);
    }

    runSimulation(securityLevel, credentialListSize) {
        let successfulBreaches = 0;
        let totalAttempts = 0;
        const simulatedIP = '192.168.1.1';

        this.simulationInterval = setInterval(() => {
            if (this.rateLimiter.isRateLimited(simulatedIP)) {
                this.updateRateLimitStatus(simulatedIP);
                return;
            }

            totalAttempts++;
            this.rateLimiter.addAttempt(simulatedIP);

            const isInBreachDatabase = Math.random() < 0.1;
            const baseSuccess = isInBreachDatabase ? 0.3 : 0.1;
            const isSuccessful = Math.random() < baseSuccess * 
                               (credentialListSize / 10000) * 
                               (1 - securityLevel / 10);

            if (isSuccessful) successfulBreaches++;

            this.updateSimulationUI(isSuccessful, totalAttempts, successfulBreaches, simulatedIP);

            if (totalAttempts >= Math.min(credentialListSize, 100)) {
                clearInterval(this.simulationInterval);
            }
        }, 100);
    }

    updateSimulationUI(isSuccessful, attempts, successes, ip) {
        UI.simulationArea.innerHTML += `
            <p class="${isSuccessful ? 'text-red-500' : ''}">[Attempt ${attempts}] 
                ${isSuccessful ? 
                    'Account breach successful: Unauthorized access gained!' : 
                    'Login attempt failed: Credentials invalid or account protected.'}
            </p>
        `;
        UI.simulationArea.scrollTop = UI.simulationArea.scrollHeight;

        const successRate = (successes / attempts) * 100;
        const preventionRate = 100 - successRate;

        UI.successBar.style.width = `${successRate}%`;
        UI.successValue.textContent = `${successRate.toFixed(1)}%`;
        UI.preventedBar.style.width = `${preventionRate}%`;
        UI.preventedValue.textContent = `${preventionRate.toFixed(1)}%`;

        this.updateRateLimitStatus(ip);
    }

    updateRateLimitStatus(ip) {
        const remaining = this.rateLimiter.getRemainingAttempts(ip);
        
        UI.rateLimitStatus.innerHTML = `
            <div class="mb-2">
                ${remaining === 0 ? 
                    'Rate limit reached! Please wait 60 seconds.' :
                    `${remaining}/10 attempts remaining`}
            </div>
            <div class="text-sm text-gray-600">
                Reset in: <span id="resetTimer">60</span>s
            </div>
        `;
        
        UI.rateLimitBar.style.width = `${(remaining / 10) * 100}%`;
        
        if (remaining === 0) this.startResetCountdown();
    }

    startResetCountdown() {
        let timeLeft = 60;
        const countdown = setInterval(() => {
            timeLeft--;
            const timer = document.getElementById('resetTimer');
            if (timer) timer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                this.rateLimiter.reset();
                this.updateRateLimitStatus('192.168.1.1');
            }
        }, 1000);
    }

    initialize() {
        this.displayCommonPasswordStats();
        this.updateSimulation();
        this.addControlButtons();
    }

    displayCommonPasswordStats() {
        UI.commonPasswords.innerHTML = `
            <h4 class="font-semibold mb-2">Most Common Passwords:</h4>
            <ul class="list-disc list-inside">
                ${Object.entries(PASSWORD_DATABASE.common)
                    .map(([pass, count]) => `
                        <li>${pass}: ${count}</li>
                    `).join('')}
            </ul>
            <p class="mt-2 text-red-600">
                Using any of these passwords puts your account at extreme risk!
            </p>
        `;
    }

    addControlButtons() {
        const buttonContainer = document.querySelector('.bg-yellow-50');
        
        const testButton = document.createElement('button');
        testButton.className = 'bg-blue-500 text-white px-4 py-2 rounded mt-2 mr-2';
        testButton.textContent = 'Test Rate Limit';
        testButton.onclick = () => {
            const ip = '192.168.1.1';
            this.rateLimiter.addAttempt(ip);
            this.updateRateLimitStatus(ip);
            UI.simulationArea.innerHTML += `
                <p class="text-yellow-500">
                    [Rate Limit Test] Attempt made - 
                    ${this.rateLimiter.getRemainingAttempts(ip)} remaining
                </p>
            `;
            UI.simulationArea.scrollTop = UI.simulationArea.scrollHeight;
        };

        const resetButton = document.createElement('button');
        resetButton.className = 'bg-red-500 text-white px-4 py-2 rounded mt-2';
        resetButton.textContent = 'Reset Rate Limit';
        resetButton.onclick = () => {
            this.rateLimiter.reset();
            this.updateRateLimitStatus('192.168.1.1');
            UI.simulationArea.innerHTML += `
                <p class="text-green-500">
                    [Rate Limit Reset] Counter reset - 10 attempts available
                </p>
            `;
            UI.simulationArea.scrollTop = UI.simulationArea.scrollHeight;
        };

        buttonContainer.appendChild(testButton);
        buttonContainer.appendChild(resetButton);
    }
}

// Initialize with error handling
try {
    new SimulationController();
} catch (error) {
    console.error('Error initializing simulation:', error);
    document.querySelector('.bg-yellow-50').innerHTML = `
        <div class="text-red-500">
            Error initializing simulation. Please refresh the page.
        </div>
    `;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PasswordAnalyzer,
        RateLimiter,
        SimulationController
    };
}