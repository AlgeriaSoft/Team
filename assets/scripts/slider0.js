import {
   $
} from './$.js';
export class Slider {
   let slider = new $('#home-slider'),
      isDown = false,
      startX = 0,
      scrollLeft = 0;
   slider.mousedown(function(e) {
         isDown = true;
         startX = e.pageX - this.offsetLeft;
         scrollLeft = this.scrollLeft
         new $(this).addClass('active');
      })
      .mouseleave(function(e) {
         isDown = false;
         new $(this).removeClass('active');
      })
      .mouseup(function(e) {
         isDown = false;
         new $(this).removeClass('active');
      })
      .mousemove(function(e) {
         if (!isDown) {
            return;
         }
         e.preventDefault();
         const x = e.pageX - this.offsetLeft;
         this.scrollLeft = scrollLeft - ((x - startX) * 3);
      });
}
