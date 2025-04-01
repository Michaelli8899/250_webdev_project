// set current slide
let currentSlide = 0;
// get the elements off the page
const totalSlides = $('.carousel-slide').length;
const $carouselInner = $('.carousel-inner');
const $dots = $('.dot');

// function to set slide active by index
function showSlide(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    $carouselInner.css('transform', 'translateX(' + (-currentSlide * 100) + '%)');
    $dots.removeClass('active');
    $dots.eq(currentSlide).addClass('active');
}

// set the slides active on delay
setInterval(function() {
    let nextSlide = currentSlide + 1;
    showSlide(nextSlide);
}, 5000);

// set the dots and arrows to be clickable
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

