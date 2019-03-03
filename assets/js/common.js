/* Polyfills */
if (typeof NodeList != "undefined" && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

/* Carousel */
function Carousel(element, options) {
  this.options = Object.assign({
    slideShowSeconds: 5,
    fitSizeBySlide: false
  }, options || {});

  this.element = element;
  this.lastSlide = null;
  this.loopInterval = null;
  this.events = [];

  this.loopSlides = function () {
    var slidesCount = this.getSlidesCount();
    var currentSlide = this.getCurrentSlide(element);
    if (this.lastSlide != null && this.lastSlide != currentSlide) {
      // add an additional loop when slide is changed manually
      this.lastSlide = currentSlide;
      return;
    }

    currentSlide = currentSlide >= slidesCount ? 1 : currentSlide + 1;
    this.lastSlide = currentSlide;

    this.displaySlide(currentSlide);

    if (this.options.fitSizeBySlide) {
      this.setImageHeight(currentSlide);
    }
  }

  this.getSlidesCount = function () {
    return this.element.querySelectorAll('.js-carousel-option').length;
  }

  this.displaySlide = function (currentSlide) {
    this.element.querySelector('.js-carousel-option[value="' + currentSlide + '"]').checked = true;
  }

  this.getCurrentSlide = function () {
    var currentSlide = 1;
    this.element.querySelectorAll('.js-carousel-option').forEach(function (i) {
      if (i.checked) {
        currentSlide = i.value;
      }
    });
    return parseInt(currentSlide);
  }

  this.setImageHeight = function (index) {
    var slide = this.element.querySelector('.js-slideImage[data-image-index="' + index + '"]');
    if (slide.complete && slide.clientHeight > 0) {
      this.element.parentElement.style.height = slide.clientHeight + "px";
      return;
    }

    var self = this;
    function load() {
      self.setImageHeight(index);
    }
    slide.addEventListener('load', load);
    this.events.push(function slideLoadEvent() {
      slide.removeEventListener('load', load);
    });
  }

  this.setCurrentHeight = function () {
    this.setImageHeight(this.getCurrentSlide());
  }

  this.listenResize = function () {
    var self = this;
    function resize() {
      self.setCurrentHeight();
    }
    window.addEventListener('resize', resize);
    this.events.push(function resizeEvent() {
      window.removeEventListener('resize', resize);
    });
  }

  this.listenSlideChange = function () {
    var self = this;
    this.element.querySelectorAll('.js-carousel-option').forEach(function (option) {
      function change() {
        self.setCurrentHeight();
      }
      option.addEventListener('change', change);
      self.events.push(function slideChangeEvent() {
        option.removeEventListener('change', change);
      });
    });
  }

  this.setupSlidesLoop = function () {
    var self = this;
    this.loopInterval = setInterval(function () {
      if (self.element.classList.contains("js-carousel-stopLoop")) {
        return;
      }
      self.loopSlides();
    }, this.options.slideShowSeconds * 1000);
  }

  this.start = function () {
    if (this.loopInterval) {
      return;
    }
    this.setupSlidesLoop();
    this.listenResize();
    this.setCurrentHeight();
    if (this.options.fitSizeBySlide) {
      this.listenSlideChange();
    }
  };

  this.stop = function () {
    if (!this.loopInterval) {
      return;
    }
    clearInterval(this.loopInterval);
    this.loopInterval = null;
  }

  this.destroy = function () {
    this.stop();
    this.events.forEach(function(e) { e(); });
    this.events = [];
  }
}

var carousel = new Carousel(document.querySelector('.js-carousel'), 5);
carousel.start();
