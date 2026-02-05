// GitHub username - UPDATE THIS WITH YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'ChamikaShashipriya99';

// GitHub Personal Access Token
// Create a token at: https://github.com/settings/tokens
// Scopes needed: public_repo, read:user
let GITHUB_TOKEN = 'YOUR_GITHUB_TOKEN_HERE';

// Check if config exists and has token
if (typeof CONFIG !== 'undefined' && CONFIG.GITHUB_TOKEN) {
    GITHUB_TOKEN = CONFIG.GITHUB_TOKEN;
}

// Fallback projects to use when API is blocked (Rate Limited) and Cache is empty
const FALLBACK_PROJECTS = [
    {
        name: "My-Portfolio-HTML-CSS-JS",
        language: "HTML",
        description: "My personal portfolio website built with HTML, CSS, and modern JavaScript. Features fully responsive design, dark mode animations, and dynamic content loading.",
        html_url: "https://github.com/ChamikaShashipriya99/My-Portfolio-HTML-CSS-JS",
        stargazers_count: 5,
        forks_count: 2,
        watchers_count: 3,
        updated_at: new Date().toISOString(),
        owner: { login: "ChamikaShashipriya99" },
        readmeDescription: null
    },
    {
        name: "E-Commerce-React-App",
        language: "JavaScript",
        description: "A full-featured e-commerce application built with React, Redux, and Node.js. Includes cart functionality, user authentication, and payment gateway integration.",
        html_url: "https://github.com/ChamikaShashipriya99",
        stargazers_count: 12,
        forks_count: 4,
        watchers_count: 8,
        updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        owner: { login: "ChamikaShashipriya99" },
        readmeDescription: null
    },
    {
        name: "Task-Management-System",
        language: "JavaScript",
        description: "Project management tool with real-time updates. specialized in team collaboration and task tracking features.",
        html_url: "https://github.com/ChamikaShashipriya99",
        stargazers_count: 8,
        forks_count: 1,
        watchers_count: 4,
        updated_at: new Date(Date.now() - 86400000 * 12).toISOString(),
        owner: { login: "ChamikaShashipriya99" },
        readmeDescription: null
    }
];

// GitHub API endpoint
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`;

// Cache settings
const CACHE_KEY = 'github_portfolio_projects';
const CACHE_TIMESTAMP_KEY = 'github_portfolio_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

let allProjects = [];
let currentFilter = 'all';

// Helper function to get fetch headers with authentication
function getAuthHeaders() {
    const headers = {
        'Accept': 'application/vnd.github.v3+json'
    };

    // Only add authorization header if token is set and not the placeholder
    if (GITHUB_TOKEN && GITHUB_TOKEN !== 'YOUR_GITHUB_TOKEN_HERE') {
        headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }

    return headers;
}

// Fetch README content for a repository
async function fetchReadme(owner, repo) {
    try {
        // Try to fetch README.md
        const readmeUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
        const response = await fetch(readmeUrl, {
            headers: getAuthHeaders()
        });

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

// Fetch projects from GitHub with caching
async function fetchProjects() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const projectsGrid = document.getElementById('projects-grid');

    const showError = (message) => {
        if (loadingEl) {
            loadingEl.style.display = 'none';
            loadingEl.style.setProperty('display', 'none', 'important');
        }
        if (errorEl) {
            errorEl.style.display = 'flex';
            errorEl.style.setProperty('display', 'flex', 'important');
            const msg = errorEl.querySelector('p');
            if (msg) msg.textContent = message;
        }
        if (projectsGrid) projectsGrid.innerHTML = '';
    };

    const hideLoading = () => {
        if (loadingEl) {
            loadingEl.style.display = 'none';
            loadingEl.style.setProperty('display', 'none', 'important');
        }
        if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.style.setProperty('display', 'none', 'important');
        }
    };

    try {
        // 1. Try to load from cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        const now = Date.now();

        if (cachedData && cachedTimestamp) {
            const age = now - parseInt(cachedTimestamp, 10);
            if (age < CACHE_DURATION) {
                console.log(`Loading projects from cache (age: ${Math.round(age / 60000)} mins)`);
                try {
                    allProjects = JSON.parse(cachedData);
                    hideLoading();

                    if (allProjects.length === 0) {
                        if (projectsGrid) projectsGrid.innerHTML = '<div class="no-projects"><i class="fa-solid fa-folder-open"></i><p>No projects found</p></div>';
                        return;
                    }

                    generateFilterButtons();
                    displayProjects(allProjects);
                    return; // Successfully loaded from cache
                } catch (e) {
                    console.warn('Cache parsing failed, fetching fresh data...');
                }
            }
        }

        // 2. Fetch from API if cache invalid or missing
        if (loadingEl) {
            loadingEl.style.display = 'flex';
            loadingEl.style.setProperty('display', 'flex', 'important');
        }

        console.log('Fetching from:', GITHUB_API_URL);
        const response = await fetch(GITHUB_API_URL, {
            headers: getAuthHeaders()
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
            // If API fails (e.g. rate limit), try to fallback to STALE cache if it exists
            if (cachedData) {
                console.warn('API request failed, falling back to stale cache.');
                allProjects = JSON.parse(cachedData);
                hideLoading();
                generateFilterButtons();
                displayProjects(allProjects);

                // Add a small notification or log that data might be old? 
                // For now, just silently falling back is better than a broken page.
                return;
            }

            if (response.status === 404) {
                throw new Error(`GitHub user "${GITHUB_USERNAME}" not found.`);
            } else if (response.status === 403) {
                const resetTime = response.headers.get('X-RateLimit-Reset');
                let msg = 'GitHub API rate limit exceeded.';
                if (resetTime) {
                    const resetDate = new Date(resetTime * 1000);
                    msg += ` Try again after ${resetDate.toLocaleTimeString()}.`;
                }
                throw new Error(msg);
            } else {
                throw new Error(`Failed to fetch repositories (${response.statusText})`);
            }
        }

        const repos = await response.json();

        if (loadingEl && loadingEl.querySelector('p')) {
            loadingEl.querySelector('p').textContent = 'Loading project details...';
        }

        // Fetch READMEs
        allProjects = await Promise.all(repos.map(async (repo) => {
            const readmeDescription = await fetchReadme(repo.owner.login, repo.name);
            return {
                ...repo,
                readmeDescription: readmeDescription
            };
        }));

        // 3. Save to cache
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(allProjects));
            localStorage.setItem(CACHE_TIMESTAMP_KEY, now.toString());
        } catch (e) {
            console.warn('Failed to save to localStorage (quota exceeded?)', e);
        }

        hideLoading();

        if (allProjects.length === 0) {
            if (projectsGrid) {
                projectsGrid.innerHTML = '<div class="no-projects"><i class="fa-solid fa-folder-open"></i><p>No projects found</p></div>';
            }
            return;
        }

        generateFilterButtons();
        displayProjects(allProjects);

    } catch (error) {
        console.error('Error fetching projects:', error);

        // Final attempt to use cache even if errored out logic above didn't catch it
        // (This covers network errors, etc.)
        if (cachedData) {
            console.log('Recovering from error using cached data...');
            allProjects = JSON.parse(cachedData);
            hideLoading();
            generateFilterButtons();
            displayProjects(allProjects);
        } else {
            // Fallback to hardcoded data if Cache is empty AND API failed
            console.warn('API blocked and no cache. Using Fallback Data.');
            allProjects = FALLBACK_PROJECTS;
            hideLoading();

            // Show a small toast/notice that we are in offline mode? (Optional, skipping for now to keep UI clean)
            generateFilterButtons();
            displayProjects(allProjects);

            // Still show error in console
            console.error('Showing fallback data due to error:', error.message);
        }
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

    // Show only 10 projects initially
    const maxItemsToShow = 10;
    const hasMoreProjects = projects.length > maxItemsToShow;

    projectsGrid.innerHTML = projects.map((project, index) => {
        const language = project.language || 'Other';
        // Use README description if available, otherwise use GitHub description, or default
        const description = project.readmeDescription || project.description || 'No description available';
        const updatedDate = new Date(project.updated_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Generate project image URLs
        // Priority:
        // 1. thumbnail.png in the repository root (default branch)
        // 2. GitHub Social Preview (Open Graph image)
        // 3. Placeholder with project name

        const defaultBranch = project.default_branch || 'main';
        const repoImage = `https://raw.githubusercontent.com/${project.owner.login}/${project.name}/${defaultBranch}/thumbnail.png`;
        const opengraphImage = `https://opengraph.githubassets.com/1/${project.owner.login}/${project.name}`;
        const fallbackImage = `https://via.placeholder.com/400x200/0a0a0a/ff003c?text=${encodeURIComponent(project.name)}`;

        // Add hidden-project class for items beyond the initial 2 rows
        const isHidden = index >= maxItemsToShow;
        const hiddenClass = isHidden ? 'project-card-hidden' : '';

        return `
            <div class="project-card ${hiddenClass}" data-language="${language}" data-aos="fade-up" data-aos-duration="800">
                <div class="project-image-container">
                    <img src="${repoImage}" 
                         alt="${project.name}" 
                         class="project-image"
                         onerror="this.onerror=null; this.src='${opengraphImage}'; this.onerror=function(){this.src='${fallbackImage}'}">
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

    // Add "Show More Projects" button if there are more projects
    if (hasMoreProjects) {
        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.className = 'view-more-btn';
        viewMoreBtn.innerHTML = `
            <i class="fa-solid fa-chevron-down"></i>
            Show More Projects
        `;
        viewMoreBtn.addEventListener('click', () => toggleViewMore());
        projectsGrid.appendChild(viewMoreBtn);
    }

    // Refresh AOS after dynamically adding content
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }
}

// Toggle view more projects
function toggleViewMore() {
    const projectsGrid = document.getElementById('projects-grid');
    const isExpanded = projectsGrid.classList.contains('expanded');

    if (!isExpanded) {
        projectsGrid.classList.add('expanded');
        const viewMoreBtn = document.querySelector('.view-more-btn');
        if (viewMoreBtn) {
            const hiddenCount = document.querySelectorAll('.project-card-hidden').length;
            viewMoreBtn.innerHTML = `
                <i class="fa-solid fa-chevron-up"></i>
                Show Less
            `;
        }
    } else {
        projectsGrid.classList.remove('expanded');
        const viewMoreBtn = document.querySelector('.view-more-btn');
        if (viewMoreBtn) {
            viewMoreBtn.innerHTML = `
                <i class="fa-solid fa-chevron-down"></i>
                Show More Projects
            `;
        }
        window.scrollTo({ top: document.getElementById('projects').offsetTop - 100, behavior: 'smooth' });
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
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');

    if (GITHUB_USERNAME === 'YOUR_GITHUB_USERNAME' || !GITHUB_USERNAME) {
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
        if (errorEl) {
            errorEl.style.display = 'flex';
            errorEl.innerHTML = `
                <i class="fa-solid fa-exclamation-triangle"></i>
                <p>Please update the GITHUB_USERNAME in projects.js with your GitHub username</p>
            `;
        }
    } else {
        console.log('Fetching projects for GitHub user:', GITHUB_USERNAME);
        console.log('API URL:', GITHUB_API_URL);
        fetchProjects();
    }
});

