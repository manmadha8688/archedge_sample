
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const category = entry.target.closest('.product-category');
      if (category && entry.isIntersecting) {
        category.classList.add('animated');
      } else if (category) {
        category.classList.remove('animated');
      } else {
        entry.target.classList.toggle('animated', entry.isIntersecting);
      }
    });
  }, { threshold: 0.2 });

  const element1 = document.querySelectorAll(
    '.products-hero, .feature-card, .about-section, .product-category-content, .hero-subtitle'
  );
  element1.forEach(el => observer.observe(el));


   document.querySelector('.scroll-down-indicator')?.addEventListener('click', () => {
    const nextSection = document.querySelector('.products-section'); // change if needed
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

   const header = document.getElementById('heroHeader');
const heroSection = document.getElementById('heroSection');

setInterval(() => {
  if (window.scrollY <= 250) {
    header.style.transform = 'translateY(-30px)';
    heroSection.style.transform = 'translateY(-30px)';

    setTimeout(() => {
      header.style.transform = 'translateY(0)';
      heroSection.style.transform = 'translateY(0)';
    }, 500);
  }
}, 3800);


  // Advanced Scrolling Behavior - Flexibond Style
  document.addEventListener('DOMContentLoaded', () => {

     const title = document.querySelector(".hero-title");
    const text = title.getAttribute("data-text");
    title.innerHTML = ""; // Clear original

    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${i * 0.05}s`;
      title.appendChild(span);
    });
    // Scroll Progress Indicator
    window.addEventListener('scroll', () => {
      const scrollProgress = document.getElementById('scrollProgress');
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
      const header = document.getElementById('heroHeader');
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxBg = document.querySelector('.parallax-bg');
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    });

    // Enhanced Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Apply reveal animations to elements
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .scale-reveal').forEach(el => {
      revealObserver.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Create floating particles
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particlesContainer.appendChild(particle);
      }
    }

    // Preserve existing functionality
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const category = entry.target.closest('.product-category');
        if (category && entry.isIntersecting) {
          category.classList.add('animated');
        } else if (category) {
          category.classList.remove('animated');
        } else {
          entry.target.classList.toggle('animated', entry.isIntersecting);
        }
      });
    }, { threshold: 0.2 });

    const element = document.querySelectorAll(
      '.products-hero, .feature-card, .about-section, .product-category-content, .hero-subtitle'
    );
    element.forEach(el => observer.observe(el));



  // Parallax Effect Engine
  class ParallaxEngine {
    constructor() {
      this.elements = [];
      this.isScrolling = false;
      this.init();
    }

    init() {
      this.findElements();
      this.bindEvents();
      this.animate();
    }

    findElements() {
      // Find all elements with data-speed attribute
      const elements = document.querySelectorAll('[data-speed]');
      elements.forEach(el => {
        this.elements.push({
          element: el,
          speed: parseFloat(el.dataset.speed) || 0.5,
          initialY: el.offsetTop
        });
      });
    }

    bindEvents() {
      window.addEventListener('scroll', () => {
        if (!this.isScrolling) {
          requestAnimationFrame(() => {
            this.updateParallax();
            this.isScrolling = false;
          });
          this.isScrolling = true;
        }
      });

      // Mouse move parallax for hero section
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
          this.handleMouseMove(e);
        });
      }
    }

    updateParallax() {
      const scrollTop = window.pageYOffset;
      
      this.elements.forEach(item => {
        const { element, speed } = item;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      // Update floating elements
      const floatElements = document.querySelectorAll('.float-element');
      floatElements.forEach((el, index) => {
        const speed = 0.2 + (index * 0.1);
        const yPos = -(scrollTop * speed);
        const xPos = Math.sin(scrollTop * 0.001 + index) * 20;
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    }

    handleMouseMove(e) {
      const heroSection = document.querySelector('.hero-section');
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const parallaxTexts = document.querySelectorAll('.parallax-text');
      parallaxTexts.forEach((text, index) => {
        const speed = 0.05 + (index * 0.02);
        const xPos = mouseX * speed;
        const yPos = mouseY * speed;
        text.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    }

    animate() {
      this.updateParallax();
      requestAnimationFrame(() => this.animate());
    }
  }

  // Initialize parallax engine
    const parallax = new ParallaxEngine();
  
  });