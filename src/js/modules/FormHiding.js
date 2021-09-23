const instances = {};

class FormHiding {
  constructor(element) {
    this.element = element;
    this.grid = this.element.querySelector('.form__grid');
    this.gap = parseInt(window.getComputedStyle(this.grid).gap);
    this.hidden = this.element.querySelector('.form__hidden');
    this.hiddenHeight = window.getComputedStyle(this.hidden).height.replace('px', '');
    this.row = this.element.querySelector('.form__row');
    this.rowHeight = window.getComputedStyle(this.row).height.replace('px', '');
    this.submit = this.element.querySelector('.form__submit .button');

    this.init();
  }

  init() {
    this.hidden.style.maxHeight = this.rowHeight * 3 + this.gap * 2 + 'px';
    this.submit.addEventListener('click', this.open.bind(this), { once: true });
  }

  open(event) {
    event.preventDefault();
    this.hidden.style.maxHeight = this.hiddenHeight + 'px';
  }

  static initAll() {
    const elements = document.querySelectorAll('[data-form-hiding]');

    if (elements.length) {
      elements.forEach((element) => {
        const id = element.dataset.formHiding;
        instances[id] = new FormHiding(element);
      });
    }
  }

  static getInstances() {
    return instances;
  }
}

window.addEventListener('load', FormHiding.initAll);

window.FormHiding = FormHiding;
