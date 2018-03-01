import {
   $
} from './$.js';
import {
   Slider
} from './slider.js';
import {
   CounterUp
} from './counterUp.js';
import {
   Material
} from './material.js';
new $(document).ready(function(e) {
   /*
      Show page
    */
   window.setTimeout(() => {
      document.querySelector('.preload-content').style.opacity = '1';
      document.querySelector('.preload-content').style.visibility = 'visible';
      document.querySelector('.preload').style.height = '0';
      document.querySelector('.preload').style.visibility = 'hidden';
   }, 2000);
   /*
      Stiky header
    */
   new $(window).on('scroll', function(e) {
      let header = new $('#header');
      if (this.scrollY >= new $('#home-slider').get(0).offsetTop) {
         header.addClass('is-fixed');
         new $('#scrollUp').show();
      } else {
         new $('#scrollUp').hide();
         header.removeClass('is-fixed');
      }
   });
   new $('#scrollUp').click(function(e) {
      window.scroll({
         top: 0,
         behavior: 'smooth'
      });
   });
   /*
      Fact counter
    */
   if (new $('.fact-count').length) {
      new $('.fact-count').counterUp({
         delay: 10,
         time: 1000
      });
   }
   Material.ripple('.mat-ripple-container');
   new Slider('#home-slider', true, false);
   new Slider('#event-slider', false, true);
   new Slider('#photos-slider', false, true, true);
   new Slider('#testimonials-slider', false, true, true);
});
