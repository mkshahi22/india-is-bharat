// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    // Handle hamburger menu click
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll');

            // Change hamburger icon to X when menu is open
            if (navMenu.classList.contains('active')) {
                hamburger.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Handle dropdown toggles for mobile
    const dropdowns = document.querySelectorAll('.dropdown');

    if (window.innerWidth <= 768) {
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            const dropdownContent = dropdown.querySelector('.dropdown-content');

            dropbtn.addEventListener('click', function (e) {
                // Close all other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-content').style.display = 'none';
                    }
                });

                // Toggle current dropdown
                if (dropdownContent.style.display === 'block') {
                    dropdownContent.style.display = 'none';
                } else {
                    dropdownContent.style.display = 'block';
                }

                e.preventDefault();
                e.stopPropagation();
            });
        });
    }

    // Back to Top Button functionality
    const backToTopButton = document.getElementById('back-to-top');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Scroll to top when back to top button is clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Animation on scroll
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.animate');

        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('show');
            }
        });
    }

    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Search functionality
    const searchBtn = document.getElementById('search-btn');
    const searchBar = document.getElementById('search-bar');

    if (searchBtn && searchBar) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchBar.value.trim().toLowerCase();
            if (searchTerm) {
                // Simple search functionality - highlight matches
                highlightSearchMatches(searchTerm);

                // Scroll to first match
                const firstMatch = document.querySelector('.search-highlight');
                if (firstMatch) {
                    firstMatch.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });

        // Allow search on Enter key press
        searchBar.addEventListener('keyup', function (event) {
            if (event.key === 'Enter') {
                searchBtn.click();
            }
        });
    }

    // Function to highlight search matches
    function highlightSearchMatches(term) {
        // Remove any existing highlights
        const existingHighlights = document.querySelectorAll('.search-highlight');
        existingHighlights.forEach(el => {
            el.classList.remove('search-highlight');
        });

        // Get all text elements that could contain the search term
        const textElements = document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main a');

        let matchFound = false;

        textElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes(term)) {
                element.classList.add('search-highlight');
                matchFound = true;
            }
        });

        // Notify if no matches found
        if (!matchFound) {
            alert('No matches found for "' + term + '"');
        }
    }

    // Add interactive elements to the map
    const regionsMap = document.querySelector('.india-map img');
    const regionLinks = document.querySelectorAll('.region-item');

    if (regionsMap && regionLinks.length) {
        // Create hover effect for regions
        regionLinks.forEach(link => {
            link.addEventListener('mouseenter', function () {
                // Add visual feedback
                this.style.transform = 'translateX(10px)';
                this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            });

            link.addEventListener('mouseleave', function () {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }

    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Create a simple slideshow effect for the news items
    const newsItems = document.querySelectorAll('.news-item');
    let currentNewsIndex = 0;

    if (newsItems.length > 1) {
        // Apply initial animations
        newsItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.opacity = '0.7';
                item.style.transform = 'scale(0.95)';
            } else {
                item.style.transform = 'scale(1.02)';
            }
        });

        // Rotate through news items every 5 seconds
        setInterval(() => {
            newsItems[currentNewsIndex].style.opacity = '0.7';
            newsItems[currentNewsIndex].style.transform = 'scale(0.95)';

            currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;

            newsItems[currentNewsIndex].style.opacity = '1';
            newsItems[currentNewsIndex].style.transform = 'scale(1.02)';
        }, 5000);
    }

    // Add hover effects for all clickable elements
    const clickables = document.querySelectorAll('a, button, .category-item, .icon-category, .region-item, .news-item');

    clickables.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Add tricolor theme toggle button
    const themeToggle = document.createElement('div');
    themeToggle.classList.add('theme-toggle');
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.title = 'Toggle Theme Colors';
    document.body.appendChild(themeToggle);

    let currentTheme = 'default';

    themeToggle.addEventListener('click', function () {
        if (currentTheme === 'default') {
            document.documentElement.style.setProperty('--primary-color', '#138808'); // Green
            document.documentElement.style.setProperty('--secondary-color', '#FF9933'); // Saffron
            currentTheme = 'alternate';
        } else {
            document.documentElement.style.setProperty('--primary-color', '#FF9933'); // Saffron
            document.documentElement.style.setProperty('--secondary-color', '#138808'); // Green
            currentTheme = 'default';
        }
    });

    // Add style for theme toggle button
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle {
            position: fixed;
            top: 120px;
            right: 30px;
            background-color: var(--primary-color);
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            z-index: 999;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: rotate(30deg);
        }
        
        .search-highlight {
            background-color: rgba(255, 153, 51, 0.3);
            border-radius: 3px;
            padding: 2px 0;
        }
    `;
    document.head.appendChild(style);

    // Create a loading animation
    window.addEventListener('load', function () {
        const loader = document.createElement('div');
        loader.classList.add('loader-wrapper');
        loader.innerHTML = `
            <div class="loader">
                <div class="chakra"></div>
            </div>
        `;
        document.body.prepend(loader);

        // Add loader styles
        const loaderStyle = document.createElement('style');
        loaderStyle.textContent = `
            .loader-wrapper {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease, visibility 0.5s ease;
            }
            
            .loader {
                width: 100px;
                height: 100px;
                position: relative;
            }
            
            .chakra {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 5px solid transparent;
                border-top: 5px solid #FF9933;
                border: 5px solid transparent;
                border-top: 5px solid #FF9933; /* Saffron */
                border-right: 5px solid #FFFFFF; /* White */
                border-bottom: 5px solid #138808; /* Green */
                border-left: 5px solid #000080; /* Navy Blue - Ashoka Chakra */
                animation: spin 1.5s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(loaderStyle);

        // Remove loader after content is fully loaded
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1500);
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Add typing effect to hero heading
    const heroHeading = document.querySelector('.hero-overlay h2');

    if (heroHeading) {
        const originalText = heroHeading.textContent;
        heroHeading.textContent = '';

        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroHeading.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 800);
    }

    // Add a visual feedback when clicking on buttons and links
    const buttons = document.querySelectorAll('button, .btn, .category-link, .icon-link, .region-item');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Position the ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            // Remove ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            width: 10px;
            height: 10px;
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(20);
                opacity: 0;
            }
        }
        
        button, .btn, .category-link, .icon-link, .region-item {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Add hover effect to category icons
    const categoryIcons = document.querySelectorAll('.category-item i');
    categoryIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.2) rotate(10deg)';
        });

        icon.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add a counter animation for statistics (if added later)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 10);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Implement sticky header with shrink effect on scroll
    const header = document.querySelector('header');
    const mainLogo = document.querySelector('.main_logo');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Add shrink class to header when scrolling down
        if (currentScroll > 100) {
            header.classList.add('header-shrink');
            if (mainLogo) mainLogo.classList.add('logo-shrink');
        } else {
            header.classList.remove('header-shrink');
            if (mainLogo) mainLogo.classList.remove('logo-shrink');
        }

        // Auto-hide header when scrolling down, show when scrolling up
        if (currentScroll > lastScrollTop && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Add shrink styles
    const shrinkStyle = document.createElement('style');
    shrinkStyle.textContent = `
        header {
            transition: transform 0.3s ease, padding 0.3s ease;
        }
        
        .header-shrink {
            padding: 5px 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .logo-shrink {
            padding: 5px 0;
        }
        
        .logo-shrink img {
            height: 60px;
            transition: height 0.3s ease;
        }
    `;
    document.head.appendChild(shrinkStyle);

    // Add image lazy loading
    const images = document.querySelectorAll('img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');

                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }

                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            const src = img.src;
            img.src = ''; // Clear source temporarily
            img.setAttribute('data-src', src);
            imageObserver.observe(img);
        });
    }

    // Add an interactive flag animation to the header on special occasions
    const today = new Date();
    const isRepublicDay = today.getMonth() === 0 && today.getDate() === 26; // January 26
    const isIndependenceDay = today.getMonth() === 7 && today.getDate() === 15; // August 15

    if (isRepublicDay || isIndependenceDay) {
        const flagContainer = document.createElement('div');
        flagContainer.classList.add('flag-animation');
        flagContainer.innerHTML = `
            <div class="flag">
                <div class="flag-stripe saffron"></div>
                <div class="flag-stripe white">
                    <div class="ashoka-chakra"></div>
                </div>
                <div class="flag-stripe green"></div>
            </div>
        `;

        document.body.prepend(flagContainer);

        // Add flag animation styles
        const flagStyle = document.createElement('style');
        flagStyle.textContent = `
            .flag-animation {
                position: fixed;
                top: 0;
                right: 0;
                z-index: 999;
                padding: 10px;
            }
            
            .flag {
                width: 100px;
                height: 60px;
                display: flex;
                flex-direction: column;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
                animation: flagWave 5s infinite ease-in-out;
            }
            
            .flag-stripe {
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .saffron {
                background-color: #FF9933;
            }
            
            .white {
                background-color: #FFFFFF;
                position: relative;
            }
            
            .green {
                background-color: #138808;
            }
            
            .ashoka-chakra {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #000080;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .ashoka-chakra::before {
                content: "";
                width: 22px;
                height: 22px;
                border-radius: 50%;
                border: 1px solid #000080;
                position: absolute;
                animation: chakraSpin 8s linear infinite;
            }
            
            @keyframes flagWave {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(5deg); }
                75% { transform: rotate(-5deg); }
            }
            
            @keyframes chakraSpin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(flagStyle);
    }

    // Add scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.classList.add('scroll-progress');
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;

        progressIndicator.style.width = scrolled + '%';
    });

    // Add scroll progress style
    const progressStyle = document.createElement('style');
    progressStyle.textContent = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(to right, #FF9933, #138808);
            width: 0%;
            z-index: 9999;
        }
    `;
    document.head.appendChild(progressStyle);

    // Add tooltip functionality for important elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');

            const tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.textContent = tooltipText;

            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';

            setTimeout(() => {
                tooltip.classList.add('show-tooltip');
            }, 10);
        });

        element.addEventListener('mouseleave', function () {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('show-tooltip');
                setTimeout(() => {
                    tooltip.remove();
                }, 200);
            }
        });
    });

    // Add tooltip style
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
        .tooltip {
            position: absolute;
            background-color: #333;
            color: white;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 0.3s, transform 0.3s;
            pointer-events: none;
        }
        
        .tooltip::before {
            content: "";
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 0 5px 5px 5px;
            border-style: solid;
            border-color: transparent transparent #333 transparent;
        }
        
        .show-tooltip {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(tooltipStyle);

    // Initialize custom elements with data attributes
    document.querySelectorAll('[data-animate]').forEach(element => {
        const animationType = element.getAttribute('data-animate');
        element.classList.add('animate', animationType);
    });
});