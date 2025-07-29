// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for backdrop effect
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'transform 0.3s ease';
    
    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Active navigation link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const directions = ['slide-in-top', 'slide-in-bottom', 'slide-in-top', 'slide-in-bottom'];

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const benefitItem = entry.target;
            const index = Array.from(benefitItem.parentNode.children).indexOf(benefitItem);
            const directionClass = directions[index % directions.length];
            const icon = benefitItem.querySelector('.benefit-icon');
            const heading = benefitItem.querySelector('h3');

            if (entry.isIntersecting) {
                benefitItem.classList.add('visible');
                benefitItem.classList.add(directionClass);
                if (icon) icon.classList.add('visible');
                if (heading) heading.classList.add('visible');
                // Do not remove classes on exit to prevent blinking
            }
        });
    }, observerOptions);

    // New observer for core-benefits section to toggle animation
    const coreBenefitsSection = document.querySelector('.core-benefits');
    const coreObserverOptions = {
        threshold: 0.1
    };

    const coreObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const benefitItems = coreBenefitsSection.querySelectorAll('.benefit-item');
            if (entry.isIntersecting) {
                benefitItems.forEach(item => item.classList.add('animate'));
            }
            // Removed removal of 'animate' class on exit to keep boxes stuck
        });
    }, coreObserverOptions);

    if (coreBenefitsSection) {
        coreObserver.observe(coreBenefitsSection);
    }

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.benefit-item');
    animatedElements.forEach(el => {
        el.classList.remove('visible');
        el.classList.remove(...directions);
        observer.observe(el);
    });





    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background img');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });

    // Form validation (if contact form is added)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                form.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Enhanced Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Search on input
        searchInput.addEventListener('input', function() {
            performSearch(this.value);
        });
        
        // Search on button click
        searchBtn.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value);
            }
        });
        
        function performSearch(searchTerm) {
            const term = searchTerm.toLowerCase().trim();
            const productCards = document.querySelectorAll('.product-card, .range-item');
            let visibleCount = 0;
            
            productCards.forEach(card => {
                const title = card.querySelector('h3');
                const description = card.querySelector('p');
                const titleText = title ? title.textContent.toLowerCase() : '';
                const descText = description ? description.textContent.toLowerCase() : '';
                
                if (term === '' || titleText.includes(term) || descText.includes(term)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Show search results feedback
            if (term !== '' && visibleCount === 0) {
                showSearchMessage('No products found matching your search.');
            } else if (term !== '' && visibleCount > 0) {
                showSearchMessage(`Found ${visibleCount} product${visibleCount !== 1 ? 's' : ''} matching "${searchTerm}".`);
            } else {
                hideSearchMessage();
            }
        }
        
        function showSearchMessage(message) {
            let messageEl = document.querySelector('.search-message');
            if (!messageEl) {
                messageEl = document.createElement('div');
                messageEl.className = 'search-message';
                messageEl.style.cssText = `
                    position: fixed;
                    top: 100px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(99, 102, 241, 0.9);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 20px;
                    font-size: 14px;
                    z-index: 1001;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                `;
                document.body.appendChild(messageEl);
            }
            messageEl.textContent = message;
            messageEl.style.opacity = '1';
            
            // Auto hide after 3 seconds
            setTimeout(() => {
                if (messageEl) {
                    messageEl.style.opacity = '0';
                    setTimeout(() => {
                        if (messageEl && messageEl.parentNode) {
                            messageEl.parentNode.removeChild(messageEl);
                        }
                    }, 300);
                }
            }, 3000);
        }
        
        function hideSearchMessage() {
            const messageEl = document.querySelector('.search-message');
            if (messageEl) {
                messageEl.style.opacity = '0';
                setTimeout(() => {
                    if (messageEl && messageEl.parentNode) {
                        messageEl.parentNode.removeChild(messageEl);
                    }
                }, 300);
            }
        }
    }

    // Testimonial carousel (if needed)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    function showNextTestimonial() {
        if (testimonials.length > 1) {
            testimonials[currentTestimonial].style.opacity = '0';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.opacity = '1';
        }
    }
    
    // Auto-rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000);
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based functionality can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
