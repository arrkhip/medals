export default class Mask {
  constructor($input) {
    this.$input = $input;

    this.matrix = '+7 (___) ___-__-__';

    this.init();
  }

  init() {
    // eslint-disable-next-line no-undef
    const event = new Event('input');

    this.$input.addEventListener('input', this.mask.bind(this), false);
    this.$input.addEventListener('focus', this.mask.bind(this), false);
    this.$input.addEventListener('blur', this.mask.bind(this), false);
    this.$input.addEventListener('keydown', this.mask.bind(this), false);

    if (this.$input.value !== '') {
      this.$input.dispatchEvent(event);
      this.$input.blur();
    }
  }

  mask(e) {
    if (this.$input.selectionStart < 3) e.preventDefault();

    let i = 0;
    const def = this.matrix.replace(/\D/g, '');
    let val = this.$input.value.replace(/\D/g, '');

    if (def.length >= val.length) val = def;

    this.$input.value = this.matrix.replace(/[_\d]/g, (a) => (i < val.length ? val.charAt(i++) : a));

    i = this.$input.value.indexOf('_');

    if (e.keyCode === 8) {
      i = this.$input.value.lastIndexOf(val.substr(-1)) + 1;
    }

    if (i !== -1) {
      i < 5 && (i = 3);
      this.$input.value = this.$input.value.slice(0, i);
    }

    if (e.type === 'blur') {
      if (this.$input.value.length < 5) {
        this.$input.value = '';
      }
    } else {
      this.setCursorPosition();
    }
  }

  setCursorPosition() {
    const pos = this.$input.value.length;

    this.$input.focus();
    if (this.$input.setSelectionRange) {
      this.$input.setSelectionRange(pos, pos);
    } else if (this.$input.createTextRange) {
      const range = this.$input.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  static initAll() {
    const $inputs = document.querySelectorAll('.j_mask');
    if ($inputs.length) $inputs.forEach(($input) => new Mask($input));
  }
}

Mask.initAll();
window.Mask = Mask;
