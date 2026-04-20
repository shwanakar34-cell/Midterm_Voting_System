async function refreshData() {
    const response = await fetch('get_votes.php');
    const data = await response.json();
    
    const buttonsDiv = document.getElementById('vote-buttons');
    const resultsDiv = document.getElementById('results-display');
    
    buttonsDiv.innerHTML = '';
    resultsDiv.innerHTML = '';

    data.forEach(item => {
        const isFull = item.votes >= item.max_votes;
        
       
        buttonsDiv.innerHTML += `
            <button onclick="sendVote(${item.id})" ${isFull ? 'disabled' : ''}>
                ${isFull ? 'LIMIT REACHED' : 'Vote ' + item.name}
            </button>`;
        
        
        resultsDiv.innerHTML += `
            <div class="result-row">
                <span>
                    ${item.name}
                   ${isFull ? '<span class="limit-reached-badge">LIMIT REACHED</span>' : ''}
                </span>
                <div class="vote-count-container">
                    <span class="vote-count-text">${item.votes}</span>
                    <span style="color: #a0aec0;"> / ${item.max_votes}</span>
                </div>
            </div>`;
    });
}

async function sendVote(id) {
    const response = await fetch('vote.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: id })
    });
    
    const result = await response.json();
    
    if(result.status === 'error') {
        alert(result.message);
    } else {
        alert("Success! Your vote has been recorded.");
    }
    
    refreshData();
}

refreshData();