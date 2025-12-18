# Portfolio Website - Setup Instructions

## How to Change GitHub Username

This portfolio website automatically fetches and displays your GitHub repositories on the Projects page. To configure it with your GitHub username, follow these simple steps:

### Step 1: Locate the Configuration File

Open the file: `js/projects.js`

### Step 2: Find the GitHub Username Variable

Look for line 2 in the file, which should look like this:

```javascript
const GITHUB_USERNAME = 'ChamikaShashipriya99';
```

### Step 3: Update the Username

Replace `'ChamikaShashipriya99'` with your actual GitHub username. Make sure to keep the quotes around your username.

**Example:**
```javascript
const GITHUB_USERNAME = 'your-github-username';
```

### Step 4: Save the File

Save the file after making the change.

### Step 5: Test the Projects Page

1. Open your portfolio website in a browser
2. Navigate to the **Projects** page
3. The page should now load and display all repositories from your GitHub account
4. You can filter projects by programming language using the filter buttons

---

## Important Notes

- **Make sure your GitHub username is correct** - Any typos will prevent the projects from loading
- **The username is case-sensitive** - GitHub usernames are case-insensitive, but it's best to use the exact username as it appears on your GitHub profile
- **Public repositories only** - Only public repositories will be displayed. Private repositories will not appear
- **API Rate Limits** - GitHub API has rate limits. If you have many repositories, they may load in batches

---

## Troubleshooting

### Projects Not Loading?

1. **Check the browser console** (F12) for any error messages
2. **Verify your GitHub username** is correct in `js/projects.js`
3. **Check your internet connection** - The page needs to fetch data from GitHub API
4. **Ensure you have public repositories** - Private repos won't be displayed

### Still Having Issues?

- Make sure the file path is correct: `js/projects.js`
- Check that the syntax is correct (quotes around the username)
- Verify your GitHub username is public and accessible

---

## File Structure

```
Portfolio/
├── js/
│   └── projects.js    ← Edit this file to change GitHub username
├── css/
├── images/
└── index.html
```

---

## Additional Configuration

### Filter Out Forked Repositories

If you want to show only your original projects (not forks), you can uncomment line 30 in `js/projects.js`:

**Current code:**
```javascript
// allProjects = repos.filter(repo => !repo.fork);
allProjects = repos;
```

**Change to:**
```javascript
allProjects = repos.filter(repo => !repo.fork);
// allProjects = repos;
```

This will hide all forked repositories and show only your original projects.

---

## Support

For more information about GitHub API, visit: https://docs.github.com/en/rest

---

**Last Updated:** December 2025

