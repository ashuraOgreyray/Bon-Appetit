document.addEventListener('DOMContentLoaded', () => {

    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    let currentSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }

    function nextSlide() {
        let next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();

    const socialToggle = document.getElementById('socialToggle');
    const socialMenu = document.getElementById('socialMenu');

    if (socialToggle && socialMenu) {
        socialToggle.addEventListener('click', () => {
            const isActive = socialMenu.classList.toggle('active');
            socialToggle.classList.toggle('active');
            socialToggle.setAttribute('aria-expanded', isActive);
        });

        document.addEventListener('click', (e) => {
            if (!socialToggle.contains(e.target) && !socialMenu.contains(e.target)) {
                socialMenu.classList.remove('active');
                socialToggle.classList.remove('active');
                socialToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && socialMenu.classList.contains('active')) {
                socialMenu.classList.remove('active');
                socialToggle.classList.remove('active');
                socialToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});