const container = document.querySelector('.template-drop-items');
const leftButtons = document.querySelectorAll('.template-drop__left-btn');
const right = document.querySelector('.template-drop__right');
const checkbox = document.querySelector('.toggle-switch__label input');
const monthlyText = document.querySelector('.toggle-container__text:nth-of-type(1)');
const yearlyText = document.querySelector('.toggle-container__text:nth-of-type(2)');
const monthlyPricing = document.querySelector('.pricing__card-container--monthly');
const yearlyPricing = document.querySelector('.pricing__card-container--yearly');
const footerButton = document.getElementById('footerMenuButton');
const header = document.querySelector('.header');
const scrollWatcher = document.createElement('div');



let hoverTimeout;

// Template dropdown dropdown toggles
leftButtons.forEach((btn, index) => {
    btn.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        container.dataset.activeIndex = index + 1;
    });

    btn.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            if (!container.querySelector('.template-drop__left-btn:hover') &&
                !right.matches(':hover')) {
                container.dataset.activeIndex = "1";
            }
        }, 100); // slight delay to allow mouse to move
    });
});

right.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
        if (!container.querySelector('.template-drop__left-btn:hover') &&
            !right.matches(':hover')) {
            container.removeAttribute('data-active-index');
        }
    }, 100);
});

right.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
});

// Pricing section toggle
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        monthlyText.classList.remove('toggle-container__text--active');
        yearlyText.classList.add('toggle-container__text--active');
        monthlyPricing.style.display = 'none';
        yearlyPricing.style.display = 'flex';
    } else {
        monthlyText.classList.add('toggle-container__text--active');
        yearlyText.classList.remove('toggle-container__text--active');
        monthlyPricing.style.display = 'flex';
        yearlyPricing.style.display = 'none';
    }
});

// FAQ accordian toggle
var acc = document.getElementsByClassName("faq__accordian-btn");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

// Footer smooth scroll dropdowns
document.querySelectorAll('.footer__col-dropdown-btn').forEach(button => {
    const menu = document.getElementById(button.getAttribute('aria-controls'));
    const toggleMenu = () => {
        const isOpen = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!isOpen));
        if (!isOpen) {
            // OPEN
            menu.hidden = false;
            menu.classList.add('open');
            menu.style.height = menu.scrollHeight + 'px';
            const onTransitionEnd = () => {
                menu.style.height = 'auto';
                menu.removeEventListener('transitionend', onTransitionEnd);
            };
            menu.addEventListener('transitionend', onTransitionEnd);
        } else {
            // CLOSE
            menu.style.height = menu.scrollHeight + 'px';
            requestAnimationFrame(() => {
                menu.style.height = '0px';
            });

            const onTransitionEnd = () => {
                menu.hidden = true;
                menu.classList.remove('open');
                menu.style.height = '';
                menu.removeEventListener('transitionend', onTransitionEnd);
            };
            menu.addEventListener('transitionend', onTransitionEnd);
        }
    };
    button.addEventListener('click', toggleMenu);
});

document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('mobileNavBtn');
    const mobileNav = document.querySelector('.mobile-nav');
    const logo = document.querySelector('.header__logo-image');
    const slides = document.querySelectorAll('.mobile-nav__slide');
    let activeSlide = document.querySelector('.mobile-nav__slide.active');
    const mobileLogo = document.querySelector('.mobile-nav__logo');

    // Slide in/out the whole nav
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            mobileNav.classList.add('mobile-nav--visible');
            logo.classList.toggle('hidden');
            mobileLogo.classList.toggle('show');

            // Reset all slides
            slides.forEach(slide => {
                slide.classList.remove('slide-left', 'slide-right', 'active');
            });
            if (slides[0]) {
                slides[0].classList.add('active');
                activeSlide = slides[0];
            }
        } else {
            mobileNav.classList.remove('mobile-nav--visible');
            logo.classList.toggle('hidden');
            mobileLogo.classList.toggle('show');
        }
    });

    // Forward navigation
    document.querySelectorAll('[data-target]').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (!target || target === activeSlide) return;

            activeSlide.classList.remove('active');
            activeSlide.classList.add('slide-left');
            target.classList.add('active');
            target.classList.remove('slide-right');

            setTimeout(() => {
                activeSlide.classList.remove('slide-left');
                activeSlide = target;
            }, 300);
        });
    });

    // Backward navigation
    document.querySelectorAll('.mobile-nav__btn--back').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const target = document.getElementById(targetId);
            if (!target || target === activeSlide) return;

            activeSlide.classList.remove('active');
            activeSlide.classList.add('slide-right');
            target.classList.add('active');
            target.classList.remove('slide-left');

            setTimeout(() => {
                activeSlide.classList.remove('slide-right');
                activeSlide = target;
            }, 300);
        });
    });
});

//Watching for scroll for header
scrollWatcher.setAttribute('data-scroll-watcher', '');
header.before(scrollWatcher);

const navObserver = new IntersectionObserver((entries) => {
    header.classList.toggle('sticking', !entries[0].isIntersecting)
});

navObserver.observe(scrollWatcher)