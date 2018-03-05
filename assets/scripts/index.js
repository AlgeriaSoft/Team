import {
   $
} from './library/$.js';
import {
   Slider
} from './library/slider.js';
import {
   CounterUp
} from './library/counterUp.js';
import {
   Material
} from './library/material.js';

/*
   Preload page
*/
new $(window).on('load', function() {
   document.querySelector('.preload-content').style.opacity = '1';
   document.querySelector('.preload-content').style.visibility = 'visible';
   document.querySelector('.preload').style.height = '0';
   document.querySelector('.preload').style.visibility = 'hidden';
})
new $(document).ready(function(e) {

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
   // new $('.fact-count').counterUp({
   //    delay: 10,
   //    time: 1000
   // });

   /*
      Ripple button animtion
    */
   Material.ripple('.mat-ripple-container');

   /*
      Carsoul sliders

      new Slider(selector, {
         cols:1, // number of cols in line, default value 1.
         navigation: {
            dots: true/false, // dots navigation, default value false.
            button: true/false, // button left/right navigation, default value false.
            keyboard: true/false // keyboard left/right button navigation, default value false.
         }
         auto: true/false,, default value false.
         delay: 2000||..., // delay of auto navigation, default value 1000.
         infinity:true/false // infinity slider navigation, default value false.
      });

    */
   new Slider('#home-slider', {
      navigation: {
         dots: true,
         keyboard: true
      }
   });

   new Slider('#event-slider', {
      navigation: {
         button: true
      }
   });

   new Slider('#photos-slider', {
      cols: 4,
      navigation: {
         button: true
      },
      auto: true,
      delay: 2000,
      infinity: true
   });

   new Slider('#testimonials-slider', {
      navigation: {
         button: true
      },
      infinity: true
   });
});
