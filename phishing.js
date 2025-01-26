 const emailCountSlider = document.getElementById('emailCount');
 const emailCountValue = document.getElementById('emailCountValue');
 const phishingSimulationArea = document.getElementById('phishingSimulationArea');
 const correctBar = document.getElementById('correctBar');
 const correctValue = document.getElementById('correctValue');
 const incorrectBar = document.getElementById('incorrectBar');
 const incorrectValue = document.getElementById('incorrectValue');
 const phishingExplanation = document.getElementById('phishingExplanation');

 let emails = [];
 let correctCount = 0;
 let incorrectCount = 0;

 function updatePhishingSimulation() {
     const emailCount = parseInt(emailCountSlider.value);
     emailCountValue.textContent = `${emailCount} emails`;

     // Clear existing emails
     phishingSimulationArea.innerHTML = '';
     emails = [];

     // Generate new emails
     for (let i = 0; i < emailCount; i++) {
         const isPhishing = Math.random() < 0.5; // 50% chance of being phishing
         const email = document.createElement('div');
         email.className = `email p-4 mb-2 rounded-lg cursor-pointer ${isPhishing ? 'phishing' : 'legitimate'}`;
         email.textContent = isPhishing ? 'Phishing Email: Click here to reset your password!' : 'Legitimate Email: Your order has been shipped.';
         email.addEventListener('click', () => handleEmailClick(email, isPhishing));
         phishingSimulationArea.appendChild(email);
         emails.push(email);
     }

     // Reset counters
     correctCount = 0;
     incorrectCount = 0;
     updateProgress();
 }

 function handleEmailClick(email, isPhishing) {
     if (email.classList.contains('user-action')) return; // Prevent multiple clicks
     email.classList.add('user-action');

     if (isPhishing) {
         email.style.border = '2px solid green';
         correctCount++;
     } else {
         email.style.border = '2px solid red';
         incorrectCount++;
     }

     updateProgress();
 }

 function updateProgress() {
     const totalEmails = emails.length;
     const correctPercentage = (correctCount / totalEmails) * 100;
     const incorrectPercentage = (incorrectCount / totalEmails) * 100;

     correctBar.style.width = `${correctPercentage}%`;
     correctValue.textContent = `${correctPercentage.toFixed(1)}%`;

     incorrectBar.style.width = `${incorrectPercentage}%`;
     incorrectValue.textContent = `${incorrectPercentage.toFixed(1)}%`;

     phishingExplanation.textContent = `You have correctly identified ${correctCount} out of ${totalEmails} emails.`;
 }

 emailCountSlider.addEventListener('input', updatePhishingSimulation);

 // Initial phishing simulation update
 updatePhishingSimulation();