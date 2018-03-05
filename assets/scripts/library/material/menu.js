import {
   $
} from '../$.js';
export class Menu {
   static hover(e) {
      if (Menu.currentTarget !== e.currentTarget && !new $(e.currentTarget).hasClass('mat-menu-item-submenu')) {
         Menu.close(e);
      }
      Menu.currentTarget = e.currentTarget;
      Menu.open(e);
   }

   static open(e) {
      let el = new $(e.currentTarget),
         menu = new $(el.data('menu')),
         pos = el.offset(),
         top = 0,
         left = 0;
      if (el.hasClass('mat-menu-item-submenu')) {
         top = `${pos.top}px`;
         left = `${el.outerWidth() + pos.left}px`;
      } else {
         left = `${pos.left}px`;
         top = `${el.outerHeight() +pos.top}px`;
      }

      menu.css({
         'display': 'inherit',
         'top': top,
         'left': left
      }).addClass('mat-menu-open');
      if (new $('.mat-menu-overlay').length === 0) {
         new $('body').append('<div class="mat-menu-overlay"></div>');
      }
      console.log(new $('.mat-menu-overlay'));
      new $('.mat-menu-overlay').click(Menu.close);
      e.stopPropagation();
   }

   static close(e) {
      let menu = new $('.mat-menu-open');
      if (new $(e.currentTarget).hasClass('mat-ripple-container')) {
         setTimeout(closeMenu, 400);
      } else {
         closeMenu();
      }

      function closeMenu() {
         if (menu.length !== 0) {
            menu.css({
               'display': '',
               'top': '',
               'left': ''
            }).removeClass('mat-menu-open');
         }
         new $('body').find('.mat-menu-overlay').remove();
      }
      e.stopPropagation();
   }
}
