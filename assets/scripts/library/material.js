import {
   $
} from './$.js';
import {
   Ripple
} from './material/ripple.js';
export class Material {
   /*
      Add ripple anitmion to button
   */
   static ripple(selector) {
      let el = new $(selector);
      new $(document).on('pointerdown', Ripple.show);
   }
}
