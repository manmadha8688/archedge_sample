let currentSlide = 0;
  const itemsPerSlide = 4;
  const track = document.getElementById('carouselTrack');
  const totalItems = document.querySelectorAll('.carousel-item').length;
  const maxSlide = Math.ceil(totalItems / itemsPerSlide) - 1;

  function moveSlide(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = maxSlide;
    if (currentSlide > maxSlide) currentSlide = 0;
    const slideWidth = track.offsetWidth / itemsPerSlide;
    track.style.transform = `translateX(-${currentSlide * slideWidth * itemsPerSlide}px)`;
  }

  // Auto Slide
  setInterval(() => {
    moveSlide(1);
  }, 4000);

const testimonials = [
    {
      name: " Kumar Swamy ",
      text: "The living room looks stunning with Archedge’s decorative wall panels and stylish ceiling—truly elevates the space!",
      image: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=Hoodie&clotheColor=Blue01&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light",
      bg: "./assets/images/homepage/review1.jpg"
    },
    {
      name: " Lalitha ",
      text: "Our lounge area feels modern and luxurious thanks to Archedge’s premium panels and smart designs.",
      image: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Kurt&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerShirt&clotheColor=PastelBlue&eyeType=Wink&eyebrowType=RaisedExcited&mouthType=Twinkle&skinColor=Tanned",
      bg: "./assets/images/homepage/review2.jpg"
    },
    {
      name: " Praveen Kumar",
      text: "Archedge transformed our interior with sleek wall panels and elegant ceiling finishes—beautiful and durable!",
      image: "https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Round&hairColor=Black&facialHairType=MoustacheMagnum&clotheType=ShirtVNeck&clotheColor=Heather&eyeType=Squint&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Light",
      bg: "./assets/images/homepage/review3.jpg"
    }
  ];

  let current = 0;
  let typingTimeout;

  function typeText(text, element) {
    let i = 0;
    element.textContent = '';
    clearTimeout(typingTimeout);

    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i++);
        const delay = Math.random() * (60 - 30) + 30;
        typingTimeout = setTimeout(typeChar, delay);
      }
    }

    typeChar();
  }

  function showTestimonial(index) {
    const { name, text, image, bg } = testimonials[index];
    document.getElementById("username").textContent = name;
    document.getElementById("profileImg").src = image;
    document.getElementById("imageDisplay").style.backgroundImage = `url('${bg}')`;

    const textEl = document.getElementById("typingText");
    typeText(text, textEl);
  }

  function nextSlide() {
    current = (current + 1) % testimonials.length;
    showTestimonial(current);
  }

  function prevSlide() {
    current = (current - 1 + testimonials.length) % testimonials.length;
    showTestimonial(current);
  }

  setInterval(nextSlide, 9000);
  showTestimonial(current);

document.addEventListener('DOMContentLoaded', function() { 

  // Hero Section Management
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroTexts = document.querySelectorAll('.hero-text');
  const indicators = document.querySelectorAll('.indicator');
  let currentSlideIndex = 0;
  let isTransitioning = false;

  // Set background images for slides
  heroSlides.forEach(slide => {
    const bgImage = slide.getAttribute('data-bg');
    if (bgImage) {
      slide.style.backgroundImage = `url('${bgImage}')`;
    }
  });

  function showHeroSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    
    // Remove active class from all slides, texts, and indicators
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroTexts.forEach(text => text.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Add active class to current slide, text, and indicator
    heroSlides[index].classList.add('active');
    heroTexts[index].classList.add('active');
    indicators[index].classList.add('active');
    
    // Allow next transition after fade completes
    setTimeout(() => {
      isTransitioning = false;
    }, 1200);
  }

  function nextHeroSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % heroSlides.length;
    showHeroSlide(currentSlideIndex);
  }

  // Auto-advance slides every 6 seconds (longer to appreciate zoom effect)
  setInterval(nextHeroSlide, 4000);

  // Indicator click handlers
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => {
      if (!isTransitioning && i !== currentSlideIndex) {
        currentSlideIndex = i;
        showHeroSlide(currentSlideIndex);
      }
    });
  });
  
  // Initialize first slide
  if (heroSlides.length > 0) {
    showHeroSlide(0);
  }

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
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
   
            header.style.transform = 'translateY(0)';
        
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
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
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
            }
            // else allow default navigation for other links
        });
    });
const imgs = document.querySelectorAll('.circle-container img');
  let current = 0;

  function rotateImages() {
    imgs.forEach((img, i) => {
      img.classList.remove('active');
      img.classList.remove(`img${i + 1}`);
    });

    imgs[current].classList.add('active');

    for (let i = 1; i <= 4; i++) {
      let idx = (current + i) % imgs.length;
      imgs[idx].classList.add(`img${i}`);
    }

    current = (current + 1) % imgs.length;
  }

  rotateImages();
  setInterval(rotateImages, 3000);


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

    // Core Benefits Animation - Animate from top and bottom
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    if (benefitItems.length > 0) {
        const benefitObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = Array.from(benefitItems).indexOf(entry.target);
                    // Staggered delay for smooth appearance
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, idx * 200);
                } else {
                    // Reset animation when item goes out of view
                    entry.target.classList.remove('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        benefitItems.forEach(item => benefitObserver.observe(item));
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

 const sub_observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // Reset when out of view
      }
    });
  }, {
    threshold: 0.1,
  });

  document.querySelectorAll('.fade-observe').forEach(el => sub_observer.observe(el));
  document.querySelectorAll('.fade-observe1').forEach(el => sub_observer.observe(el));
