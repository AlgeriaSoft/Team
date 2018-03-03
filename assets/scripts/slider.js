import {
   $
} from './$.js';
export class Slider {

   constructor(selector, dots, buttonNav, infinity = false) {
      this.sliding = 0;
      this.pixelOffset = 0;
      this.startClientX = 0;
      this.currentSlide = 0;
      this.isMouseDown = false;
      this.currentSlider = null;
      this.infinity = infinity;
      this.startPixelOffset = 0;
      this.isDotsEnabled = dots;
      this.slider = new $(selector).find('.slider-content');
      this.slideCount = this.slider.find('.slider-item').length;
      new $(selector).mousedown(this.start.bind(this))
         .mouseup(this.end.bind(this))
         .mousemove(this.slide.bind(this))
         .click(function(e) {
            this.currentSlider = new $(e.currentTarget);
         }.bind(this));
      new $(document).keyup(function(e) {
         if (e.keyCode === 37) {
            this.navLeft();
         } else if (e.keyCode === 39) {
            this.navRight();
         }
      }.bind(this));
      if (this.isDotsEnabled) {
         this.createDots();
      }

      if (buttonNav) {
         this.slider.parent().find('.slider-controls-nav .nav-left').click(this.navLeft.bind(this));
         this.slider.parent().find('.slider-controls-nav .nav-right').click(this.navRight.bind(this));
      }
   }

   createDots() {
      let parrent = this.slider.parent().find('.slider-controls-dots');
      for (let i = 0; i < this.slideCount; i++) {
         let el = new $('<div class="slider-controls-dot"><span></span></div>');
         parrent.append(el);
         if (i === 0) {
            el.addClass('active');
         }
         el.click(function(e) {
            this.slider.parent().find('.slider-controls-dots').children().removeClass('active')
            new $(e.currentTarget).addClass('active');
            this.goSlide(i);
         }.bind(this));
      }
   }

   navLeft(e) {
      if (this.currentSlide - 1 < 0) {
         return;
      }
      this.currentSlide--;
      if (this.isDotsEnabled) {
         this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
         this.slider.parent().find('.slider-controls-dots').children().eq(this.currentSlide).addClass('active');
      }
      this.slider.css('transform', `translateX(${this.slider.find('.slider-item').eq(this.currentSlide).get(0).offsetLeft * -1}px)`);
   }

   navRight(e) {
      if (this.currentSlide + 1 === this.slideCount) {
         return;
      }
      this.currentSlide++;
      if (this.isDotsEnabled) {
         this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
         this.slider.parent().find('.slider-controls-dots').children().eq(this.currentSlide).addClass('active');
      }
      this.slider.css('transform', `translateX(${this.slider.find('.slider-item').eq(this.currentSlide).get(0).offsetLeft * -1 }px)`);
   }

   goSlide(index) {
      this.currentSlide = index;
      this.slider.css('transform', `translateX(${this.slider.find('.slider-item').eq(index).get(0).offsetLeft * -1}px)`);
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
         this.slider.css('transform', `translateX(${this.pixelOffset}px)`).addClass('active');
      }
   }


   end(e) {
      this.isMouseDown = false;
      if (this.sliding == 2) {
         this.sliding = 0;
         this.currentSlide = this.pixelOffset < this.startPixelOffset ? this.currentSlide + 1 : this.currentSlide - 1;
         this.currentSlide = Math.min(Math.max(this.currentSlide, 0), this.slideCount - 1);
         this.pixelOffset = this.currentSlide * -this.slider.find('.slider-item').width();
         if (this.infinity && this.slider.get(0).offsetWidth === this.pixelOffset * -1) {
            this.slideCount = this.slideCount + 1;
            if (this.pixelOffset === 0) {
               this.slider.append(this.slider.find('.slider-item').eq(this.slideCount - 1).clone(true).addClass('cloned-item'));
            } else {
               this.slider.append(this.slider.find('.slider-item').eq(0).clone(true).addClass('cloned-item'));
            }
            this.slider.append(this.slider.find('.slider-item').eq(0).clone(true).addClass('cloned-item'));
         }
         this.slider.css('transform', `translateX(${this.pixelOffset}px)`).removeClass('active');
         if (this.isDotsEnabled) {
            this.slider.parent().find('.slider-controls-dots').children().removeClass('active');
            this.slider.parent().find('.slider-controls-dots').children().eq(this.currentSlide).addClass('active');
         }
      }
   }
}
