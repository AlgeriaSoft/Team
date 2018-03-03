export class $ {
   constructor(selector) {
      let element = null;
      $.regex = /(^\<([a-zA-Z0-9]+)(\ ([a-zA-Z0-9-]+)\=((\'|\"){1})([a-zA-Z0-9-\ ]*)((\'|\"){1}))*\>.*\<\/[a-zA-Z0-9]+>$)|(^\<([a-zA-Z0-9-]+)(\ ([a-zA-Z0-9-]+)\=((\'|\"){1})([a-zA-Z0-9\ ]*)((\'|\"){1}))*\/\>$)/g;
      if (selector instanceof HTMLElement || selector instanceof HTMLDocument || selector instanceof Window) {
         element = [selector];
      } else if ((typeof selector).toUpperCase() === 'STRING') {
         if ($.regex.test(selector)) {
            element = [$.create(selector)];
         } else {
            element = document.querySelectorAll(selector);
         }
      } else if ((selector instanceof HTMLCollection || (selector.length > 0 && $.check(selector))) || Array.isArray(selector)) {
         element = selector;
      } else {
         throw new Error('Inavlid selector');
      }
      this.length = element.length;
      for (let i = 0; i < element.length; i++) {
         this[i] = element[i];
      }
   }

   get(index) {
      return this[index];
   }

   eq(index) {
      return new $(this[index]);
   }

   each(callback) {
      for (let i = 0; i < this.length; i++) {
         callback.call(this[i], this, i);
      }
      return this;
   }

   parent() {
      let elements = [];
      this.each(function() {
         elements.push(this.parentNode);
      });
      return new $($.uniqueArray(elements));
   }

   children() {
      let elements = [];
      this.each(function() {
         for (let i = 0; i < this.children.length; i++) {
            elements.push(this.children[i]);
         }
      });
      return new $(elements);
   }

   first() {
      return this.eq(0);
   }

   firstChild() {
      return this.children().first();
   }

   last() {
      return this.eq(this.length - 1)
   }

   lastChild() {
      return this.children().last();
   }


   next() {
      let elements = [];
      this.each(function() {
         elements.push(this.nextElementSibling);
      });
      return new $(elements);
   }

   previous() {
      let elements = [];
      this.each(function() {
         elements.push(this.previousElementSibling);
      });
      return new $(elements);
   }

   find(selector) {
      let elements = [];
      this.each(function() {
         this.querySelectorAll(selector).forEach(el => {
            elements.push(el);
         });
      });
      return new $(elements);
   }

   is() {

   }

   not(selector) {}

   filter(selector) {
      let elements = [];
      this.find('*').each(function() {
         elements.push(this);
      });
      return new $(elements);
   }

   append(element) {
      return this.each(function() {
         if ((typeof element).toUpperCase() === 'STRING' && $.regex.test(element)) {
            this.appendChild($.create(element));
         } else {
            this.appendChild(element.get(0));
         }
      });
   }

   prepend(element) {
      return this.each(function() {
         if ((typeof element).toUpperCase() === 'STRING' && $.regex.test(element)) {
            this.insertBefore($.create(element), this.firstChild());
         } else {
            this.insertBefore(element.get(0), this.firstChild());
         }
      });
   }

   empty() {

   }

   clone(deep) {
      let cloneNodes = [];
      this.each(function() {
         cloneNodes.push(this.cloneNode(deep));
      });
      return new $(cloneNodes);
   }

   remove() {
      return this.each(function() {
         this.remove();
      });
   }

   hasClass(className) {
      return this.length && this.get(0).classList ? this.get(0).classList.contains(className) : new RegExp(`\\b'${className}\\b`).test(this.get(0).className);
   }

   addClass(className) {
      return this.each(function() {
         if (this.classList) {
            this.classList.add(className);
         } else if (!new $(this).hasClass(className)) {
            this.className += ` ${className}`;
         }
      });
   }

   removeClass(className) {
      return this.each(function() {
         if (this.classList) {
            this.classList.remove(className);
         } else {
            this.className = this.className.replace(new RegExp(`\\${className}\\b`, 'g'), '');
         }
      });
   }

   toggleClass(className) {
      return this.each(function() {
         let el = new $(this);
         if (el.hasClass(className)) {
            el.removeClass(className);
         } else {
            el.addClass(className);
         }
      });
   }

   val(value = null) {
      if (value === null) {
         return this.get(0).value;
      } else {
         this.each(function() {
            this.value = value;
         });
      }
   }

   text(value = null) {
      if (value === null) {
         return this.get(0).innerText;
      } else {
         this.each(function() {
            this.innerText = value;
         });
      }
   }

   html(value = null) {
      if (value === null) {
         return this.get(0).innerHTML;
      } else {
         this.each(function() {
            this.innerHTML = value;
         });
      }
   }

   attr(attribute, value = null) {
      if ((typeof attribute).toUpperCase() === 'OBJECT' || ((typeof attribute).toUpperCase() === 'STRING' && value !== null)) {
         return this.each(function() {
            if ((typeof attribute).toUpperCase() === 'OBJECT') {
               for (let key in attribute) {
                  this.setAttribute(key, attribute[key]);
               }
            } else if ((typeof attribute).toUpperCase() === 'STRING' && value !== null) {
               this.setAttribute(attribute, value);
            } else {
               throw new Error(`Error ${attribute} must be string`);
            }
         });
      } else {
         return this.get(0).getAttribute(attribute);
      }
   }

   data(attribute, value = null) {
      if ((typeof attribute).toUpperCase() === 'OBJECT' || ((typeof attribute).toUpperCase() === 'STRING' && value !== null)) {
         return this.each(function() {
            if ((typeof attribute).toUpperCase() === 'OBJECT') {
               for (let key in attribute) {
                  this.setAttribute(`data-${key}`, attribute[key]);
               }
            } else if ((typeof attribute).toUpperCase() === 'STRING' && value !== null) {
               this.setAttribute(`data-${attribute}`, value);
            } else {
               throw new Error(`Error ${attribute} must be string`);
            }
         });
      } else {
         return this.get(0).getAttribute(`data-${attribute}`);
      }
   }

   removeAttr(attribute) {
      return this.each(function() {
         this.removeAttribute(attribute);
      });
   }

   css(attribute, value = null) {
      if ((typeof attribute).toUpperCase() === 'OBJECT' || ((typeof attribute).toUpperCase() === 'STRING' && value !== null)) {
         return this.each(function() {
            if ((typeof attribute).toUpperCase() === 'OBJECT') {
               for (let key in attribute) {
                  this.style[key] = attribute[key];
               }
            } else if ((typeof attribute).toUpperCase() === 'STRING' && value !== null) {
               this.style[attribute] = value;
            } else {
               throw new Error(`Error ${attribute} must be string`);
            }
         });
      } else {
         return window.getComputedStyle(this.get(0))[attribute];
      }
   }

   hide(delay = 500) {
      return this.each(function() {
         new $(this).css('display', 'none');
      });
   }

   show(delay = 500) {
      return this.each(function() {
         new $(this).css('display', 'initial');
      });
   }

   toggle(delay = 500) {
      return this.each(function() {
         let el = new $(this)
         if (el.css('display') === 'none') {
            el.show();
         } else {
            el.hide();
         }
      });
   }

   offset() {
      let rect = this.get(0).getBoundingClientRect(),
         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
         top: rect.top + scrollTop,
         left: rect.left + scrollLeft
      }
   }

   position() {
      let el = this.eq(0),
         pos = el.offset(),
         posParent = el.parent().offset();
      return {
         top: pos.top - posParent.top - $.toNumberUnit(el.css('margin-top'), 'px'),
         left: pos.left - posParent.left - $.toNumberUnit(el.css('margin-left'), 'px')
         // left: el.offsetLeft
      }
   }

   width(value = null) {
      if (value === null) {
         return $.toFixed(this.eq(0).innerWidth() - $.toNumberUnit(this.eq(0).css('padding-left'), 'px') - $.toNumberUnit(this.eq(0).css('padding-right'), 'px'), 3);
      } else {
         return this.each(function() {
            new $(this).css('width', $.toSringUnit(value, 'px'));
         });
      }
   }

   innerWidth(value = null) {
      if (value === null) {
         return $.toFixed(this.get(0).clientWidth, 3);
      } else {
         return this.each(function() {
            new $(this).css('width', $.toSringUnit(value, 'px'));
         });
      }
   }

   outerWidth(value = null) {
      if (value === null) {
         return $.toFixed(this.get(0).offsetWidth, 3);
      } else if (value === true) {
         return $.toFixed(this.get(0).offsetWidth + $.toNumberUnit(this.eq(0).css('margin-left'), 'px') + $.toNumberUnit(this.eq(0).css('margin-right'), 'px'), 3);
      } else {
         return this.each(function() {
            new $(this).css('width', $.toSringUnit(value, 'px'));
         });
      }
   }

   height(value = null) {
      if (value === null) {
         return $.toFixed(this.eq(0).innerHeight() - $.toNumberUnit(this.eq(0).css('padding-top'), 'px') - $.toNumberUnit(this.eq(0).css('padding-bottom'), 'px'), 3);
      } else {
         return this.each(function() {
            new $(this).css('height', $.toSringUnit(value, 'px'));
         });
      }
   }

   innerHeight(value = null) {
      if (value === null) {
         return $.toFixed(this.get(0).clientHeight, 3);
      } else {
         return this.each(function() {
            new $(this).css('height', $.toSringUnit(value, 'px'));
         });
      }
   }

   outerHeight(value = null) {
      if (value === null) {
         return $.toFixed(this.get(0).offsetHeight, 3);
      } else if (value === true) {
         return $.toFixed(this.get(0).offsetHeight + $.toNumberUnit(this.eq(0).css('margin-top'), 'px') + $.toNumberUnit(this.eq(0).css('margin-bottom'), 'px'), 3);
      } else {
         return this.each(function() {
            new $(this).css('height', $.toSringUnit(value, 'px'));
         });
      }
   }

   bind(eventName, handler) {
      return this.each(function() {
         $.addEvent(this, eventName, handler);
      });
   }

   unbind(eventName, handler) {
      return this.each(function() {
         $.removeEvent(this, eventName, handler);
      });
   }

   on(eventName, handler) {
      return this.bind(eventName, handler);
   }

   off(eventName, handler) {
      return this.unbind(eventName, handler);
   }

   ready(handler) {
      return this.bind('DOMContentLoaded', handler);
   }

   click(handler) {
      return this.bind('click', handler);
   }

   dblclick(handler) {
      return this.bind('dblclick', handler);
   }

   contextmenu(handler) {
      return this.bind('contextmenu', handler);
   }

   hover(handlerIn, handlerOut = null) {
      this.mouseover(handlerIn);
      if (handlerOut !== null) {
         this.mouseleave(handlerOut);
      }
      return this;
   }

   change(handler) {
      return this.bind('change', handler);
   }

   blur(handler) {
      return this.bind('blur', handler);
   }

   submit(handler) {
      return this.bind('submit', handler);
   }

   mouseup(handler) {
      return this.bind('mouseup', handler);
   }

   mousedown(handler) {
      return this.bind('mousedown', handler);
   }

   mouseenter(handler) {
      return this.bind('mouseenter', handler);
   }

   mouseleave(handler) {
      return this.bind('mouseleave', handler);
   }

   mouseover(handler) {
      return this.bind('mouseover', handler);
   }

   mouseout(handler) {
      return this.bind('mouseout', handler);
   }

   mousemove(handler) {
      return this.bind('mousemove', handler);
   }

   keyup(handler) {
      return this.bind('keyup', handler);
   }

   keydown(handler) {
      return this.bind('keydown', handler);
   }

   keypress(handler) {
      return this.bind('keypress', handler);
   }

   static create(str) {
      let element = null,
         div = document.createElement('div');
      div.innerHTML = str;
      element = div.firstChild;
      if ((typeof element).toUpperCase() !== 'OBJECT' && element !== null) {
         throw new Error(`Error ${str} is not HTMLElement`);
      }
      return element;
   }

   static checkType(element, type) {
      if (element instanceof eval(type)) {
         return true;
      } else {
         return false;
      }
   }

   static check(elements) {
      let bool = true;
      for (let i = 0; i < elements.length; i++) {
         if (!$.checkType(elements[i], 'HTMLElement')) {
            bool = false;
         }
      }
      return bool;
   }

   static toFixed(value, digits) {
      return Number(value.toFixed(digits));
   }
   static toNumberUnit(value, unit) {
      return Number(value.replace(unit, ''));
   }

   static toSringUnit(value, unit) {
      return `${value}${unit}`;
   }

   static uniqueArray(arr) {
      return arr.filter((elem, pos, arr) => {
         return arr.indexOf(elem) == pos;
      });
   }

   static addEvent(el, eventName, handler) {
      el.addEventListener(eventName, handler, false);
   }

   static removeEvent(el, eventName, handler) {
      el.removeEventListener(eventName, handler, false);
   }
}
