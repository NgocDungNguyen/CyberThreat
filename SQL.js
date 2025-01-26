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