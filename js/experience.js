// Experience data - UPDATE THIS WITH YOUR EXPERIENCE
const EXPERIENCE_DATA = [
    {
        title: "3-Month Industrial Program - Full Stack Web Developer Training",
        company: "DoMedia Company",
        location: "Malabe, Sri Lanka",
        startDate: "November 2025",
        endDate: "Present",
        type: "Full-time", // Full-time, Part-time, Internship, Contract, etc.
        description: "Currently attending a comprehensive 3-month full-time Industrial Training Program focused on Full Stack Web Development. This intensive program covers both frontend and backend technologies to develop well-rounded web development skills.",
        responsibilities: [
            "Learning full stack web development through hands-on training",
            "Building real-world web applications",
            "Mastering industry best practices and modern development workflows"
        ],
        technologies: ["Full Stack Development", "Web Technologies", "Modern Frameworks", "Best Practices"],
        icon: "fa-solid fa-laptop-code", // Font Awesome icon class
        logo: "images/domediaLogo.jpg", // Company logo path
        category: "professional"
    },
    {
        title: "Automobile Motor Mechanic Technician",
        company: "United Motors Pvt Ltd",
        location: "Mathara, Sri Lanka",
        startDate: "January 2020",
        endDate: "January 2022",
        type: " ",
        description: "Worked as an Automobile Motor Mechanic Technician, gaining hands-on experience in automotive repair and maintenance.",
        responsibilities: [
            "Developed expertise in automobile motor mechanics",
            "Gained practical experience in automotive repair",
            "Enhanced customer service and technical skills"
        ],
        technologies: ["Automotive Systems", "Engine Repair", "Diagnostic Tools", "Customer Service"],
        icon: "fa-solid fa-wrench",
        logo: "images/united-motors-logo.png",
        category: "professional"
    },
    {
        title: "BSc (Hons) in Information Technology",
        company: "Sri Lanka Institute of Information Technology (SLIIT)",
        location: "Sri Lanka",
        startDate: "July 2023",
        endDate: "Present",
        type: "",
        description: "Currently pursuing a Bachelor of Science (Honours) degree in Information Technology, focusing on modern computing technologies and software development.",
        responsibilities: [
            "Studying core IT concepts and programming",
            "Learning modern software development practices",
            "Building foundation for technology career"
        ],
        technologies: [],
        icon: "fa-solid fa-graduation-cap",
        logo: "images/sliit-logo.png",
        category: "education"
    },
    {
        title: "Automobile Motor Mechanic Course",
        company: "Automobile Engineering Training Institute - Orugodawatta",
        location: "Orugodawatta, Sri Lanka",
        startDate: "2019",
        endDate: "2022",
        type: "",
        description: "Completed comprehensive training in automobile motor mechanics, covering engine repair, diagnostics, and automotive systems.",
        responsibilities: [
            "Completed full automobile motor mechanic course",
            "Gained practical automotive engineering skills",
            "Developed technical problem-solving abilities"
        ],
        technologies: [],
        icon: "fa-solid fa-wrench",
        logo: "images/aeti-logo.png",
        category: "education"
    },
    {
        title: "Information & Communication Technology",
        company: "The Open University Sri Lanka, Ambalangoda",
        location: "Ambalangoda, Sri Lanka",
        startDate: "2016",
        endDate: "2016",
        type: "",
        description: "Completed course in Information & Communication Technology focusing on Microsoft Office applications and basic computer skills.",
        responsibilities: [
            "Mastered MS Office applications",
            "Developed basic computer literacy",
            "Enhanced digital communication skills"
        ],
        technologies: [],
        icon: "fa-solid fa-laptop",
        logo: "images/open-university-logo.png",
        category: "education"
    },
    {
        title: "Short Course in Listening and Speaking",
        company: "The Open University Sri Lanka, Ambalangoda",
        location: "Ambalangoda, Sri Lanka",
        startDate: "2022",
        endDate: "2022",
        type: "",
        description: "Completed a short course focused on improving listening and speaking skills for better communication.",
        responsibilities: [
            "Enhanced verbal communication skills",
            "Improved listening comprehension",
            "Developed better interpersonal communication"
        ],
        technologies: [],
        icon: "fa-solid fa-comments",
        logo: "images/open-university-logo.png",
        category: "education"
    },
    // Add more experience entries here
];

// Display experience items
function displayExperience() {
    const timeline = document.getElementById('experience-timeline');
    
    if (!timeline) {
        console.error('Experience timeline element not found');
        return;
    }
    
    if (EXPERIENCE_DATA.length === 0) {
        timeline.innerHTML = `
            <div class="no-experience">
                <i class="fa-solid fa-briefcase"></i>
                <p>No experience entries found. Please update experience.js with your experience data.</p>
            </div>
        `;
        return;
    }
    
    // Separate professional experience and education
    const professionalExp = EXPERIENCE_DATA.filter(exp => exp.category === 'professional');
    const education = EXPERIENCE_DATA.filter(exp => exp.category === 'education');
    
    // Sort each category by date (most recent first)
    const sortByDate = (a, b) => {
        const dateA = new Date(a.endDate === 'Present' ? '9999-12-31' : a.endDate);
        const dateB = new Date(b.endDate === 'Present' ? '9999-12-31' : b.endDate);
        return dateB - dateA;
    };
    
    const sortedProfessional = [...professionalExp].sort(sortByDate);
    const sortedEducation = [...education].sort(sortByDate);
    
    // Function to render experience items
    const renderExperienceItems = (items, startIndex = 0) => {
        return items.map((exp, idx) => {
            const index = startIndex + idx;
            const isPresent = exp.endDate.toLowerCase() === 'present';
            const duration = calculateDuration(exp.startDate, exp.endDate);
            
            return `
                <div class="experience-item" data-index="${index}" data-aos="fade-up" data-aos-duration="800" data-aos-delay="${idx * 100}">
                    <div class="experience-icon">
                        <i class="${exp.icon}"></i>
                    </div>
                    <div class="experience-content">
                        ${exp.logo ? `<img src="${exp.logo}" alt="${exp.company} logo" class="company-logo">` : ''}
                        <div class="experience-header-card">
                            <div class="experience-title-section">
                                <h3 class="experience-title">${exp.title}</h3>
                                ${exp.type && exp.type.trim() ? `<span class="experience-type">${exp.type}</span>` : ''}
                            </div>
                            <div class="experience-company">
                                <i class="fa-solid fa-building"></i>
                                <span>${exp.company}</span>
                            </div>
                            <div class="experience-location">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>${exp.location}</span>
                            </div>
                        </div>
                        
                        <div class="experience-dates">
                            <span class="date-range">
                                <i class="fa-solid fa-calendar"></i>
                                ${exp.startDate} - ${exp.endDate}
                            </span>
                            ${duration ? `<span class="duration"><i class="fa-solid fa-clock"></i>${duration}</span>` : ''}
                        </div>
                        
                        <p class="experience-description">${exp.description}</p>
                        
                        ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                            <div class="experience-responsibilities">
                                <h4 class="responsibilities-title">
                                    <i class="fa-solid fa-list-check"></i>Key Highlights
                                </h4>
                                <ul class="responsibilities-list">
                                    ${exp.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        
                        ${exp.technologies && exp.technologies.length > 0 ? `
                            <div class="experience-technologies">
                                <h4 class="technologies-title">
                                    <i class="fa-solid fa-tools"></i>Technologies Used
                                </h4>
                                <div class="tech-tags">
                                    ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    };
    
    timeline.innerHTML = `
        ${sortedProfessional.length > 0 ? `
            <div class="experience-section-header">
                <h2 class="section-header-title">Professional Experience</h2>
            </div>
            ${renderExperienceItems(sortedProfessional, 0)}
        ` : ''}
        ${sortedEducation.length > 0 ? `
            <div class="experience-section-header" style="margin-top: 60px;">
                <h2 class="section-header-title">Education</h2>
            </div>
            ${renderExperienceItems(sortedEducation, sortedProfessional.length)}
        ` : ''}
    `;
    
    // Refresh AOS after dynamically adding content
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Calculate duration between two dates
function calculateDuration(startDate, endDate) {
    try {
        const start = parseDate(startDate);
        const end = endDate.toLowerCase() === 'present' ? new Date() : parseDate(endDate);
        
        if (!start || !end) return null;
        
        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years > 0 && remainingMonths > 0) {
            return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        } else if (years > 0) {
            return `${years} ${years === 1 ? 'year' : 'years'}`;
        } else if (remainingMonths > 0) {
            return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
        }
        
        return null;
    } catch (error) {
        return null;
    }
}

// Parse date string (handles formats like "January 2024", "Jan 2024", "2024-01", etc.)
function parseDate(dateString) {
    if (!dateString) return null;
    
    // Try parsing as "Month Year" format
    const monthYearMatch = dateString.match(/(\w+)\s+(\d{4})/);
    if (monthYearMatch) {
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                          'july', 'august', 'september', 'october', 'november', 'december'];
        const monthAbbr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                          'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        
        const monthStr = monthYearMatch[1].toLowerCase();
        const year = parseInt(monthYearMatch[2]);
        
        let month = monthNames.indexOf(monthStr);
        if (month === -1) {
            month = monthAbbr.indexOf(monthStr);
        }
        
        if (month !== -1) {
            return new Date(year, month, 1);
        }
    }
    
    // Try parsing as ISO format or standard date
    const parsed = new Date(dateString);
    if (!isNaN(parsed.getTime())) {
        return parsed;
    }
    
    return null;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayExperience();
});

