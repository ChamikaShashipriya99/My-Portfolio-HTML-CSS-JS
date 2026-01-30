// Skills data organized by categories
// Using Font Awesome brand icons (fa-brands) and Devicon (devicon) for accurate brand representations
const SKILLS_DATA = [
    {
        category: "Programming Languages",
        skills: [
            { name: "JavaScript", icon: "devicon-javascript-plain", iconType: "devicon", color: "#F7DF1E", level: 85 },
            { name: "Java", icon: "devicon-java-plain", iconType: "devicon", color: "#ED8B00", level: 80 },
            { name: "Python", icon: "devicon-python-plain", iconType: "devicon", color: "#3776AB", level: 80 },
            { name: "C", icon: "devicon-c-plain", iconType: "devicon", color: "#00599C", level: 75 },
            { name: "C++", icon: "devicon-cplusplus-plain", iconType: "devicon", color: "#00599C", level: 75 },
            { name: ".NET C#", icon: "devicon-csharp-plain", iconType: "devicon", color: "#512BD4", level: 70 },
            { name: "PHP", icon: "devicon-php-plain", iconType: "devicon", color: "#777BB4", level: 75 },
            { name: "Kotlin", icon: "devicon-kotlin-plain", iconType: "devicon", color: "#7F52FF", level: 70 },
            { name: "HTML", icon: "devicon-html5-plain", iconType: "devicon", color: "#E34F26", level: 90 },
            { name: "CSS", icon: "devicon-css3-plain", iconType: "devicon", color: "#1572B6", level: 90 }
        ]
    },
    {
        category: "Databases",
        skills: [
            { name: "MongoDB", icon: "devicon-mongodb-plain", iconType: "devicon", color: "#47A248", level: 80 },
            { name: "MySQL", icon: "devicon-mysql-plain", iconType: "devicon", color: "#4479A1", level: 80 },
            { name: "Microsoft SQL Server", icon: "devicon-microsoftsqlserver-plain", iconType: "devicon", color: "#CC2927", level: 75 },
            { name: "XAMPP", icon: "devicon-apache-plain", iconType: "devicon", color: "#FB7A24", level: 75 },
            { name: "WAMMP", icon: "devicon-apache-plain", iconType: "devicon", color: "#FB7A24", level: 75 }
        ]
    },
    {
        category: "Tools and IDE's",
        skills: [
            { name: "Git", icon: "devicon-git-plain", iconType: "devicon", color: "#F05032", level: 85 },
            { name: "GitHub", icon: "devicon-github-original", iconType: "devicon", color: "#181717", level: 85 },
            { name: "NPM", icon: "devicon-npm-original-wordmark", iconType: "devicon", color: "#CB3837", level: 80 },
            { name: "Figma", icon: "devicon-figma-plain", iconType: "devicon", color: "#F24E1E", level: 75 },
            { name: "Canva", icon: "fa-solid fa-palette", iconType: "fontawesome", color: "#00C4CC", level: 70 },
            { name: "Cisco", icon: "fa-solid fa-network-wired", iconType: "fontawesome", color: "#1BA0D7", level: 70 },
            { name: "Trello", icon: "devicon-trello-plain", iconType: "devicon", color: "#0052CC", level: 75 },
            { name: "Nodemon", icon: "devicon-nodejs-plain", iconType: "devicon", color: "#76D04B", level: 80 },
            { name: "Apache Tomcat", icon: "devicon-apache-plain", iconType: "devicon", color: "#F8DC75", level: 70 }
        ]
    },
    {
        category: "Frameworks & Platforms",
        skills: [
            { name: "React", icon: "devicon-react-original", iconType: "devicon", color: "#61DAFB", level: 80 },
            { name: "Node.js", icon: "devicon-nodejs-plain", iconType: "devicon", color: "#339933", level: 80 },
            { name: "Express.js", icon: "devicon-express-original", iconType: "devicon", color: "#000000", level: 75 },
            { name: "Bootstrap", icon: "devicon-bootstrap-plain", iconType: "devicon", color: "#7952B3", level: 85 },
            { name: "Tailwind", icon: "devicon-tailwindcss-plain", iconType: "devicon", color: "#06B6D4", level: 80 },
            { name: ".NET", icon: "devicon-dot-net-plain", iconType: "devicon", color: "#512BD4", level: 70 },
            { name: "Spring", icon: "devicon-spring-plain", iconType: "devicon", color: "#6DB33F", level: 70 },
            { name: "JWT", icon: "devicon-json-plain", iconType: "devicon", color: "#000000", level: 75 },
            { name: "Codeigniter", icon: "devicon-codeigniter-plain", iconType: "devicon", color: "#EE4323", level: 70 },
            { name: "WordPress", icon: "devicon-wordpress-plain", iconType: "devicon", color: "#21759B", level: 75 }
        ]
    }
];

// Display skills by category
function displaySkills(viewType = 'icons') {
    const skillsContainer = document.getElementById('skills-container');
    
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = '';
    
    // Remove all view classes
    skillsContainer.classList.remove('skills-cards-view', 'skills-badges-view', 'skills-icons-view');
    skillsContainer.classList.add(`skills-${viewType}-view`);
    
    if (viewType === 'cards') {
        displayCardsView(skillsContainer);
    } 
    // else if (viewType === 'badges') {
    //     displayBadgesView(skillsContainer);
    // } 
    else if (viewType === 'icons') {
        displayIconsView(skillsContainer);
    }
    
    // Refresh AOS after content is loaded
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 300);
    }
}

// Cards View (Original)
function displayCardsView(container) {
    SKILLS_DATA.forEach((category, categoryIndex) => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'skills-category';
        categorySection.setAttribute('data-aos', 'fade-up');
        categorySection.setAttribute('data-aos-delay', categoryIndex * 100);
        categorySection.setAttribute('data-aos-duration', '800');
        
        // Category title
        const categoryTitle = document.createElement('h2');
        categoryTitle.className = 'skills-category-title';
        categoryTitle.textContent = category.category;
        categorySection.appendChild(categoryTitle);
        
        // Skills grid
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-grid';
        
        category.skills.forEach((skill, skillIndex) => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.setAttribute('data-aos', 'fade-up');
            skillCard.setAttribute('data-aos-delay', (categoryIndex * 100) + (skillIndex * 50));
            skillCard.setAttribute('data-aos-duration', '600');
            
            // Skill icon with 3D effect
            const skillIcon = document.createElement('div');
            skillIcon.className = 'skill-icon';
            skillIcon.style.setProperty('--skill-color', skill.color);
            
            const icon = document.createElement('i');
            // Use Devicon or Font Awesome based on iconType
            if (skill.iconType === 'devicon') {
                icon.className = skill.icon;
            } else {
                icon.className = skill.icon;
            }
            skillIcon.appendChild(icon);
            
            // Skill name
            const skillName = document.createElement('h3');
            skillName.className = 'skill-name';
            skillName.textContent = skill.name;
            
            // Skill level bar
            const skillLevelContainer = document.createElement('div');
            skillLevelContainer.className = 'skill-level-container';
            
            const skillLevelBar = document.createElement('div');
            skillLevelBar.className = 'skill-level-bar';
            skillLevelBar.style.width = `${skill.level}%`;
            skillLevelBar.style.backgroundColor = skill.color;
            
            const skillLevelText = document.createElement('span');
            skillLevelText.className = 'skill-level-text';
            skillLevelText.textContent = `${skill.level}%`;
            
            skillLevelContainer.appendChild(skillLevelBar);
            skillLevelContainer.appendChild(skillLevelText);
            
            // Append all elements to skill card
            skillCard.appendChild(skillIcon);
            skillCard.appendChild(skillName);
            skillCard.appendChild(skillLevelContainer);
            
            skillsGrid.appendChild(skillCard);
        });
        
        categorySection.appendChild(skillsGrid);
        container.appendChild(categorySection);
    });
}

// Badges View - Minimal tag-like badges (COMMENTED OUT)
// function displayBadgesView(container) {
//     SKILLS_DATA.forEach((category, categoryIndex) => {
//         const categorySection = document.createElement('div');
//         categorySection.className = 'skills-category-badges';
//         categorySection.setAttribute('data-aos', 'fade-up');
//         categorySection.setAttribute('data-aos-delay', categoryIndex * 100);
//         
//         const categoryTitle = document.createElement('h2');
//         categoryTitle.className = 'skills-category-title';
//         categoryTitle.textContent = category.category;
//         categorySection.appendChild(categoryTitle);
//         
//         const badgesContainer = document.createElement('div');
//         badgesContainer.className = 'skills-badges-container';
//         
//         category.skills.forEach((skill, skillIndex) => {
//             const badge = document.createElement('div');
//             badge.className = 'skill-badge';
//             badge.setAttribute('data-aos', 'fade-up');
//             badge.setAttribute('data-aos-delay', (categoryIndex * 100) + (skillIndex * 20));
//             badge.style.setProperty('--skill-color', skill.color);
//             
//             badge.innerHTML = `
//                 <i class="${skill.icon}"></i>
//                 <span class="badge-name">${skill.name}</span>
//                 <span class="badge-level">${skill.level}%</span>
//             `;
//             
//             badgesContainer.appendChild(badge);
//         });
//         
//         categorySection.appendChild(badgesContainer);
//         container.appendChild(categorySection);
//     });
// }

// Icons Only View - Horizontal scrolling marquee grouped by categories
function displayIconsView(container) {
    // Create wrapper for all category marquees
    const marqueeWrapper = document.createElement('div');
    marqueeWrapper.className = 'skills-marquee-wrapper';
    
    SKILLS_DATA.forEach((category, categoryIndex) => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'skills-category-marquee';
        
        // Category title
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'skills-category-title-marquee';
        categoryTitle.textContent = category.category;
        categorySection.appendChild(categoryTitle);
        
        // Create marquee container
        const marqueeContainer = document.createElement('div');
        marqueeContainer.className = 'skills-marquee-container';
        
        // Create wrapper for tracks (to keep them in one line)
        const tracksWrapper = document.createElement('div');
        tracksWrapper.className = 'skills-marquee-tracks-wrapper';
        tracksWrapper.setAttribute('data-speed', 'slow');
        
        // Alternate direction for each row: 1st=ltr, 2nd=rtl, 3rd=ltr, 4th=rtl, etc.
        if ((categoryIndex + 1) % 2 === 0) {
            tracksWrapper.setAttribute('data-direction', 'rtl');
        }
        
        // Create first track (for seamless loop)
        const track1 = document.createElement('div');
        track1.className = 'skills-marquee-track';
        
        // Create second track (duplicate for seamless loop)
        const track2 = document.createElement('div');
        track2.className = 'skills-marquee-track';
        
        // Add icons to both tracks (duplicate for seamless infinite loop)
        category.skills.forEach((skill) => {
            const iconItem1 = createIconItem(skill);
            const iconItem2 = createIconItem(skill);
            track1.appendChild(iconItem1);
            track2.appendChild(iconItem2);
        });
        
        // Append both tracks to wrapper (they'll be side by side)
        tracksWrapper.appendChild(track1);
        tracksWrapper.appendChild(track2);
        marqueeContainer.appendChild(tracksWrapper);
        categorySection.appendChild(marqueeContainer);
        marqueeWrapper.appendChild(categorySection);
    });
    
    container.appendChild(marqueeWrapper);
}

// Helper function to create icon item
function createIconItem(skill) {
    const iconItem = document.createElement('div');
    iconItem.className = 'skill-icon-item-marquee';
    iconItem.style.setProperty('--skill-color', skill.color);
    
    iconItem.innerHTML = `
        <i class="${skill.icon}"></i>
        <div class="icon-tooltip-marquee">
            <span class="tooltip-name">${skill.name}</span>
            <span class="tooltip-level">${skill.level}%</span>
        </div>
    `;
    
    return iconItem;
}

// View Toggle Handler
function initViewToggle() {
    const toggleButtons = document.querySelectorAll('.view-toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get view type
            const viewType = this.getAttribute('data-view');
            
            // Display skills with selected view
            displaySkills(viewType);
        });
    });
}

// Initialize skills display when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        displaySkills('icons');
        initViewToggle();
    });
} else {
    displaySkills('icons');
    initViewToggle();
}

