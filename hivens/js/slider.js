document.addEventListener('DOMContentLoaded', function () {
    // Плавная прокрутка к секциям с центрированием
    document.querySelectorAll('.header-btns a.btn').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const windowHeight = window.innerHeight;
                const sectionHeight = targetSection.offsetHeight;
                const sectionTop = targetSection.getBoundingClientRect().top + window.scrollY;
                const offset = sectionTop - (windowHeight / 2) + (sectionHeight / 2);

                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Слайдер портфолио
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dotsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentSlide = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');

        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });

        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    nextBtn.onclick = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    prevBtn.onclick = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    // Кнопка "Подробнее"
    window.expandPortfolio = function () {
        const container = document.getElementById('portfolioContainer');
        const sliderView = document.getElementById('slider-view');
        const caseView = document.getElementById('case-view');

        sliderView.style.opacity = '0';

        setTimeout(() => {
            sliderView.style.display = 'none';
            container.classList.add('expanded');
            caseView.style.display = 'block';

            setTimeout(() => {
                caseView.style.opacity = '1';
            }, 50);
        }, 400);
    };

    window.collapsePortfolio = function () {
        const container = document.getElementById('portfolioContainer');
        const sliderView = document.getElementById('slider-view');
        const caseView = document.getElementById('case-view');

        caseView.style.opacity = '0';

        setTimeout(() => {
            caseView.style.display = 'none';
            container.classList.remove('expanded');
            sliderView.style.display = 'block';

            setTimeout(() => {
                sliderView.style.opacity = '1';
            }, 50);
        }, 400);
    };

    // Модальное окно
    const modal = document.getElementById('contactModal');
    const openBtn = document.querySelector('.contact-button');
    const contactBtnHeader = document.getElementById('contactBtnHeader');
    const closeBtn = document.getElementById('closeModal');

    const openModal = () => {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 400);
        document.body.style.overflow = '';
    };

    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    contactBtnHeader.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
