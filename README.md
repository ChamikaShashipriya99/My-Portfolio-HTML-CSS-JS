# Chamika Shashipriya Kumarathunga - Portfolio Website

A modern, responsive portfolio website showcasing projects, experience, and skills. Built with HTML, CSS, and JavaScript, featuring smooth animations, dynamic content loading, and a sleek dark theme with neon accents.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🌟 Features

### ✨ Design & User Experience
- **Modern Dark Theme** - Sleek dark interface with neon cyan/pink accents
- **Responsive Design** - Fully responsive across all devices (Mobile, Tablet, Desktop)
- **Smooth Animations** - AOS (Animate On Scroll) library for elegant scroll animations
- **Interactive Elements** - Hover effects, transitions, and animated backgrounds
- **Custom 404 Page** - Beautiful error page with navigation options

### 📱 Pages & Sections
1. **Home Page** (`index.html`)
   - Hero section with animated profile image
   - Introduction and call-to-action buttons
   - Hexagonal tech-style image animation

2. **About Page** (`about.html`)
   - Personal introduction and professional journey
   - Core Values grid (Clean Code, User Focus, Dedication, Innovation)
   - Skills section
   - Animated profile image matching home page style

3. **Projects Page** (`projects.html`)
   - Dynamic GitHub repository integration
   - Auto-fetches repositories via GitHub API
   - Language-based filtering
   - Project cards with descriptions from README files
   - Responsive grid layout

4. **Experience Page** (`experience.html`)
   - Professional experience and education
   - Unique card designs for each experience item
   - Staggered animations
   - Company logos and detailed descriptions

5. **Contact Page** (`contact.html`)
   - Contact form with validation
   - Contact information (Email, Phone, Location)
   - Social media links
   - Form submission handling (ready for EmailJS/Formspree integration)

6. **404 Error Page** (`404.html`)
   - Custom error page with animated 404
   - Navigation options to return home

### 🎨 Visual Features
- **Background Animations** - Animated lines, geometric shapes, glow spots, and wave effects
- **Footer Animations** - Animated code snippets and geometric patterns
- **Social Icons** - Custom-styled blue-themed social media icons
- **Image Effects** - Hexagonal borders, scanning lines, glow effects
- **Gradient Text** - Dynamic gradient animations on headings

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with Flexbox, Grid, animations, and custom properties
- **JavaScript (ES6+)** - Dynamic content, API integration, DOM manipulation

### Libraries & APIs
- **AOS (Animate On Scroll)** - Scroll animations
- **Font Awesome 7.0.1** - Icon library
- **Google Fonts** - Inter & Montserrat font families
- **GitHub API** - Dynamic project fetching

### Tools & Standards
- **Web App Manifest** - PWA support
- **SVG Favicon** - Scalable favicon
- **Responsive Breakpoints** - Mobile-first design approach

## 📁 Project Structure

```
Portfolio/
├── index.html              # Home page
├── about.html              # About page
├── projects.html           # Projects showcase
├── experience.html         # Experience & Education
├── contact.html            # Contact form
├── 404.html               # Error page
├── favicon.svg            # SVG favicon
├── site.webmanifest       # PWA manifest
├── README.md              # This file
│
├── css/
│   └── style.css          # Main stylesheet
│
├── js/
│   ├── script.js          # Main JavaScript (AOS init, mobile menu)
│   ├── projects.js        # GitHub API integration & project display
│   ├── experience.js      # Experience data & dynamic rendering
│   └── contact.js         # Contact form handling
│
└── images/
    ├── my_Image.jpg       # Profile image
    ├── domediaLogo.jpg    # Company logo
    ├── aeti-logo.png      # Company logo
    ├── sliit-logo.png     # Institution logo
    ├── open-university-logo.png
    └── united-motors-logo.png
```

## 🚀 Getting Started

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for testing)
- A GitHub account (for project integration)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd Portfolio
   ```

2. **Open in a web browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     ```

3. **Configure GitHub Username**
   - Open `js/projects.js`
   - Update line 2:
     ```javascript
     const GITHUB_USERNAME = 'your-github-username';
     ```

## ⚙️ Configuration

### 1. Update Personal Information

#### Contact Information
- **Email**: Update in `contact.html` (line ~66, ~168)
- **Phone**: Update in `contact.html` (line ~76, ~176)
- **Location**: Update in `contact.html` (line ~84, ~183)

#### Social Media Links
- **LinkedIn**: Already connected in all pages
- **GitHub**: Update in footer and contact sections
- **Facebook/Twitter**: Currently link to 404 page (update as needed)

### 2. Update Experience Data

Edit `js/experience.js` to modify experience and education entries:

```javascript
const EXPERIENCE_DATA = [
    {
        title: "Your Position",
        company: "Company Name",
        location: "Location",
        startDate: "Start Date",
        endDate: "End Date",
        type: "Full-time",
        description: "Description here",
        responsibilities: ["Responsibility 1", "Responsibility 2"],
        technologies: ["Tech 1", "Tech 2"],
        icon: "fa-solid fa-icon-name",
        logo: "images/logo.png",
        category: "professional" // or "education"
    }
    // Add more entries...
];
```

### 3. Customize Colors & Theme

Edit `css/style.css` to modify CSS variables:

```css
:root {
    --dark-bg: #0a0a0a;
    --darker-bg: #050505;
    --neon-red: #00f0ff;
    --neon-pink: #ff003c;
    /* ... more variables ... */
}
```

### 4. Contact Form Integration

The contact form is ready for integration. Choose one:

#### Option A: EmailJS (Recommended)
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get your Service ID, Template ID, and User ID
3. Add EmailJS SDK to `contact.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
4. Update `js/contact.js` (line ~47-53) with your credentials

#### Option B: Formspree
1. Sign up at [Formspree](https://formspree.io/)
2. Get your form endpoint
3. Update form action in `contact.html`

#### Option C: Backend API
- Implement your own backend endpoint
- Update `js/contact.js` to POST to your API

## 🎨 Customization Guide

### Changing Profile Image
1. Replace `images/my_Image.jpg` with your image
2. Ensure it's square or crop it to square for best results
3. Recommended size: 400x400px or larger

### Modifying Animations
- AOS animations: Add `data-aos` attributes to elements
- Custom animations: Edit `@keyframes` in `css/style.css`

### Adding New Pages
1. Create new HTML file
2. Copy structure from existing pages
3. Update navigation links in all pages
4. Add corresponding styles if needed

### Updating Footer Content
- Edit footer section in each HTML file
- Update contact information
- Modify social links
- Change copyright text

## 📱 Responsive Breakpoints

The website uses these breakpoints:

- **Mobile**: 0px - 767px
- **Tablet/iPad**: 768px - 1199px
- **Desktop**: 1200px+
  - Max-width containers: 1366px, 1440px, 1680px, 1920px

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚢 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select branch and folder (usually `main` and `/root`)
4. Your site will be live at `https://username.github.io/repository-name`

## 📊 Performance Tips

- Images are optimized - ensure profile images are compressed
- Fonts are preloaded for faster rendering
- CSS and JS are minified (consider minification for production)
- Lazy loading can be added for images

## 🔧 Troubleshooting

### Projects Not Loading?
1. Check browser console (F12) for errors
2. Verify GitHub username in `js/projects.js`
3. Ensure internet connection (requires GitHub API)
4. Check if repositories are public

### Animations Not Working?
1. Verify AOS library is loaded
2. Check `data-aos` attributes are present
3. Ensure AOS is initialized in `js/script.js`

### Mobile Menu Not Working?
1. Check if `js/script.js` is loaded
2. Verify button has `mobile-menu-toggle` class
3. Check browser console for JavaScript errors

### Contact Form Not Sending?
- Form currently shows success message (simulated)
- Integrate EmailJS/Formspree for actual functionality
- See "Contact Form Integration" section above

## 📝 License

This project is open source and available for personal use. Feel free to customize it for your portfolio!

## 👤 Author

**Chamika Shashipriya Kumarathunga**
- Full Stack Developer & UI/UX Designer
- Email: chamikashashipriya3@gmail.com
- Phone: +94 70 412 0358
- Location: Ambalangoda, Sri Lanka

### Connect
- 🌐 [GitHub](https://github.com/ChamikaShashipriya99)
- 💼 [LinkedIn](https://www.linkedin.com/in/chamika-shashipriya-722366321)

## 🙏 Acknowledgments

- [AOS Library](https://michalsnik.github.io/aos/) - Scroll animations
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography
- [GitHub API](https://docs.github.com/en/rest) - Project integration

---

**Made with ❤️❤️❤️ using HTML, CSS & JavaScript**

If you found this portfolio helpful, feel free to star the repository! ⭐
