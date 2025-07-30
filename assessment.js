document.getElementById('assessmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get all form data
    const formData = new FormData(this);
    const answers = {};
    for (let [key, value] of formData.entries()) {
        answers[key] = parseInt(value);
    }
    
    // Calculate risk score (sum of all answers)
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    
    // Calculate risk percentage (0-100%)
    const maxPossibleScore = 4 * 10; // 4 points max per question * 10 questions
    const riskPercentage = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Generate recommendations based on score
    const recommendations = generateRecommendations(totalScore, answers);
    
    // Store results in sessionStorage to pass to results page
    sessionStorage.setItem('riskPercentage', riskPercentage);
    sessionStorage.setItem('recommendations', JSON.stringify(recommendations));
    
    // Redirect to results page
    window.location.href = 'user-results.html';
});

function generateRecommendations(score, answers) {
    // Get skills and companies from localStorage
    const allSkills = JSON.parse(localStorage.getItem('skills')) || [];
    const allCompanies = JSON.parse(localStorage.getItem('companies')) || [];
    
    // Determine which skills to recommend based on answers
    let recommendedSkills = [];
    
    // Rule-based recommendation engine
    if (answers.q1 >= 3) { // High routine tasks
        recommendedSkills.push(
            findSkillByName(allSkills, "Creativity"),
            findSkillByName(allSkills, "Complex Problem Solving")
        );
    }
    
    if (answers.q4 >= 3) { // Low emotional intelligence needed
        recommendedSkills.push(
            findSkillByName(allSkills, "Emotional Intelligence"),
            findSkillByName(allSkills, "Active Listening")
        );
    }
    
    // Add some general recommendations based on score
    if (score >= 30) { // High risk
        recommendedSkills.push(
            findSkillByName(allSkills, "Adaptability"),
            findSkillByName(allSkills, "Continuous Learning")
        );
    } else {
        recommendedSkills.push(
            findSkillByName(allSkills, "Leadership"),
            findSkillByName(allSkills, "Strategic Thinking")
        );
    }
    
    // Remove duplicates and undefined values
    recommendedSkills = recommendedSkills.filter((skill, index, self) => 
        skill && index === self.findIndex((s) => s.name === skill.name)
    ).slice(0, 5); // Limit to 5 skills
    
    // Match companies based on recommended skills
    const matchedCompanies = [];
    const skillNames = recommendedSkills.map(skill => skill.name);
    
    allCompanies.forEach(company => {
        company.positions.forEach(position => {
            const matchingTraits = position.traits.filter(trait => 
                skillNames.includes(trait)
            );
            if (matchingTraits.length >= 2) {
                matchedCompanies.push({
                    company: company.name,
                    position: position.title,
                    traits: matchingTraits,
                    email: company.email,
                    location: company.location
                });
            }
        });
    });
    
    // Limit to 3 unique companies
    const uniqueCompanies = [];
    const companyNames = new Set();
    for (const company of matchedCompanies) {
        if (!companyNames.has(company.company) {
            uniqueCompanies.push(company);
            companyNames.add(company.company);
            if (uniqueCompanies.length >= 3) break;
        }
    }
    
    return {
        skills: recommendedSkills,
        companies: uniqueCompanies
    };
}

function findSkillByName(skills, name) {
    return skills.find(skill => skill.name === name);
}