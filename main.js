// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (document.querySelector('.hero')) {
        // Load any saved companies for demonstration
        if (!localStorage.getItem('companies')) {
            const demoCompanies = [
                {
                    name: "Tech Innovators Inc.",
                    email: "hr@techinnovators.com",
                    location: "San Francisco, CA",
                    positions: [
                        {
                            title: "Human-AI Collaboration Specialist",
                            traits: ["Adaptability", "Critical Thinking", "Collaboration"]
                        },
                        {
                            title: "Digital Transformation Lead",
                            traits: ["Leadership", "Strategic Thinking", "Technical Aptitude"]
                        }
                    ]
                },
                {
                    name: "Future Systems Ltd.",
                    email: "careers@futuresystems.com",
                    location: "New York, NY",
                    positions: [
                        {
                            title: "Digital Transformation Consultant",
                            traits: ["Digital Literacy", "Complex Problem Solving", "Leadership"]
                        }
                    ]
                }
            ];
            localStorage.setItem('companies', JSON.stringify(demoCompanies));
        }
        
        // Load skills if not already present
        if (!localStorage.getItem('skills')) {
            const skills = [
                { 
                    name: "Critical Thinking", 
                    category: "Cognitive",
                    resources: [
                        "https://www.coursera.org/learn/critical-thinking",
                        "https://www.mindtools.com/pages/article/newCT_02.htm"
                    ] 
                },
                { 
                    name: "Emotional Intelligence", 
                    category: "Interpersonal",
                    resources: [
                        "https://www.udemy.com/course/emotional-intelligence-mastery/",
                        "https://www.mindtools.com/pages/article/ei-quiz.htm"
                    ] 
                },
                // More skills would be here...
            ];
            localStorage.setItem('skills', JSON.stringify(skills));
        }
    }
});