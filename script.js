const THEME_STORAGE_KEY = 'portfolio-theme';
const root = document.documentElement;
const themeToggleButtons = document.querySelectorAll('[data-theme-toggle]');
const menu = document.querySelector('.menu-links');
const icon = document.querySelector('.hamburger-icon');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function applyTheme(theme) {
    root.dataset.theme = theme;

    themeToggleButtons.forEach((button) => {
        button.textContent = theme === 'dark' ? '☾ Dark' : '☀ Light';
        button.setAttribute(
            'aria-label',
            theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        );
    });
}

function toggleTheme() {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
}

const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const initialTheme = root.dataset.theme || (storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark');
applyTheme(initialTheme);
themeToggleButtons.forEach((button) => button.addEventListener('click', toggleTheme));

function toggleMenu() {
    menu.classList.toggle('open');
    icon.classList.toggle('open');
}

/* Hero name reveal: split into one <span class="hero-word"> per word so
   style.css can stagger-blur them in. Skipped under reduced motion, so the
   name is left as plain text with no DOM churn. */
if (!prefersReducedMotion.matches) {
    const heroTitle = document.querySelector('#profile .title');
    if (heroTitle) {
        const words = heroTitle.textContent.trim().split(/\s+/);
        heroTitle.textContent = '';
        words.forEach((word, i) => {
            if (i > 0) {
                heroTitle.appendChild(document.createTextNode(' '));
            }
            const span = document.createElement('span');
            span.className = 'hero-word';
            span.style.setProperty('--i', i);
            span.textContent = word;
            heroTitle.appendChild(span);
        });
    }
}

const revealSections = document.querySelectorAll('.reveal');

// Reveal sections as they enter the viewport. IntersectionObserver lets the
// browser batch this work; a scroll listener would run on every frame.
if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const show = (section) => {
        section.classList.add('is-visible');
        // Projects gets a second, staggered reveal on top of the section
        // fade-up: each card's transition-delay (--i, set once below) does
        // the staggering, so flipping is-visible here on all cards at once
        // is enough.
        if (section.id === 'projects') {
            section.querySelectorAll('.project-grid > .details-container').forEach((card) => {
                card.classList.add('is-visible');
            });
        }
        revealObserver.unobserve(section);
    };

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    show(entry.target);
                }
            });

            // A jump (deep link such as /#contact, or the browser restoring scroll
            // on reload) can carry sections from below the fold to above it without
            // ever intersecting, which would strand them at opacity 0. Sweep any
            // section the viewport has already passed.
            revealSections.forEach((section) => {
                if (
                    !section.classList.contains('is-visible') &&
                    section.getBoundingClientRect().bottom < 0
                ) {
                    show(section);
                }
            });
        },
        // threshold 0 plus a bottom inset fires once a section's top edge is
        // comfortably inside the viewport. A ratio threshold would never be met by
        // a section taller than the screen.
        { threshold: 0, rootMargin: '0px 0px -120px 0px' }
    );

    revealSections.forEach((section) => revealObserver.observe(section));
} else {
    revealSections.forEach((section) => section.classList.add('is-visible'));
}

const scrollTopButton = document.querySelector('[data-scroll-top]');
const topSentinel = document.getElementById('top-sentinel');

// Show the back-to-top button once the 1px sentinel at the top of the page has
// scrolled roughly 300px out of view, rather than sampling window.scrollY.
if (scrollTopButton && topSentinel && 'IntersectionObserver' in window) {
    const sentinelObserver = new IntersectionObserver(
        (entries) => {
            scrollTopButton.classList.toggle('is-visible', !entries[0].isIntersecting);
        },
        { rootMargin: '300px 0px 0px 0px' }
    );

    sentinelObserver.observe(topSentinel);
}

if (scrollTopButton) {
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
    });
}

// --i drives each project card's stagger delay (style.css). Stamped once up
// front rather than inside the reveal observer, since it never changes.
document.querySelectorAll('.project-grid > .details-container').forEach((card, i) => {
    card.style.setProperty('--i', i);
});

// Project card tilt + spotlight. Only attached on devices with a real mouse
// (hover + fine pointer), so a touch tap never leaves a card stuck mid-tilt.
const hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
if (hoverCapable.matches) {
    document.querySelectorAll('.project-grid .color-container').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            card.style.setProperty('--mx', `${px * 100}%`);
            card.style.setProperty('--my', `${py * 100}%`);
            // Tilt is spatial movement, so it's skipped under reduced motion;
            // the spotlight position above still updates either way.
            if (!prefersReducedMotion.matches) {
                card.style.setProperty('--rx', `${(0.5 - py) * 6}deg`);
                card.style.setProperty('--ry', `${(px - 0.5) * 6}deg`);
            }
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        });
    });
}

// Click-spark: a small burst of accent-colored dots at the click point, on
// the primary CTAs and hero social icons only. Skipped under reduced motion.
if (!prefersReducedMotion.matches) {
    const SPARK_COUNT = 5;

    function spawnSpark(x, y) {
        for (let i = 0; i < SPARK_COUNT; i += 1) {
            const angle = (Math.PI * 2 * i) / SPARK_COUNT;
            const distance = 18 + Math.random() * 10;
            const spark = document.createElement('span');
            spark.className = 'spark';
            spark.style.left = `${x}px`;
            spark.style.top = `${y}px`;
            spark.style.setProperty('--spark-x', `${Math.cos(angle) * distance}px`);
            spark.style.setProperty('--spark-y', `${Math.sin(angle) * distance}px`);
            spark.addEventListener('animationend', () => spark.remove());
            document.body.appendChild(spark);
        }
    }

    document.querySelectorAll('.btn, #socials-container .icon').forEach((el) => {
        el.addEventListener('click', (e) => spawnSpark(e.clientX, e.clientY));
    });
}

// Certificate carousel. The manifest lists every certificate image (already
// resized/compressed); only the current slide's image is ever fetched, so
// the other 28 never cost the page anything until visited. Full-size viewing
// is a hover/tap magnify on the image itself (see the depth-carousel setup
// below), which works identically for all 29 regardless of which ones also
// have a source PDF - an earlier version linked out to the PDF where one
// existed, which meant the button silently vanished on 3 slides that only
// ever had a JPG scan.
const CERTIFICATES = [
  { title: 'Artificial Intelligence with Machine Learning', image: 'assets/certificates/images/artificial-intelligence-with-machine-learning.jpg' },
  { title: 'Mastering Generative AI', image: 'assets/certificates/images/mastering-generative-ai.jpg' },
  { title: 'AI & ML Hackathon', image: 'assets/certificates/images/ai-ml-hackathon.jpg' },
  { title: 'Generative AI Hackathon', image: 'assets/certificates/images/generative-ai-hackathon.jpg' },
  { title: 'Internet of Things', image: 'assets/certificates/images/internet-of-things.jpg' },
  { title: 'IoT: Communication Technologies', image: 'assets/certificates/images/iot-communication-technologies.jpg' },
  { title: 'Internet of Things (Part 1)', image: 'assets/certificates/images/internet-of-things-part-1.jpg' },
  { title: 'Internet of Things (Part 2)', image: 'assets/certificates/images/internet-of-things-part-2.jpg' },
  { title: 'Python Programming', image: 'assets/certificates/images/python-programming.jpg' },
  { title: 'C Programming', image: 'assets/certificates/images/c-programming.jpg' },
  { title: 'C Programming (8-Hour)', image: 'assets/certificates/images/c-programming-8-hour.jpg' },
  { title: 'C Programming (23-Hour Comprehensive)', image: 'assets/certificates/images/c-programming-23-hour-comprehensive.jpg' },
  { title: 'Java Programming', image: 'assets/certificates/images/java-programming.jpg' },
  { title: 'HTML', image: 'assets/certificates/images/html.jpg' },
  { title: 'Database Management Systems & SQL', image: 'assets/certificates/images/database-management-systems-sql.jpg' },
  { title: 'Data Structures & Algorithms', image: 'assets/certificates/images/data-structures-algorithms.jpg' },
  { title: 'Data Structures & Algorithms Using Python', image: 'assets/certificates/images/data-structures-algorithms-using-python.jpg' },
  { title: 'Data Networking Fundamentals', image: 'assets/certificates/images/data-networking-fundamentals.jpg' },
  { title: 'UNIX & Linux OS', image: 'assets/certificates/images/unix-linux-os.jpg' },
  { title: 'Linear Algebra & Probability', image: 'assets/certificates/images/linear-algebra-probability.jpg' },
  { title: 'MATLAB (Beginner)', image: 'assets/certificates/images/matlab-beginner.jpg' },
  { title: 'MATLAB (Intermediate)', image: 'assets/certificates/images/matlab-intermediate.jpg' },
  { title: 'Organic Solar Cells: Theory & Practice', image: 'assets/certificates/images/organic-solar-cells-theory-practice.jpg' },
  { title: 'Full-Stack Web Development with AI', image: 'assets/certificates/images/full-stack-web-development-with-ai.jpg' },
  { title: 'Full-Stack Development with AI (NSDC)', image: 'assets/certificates/images/full-stack-development-with-ai-nsdc.jpg' },
  { title: 'Shiksha Vertex Training', image: 'assets/certificates/images/shiksha-vertex-training.jpg' },
  { title: 'Communication Skills', image: 'assets/certificates/images/communication-skills.jpg' },
  { title: 'Personal Effectiveness', image: 'assets/certificates/images/personal-effectiveness.jpg' },
  { title: 'Vulcan Racing', image: 'assets/certificates/images/vulcan-racing.jpg' },
];

// Depth-stack certificate carousel, adapted from reactbits.dev's Depth
// Carousel (https://reactbits.dev/components/depth-carousel): the front
// slide sits flat and in focus while the next few recede in z, fan out on
// x, tilt, darken, and blur. Ported to vanilla JS + CSS transitions (the
// reference uses React + GSAP) since this project has no build step.
// Deliberately dropped from the reference: wheel-to-navigate, since it
// hijacks vertical page-scroll the instant the cursor crosses the carousel
// - a real regression on a page recruiters are meant to scroll quickly.
const certCarousel = document.querySelector('[data-cert-carousel]');
if (certCarousel) {
    const certViewport = certCarousel.querySelector('[data-cert-viewport]');
    const certStage = certCarousel.querySelector('[data-cert-stage]');
    const certPreview = certCarousel.querySelector('[data-cert-preview]');
    const certPreviewImg = certCarousel.querySelector('[data-cert-preview-img]');
    const certTitle = certCarousel.querySelector('[data-cert-title]');
    const certCount = certCarousel.querySelector('[data-cert-count]');
    const certPrevButton = certCarousel.querySelector('[data-cert-prev]');
    const certNextButton = certCarousel.querySelector('[data-cert-next]');
    const certTotal = CERTIFICATES.length;

    const certLightbox = document.querySelector('[data-cert-lightbox]');
    const certLightboxPanel = certLightbox.querySelector('.cert-lightbox__panel');
    const certLightboxImg = certLightbox.querySelector('[data-cert-lightbox-img]');
    const certLightboxCaption = certLightbox.querySelector('[data-cert-lightbox-caption]');
    const certLightboxClose = certLightbox.querySelector('[data-cert-lightbox-close]');
    const certLightboxBackdrop = certLightbox.querySelector('[data-cert-lightbox-backdrop]');

    // Geometry constants mirror the reference's props (depth/spread/tilt/
    // falloff/blur), but card size is a landscape frame sized for the
    // certificate scans rather than the reference's portrait photo default.
    const DC = {
        cardWidth: 340,
        cardHeight: 250,
        depth: 150,
        spread: 64,
        tilt: 16,
        tiltDirection: 1,
        visibleCards: 3,
        falloff: 0.22,
        blur: 5
    };

    const dcClamp = (v, min, max) => Math.min(Math.max(v, min), max);

    let pos = 0;
    let currentIndex = 0;
    let dcScale = 1;
    let dragState = null;
    let suppressNextClick = false;

    const cardEls = CERTIFICATES.map((cert, i) => {
        const card = document.createElement('div');
        card.className = 'cert-carousel__card';
        card.dataset.index = String(i);
        card.setAttribute('role', 'group');
        card.setAttribute('aria-roledescription', 'slide');
        card.setAttribute('aria-label', `${i + 1} of ${certTotal}`);
        card.style.width = `${DC.cardWidth}px`;
        card.style.height = `${DC.cardHeight}px`;
        card.style.borderRadius = '2rem';

        const img = document.createElement('img');
        img.className = 'cert-carousel__card-img';
        img.dataset.src = cert.image;
        img.alt = `${cert.title} certificate`;
        img.draggable = false;
        img.addEventListener('load', () => img.classList.add('is-loaded'), { once: true });

        const tint = document.createElement('span');
        tint.className = 'cert-carousel__tint';
        tint.setAttribute('aria-hidden', 'true');

        card.append(img, tint);
        certStage.appendChild(card);
        return card;
    });

    function ensureCertImageLoaded(i) {
        const img = cardEls[i].querySelector('.cert-carousel__card-img');
        if (!img.src) {
            img.src = img.dataset.src;
        }
    }

    // Per-card transform math, ported 1:1 from the reference's layout()
    // (see the component's source for the derivation): d is each card's
    // signed distance from the focused position, wrapped to its own
    // shortest path so the stack loops seamlessly in either direction.
    function layout(p) {
        cardEls.forEach((card, i) => {
            let d = i - p;
            if (certTotal > 1) {
                d = ((d % certTotal) + certTotal) % certTotal;
                if (d > certTotal / 2) d -= certTotal;
            }

            const back = Math.max(0, d);
            const shown = Math.abs(d) <= DC.visibleCards + 0.5;

            const tz = -DC.depth * d;
            const tx = DC.tiltDirection * DC.spread * d;
            const ry = DC.tiltDirection * DC.tilt * dcClamp(d, 0, 1);

            let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
            if (!shown) opacity = 0;

            const brightness = Math.max(0.15, 1 - back * DC.falloff);
            const blurPx = DC.blur > 0 ? Math.min(DC.blur, (back / Math.max(1, DC.visibleCards)) * DC.blur) : 0;

            card.style.transform = `translate(-50%, -50%) scale(${dcScale}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
            card.style.opacity = opacity.toFixed(3);
            card.style.filter = prefersReducedMotion.matches ? 'none' : `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`;
            card.style.zIndex = String(Math.round(2000 - d * 20));
            card.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';
            card.setAttribute('aria-hidden', String(i !== currentIndex));

            // Only the front card is eligible for the pop-out preview/
            // lightbox (see CSS + the hover/click wiring below): a blurred,
            // tilted depth card wouldn't show anything legible anyway.
            card.classList.toggle('cert-carousel__card--active', i === currentIndex);

            card.querySelector('.cert-carousel__tint').style.opacity =
                dcClamp(back * DC.falloff * 1.25, 0, 0.86).toFixed(3);

            // Lazy-load only cards that are about to be shown, so 29 slides
            // never cost more than a handful of image fetches at a time.
            if (d >= -1 && d <= DC.visibleCards) {
                ensureCertImageLoaded(i);
            }
        });
    }

    function renderCertMeta() {
        const cert = CERTIFICATES[currentIndex];
        certTitle.textContent = cert.title;
        certCount.textContent = `${currentIndex + 1} / ${certTotal}`;
    }

    // Pop-out preview (desktop hover only - see the mouseover wiring below).
    // Re-renders the image only when the front slide has actually changed,
    // so repeated mouseover firings while the cursor wanders across the
    // front card don't re-trigger a fetch each time.
    let previewRenderedFor = -1;

    function showCertPreview() {
        if (previewRenderedFor !== currentIndex) {
            const cert = CERTIFICATES[currentIndex];
            certPreviewImg.src = cert.image;
            certPreviewImg.alt = `${cert.title} certificate, larger preview`;
            previewRenderedFor = currentIndex;
        }
        certPreview.classList.add('is-visible');
    }

    function hideCertPreview() {
        certPreview.classList.remove('is-visible');
    }

    function openCertLightbox(index) {
        const cert = CERTIFICATES[index];
        certLightboxImg.src = cert.image;
        certLightboxImg.alt = `${cert.title} certificate`;
        certLightboxCaption.textContent = cert.title;
        certLightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        // Let the browser paint the un-hidden (but still pre-transition)
        // state on this frame, so adding is-visible next frame has
        // something to animate from instead of jumping straight there.
        requestAnimationFrame(() => certLightbox.classList.add('is-visible'));
        certLightboxClose.focus();
    }

    function closeCertLightbox() {
        certLightbox.classList.remove('is-visible');
        document.body.style.overflow = '';
        if (prefersReducedMotion.matches) {
            certLightbox.hidden = true;
        } else {
            certLightboxPanel.addEventListener('transitionend', () => {
                certLightbox.hidden = true;
            }, { once: true });
        }
    }

    // Navigates by the shortest wrapped path from the current position, so
    // "prev" from slide 1 fans backward into slide 29 instead of forward
    // through the whole deck. Setting new inline styles and letting the
    // CSS transition animate them replaces the reference's GSAP tween.
    function focusIndex(rawIndex) {
        if (!certTotal) return;
        const idx = ((rawIndex % certTotal) + certTotal) % certTotal;
        let delta = idx - Math.round(pos);
        delta = ((delta % certTotal) + certTotal) % certTotal;
        if (delta > certTotal / 2) delta -= certTotal;
        pos += delta;
        currentIndex = idx;
        hideCertPreview();
        layout(pos);
        renderCertMeta();
    }

    layout(pos);
    renderCertMeta();

    certPrevButton.addEventListener('click', () => focusIndex(currentIndex - 1));
    certNextButton.addEventListener('click', () => focusIndex(currentIndex + 1));

    certViewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            focusIndex(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            focusIndex(currentIndex + 1);
        }
    });

    // Clicking a receding card in the stack brings it to front. Clicking the
    // front card (or its pop-out preview) opens the full-screen lightbox.
    // Suppressed for one event right after a drag, so the release doesn't
    // also fire a click on whatever card ended up under the pointer.
    certStage.addEventListener('click', (e) => {
        if (suppressNextClick) {
            suppressNextClick = false;
            return;
        }
        const card = e.target.closest('.cert-carousel__card');
        if (!card) return;
        const index = Number(card.dataset.index);
        if (index === currentIndex) {
            openCertLightbox(index);
        } else {
            focusIndex(index);
        }
    });

    certPreviewImg.addEventListener('click', () => openCertLightbox(currentIndex));

    // Preview is hover-only: touch has no hover, so a tap on the front card
    // goes straight to the lightbox via the click handler above instead.
    if (hoverCapable.matches) {
        certStage.addEventListener('mouseover', (e) => {
            if (e.target.closest('.cert-carousel__card--active')) showCertPreview();
        });
        // The preview is centered on the same point as the front card and
        // strictly larger, so once shown it fully covers the card - hiding
        // on its own mouseleave (rather than the card's) avoids a
        // show/hide flicker the instant the preview appears on top.
        certPreview.addEventListener('mouseleave', hideCertPreview);
    }

    certLightboxClose.addEventListener('click', closeCertLightbox);
    certLightboxBackdrop.addEventListener('click', closeCertLightbox);
    document.addEventListener('keydown', (e) => {
        if (certLightbox.hidden) return;
        if (e.key === 'Escape') {
            closeCertLightbox();
        } else if (e.key === 'Tab') {
            // The close button is the only focusable element in the dialog,
            // so trapping focus is just refusing to let Tab leave it.
            e.preventDefault();
            certLightboxClose.focus();
        }
    });

    // Shrinks the whole stack via one scale() baked into each card's
    // transform, rather than a breakpoint jump, so it keeps fitting as the
    // container narrows. Mirrors the reference's ResizeObserver.
    if ('ResizeObserver' in window) {
        const dcResizeObserver = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            const needed = DC.cardWidth + Math.abs(DC.spread) * 2 + 80;
            dcScale = dcClamp(width / needed, 0.5, 1);
            layout(pos);
        });
        dcResizeObserver.observe(certViewport);
    }

    // Drag to browse. Transitions are suspended for 1:1 tracking while
    // dragging, then restored so the release snap animates via CSS.
    if (!prefersReducedMotion.matches) {
        certStage.addEventListener('pointerdown', (e) => {
            dragState = { startX: e.clientX, startPos: pos, moved: false, pointerId: e.pointerId };
            certStage.classList.add('is-dragging');
        });

        certStage.addEventListener('pointermove', (e) => {
            if (!dragState) return;
            const dx = e.clientX - dragState.startX;
            if (!dragState.moved && Math.abs(dx) > 4) {
                dragState.moved = true;
                certStage.setPointerCapture(dragState.pointerId);
            }
            if (!dragState.moved) return;
            const stepPx = Math.max(DC.cardWidth * dcScale * 0.55, 40);
            pos = dragState.startPos - dx / stepPx;
            layout(pos);
        });

        const endCertDrag = () => {
            if (!dragState) return;
            const moved = dragState.moved;
            dragState = null;
            certStage.classList.remove('is-dragging');
            if (moved) {
                suppressNextClick = true;
                focusIndex(Math.round(pos));
            }
        };

        certStage.addEventListener('pointerup', endCertDrag);
        certStage.addEventListener('pointercancel', endCertDrag);
    }
}
