class Swap {
  constructor(element, target) {
    this.element = element;
    this.target = target;

    this.init();
  }

  init() {
    this.target.style.display = 'none';
    this.element.addEventListener('click', this.swap.bind(this));
  }

  swap() {
    this.element.style.display = 'none';
    this.target.style.display = '';
  }

  static initAll() {
    const elements = document.querySelectorAll('[data-swap]');

    if (elements.length) {
      elements.forEach((element) => {
        const target = document.querySelector(element.dataset.swap);
        return new Swap(element, target);
      });
    }
  }
}

Swap.initAll();

window.Swap = Swap;
