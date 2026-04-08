// ==================== CONFIG ====================
const MARQUEE_SPEED = 0.5;
const MARQUEE_SLOW_SPEED = 0.1;

// ==================== MARQUEE ANIMATION ====================
function initMarquee() {
    const marqueeContent = document.querySelector('.marquee-content');
    if (!marqueeContent) return;

    const clone = marqueeContent.innerHTML;
    marqueeContent.innerHTML += clone;

    let scrollPos = 0;
    let currentSpeed = MARQUEE_SPEED;

    function animate() {
        scrollPos -= currentSpeed;
        const scrollWidth = marqueeContent.scrollWidth / 2;

        if (Math.abs(scrollPos) >= scrollWidth) {
            scrollPos = 0;
        }

        marqueeContent.style.transform = `translateX(${scrollPos}px)`;
        requestAnimationFrame(animate);
    }

    animate();

    marqueeContent.addEventListener('mouseenter', () => {
        currentSpeed = MARQUEE_SLOW_SPEED;
    });

    marqueeContent.addEventListener('mouseleave', () => {
        currentSpeed = MARQUEE_SPEED;
    });
}

// ==================== INTERSECTION OBSERVER ====================
function createObserver(options = {}) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = (options.delayMultiplier || 0) * index;
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0) translateX(0)";
                }, delay);
            }
        });
    }, {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
    });
}

// ==================== COMPARISON CARDS ANIMATION ====================
function initComparisonCards() {
    const cards = document.querySelectorAll('.comparison-card');
    if (cards.length === 0) return;

    const observer = createObserver({ delayMultiplier: 200 });

    cards.forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(card);
    });
}

// ==================== PORTFOLIO ITEMS ANIMATION ====================
function initPortfolioAnimation() {
    const items = document.querySelectorAll('.portfolio-item');
    if (items.length === 0) return;

    const observer = createObserver({ 
        threshold: 0.1,
        delayMultiplier: 100
    });

    items.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(item);
    });
}

// ==================== TESTIMONIALS CAROUSEL ====================
function initTestimonials() {
    const nextBtn = document.querySelector('.nav-arrows .next');
    const prevBtn = document.querySelector('.nav-arrows .prev');
    const dots = document.querySelectorAll('.dot');
    const card = document.querySelector('.testimonial-card');

    if (!nextBtn || !card) return;

    let currentIndex = 0;
    const testimonials = [
        {
            text: "Je suis vraiment satisfait du travail réalisé sur mon logo. Le rendu final dépasse largement mes attentes, avec un design à la fois moderne et professionnel.",
            author: "PDG de KAS BANK Sarlu",
            rating: 5
        },
        {
            text: "Un travail extraordinaire ! Elvis a compris ma vision et l'a transformée en réalité. Très professionnel et créatif.",
            author: "Directeur de Ubuntu Cybernet",
            rating: 5
        },
        {
            text: "Les délais ont été respectés et le résultat dépasse mes attentes. Je recommande vivement ses services.",
            author: "Coach - Ets. Endurance",
            rating: 5
        },
        {
            text: "Un partenaire fiable et créatif. Elvis prend le temps de bien comprendre ses clients.",
            author: "Responsable - Hotel Vyoke",
            rating: 5
        }
    ];

    function updateTestimonial(index) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';

        setTimeout(() => {
            const testimonial = testimonials[index];
            const textContent = card.querySelector('.testimonial-text');
            const authorRole = card.querySelector('.author-role');

            if (textContent) {
                textContent.textContent = `"${testimonial.text}"`;
            }
            if (authorRole) {
                authorRole.textContent = testimonial.author;
            }

            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';

            // Mise à jour des dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }, 300);
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial(currentIndex);
    });

    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonial(currentIndex);
        });
    });
}

// ==================== COMPARISON SECTION GLOW EFFECT ====================
function initGlowEffect() {
    const section = document.querySelector('.comparison-section');
    if (!section) return;

    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        section.style.background = `
            radial-gradient(circle at ${x}px ${y}px, rgba(212, 255, 51, 0.05) 0%, transparent 50%),
            var(--bg-darker)
        `;
    });

    section.addEventListener('mouseleave', () => {
        section.style.background = 'var(--bg-darker)';
    });
}

// ==================== ABOUT SECTION BREATHING EFFECT ====================
function initAboutSection() {
    const aboutImage = document.querySelector('.profile-img');
    const aboutContent = document.querySelector('.about-content');

    if (!aboutImage) return;

    // Observer pour l'animation d'entrée du contenu
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateX(0)";
            }
        });
    }, { threshold: 0.3 });

    if (aboutContent) {
        aboutContent.style.opacity = "0";
        aboutContent.style.transform = "translateX(30px)";
        aboutContent.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        observer.observe(aboutContent);
    }

    // Animation de respiration pour l'image
    aboutImage.addEventListener('mouseenter', () => {
        aboutImage.style.animation = 'breathe 3s ease-in-out infinite';
    });

    aboutImage.addEventListener('mouseleave', () => {
        aboutImage.style.animation = 'none';
    });
}

// ==================== NAVIGATION ACTIVE STATE ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    // Set initial active link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(a => a.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section, main');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== BUTTON ACTIONS ====================
function initButtonActions() {
    const scrollButtons = document.querySelectorAll('[onclick*="scroll"]');
    
    scrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const funcName = btn.getAttribute('onclick');
            if (funcName === 'scrollToServices()') {
                const element = document.getElementById('services');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            } else if (funcName === 'scrollToPortfolio()') {
                const element = document.getElementById('portfolio');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Connexion button
    const loginBtn = document.querySelector('.navbar .btn-primary');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            console.log('Redirection vers connexion...');
            // Ajouter votre URL de connexion
            // window.location.href = '/login';
        });
    }
}

// ==================== PORTFOLIO ITEM CLICK ====================
function initPortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            console.log(`Portfolio item ${index + 1} clicked`);
            // Ajouter votre logique ici (modal, redirection, etc.)
        });
    });
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ==================== PERFORMANCE: Lazy Load Images ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ==================== INITIALIZE ALL ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initialisation du site Elvis Design');

    initMarquee();
    initComparisonCards();
    initPortfolioAnimation();
    initTestimonials();
    initGlowEffect();
    initAboutSection();
    initNavigation();
    initButtonActions();
    initPortfolioItems();
    initSmoothScroll();
    initLazyLoading();

    console.log('✅ Tous les éléments sont initialisés');
});

// ==================== ADDITIONAL: Scroll reveal trigger ====================
window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    // Optional: Add scroll progress indicator
    // document.documentElement.style.setProperty('--scroll-percent', `${scrollPercent}%`);
});

// ==================== ERROR HANDLING ====================
window.addEventListener('error', (event) => {
    console.error('❌ Erreur détectée:', event.error);
});


document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;

        // Fermer les autres questions (Optionnel - effet accordéon)
        document.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });

        // Basculer l'état actuel
        item.classList.toggle('active');
        
        // Petite animation GSAP pour l'apparition du texte si tu l'utilises déjà
        if (typeof gsap !== "undefined" && item.classList.contains('active')) {
            gsap.from(item.querySelector('.faq-answer p'), {
                y: -10,
                opacity: 0,
                duration: 0.4
            });
        }
    });
});