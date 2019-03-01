function initCarousel(element, slideShowSeconds) {
  if (!element) {
    return;
  }
  var lastSlide = null;

  setInterval(function () {
    var slides = element.querySelectorAll('.js-carousel-option').length;
    var currentSlide = getCurrentSlide(element);
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
    element.querySelector('.js-carousel-option[value="' + currentSlide + '"]').checked = true
  }, slideShowSeconds * 1000);

  function getCurrentSlide(element) {
    var currentSlide = 1;
    element.querySelectorAll('.js-carousel-option').forEach(function (i) {
      if (i.checked) {
        currentSlide = i.value;
      }
    });
    return parseInt(currentSlide);
  }
}

var slideShowSeconds = 5;
initCarousel(document.querySelector('.js-carousel'), slideShowSeconds);
