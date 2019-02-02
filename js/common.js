function initCarousel() {
    var slideShowSeconds = 5;
    
    setInterval(function() {
        var slides = document.querySelectorAll('.js-carousel-option').length;
        var currentSlide = getCurrentSlide();
        if (currentSlide >= slides) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }
        document.querySelector('.js-carousel-option[value="' + currentSlide + '"]').checked = true
    }, slideShowSeconds * 1000);
}

function getCurrentSlide() {
    var currentSlide = 1;
    document.querySelectorAll('.js-carousel-option').forEach(function(i) { 
        if (i.checked) { 
            currentSlide = i.value;
        }
    });
    return parseInt(currentSlide);
}

initCarousel();