import intlTelInput from 'intl-tel-input';
import Inputmask from 'inputmask';

export default class PhoneMask {
  constructor($el) {
    this.$el = $el;

    this.srcUtilsScripts =
      this.$el.getAttribute('data-utils-script') ||
      'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.15/js/utils.min.js';
    this.initialCountry = document.firstElementChild.lang || 'ru';
    this.onlyCountries = JSON.parse(this.$el.getAttribute('data-only-countries'));
    this.preferredCountries = JSON.parse(this.$el.getAttribute('data-preferred-countries'));

    this._char = '_';

    this.init();
  }

  init() {
    console.log(this.$el);

    const intl = intlTelInput(this.$el, {
      onlyCountries: this.onlyCountries,
      initialCountry: this.initialCountry,
      preferredCountries: this.preferredCountries,
      autoPlaceholder: 'aggressive',
      allowDropdown: true,

      customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) =>
        selectedCountryPlaceholder.replace(/[0-9]/g, this._char),
    });

    if (window.intlTelInputGlobals) {
      window.intlTelInputGlobals.loadUtils(this.srcUtilsScripts).then((res) => {
        this.setMask();
      });
    }

    this.$el.intl = intl;

    this.$el.addEventListener('focus', this.setMask.bind(this));
    this.$el.addEventListener('countrychange', this.setMask.bind(this));
  }

  setMask() {
    const pl = this.$el.getAttribute('placeholder') + '';
    const res = pl.replaceAll(this._char, '9');

    const mask = new Inputmask(res, {
      placeholder: this._char,
      clearMaskOnLostFocus: true,
    });
    mask.mask(this.$el);
  }

  static init() {
    const $inputs = document.querySelectorAll('.j_phoneMask');

    if ($inputs.length) {
      $inputs.forEach(($input) => new PhoneMask($input));
    }
  }
}

PhoneMask.init();
