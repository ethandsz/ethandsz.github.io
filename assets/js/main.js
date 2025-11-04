/**
 * Minimal Portfolio JavaScript
 * Clean, professional interactions without excessive effects
 */

// ===================================================================
// Initialize on DOM Content Loaded
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeImageModal();
});

// ===================================================================
// Minimal Page Loader
// ===================================================================

function initializeLoader() {
    // Create loader element
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-inner"></div>';
    document.body.appendChild(loader);

    // Hide loader when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.remove();
            }, 300);
        }, 200);
    });
}

// ===================================================================
// Mobile Menu Toggle
// ===================================================================

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');
    
    if (mobileMenuToggle) {
        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !nav.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
}

// ===================================================================
// Navigation System with Scroll Spy
// ===================================================================

function initializeNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');
    
    // Header scroll effect - minimal shadow on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for subtle shadow
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll (only on larger screens)
        if (window.innerWidth > 768) {
            if (currentScroll > lastScroll && currentScroll > 500) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
        
        // Scroll spy - highlight active section
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (currentScroll >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100));
}

// ===================================================================
// Subtle Scroll Animations
// ===================================================================

function initializeScrollAnimations() {
    // Add animation class to elements
    const animateElements = document.querySelectorAll('.project, .skills-section, #contact');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ===================================================================
// Image Modal for Full View
// ===================================================================

function initializeImageModal() {
    // Add click handlers to project images (but not videos)
    const projectImages = document.querySelectorAll('.project img:not(video img)');
    
    projectImages.forEach(img => {
        // Skip images that are fallbacks inside video tags
        if (img.parentElement.tagName === 'VIDEO') return;
        
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            createImageModal(img.src, img.alt);
        });
    });
    
    // Lazy load videos when they come into view
    const videos = document.querySelectorAll('video[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.load();
                    videoObserver.unobserve(video);
                }
            });
        }, { rootMargin: '100px' });
        
        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
}

function createImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        cursor: zoom-out;
        padding: 32px;
        animation: fadeIn 0.2s ease-out;
    `;
    
    // Create image
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        animation: scaleIn 0.2s ease-out;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 24px;
        right: 24px;
        width: 44px;
        height: 44px;
        background: white;
        border: 2px solid #E5E5E5;
        border-radius: 50%;
        font-size: 28px;
        line-height: 1;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #4A4A4A;
    `;
    
    closeBtn.onmouseover = () => {
        closeBtn.style.background = '#F5F5F5';
        closeBtn.style.borderColor = '#4A4A4A';
    };
    
    closeBtn.onmouseout = () => {
        closeBtn.style.background = 'white';
        closeBtn.style.borderColor = '#E5E5E5';
    };
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Close modal on click
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.2s ease-out';
        img.style.animation = 'scaleOut 0.2s ease-out';
        setTimeout(() => modal.remove(), 200);
    };
    
    modal.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Add animations
    if (!document.querySelector('#modal-animations')) {
        const style = document.createElement('style');
        style.id = 'modal-animations';
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
            @keyframes scaleIn { from { transform: scale(0.95); } to { transform: scale(1); } }
            @keyframes scaleOut { from { transform: scale(1); } to { transform: scale(0.95); } }
        `;
        document.head.appendChild(style);
    }
}

// ===================================================================
// Smooth Scroll
// ===================================================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================================================
// Performance Optimization - Throttle
// ===================================================================

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================================================
// Subtle Hover Effects for Interactive Elements
// ===================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover scale to buttons
    const buttons = document.querySelectorAll('.btn, nav a[href*="Resume"]');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    });
    
    // Add hover effect to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0)';
        });
    });
});

// ===================================================================
// Console Message - Professional
// ===================================================================

console.log('%c Welcome to Ethan\'s Portfolio ', 
    'background: #1A1A1A; color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 4px;');
console.log('%c Built with precision and attention to detail ', 
    'color: #5A6C7D; font-size: 12px; padding: 5px;');
