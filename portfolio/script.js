/**
 * Portfolio Website - JavaScript
 * Handles navigation, smooth scrolling, animations, and form interactions
 */

// ============================================
// Navigation Functionality
// ============================================

// Sticky Navigation on Scroll
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ============================================
// Smooth Scrolling for Anchor Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Skill Progress Bar Animation
// ============================================

const skillProgressBars = document.querySelectorAll('.skill-progress');

// Intersection Observer for skill bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const progress = progressBar.getAttribute('data-progress');
            progressBar.style.width = `${progress}%`;
            skillObserver.unobserve(progressBar);
        }
    });
}, {
    threshold: 0.5
});

skillProgressBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to a server
    // For now, we'll just show a success message
    console.log('Form submitted:', data);
    
    // Show success message (you can customize this)
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    contactForm.reset();
});

// Simple notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(0, 217, 255, 0.9);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Presentation-Style Scroll Animations
// ============================================

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animation configuration
const animationConfig = {
    duration: prefersReducedMotion ? 0 : 800,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    stagger: 100,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

// Initialize elements with animation classes
function initializeAnimations() {
    // Hero content elements - animate on load
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroName = document.querySelector('.hero-name');
    const heroRole = document.querySelector('.hero-role');
    const heroTagline = document.querySelector('.hero-tagline');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!prefersReducedMotion) {
        // Set initial states
        [heroGreeting, heroName, heroRole, heroTagline, heroButtons, scrollIndicator].forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(40px)';
            }
        });

        // Animate hero elements sequentially
        setTimeout(() => {
            if (heroGreeting) animateElement(heroGreeting, 'slide-up', 0);
            if (heroName) animateElement(heroName, 'slide-up', 200);
            if (heroRole) animateElement(heroRole, 'slide-up', 400);
            if (heroTagline) animateElement(heroTagline, 'slide-up', 600);
            if (heroButtons) animateElement(heroButtons, 'slide-up', 800);
            if (scrollIndicator) animateElement(scrollIndicator, 'fade-in', 1000);
        }, 100);
    }

    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('animate-on-scroll');
        header.dataset.animation = 'slide-up';
    });

    // About section elements
    const aboutIntro = document.querySelector('.about-intro');
    const aboutDetails = document.querySelector('.about-details');
    const aboutHighlights = document.querySelectorAll('.highlight-item');
    const aboutImage = document.querySelector('.about-image');

    if (aboutIntro) {
        aboutIntro.classList.add('animate-on-scroll');
        aboutIntro.dataset.animation = 'slide-right';
    }
    if (aboutDetails) {
        aboutDetails.classList.add('animate-on-scroll');
        aboutDetails.dataset.animation = 'slide-right';
    }
    if (aboutImage) {
        aboutImage.classList.add('animate-on-scroll');
        aboutImage.dataset.animation = 'slide-left';
    }
    aboutHighlights.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'scale-in';
        item.dataset.delay = index * animationConfig.stagger;
    });

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll');
        card.dataset.animation = 'slide-fade';
        card.dataset.delay = index * animationConfig.stagger;
    });

    // Skills section
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.classList.add('animate-on-scroll');
        category.dataset.animation = index % 2 === 0 ? 'slide-right' : 'slide-left';
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'slide-up';
        item.dataset.delay = (index % 4) * 50;
    });

    const iconItems = document.querySelectorAll('.icon-item');
    iconItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'scale-in';
        item.dataset.delay = index * 80;
    });

    // Contact section
    const contactSubtitle = document.querySelector('.contact-subtitle');
    const contactDescription = document.querySelector('.contact-description');
    const contactItems = document.querySelectorAll('.contact-item');
    const contactForm = document.querySelector('.contact-form');
    const socialLinks = document.querySelectorAll('.social-link');

    if (contactSubtitle) {
        contactSubtitle.classList.add('animate-on-scroll');
        contactSubtitle.dataset.animation = 'slide-right';
    }
    if (contactDescription) {
        contactDescription.classList.add('animate-on-scroll');
        contactDescription.dataset.animation = 'slide-right';
    }
    contactItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll');
        item.dataset.animation = 'slide-right';
        item.dataset.delay = index * 100;
    });
    if (contactForm) {
        contactForm.classList.add('animate-on-scroll');
        contactForm.dataset.animation = 'slide-left';
    }
    socialLinks.forEach((link, index) => {
        link.classList.add('animate-on-scroll');
        link.dataset.animation = 'scale-in';
        link.dataset.delay = index * 80;
    });
}

// Animate element function
function animateElement(element, animationType, delay = 0) {
    if (!element || prefersReducedMotion) {
        if (element) {
            element.style.opacity = '1';
            element.style.transform = 'none';
        }
        return;
    }

    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.classList.add(`animate-${animationType}`);
    }, delay);
}

// Enhanced Intersection Observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const animationType = element.dataset.animation || 'slide-up';
            const delay = parseInt(element.dataset.delay) || 0;

            if (!prefersReducedMotion) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    element.classList.add(`animate-${animationType}`);
                }, delay);
            } else {
                element.style.opacity = '1';
                element.style.transform = 'none';
            }

            scrollObserver.unobserve(element);
        }
    });
}, {
    threshold: animationConfig.threshold,
    rootMargin: animationConfig.rootMargin
});

// Observe all animated elements
function observeAnimatedElements() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// ============================================
// Parallax Effect for Hero Section
// ============================================

const heroOrbs = document.querySelectorAll('.gradient-orb');

if (!prefersReducedMotion) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        heroOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.3;
            orb.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// ============================================
// Typing Effect for Hero Text (Optional Enhancement)
// ============================================

// Uncomment and customize if you want a typing effect
/*
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Usage example:
// const heroName = document.querySelector('.hero-name');
// typeWriter(heroName, 'Your Name', 100);
*/

// ============================================
// Enhanced Button & Link Animations
// ============================================

// Add subtle scale animation to buttons on hover
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        if (!prefersReducedMotion) {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    button.addEventListener('mousedown', function() {
        if (!prefersReducedMotion) {
            this.style.transform = 'translateY(0) scale(0.98)';
        }
    });
    
    button.addEventListener('mouseup', function() {
        if (!prefersReducedMotion) {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }
    });
});

// Enhanced project card animations
const projectCardsAnimated = document.querySelectorAll('.project-card');
projectCardsAnimated.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!prefersReducedMotion) {
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    });
});

// Enhanced icon item animations
const iconItems = document.querySelectorAll('.icon-item');
iconItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        if (!prefersReducedMotion) {
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    });
});

// ============================================
// Initialize on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Activate first nav link
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    
    // Set initial skill bar widths to 0 for animation
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Initialize all animations
    initializeAnimations();
    
    // Start observing elements for scroll animations
    setTimeout(() => {
        observeAnimatedElements();
    }, 100);
    
    console.log('Portfolio website loaded successfully!');
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll listeners
const optimizedScrollHandler = throttle(() => {
    activateNavLink();
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);


