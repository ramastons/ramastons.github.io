function initCarousel(element, slideShowSeconds) {
  this.element = element;
  this.lastSlide = null;
  this.events = [];

  setInterval(function () {
    if (this.element.classList.contains("js-stopLoop")) {
      return;
    }
    loopSlides();
  }, slideShowSeconds * 1000);

  this.events.push(window.addEventListener('resize', function() {
    setHeightAuto();
  }));

  this.element.querySelectorAll('.js-carousel-option').forEach(function (option) {
    this.events.push(option.addEventListener('change', function() {
      setHeightAuto();
    }));
  });

  setHeightAuto();

  function loopSlides() {
    var slidesCount = getSlidesCount();
    var currentSlide = getCurrentSlide(element);
    if (this.lastSlide != null && this.lastSlide != currentSlide) {
      // add an additional loop when slide is changed manually
      this.lastSlide = currentSlide;
      return;
    }

    currentSlide = currentSlide >= slidesCount ? 1 : currentSlide + 1;
    this.lastSlide = currentSlide;

    displaySlide(currentSlide);
    setImageHeight(currentSlide);
  }

  function getSlidesCount() {
    return this.element.querySelectorAll('.js-carousel-option').length;
  }

  function displaySlide(currentSlide) {
    this.element.querySelector('.js-carousel-option[value="' + currentSlide + '"]').checked = true;
  }

  function getCurrentSlide() {
    var currentSlide = 1;
    this.element.querySelectorAll('.js-carousel-option').forEach(function (i) {
      if (i.checked) {
        currentSlide = i.value;
      }
    });
    return parseInt(currentSlide);
  }

  function setImageHeight(index) {
    var slide = this.element.querySelector('.js-slideImage[data-image-index="'+index+'"]');
    if (slide.complete && slide.clientHeight > 0) {
      this.element.parentElement.style.height = slide.clientHeight + "px";
      return;
    }

    slide.addEventListener('load', function() {
      setImageHeight(index);
    });
  }

  function setHeightAuto() {
    setImageHeight(getCurrentSlide());
  }
}

var slideShowSeconds = 5;
initCarousel(document.querySelector('.js-carousel'), slideShowSeconds);
