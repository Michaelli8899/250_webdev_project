$(document).ready(function() {
    let currentSlide = 0;
    const totalSlides = $('.carousel-slide').length;
    const $carouselInner = $('.carousel-inner');
    const $dots = $('.dot');
    
    function showSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        $carouselInner.css('transform', 'translateX(' + (-currentSlide * 100) + '%)');
        $dots.removeClass('active');
        $dots.eq(currentSlide).addClass('active');
    }

    setInterval(function() {
        let nextSlide = currentSlide + 1;
        showSlide(nextSlide);
    }, 5000);

    $dots.on('click', function() {
        const dotIndex = $(this).index();
        showSlide(dotIndex);
    });

    $('.carousel-arrow-left').on('click', function() {
        showSlide(currentSlide - 1);
    });

    $('.carousel-arrow-right').on('click', function() {
        showSlide(currentSlide + 1);
    });
});
