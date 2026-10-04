// Scroll green background
const root = document.documentElement;

const update = () => {
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    root.style.setProperty('--progress', progress);
};

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();

// Get year to display in footer
document.querySelector('.footer__year').textContent = new Date().getFullYear();

// Highlight current visible section in nav
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav__link');

const setActive = (id) => {
    navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${id}`) {
            link.setAttribute('aria-current', 'location');
        } else {
            link.removeAttribute('aria-current');
        }
    });
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
        });
    },
    { rootMargin: '-50% 0px -50% 0px' },
);

sections.forEach((section) => observer.observe(section));

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('menu');
const mobile = window.matchMedia('(max-width: 60rem)');

const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open);

    // keep focus inside the menu while it covers the page
    document.querySelectorAll('main, footer').forEach((element) => {
        element.inert = open;
    });
};

menuToggle.addEventListener('click', () => {
    setMenu(!root.classList.contains('menu-open'));
});

menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && root.classList.contains('menu-open')) {
        setMenu(false);
        menuToggle.focus();
    }
});

mobile.addEventListener('change', () => setMenu(false));

const realLinks = document.querySelectorAll('.header:not(.header--light) a');
const copyLinks = document.querySelectorAll('.header--light a');

realLinks.forEach((link, index) => {
    const twin = copyLinks[index];
    if (!twin) return;

    let hovered = false;
    let focused = false;

    const update = () =>
        twin.classList.toggle('is-hovered', hovered || focused);

    link.addEventListener('pointerenter', () => {
        hovered = true;
        update();
    });
    link.addEventListener('pointerleave', () => {
        hovered = false;
        update();
    });
    link.addEventListener('focus', () => {
        focused = link.matches(':focus-visible');
        update();
    });
    link.addEventListener('blur', () => {
        focused = false;
        update();
    });
});
