// New Global Variables for Challenges and Streaks
const challenges = [
    "Use a reusable water bottle all day",
    "Walk or bike for a short trip instead of driving",
    "Compost your food scraps today",
    "Avoid all single-use plastic for 24 hours"
];

let streak = 0;
let lastLoggedDate = null;
function calculateScore() {
    const habitInput = document.getElementById('habitDesc');
    const habitText = habitInput.value.trim();
    const meter = document.getElementById('greenMeter');
    const scoreDisplay = document.getElementById('scoreText');
    const list = document.getElementById('habitList');

    if (habitText === "") {
        alert("Please type a habit first!");
        return;
    }

    const positiveHabits = ["recycle", "reused", "public transport", "saved", "planted", "eco","reuse","reclaim","bicycle","compost","reusable"];
    const negativeHabits = ["plastic", "waste", "pollution", "threw", "excessive","depletion","accumulation","contamination","wasted"];

    let currentScore = parseInt(meter.value) || 0;
    let text = habitText.toLowerCase();

    // 1. Perform Keyword Checks
    const matchedPositive = positiveHabits.some(word => text.includes(word));
    const matchedNegative = negativeHabits.some(word => text.includes(word));

    // 2. Logic for Score Updates and Streaks
    if (matchedPositive && !matchedNegative) {
        currentScore += 90; // Increase score for positive habit
        
        // --- STREAK INCREASE LOGIC ---
        const today = new Date().toDateString();
        if (lastLoggedDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            // Only increase if they logged yesterday or it's their first time
            if (lastLoggedDate === yesterday.toDateString() || lastLoggedDate === null) {
                streak++;
            } else {
                streak = 1; // Restart streak if they missed a day
            }
            lastLoggedDate = today;
        }
    } else if (matchedNegative && !matchedPositive) {
        currentScore -= 10; // Decrease score for negative habit

        // --- STREAK RESET LOGIC ---
        streak = 0; // Reset streak to 0 for negative habits
        lastLoggedDate = null; 
    } else {
        currentScore += 5; // Default for neutral habits
    }

    // 3. Keep score between 0 and 100
    if (currentScore > 100) currentScore = 100;
    if (currentScore < 0) currentScore = 0;

    // 4. Update the UI Elements
    meter.value = currentScore;
    scoreDisplay.innerText = "Score: " + currentScore;

    // Update Streak Display
    const streakDisplay = document.getElementById('streakCount');
    if (streakDisplay) {
        streakDisplay.innerText = streak;
    }

    // Update Daily Challenge Display (Picks a new challenge on each click)
    const challengeText = document.getElementById('currentChallenge');
    if (challengeText) {
        challengeText.innerText = challenges[Math.floor(Math.random() * challenges.length)];
    }

    // Update the Tip (Checks if a custom one is saved in localStorage)
    const tipDisplay = document.getElementById('dailyTip');
    const savedCustomTip = localStorage.getItem('userCustomTip');
    if (!savedCustomTip) {
        tipDisplay.value = tips[Math.floor(Math.random() * tips.length)];
    } else {
        tipDisplay.value = savedCustomTip;
    }
} // <--- Final closing brace of the calculateScore function

    // Keep score between 0 and 100
    if (currentScore > 100) currentScore = 100;
    if (currentScore < 0) currentScore = 0;

    meter.value = currentScore;
    scoreDisplay.innerText = "Score: " + currentScore;
    // Update Daily Challenge Display
    const challengeText = document.getElementById('currentChallenge');
    if (challengeText) {
        challengeText.innerText = challenges[Math.floor(Math.random() * challenges.length)];
    }

    // Update the Streak Logic
    const today = new Date().toDateString();
    

    if (lastLoggedDate !== today) {
        // If they logged yesterday, increase the streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastLoggedDate === yesterday.toDateString()) {
            streak++;
        } else if (lastLoggedDate === null) {
            streak = 1; // Start their very first streak
        } else {
            streak = 1; // Reset streak if they missed a day
        }
        
        lastLoggedDate = today;
        if (streakDisplay) {
            streakDisplay.innerText = streak;
        }
    }
