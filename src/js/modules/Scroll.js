import { menu } from './Menu';
import Accordion from './Accordion';

class Scroll {
  constructor(element, menu, Accordion) {
    this.element = element;
    this.target = null;
    this.targetAccordion = false;
    this.menu = menu;
    this.Accordion = Accordion;

    this.init();

    console.log(this);
  }

  init() {
    if (this.element.dataset.scroll[0] === '#') {
      this.target = document.querySelector(this.element.dataset.scroll);
    } else {
      this.target = document.querySelector(`[data-accordion="${this.element.dataset.scroll}"]`);
      this.targetAccordion = this.element.dataset.scroll;
    }

    this.element.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    event.preventDefault();

    this.menu.close();
    this.target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (this.targetAccordion) {
      this.Accordion.open(this.targetAccordion);
    }
  }

  static initAll() {
    const elements = document.querySelectorAll('[data-scroll]');

    if (elements.length) {
      elements.forEach((element) => {
        return new Scroll(element, menu, Accordion);
      });
    }
  }
}

Scroll.initAll();
