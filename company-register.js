document.getElementById('companyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const companyData = {
        name: document.getElementById('companyName').value,
        email: document.getElementById('email').value,
        location: document.getElementById('location').value,
        positions: []
    };
    
    // Get positions
    const positionTitles = document.querySelectorAll('[name="positionTitle"]');
    const positionTraits = document.querySelectorAll('[name="positionTraits"]');
    
    positionTitles.forEach((titleInput, index) => {
        if (titleInput.value.trim()) {
            companyData.positions.push({
                title: titleInput.value,
                traits: positionTraits[index].value.split(',').map(t => t.trim()).filter(t => t)
            });
        }
    });
    
    // Save to localStorage
    const companies = JSON.parse(localStorage.getItem('companies')) || [];
    companies.push(companyData);
    localStorage.setItem('companies', JSON.stringify(companies));
    
    // Show success message
    alert('Company registration successful!');
    window.location.href = 'index.html';
});

// Add more position fields dynamically
document.getElementById('addPosition').addEventListener('click', function() {
    const positionsContainer = document.getElementById('positionsContainer');
    const positionCount = positionsContainer.querySelectorAll('.position-group').length;
    
    if (positionCount >= 5) {
        alert('Maximum 5 positions allowed');
        return;
    }
    
    const newPosition = document.createElement('div');
    newPosition.className = 'position-group';
    newPosition.innerHTML = `
        <div class="form-group">
            <label>Position Title</label>
            <input type="text" name="positionTitle" required>
        </div>
        <div class="form-group">
            <label>Desired Traits (comma separated)</label>
            <textarea name="positionTraits" required></textarea>
        </div>
    `;
    
    positionsContainer.appendChild(newPosition);
});