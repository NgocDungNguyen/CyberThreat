const MOCK_DB = {
    users: [
        { id: 1, username: 'admin', password: 'hash123', email: 'admin@test.com' },
        { id: 2, username: 'user1', password: 'hash456', email: 'user1@test.com' }
    ],
    products: [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 }
    ]
};

const INJECTION_TEMPLATES = {
    union: `' UNION SELECT username,password FROM users-- `,
    error: `' OR CONVERT(int, @@version)-- `,
    blind: `' OR 1=1-- `,
    timeBased: `'; WAITFOR DELAY '0:0:5'-- `
};

function setupQueryInterface() {
    const queryType = document.getElementById('queryType');
    const sqlInput = document.getElementById('sqlInput');
    const executeBtn = document.getElementById('executeQuery');
    const templatesDiv = document.getElementById('injectionTemplates');
    const queryLog = document.getElementById('queryLog');
    const queryResult = document.getElementById('queryResult');

    // Populate injection templates
    Object.entries(INJECTION_TEMPLATES).forEach(([type, query]) => {
        templatesDiv.innerHTML += `
            <div class="p-2 hover:bg-gray-200 rounded cursor-pointer" 
                 onclick="document.getElementById('sqlInput').value='${query}'">
                ${type}: <span class="text-red-500">${query}</span>
            </div>
        `;
    });

    executeBtn.addEventListener('click', () => {
        const query = sqlInput.value;
        const type = queryType.value;
        executeQuery(query, type);
    });
}

function executeQuery(query, type) {
    const queryLog = document.getElementById('queryLog');
    const queryResult = document.getElementById('queryResult');
    
    // Log the query
    queryLog.innerHTML += `
        <div class="mb-2">
            <span class="text-blue-400">[${new Date().toLocaleTimeString()}]</span>
            <span class="text-yellow-400">[${type}]</span>
            <span>${query}</span>
        </div>
    `;
    queryLog.scrollTop = queryLog.scrollHeight;

    // Simulate query execution and show results
    let result;
    try {
        switch(type) {
            case 'union':
                result = simulateUnionAttack(query);
                break;
            case 'error':
                result = simulateErrorAttack(query);
                break;
            case 'blind':
                result = simulateBlindAttack(query);
                break;
            default:
                result = simulateNormalQuery(query);
        }

        queryResult.innerHTML = `
            <div class="mb-2 text-green-600">Query executed successfully</div>
            <pre class="bg-gray-50 p-2 rounded">${JSON.stringify(result, null, 2)}</pre>
        `;
    } catch(error) {
        queryResult.innerHTML = `
            <div class="text-red-500">Error: ${error.message}</div>
        `;
    }
}

// Add simulation functions for different attack types
function simulateUnionAttack(query) {
    if(query.toLowerCase().includes('union')) {
        return [...MOCK_DB.users];
    }
    return [];
}

function simulateErrorAttack(query) {
    if(query.includes('CONVERT')) {
        throw new Error('SQL Server Version: 12.0.2000.8');
    }
    return [];
}

function simulateBlindAttack(query) {
    return { 
        affected: query.includes('OR 1=1') ? MOCK_DB.users.length : 0,
        success: query.includes('OR 1=1')
    };
}

function simulateNormalQuery(query) {
    return { message: 'Query executed with standard sanitization' };
}

document.addEventListener('DOMContentLoaded', () => {
    const sqlSecurityLevelSlider = document.getElementById('securityLevel');
    const sqlSecurityLevelValue = document.getElementById('securityLevelValue');
    const sqlAttackComplexitySlider = document.getElementById('attackComplexity');
    const sqlAttackComplexityValue = document.getElementById('attackComplexityValue');
    const sqlInjectionSimulationArea = document.getElementById('sqlInjectionSimulationArea');
    const sqlSuccessfulInjectionsBar = document.getElementById('successfulInjectionsBar');
    const sqlSuccessfulInjectionsValue = document.getElementById('successfulInjectionsValue');
    const sqlPreventedInjectionsBar = document.getElementById('preventedInjectionsBar');
    const sqlPreventedInjectionsValue = document.getElementById('preventedInjectionsValue');
    const sqlInjectionExplanation = document.getElementById('sqlInjectionExplanation');
    
    
    setupQueryInterface();

    let sqlInjectionSimulationInterval;

    function updateSQLInjectionSimulation() {
        const securityLevel = parseInt(sqlSecurityLevelSlider.value);
        const attackComplexity = parseInt(sqlAttackComplexitySlider.value);

        sqlSecurityLevelValue.textContent = securityLevel;
        sqlAttackComplexityValue.textContent = attackComplexity;

        // Clear previous simulation
        clearInterval(sqlInjectionSimulationInterval);
        sqlInjectionSimulationArea.innerHTML = '';

        // Start the simulation
        runSQLInjectionSimulation();
    }

    function runSQLInjectionSimulation() {
        const securityLevel = parseInt(sqlSecurityLevelSlider.value);
        const attackComplexity = parseInt(sqlAttackComplexitySlider.value);

        let successfulInjections = 0;
        let totalAttempts = 0;

        sqlInjectionSimulationInterval = setInterval(() => {
            totalAttempts++;

            const isSuccessful = Math.random() < (attackComplexity / 10) * (1 - securityLevel / 10);
            
            if (isSuccessful) {
                successfulInjections++;
                sqlInjectionSimulationArea.innerHTML += `<p class="text-red-500">[Attempt ${totalAttempts}] SQL Injection successful: Data compromised!</p>`;
            } else {
                sqlInjectionSimulationArea.innerHTML += `<p>[Attempt ${totalAttempts}] SQL Injection failed: Security measures blocked the attack.</p>`;
            }

            sqlInjectionSimulationArea.scrollTop = sqlInjectionSimulationArea.scrollHeight;

            const successRate = (successfulInjections / totalAttempts) * 100;
            const preventionRate = 100 - successRate;

            sqlSuccessfulInjectionsBar.style.width = `${successRate}%`;
            sqlSuccessfulInjectionsValue.textContent = `${successRate.toFixed(1)}%`;

            sqlPreventedInjectionsBar.style.width = `${preventionRate}%`;
            sqlPreventedInjectionsValue.textContent = `${preventionRate.toFixed(1)}%`;

            sqlInjectionExplanation.textContent = `${successfulInjections} out of ${totalAttempts} SQL Injection attempts were successful. Higher security levels reduce the risk of successful attacks, while increased attack complexity makes them more likely to succeed.`;

            if (totalAttempts >= 20) {
                clearInterval(sqlInjectionSimulationInterval);
            }
        }, 1000);
    }

    // Placeholder functions
    function demonstrateSQLInjection() {
        const sqlInjectionDemo = document.getElementById('sqlInjectionDemo');
        sqlInjectionDemo.innerHTML = `
            < <div class="text-center">
                <p class="mb-2">Normal Query:</p>
                <code class="bg-gray-200 px-2 py-1 rounded">SELECT * FROM users WHERE username = 'input' AND password = 'input'</code>
                <p class="mt-2 mb-2">Injected Query:</p>
                <code class="bg-gray-200 px-2 py-1 rounded">SELECT * FROM users WHERE username = 'admin'--' AND password = 'anything'</code>
            </div>
        `;
    }
        
    
        
    function demonstratePrevention() {
        const preventionDemo = document.getElementById('preventionDemo');
        preventionDemo.innerHTML = `
            <ul class="list-disc list-inside text-sm">
                <li>Use parameterized queries</li>
                <li>Implement input validation</li>
                <li>Employ least privilege principle</li>
                <li>Regularly update and patch databases</li>
            </ul>
        `;
    }
    
    // Event listeners
    sqlSecurityLevelSlider.addEventListener('input', updateSQLInjectionSimulation);
    sqlAttackComplexitySlider.addEventListener('input', updateSQLInjectionSimulation);

    // Initialize demonstrations and simulation
    demonstrateSQLInjection();
    demonstratePrevention();
    updateSQLInjectionSimulation();
});