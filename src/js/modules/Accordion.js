const _instances = {};

export default class Accordion {
  constructor(options) {
    this.$el = options.el;
    this.id = options.id;
    this.$triggerBtns = options.triggerBtns;
    this.$hiddenEl = options.hiddenEl;
    // eslint-disable-next-line no-undef
    this.maxHeightHiddenEl = getComputedStyle(this.$hiddenEl).maxHeight.replace(/[^\d]/g, '');

    this.mutationConfig = {
      childList: true,
      subtree: true,
      characterDataOldValue: false,
    };

    this._isOpen = false;
    this._isOpenOnLoad = this.$el.classList.contains('active');

    this.init();
  }

  init() {
    _instances[this.id] = this;

    this._isOpenOnLoad && this.open();

    if (this.$triggerBtns) {
      this.$triggerBtns.forEach(($triggerBtn) => {
        $triggerBtn.addEventListener('click', (e) => {
          if (this._isOpen) {
            this.close();
          } else {
            this.open();
          }
          e.stopPropagation();
        });
      });
    }

    this.$hiddenEl.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'max-height') {
        if (this._isOpen) {
          this.$hiddenEl.style.overflow = 'unset';
        } else {
          this.$hiddenEl.style.overflow = '';
        }
      }
    });

    window.addEventListener('resize', () => this._isOpen && this.updateHeight());

    // eslint-disable-next-line no-undef
    this.mutationObserver = new MutationObserver(this.updateHeight.bind(this));
    this.mutationObserver.observe(this.$hiddenEl, this.mutationConfig);
  }

  open() {
    if (this._isOpen) return false;

    this.$el.classList.add('active');
    this.$hiddenEl.style.maxHeight = this.$hiddenEl.scrollHeight + 'px';

    this._isOpen = true;
  }

  close() {
    if (!this._isOpen) return false;

    this.$el.classList.remove('active');
    this.$hiddenEl.style.overflow = '';
    this.$hiddenEl.style.maxHeight = '';

    this._isOpen = false;
  }

  updateHeight() {
    if (!this._isOpen) return false;
    this.$hiddenEl.style.maxHeight = this.$hiddenEl.scrollHeight + 'px';
  }

  static initAll() {
    const $els = document.querySelectorAll('[data-accordion]');

    $els.forEach((el) => {
      const id = el.getAttribute('data-accordion');
      const $hiddenEl = el.querySelector('.accordion-content');
      const $triggerBtns = el.querySelectorAll('.accordion-button');

      // eslint-disable-next-line no-new
      new Accordion({
        el: el,
        id: id,
        triggerBtns: $triggerBtns,
        hiddenEl: $hiddenEl,
      });
    });
  }

  static open(id) {
    _instances[id].open();
  }

  static close(id) {
    _instances[id].close();
  }
}

Accordion.initAll();
