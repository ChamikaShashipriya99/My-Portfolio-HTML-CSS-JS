// GitHub username - UPDATE THIS WITH YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'ChamikaShashipriya99';

// GitHub API endpoint
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

let allProjects = [];
let currentFilter = 'all';

// Fetch README content for a repository
async function fetchReadme(owner, repo) {
    try {
        // Try to fetch README.md
        const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
        const response = await fetch(readmeUrl);
        
        if (!response.ok) {
            return null;
        }

        const readmeData = await response.json();
        
        // Decode base64 content
        const content = atob(readmeData.content.replace(/\s/g, ''));
        
        // Extract description from README (first paragraph or first few lines)
        const lines = content.split('\n').filter(line => line.trim().length > 0);
        let description = '';
        
        // Try to find description in common README formats
        for (let i = 0; i < Math.min(10, lines.length); i++) {
            const line = lines[i].trim();
            // Skip headers, badges, and empty lines
            if (line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('[') && line.length > 20) {
                // Remove markdown formatting
                description = line.replace(/[#*`_\[\]()]/g, '').trim();
                if (description.length > 50) {
                    break;
                }
            }
        }
        
        // If no good description found, use first meaningful paragraph
        if (!description || description.length < 50) {
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (line && line.length > 50 && !line.startsWith('#') && !line.startsWith('![')) {
                    description = line.replace(/[#*`_\[\]()]/g, '').trim();
                    if (description.length > 50) {
                        break;
                    }
                }
            }
        }
        
        // Limit description length
        if (description.length > 200) {
            description = description.substring(0, 200) + '...';
        }
        
        return description || null;
    } catch (error) {
        console.error(`Error fetching README for ${repo}:`, error);
        return null;
    }
}

// Fetch projects from GitHub
async function fetchProjects() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const projectsGrid = document.getElementById('projects-grid');

    try {
        loadingEl.style.display = 'flex';
        errorEl.style.display = 'none';
        projectsGrid.innerHTML = '';

        const response = await fetch(GITHUB_API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();
        
        // Filter out forks if you only want original projects
        // allProjects = repos.filter(repo => !repo.fork);
        
        // Fetch README for each repository
        loadingEl.querySelector('p').textContent = 'Loading projects and descriptions...';
        
        allProjects = await Promise.all(repos.map(async (repo) => {
            const readmeDescription = await fetchReadme(repo.owner.login, repo.name);
            return {
                ...repo,
                readmeDescription: readmeDescription
            };
        }));

        loadingEl.style.display = 'none';
        
        if (allProjects.length === 0) {
            projectsGrid.innerHTML = '<div class="no-projects"><i class="fa-solid fa-folder-open"></i><p>No projects found</p></div>';
            return;
        }

        // Generate filter buttons
        generateFilterButtons();
        
        // Display projects
        displayProjects(allProjects);

    } catch (error) {
        console.error('Error fetching projects:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'flex';
        projectsGrid.innerHTML = '';
    }
}

// Generate filter buttons based on languages
function generateFilterButtons() {
    const filterContainer = document.querySelector('.filter-container');
    const languages = new Set();
    
    allProjects.forEach(project => {
        if (project.language) {
            languages.add(project.language);
        }
    });

    const sortedLanguages = Array.from(languages).sort();
    
    // Keep the "All" button and add language filters
    const allBtn = filterContainer.querySelector('[data-filter="all"]');
    filterContainer.innerHTML = '';
    filterContainer.appendChild(allBtn);

    sortedLanguages.forEach(language => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.setAttribute('data-filter', language);
        btn.innerHTML = `<i class="fa-solid fa-code"></i>${language}`;
        btn.addEventListener('click', () => filterProjects(language));
        filterContainer.appendChild(btn);
    });
}

// Filter projects by language
function filterProjects(language) {
    currentFilter = language;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === language) {
            btn.classList.add('active');
        }
    });

    let filteredProjects;
    if (language === 'all') {
        filteredProjects = allProjects;
    } else {
        filteredProjects = allProjects.filter(project => project.language === language);
    }

    displayProjects(filteredProjects);
}

// Display projects in grid
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div class="no-projects"><i class="fa-solid fa-folder-open"></i><p>No projects found for this filter</p></div>';
        return;
    }

    projectsGrid.innerHTML = projects.map(project => {
        const language = project.language || 'Other';
        // Use README description if available, otherwise use GitHub description, or default
        const description = project.readmeDescription || project.description || 'No description available';
        const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        
        // Generate project image URL (GitHub social preview or placeholder)
        // You can also use: https://opengraph.githubassets.com/1/${project.owner.login}/${project.name}
        const projectImage = `https://opengraph.githubassets.com/1/${project.owner.login}/${project.name}`;
        const fallbackImage = `https://via.placeholder.com/400x200/0a0a0a/ff003c?text=${encodeURIComponent(project.name)}`;

        return `
            <div class="project-card" data-language="${language}" data-aos="fade-up" data-aos-duration="800">
                <div class="project-image-container">
                    <img src="${projectImage}" 
                         alt="${project.name}" 
                         class="project-image"
                         onerror="this.src='${fallbackImage}'">
                    <div class="project-image-overlay">
                        <a href="${project.html_url}" target="_blank" class="project-image-link">
                            <i class="fa-solid fa-external-link"></i>
                        </a>
                    </div>
                </div>
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">
                            <i class="fa-brands fa-github"></i>
                            ${project.name}
                        </h3>
                        <span class="project-language">${language}</span>
                    </div>
                    <p class="project-description">${description}</p>
                    <div class="project-stats">
                        <span class="stat-item">
                            <i class="fa-solid fa-star"></i>
                            ${project.stargazers_count}
                        </span>
                        <span class="stat-item">
                            <i class="fa-solid fa-code-branch"></i>
                            ${project.forks_count}
                        </span>
                        <span class="stat-item">
                            <i class="fa-solid fa-eye"></i>
                            ${project.watchers_count}
                        </span>
                    </div>
                    <div class="project-footer">
                        <span class="project-date">
                            <i class="fa-solid fa-calendar"></i>
                            Updated: ${updatedDate}
                        </span>
                        <a href="${project.html_url}" target="_blank" class="project-link">
                            View on GitHub
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Refresh AOS after dynamically adding content
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set up "All" filter button
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', () => filterProjects('all'));
    }

    // Check if GitHub username is set
    if (GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME') {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('error').style.display = 'flex';
        document.getElementById('error').innerHTML = `
            <i class="fa-solid fa-exclamation-triangle"></i>
            <p>Please update the GITHUB_USERNAME in projects.js with your GitHub username</p>
        `;
    } else {
        fetchProjects();
    }
});

