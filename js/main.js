// ===================================
// Resume Interactive Features
// ===================================

'use strict';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Download PDF functionality
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Smooth scroll for internal links (if any are added in the future)
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll (optional - can be removed if not needed)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe job entries for animation
    const jobEntries = document.querySelectorAll('.job');
    jobEntries.forEach(job => {
        job.style.opacity = '0';
        job.style.transform = 'translateY(20px)';
        job.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(job);
    });

    // Track external link clicks (analytics ready)
    const externalLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkType = this.href.startsWith('mailto:') ? 'email' : 'phone';
            console.log(`Contact link clicked: ${linkType}`);
        });
    });

    // Add keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + P to print
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            window.print();
        }
    });

    // Mobile menu toggle (if needed in future)
    // This is a placeholder for potential mobile navigation features
    const createMobileMenuToggle = () => {
        // Placeholder for future mobile features
    };

    // Log successful initialization
    console.log('Resume page initialized successfully');
    
    // Optional: Add last updated date dynamically
    const addLastUpdated = () => {
        const footer = document.createElement('div');
        footer.style.cssText = 'text-align: center; padding: 1rem; font-size: 0.75rem; color: #888;';
        footer.innerHTML = `Last updated: ${new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        })}`;
        
        // Uncomment to add footer with last updated date
        // document.querySelector('.main-content').appendChild(footer);
    };

});

// ===================================
// Print Event Handlers
// ===================================

window.addEventListener('beforeprint', function() {
    console.log('Preparing to print resume...');
});

window.addEventListener('afterprint', function() {
    console.log('Print completed or cancelled');
});
