// default
import './../sass/styles.scss';
import './modules/_svg';

// polyfills
import 'babel-polyfill';
import './modules/polyfills/forEach';
import './modules/polyfills/closest';

// modules
import './modules/Menu';
import './modules/Mask';
import './modules/Swap';
import './modules/onLoad';
// import './modules/FormHiding';
import './modules/Player';
import './modules/Tab';
import './modules/Drawer';
import './modules/Modal';
import './modules/Accordion';
import './modules/PhoneMask';
import './modules/bannerVideo';
import './modules/Preloader';
import './modules/Dropdown';
import './modules/Scroll';

// sliders
import './modules/sliders/banner';
import './modules/sliders/promo';

// Перенести в отдельный файл.
// Перемещение формы на главной.
const $modalCard = document.querySelector('.js_aside__form');
const $modalContainer = document.querySelector('.mobile-form__wrapper');
const $modalAside = document.querySelector('.aside__wrapper');
const mobileWidth = window.matchMedia('(max-width: 992px)');

window.addEventListener('resize', function() {
  if (mobileWidth.matches) {
    if ($modalCard) {
      $modalCard.remove();
    }
    if ($modalContainer) {
      $modalContainer.insertAdjacentElement('afterbegin', $modalCard);
    }
  } else {
    if ($modalCard) {
      $modalCard.remove();
    }
    if ($modalAside) {
      $modalAside.insertAdjacentElement('afterbegin', $modalCard);
    }
  }
});
