import {
   $
} from '../$.js';
export class Ripple {
   static show(e) {
      if (Ripple.current) {
         const current = Ripple.current;
         Ripple.current = null;
         setTimeout(function() {
            current.remove();
         }, 800);
      }

      let container = new $(e.target),
         ripple = null;
      while ($.checkType(container.get(0), 'HTMLElement') && !container.hasClass("mat-ripple-container")) {
         container = container.parent();
      }
      if (!$.checkType(container.get(0), 'HTMLElement') || !container.hasClass("mat-ripple-container")) {
         return;
      }
      if (container.find('.mat-ripple').length == 0) {
         container.append('<div class="mat-ripple"></div>');
      }
      const pos = container.offset(),
         x = e.x - pos.left,
         y = e.y - pos.top,
         maxW = Math.max(x, container.outerWidth() - x),
         maxH = Math.max(y, container.outerHeight() - y),
         size = Math.sqrt(maxW * maxW + maxH * maxH);

      ripple = new $('<span></span>');
      container.find('.mat-ripple').append(ripple);
      ripple.css({
         'top': `${y - size}px`,
         'left': `${x - size}px`,
         'width': `${size * 2}px`,
         'height': `${size * 2}px`,
      });
      Ripple.current = ripple;
      Ripple.timeout = setTimeout(function() {
         ripple.css({
            'transform': `scale(1)`
         });
      }, 16);
      document.onpointerup = document.onpointercancel = function() {
         document.onpointerup = document.onpointercancel = document.onpointermove = null;
         Ripple.current.css('opacity', '0');
      };

      document.onpointermove = function(move) {
         if (e.x - move.x > 4 || e.x - move.x < -4 || e.y - move.y > 4 || e.y - move.y < -4) {
            clearTimeout(Ripple.timeout);
            document.onpointercancel();
         }
      };
   }
}
