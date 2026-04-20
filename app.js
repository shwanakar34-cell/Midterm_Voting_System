
async function refreshData() {
    const response = await fetch('get_votes.php');
    const data = await response.json();
    
    const buttonsDiv = document.getElementById('vote-buttons');
    const resultsDiv = document.getElementById('results-display');
    
    buttonsDiv.innerHTML = '';
    resultsDiv.innerHTML = '';

    data.forEach(item => {
        
        buttonsDiv.innerHTML += `<button onclick="sendVote(${item.id})">Vote ${item.name}</button>`;
        
         
        resultsDiv.innerHTML += `
            <div class="result-row">
                <span>${item.name}</span>
                <span><strong>${item.votes}</strong> votes</span>
            </div>`;
    });
}


async function sendVote(id) {
    await fetch('vote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: id })
    });
    alert("Vote Recorded!");
    refreshData(); 

refreshData(); 
}