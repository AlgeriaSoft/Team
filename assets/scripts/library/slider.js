import {
   $
} from './$.js';
export class Slider {

   constructor(selector, settings) {
      this.sliding = 0;
      this.pixelOffset = 0;
      this.interval = null;
      this.startClientX = 0;
      this.currentSlide = 0;
      this.isMouseDown = false;
      this.currentSlider = null;
      this.startPixelOffset = 0;
      this.noClonedSlideNumber = 0;
      this.slider = new $(selector).find('.slider-content');
      this.slideCount = this.slider.find('.slider-item').length;
      this.cols = settings.cols || 1;
      this.delay = settings.delay || 1000;
      this.isAuto = settings.auto || false;
      this.isInfinity = settings.infinity || false;
      this.isDotsNavigation = settings.navigation.dots || false;
      this.isButtonNavigation = settings.navigation.button || false;
      this.isKeyboardNavigation = settings.navigation.keyboard || false;
      this.slider.find('.slider-item').css('width', `${this.slider.width() / this.cols}px`);
      new $(selector)
         .mouseover(function(e) {
            window.clearInterval(this.interval);
         }.bind(this))
         .mouseout(this.autoNav.bind(this))
         .mousedown(this.start.bind(this))
         .mousemove(this.slide.bind(this))
         .mouseup(this.end.bind(this));

      if (this.isKeyboardNavigation) {
         new $(document).keyup(function(e) {
            if (e.keyCode === 37) {
               this.navLeft();
            } else if (e.keyCode === 39) {
               this.navRight();
            }
         }.bind(this));
      }

      if (this.isAuto) {
         this.autoNav()
      }

      if (this.isInfinity) {
         this.cloneItems();
      }

      if (this.isDotsNavigation || this.isButtonNavigation) {
         this.createSliderControls()
         if (this.isButtonNavigation) {
            this.createButtonNav()
         }

         if (this.isDotsNavigation) {
            this.createDots();
         }
      }
      this.slider.css('width', `${this.slideCount * this.slider.width()}px`);
   }

   createSliderControls() {
      this.slider.parent().append('<div class="slider-controls"></div>');
   }

   createButtonNav() {
      this.slider.parent().find('.slider-controls').append('<div class="slider-controls-nav"><div class="nav-left"><i class="material-icons">keyboard_arrow_left</i></div><div class="nav-right"><i class="material-icons">keyboard_arrow_right</i></div></div>');
      this.slider.parent().find('.slider-controls-nav .nav-left').click(this.navLeft.bind(this));
      this.slider.parent().find('.slider-controls-nav .nav-right').click(this.navRight.bind(this));
   }

   createDots() {
      let parent = this.slider.parent().find('.slider-controls').append('<div class="slider-controls-dots"></div>'),
         numOfDots = this.isInfinity ? this.noClonedSlideNumber : this.slideCount;
      parent = parent.find('.slider-controls-dots');
      for (let i = 0; i < numOfDots; i++) {
         let el = new $('<div class="slider-controls-dot"><span></span></div>');
         parent.append(el);
         if (i === 0) {
            el.addClass('active');
         }
         el.click(function(e) {
            this.slider.parent().find('.slider-controls-dots').children().removeClass('active')
            new $(e.currentTarget).addClass('active');
            this.goSlide(this.isInfinity ? this.noClonedSlideNumber + i : i);
         }.bind(this));
      }
   }

   autoNav() {
      if (!this.isMouseDown && this.isAuto) {
         this.interval = window.setInterval(() => {
            this.navRight();
         }, this.delay);
      }
   }

   navLeft(e) {
      if (this.isInfinity && this.currentSlide - 1 === 0) {
         this.goSlideNoAnimation(this.noClonedSlideNumber);
         return;
      } else if (this.currentSlide - 1 < 0) {
         return;
      }
      this.currentSlide--;
      if (this.isDotsNavigation) {
         this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
         this.slider.parent().find('.slider-controls-dots').children()
            .eq(this.isInfinity && this.currentSlide >= this.noClonedSlideNumber ? this.currentSlide - this.noClonedSlideNumber : this.currentSlide).addClass('active');
      }
      this.goSlide(this.currentSlide);
   }

   navRight(e) {
      if (this.isInfinity && this.currentSlide + 1 === this.noClonedSlideNumber * 2) {
         this.goSlideNoAnimation(this.noClonedSlideNumber);
         return;
      } else if (this.currentSlide + 1 === this.slideCount) {
         return;
      }
      this.currentSlide++;
      if (this.isDotsNavigation) {
         this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
         this.slider.parent().find('.slider-controls-dots').children()
            .eq(this.isInfinity && this.currentSlide >= this.noClonedSlideNumber ? this.currentSlide - this.noClonedSlideNumber : this.currentSlide).addClass('active');
      }
      this.goSlide(this.currentSlide);
   }

   goSlide(index) {
      this.currentSlide = index;
      this.slider.css('transform', `translateX(${this.currentSlide * -this.slider.find('.slider-item').width()}px)`).removeClass('active');
   }

   goSlideNoAnimation(index) {
      this.slider.css('transition', 'none');
      this.goSlide(index);
      setTimeout(() => {
         this.slider.css('transition', '');
      }, 200);
   }

   cloneItems() {
      for (let i = 0; i < this.slideCount; i++) {
         this.slider.prepend(this.slider.find('.slider-item:not(.cloned-item)').eq(this.slideCount - i - 1).clone(true).addClass('cloned-item').addClass('cloned-item-left'));
         this.slider.append(this.slider.find('.slider-item:not(.cloned-item)').eq(i).clone(true).addClass('cloned-item').addClass('cloned-item-right'));
      }
      this.noClonedSlideNumber = this.slideCount;
      this.slideCount += this.slideCount * 2;
      this.goSlide(this.noClonedSlideNumber);
   }

   start(e) {
      this.isMouseDown = true;
      if (this.sliding === 0) {
         this.sliding = 1;
         this.startClientX = e.clientX;
      }
   }

   slide(e) {
      if (!this.isMouseDown) {
         return;
      }
      e.preventDefault();
      let deltaSlide = e.clientX - this.startClientX;
      if (this.sliding == 1 && deltaSlide != 0) {
         this.sliding = 2;
         this.startPixelOffset = this.pixelOffset;
      }

      if (this.sliding == 2) {
         let touchPixelRatio = 1,
            activeDot = 0;
         if ((this.currentSlide == 0 && e.clientX > this.startClientX) || (this.currentSlide == this.slideCount - 1 && e.clientX < this.startClientX)) {
            touchPixelRatio = 3;
         }
         this.pixelOffset = this.startPixelOffset + deltaSlide / touchPixelRatio;
         if (!this.isInfinity) {
            this.slider.css('transform', `translateX(${this.pixelOffset}px)`);
         }
         this.slider.addClass('active');
      }
   }

   end(e) {
      this.isMouseDown = false;
      if (this.sliding == 2) {
         this.sliding = 0;
         this.currentSlide = this.pixelOffset < this.startPixelOffset ? this.currentSlide + 1 : this.currentSlide - 1;
         this.currentSlide = Math.min(Math.max(this.currentSlide, 0), this.slideCount - 1);
         this.pixelOffset = this.currentSlide * -this.slider.find('.slider-item').width();
         this.slider.css('transform', `translateX(${this.pixelOffset}px)`).removeClass('active');

         if (this.isInfinity && (this.noClonedSlideNumber * 2 === this.currentSlide || this.currentSlide === 0)) {
            this.goSlideNoAnimation(this.noClonedSlideNumber);
         }
         if (this.isDotsNavigation) {
            this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
            this.slider.parent().find('.slider-controls-dots').children()
               .eq(this.isInfinity && this.currentSlide >= this.noClonedSlideNumber ? this.currentSlide - this.noClonedSlideNumber : this.currentSlide).addClass('active');
         }
      }
   }
}
