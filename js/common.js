function initCarousel() {
    var slideShowSeconds = 5;
    var lastSlide = null;
    setInterval(function() {
        var slides = document.querySelectorAll('.js-carousel-option').length;
        var currentSlide = getCurrentSlide();
        if (lastSlide != null && lastSlide != currentSlide) {
            lastSlide = currentSlide;
            return;
        }
        if (currentSlide >= slides) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }
        
        lastSlide = currentSlide;
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