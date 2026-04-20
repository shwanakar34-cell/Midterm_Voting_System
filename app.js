// Function to GET and show data
async function refreshData() {
    const response = await fetch('get_votes.php');
    const data = await response.json();
    
    const buttonsDiv = document.getElementById('vote-buttons');
    const resultsDiv = document.getElementById('results-display');
    
    buttonsDiv.innerHTML = '';
    resultsDiv.innerHTML = '';

    data.forEach(item => {
        // Build the buttons
        buttonsDiv.innerHTML += `<button onclick="sendVote(${item.id})">Vote ${item.name}</button>`;
        
        // Build the results display
        resultsDiv.innerHTML += `
            <div class="result-row">
                <span>${item.name}</span>
                <span><strong>${item.votes}</strong> votes</span>
            </div>`;
    });
}

// Function to POST a vote
async function sendVote(id) {
    await fetch('vote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: id })
    });
    alert("Vote Recorded!");
    refreshData(); // Refresh to show the updated data
}

// Initial load - this must be outside the functions!
refreshData();