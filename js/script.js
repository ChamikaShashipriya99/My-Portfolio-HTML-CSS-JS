document.addEventListener('DOMContentLoaded', function(){
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking on a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        // Check if mobile
        const isMobile = window.innerWidth <= 767;
        
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
            disable: false, // Keep AOS enabled but ensure mobile visibility
            useClassNames: false,
            initClassName: false,
            animatedClassName: 'aos-animate',
        });
        
        // On mobile, ensure all AOS elements are visible immediately
        if (isMobile) {
            // Force visibility of all elements with AOS attributes
            const forceVisibility = () => {
                document.querySelectorAll('[data-aos]').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                    el.style.transform = 'none';
                    el.classList.add('aos-animate');
                });
            };
            
            // Run immediately and after a short delay to catch dynamically loaded content
            forceVisibility();
            setTimeout(forceVisibility, 100);
            setTimeout(forceVisibility, 500);
            setTimeout(forceVisibility, 1000);
            
            // Also run when window is resized
            window.addEventListener('resize', function() {
                if (window.innerWidth <= 767) {
                    forceVisibility();
                }
            });
        }
    }
    
    const profileWrapper = document.querySelector('.profile-wrapper');
    const particleCount = 30;

    //Create particles
    for(let i = 0; i < particleCount; i++){
        const particle = document.createElemant('div');
        particle.classList.add('particle');

        //Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.5 + 0.1;

        //Apply styles
        particle.style.width = `${size}px`;
        particle.style.heigth = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.opacity = opacity;
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite ease-in-out`;

        profileWrapper.appendChild(particle);
    }

    // Floating animation for particles
    document.querySelectorAll('.particle').forEach(particle => {
    const keyframes = `
        @keyframes float-${Math.random().toString(36).substr(2, 5)} {
            0% {
                transform: translate(0, 0);
            }
            50% {
                transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    particle.style.animation = `float-${styleSheet.sheet.cssRules[0].NAMESPACE_RULE.match(/-(\w+)/)[1]} ${Math.random() * 10 + 5}s infinite ease-in-out`;

    });

})