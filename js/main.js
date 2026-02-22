/* ================================================
   MAIN.JS - 유태이 배우 포트폴리오
   GSAP Animations, ScrollTrigger, Navigation
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if GSAP loaded (may fail on file:// protocol)
    const gsapLoaded = typeof gsap !== 'undefined';

    if (gsapLoaded) {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ---- Navigation ---- //
    initNavigation();

    // ---- Mobile Menu ---- //
    initMobileMenu();

    // ---- Filmography Tabs (mobile) ---- //
    initFilmographyTabs();

    // ---- Mobile CTA ---- //
    initMobileCta();

    // ---- Sticky Contact Bar ---- //
    initStickyContact();

    // ---- Smooth Scroll ---- //
    initSmoothScroll();

    // ---- GSAP Animations ---- //
    if (gsapLoaded && !prefersReducedMotion) {
        initHeroAnimation();
        initScrollAnimations();
    } else {
        // Show everything immediately (GSAP not loaded or reduced motion)
        showAllElements();
    }
});

function showAllElements() {
    document.querySelectorAll('.anim-fade, .anim-slide, .anim-wipe, .hero__name-line, .hero__photo').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
    });
    // Set stat numbers to their target values
    document.querySelectorAll('.hero__stat-number').forEach(el => {
        el.textContent = el.getAttribute('data-count');
    });
    // Make nav visible
    const nav = document.getElementById('nav');
    if (nav) {
        nav.style.opacity = '1';
        nav.style.animation = 'none';
    }
}


/* ================================================
   NAVIGATION
   ================================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 80) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}


/* ================================================
   MOBILE MENU
   ================================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-menu__link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('nav__hamburger--active');
        mobileMenu.classList.toggle('mobile-menu--active');
        document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('nav__hamburger--active');
            mobileMenu.classList.remove('mobile-menu--active');
            document.body.style.overflow = '';
        });
    });
}


/* ================================================
   FILMOGRAPHY TABS (MOBILE)
   ================================================ */
function initFilmographyTabs() {
    const tabs = document.querySelectorAll('.filmography__tab');
    const columns = document.querySelectorAll('.filmography__column');

    // Set initial state
    setActiveTab('film');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.tab;
            setActiveTab(category);
        });
    });

    function setActiveTab(category) {
        tabs.forEach(t => t.classList.remove('filmography__tab--active'));
        columns.forEach(c => c.classList.remove('filmography__column--active'));

        const activeTab = document.querySelector(`[data-tab="${category}"]`);
        const activeColumn = document.querySelector(`[data-category="${category}"]`);

        if (activeTab) activeTab.classList.add('filmography__tab--active');
        if (activeColumn) activeColumn.classList.add('filmography__column--active');
    }
}


/* ================================================
   MOBILE CTA
   ================================================ */
function initMobileCta() {
    const mobileCta = document.getElementById('mobileCta');
    if (!mobileCta) return;

    const heroSection = document.getElementById('hero');

    window.addEventListener('scroll', () => {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 200) {
            mobileCta.classList.add('mobile-cta--visible');
        } else {
            mobileCta.classList.remove('mobile-cta--visible');
        }
    }, { passive: true });
}


/* ================================================
   STICKY CONTACT BAR
   ================================================ */
function initStickyContact() {
    const stickyContact = document.getElementById('stickyContact');
    if (!stickyContact) return;

    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    window.addEventListener('scroll', () => {
        const contactTop = contactSection.getBoundingClientRect().top;
        if (contactTop <= window.innerHeight) {
            stickyContact.style.transform = 'translateY(100%)';
        } else {
            stickyContact.style.transform = 'translateY(0)';
        }
    }, { passive: true });
}


/* ================================================
   SMOOTH SCROLL
   ================================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            const navHeight = document.getElementById('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}


/* ================================================
   HERO ANIMATION (GSAP Timeline)
   ================================================ */
function initHeroAnimation() {
    const tl = gsap.timeline({ delay: 0.3 });

    // 1. Photo fade in + scale
    tl.fromTo('.hero__photo', { opacity: 0, scale: 1.05 }, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out'
    });

    // 2. Label
    tl.to('.hero__label', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.8');

    // 3. Name lines stagger
    tl.to('.hero__name-line', {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.5');

    // 4. Subtitle
    tl.to('.hero__subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.3');

    // 5. CTA buttons
    tl.to('.hero__cta', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out'
    }, '-=0.2');

    // 6. Stats stagger
    tl.to('.hero__stat', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.4');

    // 7. (sticky contact bar is separate, no hero animation needed)

    // Counter animation for stats
    document.querySelectorAll('.hero__stat-number').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        gsap.to(el, {
            textContent: target,
            duration: 2,
            delay: 1.5,
            ease: 'power1.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                el.textContent = Math.round(parseFloat(el.textContent));
            }
        });
    });
}


/* ================================================
   SCROLL ANIMATIONS (ScrollTrigger)
   ================================================ */
function initScrollAnimations() {
    // Use matchMedia for mobile-specific behavior
    ScrollTrigger.matchMedia({
        // Desktop & Tablet
        '(min-width: 769px)': function () {
            setupScrollAnimations(true);
        },
        // Mobile
        '(max-width: 768px)': function () {
            setupScrollAnimations(false);
        }
    });
}

function setupScrollAnimations(isDesktop) {
    const triggerConfig = {
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none none'
    };

    // Section labels - slide in from left
    gsap.utils.toArray('.section-label').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, ...triggerConfig },
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Fade up elements
    gsap.utils.toArray('.about__heading, .about__text, .about__details, .about__skills, .about__image-wrapper, .featured__heading, .filmography__heading, .filmography__category-title, .contact__heading, .contact__info, .contact__buttons, .contact__image-wrapper').forEach(el => {
        gsap.to(el, {
            scrollTrigger: { trigger: el, ...triggerConfig },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Featured cards - stagger
    gsap.utils.toArray('.featured__card').forEach((card, i) => {
        gsap.to(card, {
            scrollTrigger: { trigger: card, ...triggerConfig },
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power2.out'
        });
    });

    // Filmography items - wipe stagger
    gsap.utils.toArray('.filmography__column').forEach(column => {
        const items = column.querySelectorAll('.filmography__item');
        gsap.to(items, {
            scrollTrigger: { trigger: column, ...triggerConfig },
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out'
        });
    });

    // About image parallax (desktop only)
    if (isDesktop) {
        const aboutImg = document.querySelector('.about__image img');
        if (aboutImg) {
            gsap.to(aboutImg, {
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -40,
                ease: 'none'
            });
        }

        // Contact image clip open
        const contactImage = document.querySelector('.contact__image');
        if (contactImage) {
            gsap.fromTo(contactImage, {
                clipPath: 'inset(10% 10% 10% 10%)'
            }, {
                scrollTrigger: {
                    trigger: '.contact',
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                },
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.2,
                ease: 'power3.out'
            });
        }
    }
}