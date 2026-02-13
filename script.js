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

    // 1. Logic: Every time they type a habit, add 20 points
    let currentScore = parseInt(meter.value) || 0;
    let newScore = currentScore + 20;

    if (newScore > 100) newScore = 100; 

    // 2. Update the UI
    meter.value = newScore;
    scoreDisplay.innerText = "Score: " + newScore;

    // 3. Add to the Habit Log
    const entry = document.createElement('li');
    entry.style.listStyle = "none";
    entry.style.padding = "5px";
    entry.innerHTML = `✅ ${habitText}`;
    list.prepend(entry);

    // 4. Clear the box
    habitInput.value = "";
}