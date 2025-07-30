document.addEventListener('DOMContentLoaded', function() {
    // Retrieve results from sessionStorage
    const riskPercentage = sessionStorage.getItem('riskPercentage') || 0;
    const recommendations = JSON.parse(sessionStorage.getItem('recommendations')) || { 
        skills: [], 
        companies: [] 
    };
    
    // Display risk percentage
    document.getElementById('riskPercentage').textContent = riskPercentage;
    
    // Position risk indicator on meter
    const riskIndicator = document.getElementById('riskIndicator');
    riskIndicator.style.left = `${riskPercentage}%`;
    
    // Display recommended skills
    const skillsContainer = document.getElementById('skillRecommendations');
    recommendations.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        
        let resourcesHTML = skill.resources.map(resource => 
            `<a href="${resource}" class="resource-link" target="_blank">${resource}</a>`
        ).join('<br>');
        
        skillCard.innerHTML = `
            <h4>${skill.name}</h4>
            <p><strong>Category:</strong> ${skill.category || 'General'}</p>
            <p><strong>Resources:</strong></p>
            <div>${resourcesHTML}</div>
        `;
        
        skillsContainer.appendChild(skillCard);
    });
    
    // Display company matches
    const companiesContainer = document.getElementById('companyMatches');
    if (recommendations.companies.length > 0) {
        recommendations.companies.forEach(company => {
            const companyCard = document.createElement('div');
            companyCard.className = 'company-card';
            
            companyCard.innerHTML = `
                <h4>${company.company}</h4>
                <p><strong>Position:</strong> ${company.position}</p>
                <p><strong>Location:</strong> ${company.location}</p>
                <p><strong>Matching Traits:</strong> ${company.traits.join(', ')}</p>
                <p><strong>Contact:</strong> ${company.email}</p>
            `;
            
            companiesContainer.appendChild(companyCard);
        });
    } else {
        companiesContainer.innerHTML = '<p>No company matches found based on your profile. Try expanding your skill set.</p>';
    }
});