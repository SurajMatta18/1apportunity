// ===================================
// 1apportunity Landing Page - JavaScript
// Pure vanilla JavaScript with modern ES6+
// ===================================

// ===================================
// Mock Data
// ===================================

// TODO: Replace with API call - Example: fetch('/api/stats')
const mockStats = {
    registrations: 12547,
    tasksAssigned: 48392,
    cashOuts: 127845
};

// TODO: Replace with API call - Example: fetch('/api/reviews')
const mockReviews = [
    {
        id: 1,
        name: "Sarah Johnson",
        rating: 5,
        text: "1apportunity has completely changed how I earn extra income! The tasks are simple, and the payouts are always on time. I've earned over $500 in just two months!",
        date: "2024-01-15",
        initials: "SJ"
    },
    {
        id: 2,
        name: "Michael Chen",
        rating: 5,
        text: "As a student, this platform has been a lifesaver. I can watch ads during my free time and earn real money. The interface is super user-friendly and the support team is amazing!",
        date: "2024-01-10",
        initials: "MC"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        rating: 4,
        text: "Great platform for passive income. I love that I can complete tasks from my phone anywhere. Would definitely recommend to anyone looking to earn some extra cash!",
        date: "2024-01-05",
        initials: "ER"
    },
    {
        id: 4,
        name: "David Thompson",
        rating: 5,
        text: "The best part about 1apportunity is the transparency. You always know exactly how much you'll earn for each task. I've been using it for 3 months now and couldn't be happier!",
        date: "2023-12-28",
        initials: "DT"
    },
    {
        id: 5,
        name: "Lisa Martinez",
        rating: 5,
        text: "Simple, reliable, and actually pays! I was skeptical at first, but after my first cashout, I was convinced. This is the real deal. Highly recommended!",
        date: "2023-12-20",
        initials: "LM"
    }
];

// ===================================
// API Integration Examples (Commented)
// ===================================

/*
// Example 1: Fetch stats from API
async function fetchStats() {
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return mockStats; // Fallback to mock data
    }
}

// Example 2: Fetch reviews from API
async function fetchReviews() {
    try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return mockReviews; // Fallback to mock data
    }
}

// Example 3: Using the API functions
async function loadData() {
    const stats = await fetchStats();
    const reviews = await fetchReviews();
    
    // Update UI with fetched data
    updateStats(stats);
    renderReviews(reviews);
}
*/

// ===================================
// Counter Animation
// ===================================

function animateCounter(element, target, prefix = '', suffix = '') {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;
    
    let currentCount = 0;
    
    const timer = setInterval(() => {
        currentCount += increment;
        
        if (currentCount >= target) {
            element.textContent = prefix + target.toLocaleString() + suffix;
            clearInterval(timer);
        } else {
            element.textContent = prefix + Math.floor(currentCount).toLocaleString() + suffix;
        }
    }, stepDuration);
}

// ===================================
// Stats Section
// ===================================

function initializeStats() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // On mobile: observe each card individually so counters reveal on scroll
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(valueElement => {
                        const target = parseInt(valueElement.dataset.target);
                        const prefix = valueElement.dataset.prefix || '';
                        const suffix = '+';
                        animateCounter(valueElement, target, prefix, suffix);
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const cards = statsSection.querySelectorAll('.stat-card');
        cards.forEach(card => cardObserver.observe(card));
    } else {
        // On desktop: observe the whole section at once
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(valueElement => {
                        const target = parseInt(valueElement.dataset.target);
                        const prefix = valueElement.dataset.prefix || '';
                        const suffix = '+';
                        animateCounter(valueElement, target, prefix, suffix);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(statsSection);
    }
    
    // Update last updated date
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const today = new Date();
        lastUpdatedElement.textContent = today.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

// ===================================
// Reviews Section
// ===================================

function renderReviews(reviews = mockReviews) {
    const reviewsGrid = document.getElementById('reviewsGrid');
    if (!reviewsGrid) return;
    
    reviewsGrid.innerHTML = '';
    
    reviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        reviewsGrid.appendChild(reviewCard);
    });
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    
    // Create stars HTML
    const starsHTML = Array(5).fill(0).map((_, index) => 
        `<span class="star ${index < review.rating ? 'filled' : ''}">★</span>`
    ).join('');
    
    // Format date
    const date = new Date(review.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
    
    card.innerHTML = `
        <svg class="quote-icon-small" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
        </svg>
        
        <div class="review-rating">
            <div class="stars">
                ${starsHTML}
            </div>
        </div>
        
        <p class="review-text">
            "${review.text}"
        </p>
        
        <div class="review-author">
            <div class="review-avatar">${review.initials}</div>
            <div>
                <div class="review-name">${review.name}</div>
                <div class="review-date">${formattedDate}</div>
            </div>
        </div>
        
        <div class="review-decoration"></div>
    `;
    
    return card;
}

// ===================================
// Scroll Animations
// ===================================

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.stat-card, .feature-card, .review-card, .contact-item, .flow-step, .flow-arrow, .flow-cta');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate', 'animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('scroll-animate');
        observer.observe(element);
    });
}

// ===================================
// Smooth Scrolling
// ===================================

function scrollToStats() {
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        statsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Make scrollToStats available globally
window.scrollToStats = scrollToStats;

// Add smooth scroll to all anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Utility Functions
// ===================================

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

// ===================================
// Form Handlers (Newsletter, etc.)
// ===================================

function initializeForms() {
    // Newsletter form
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // TODO: Send to API
                // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
                
                alert('Thank you for subscribing! We\'ll keep you updated.');
                newsletterInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
        
        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Button Click Handlers
// ===================================

function initializeButtons() {
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-cta, .btn-contact');
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // TODO: Navigate to signup/contact page or show modal
            alert('Redirecting to signup page... (This would link to your registration page)');
        });
    });
}

// ===================================
// Mobile Nav
// ===================================

function initializeNavMenu() {
    const nav = document.querySelector('.main-navbar');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelectorAll('.nav-links a');

    if (!nav || !toggle) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// ===================================
// Performance Monitoring
// ===================================

function logPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('Performance Metrics:');
            console.log(`Page Load Time: ${pageLoadTime}ms`);
            console.log(`Connect Time: ${connectTime}ms`);
            console.log(`Render Time: ${renderTime}ms`);
        });
    }
}

// ===================================
// Initialization
// ===================================

function init() {
    console.log('1apportunity Landing Page - Initializing...');
    
    // Initialize all components
    initializeStats();
    renderReviews();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeForms();
    initializeButtons();
    initializeNavMenu();
    
    // Optional: Performance monitoring (only in development)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        logPerformance();
    }
    
    console.log('1apportunity Landing Page - Ready!');
}

// ===================================
// Event Listeners
// ===================================

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle window resize (debounced)
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
    // Add any resize-specific logic here if needed
}, 250));

// ===================================
// Export for potential module usage
// ===================================

// If using as a module, export key functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockStats,
        mockReviews,
        animateCounter,
        renderReviews,
        scrollToStats
    };
}
