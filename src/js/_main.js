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
// import './modules/FormHiding';
import './modules/Player';
import './modules/Tab';
import './modules/Drawer';
import './modules/Modal';
import './modules/Accordion';
import './modules/Scroll';

// sliders
import './modules/sliders/banner';

const $modalCard = document.querySelector('.js_aside__form');
const $modalContainer = document.querySelector('.mobile-form__wrapper');
const $modalAside = document.querySelector('.aside__wrapper');
const mobileWidth = window.matchMedia('(max-width: 992px)');

window.addEventListener('resize', function() {
  if (mobileWidth.matches) {
    $modalCard.remove();
    $modalContainer.insertAdjacentElement('afterbegin', $modalCard);
  } else {
    $modalCard.remove();
    $modalAside.insertAdjacentElement('afterbegin', $modalCard);
  }
});

//

const template = (key, value) => `
  <p class="order-step__personal-item order-step__personal-item--name"><b>${key}</b> ${value}</p>
`;
const buttonsSend = document.querySelectorAll('.js_form-order__button');
buttonsSend.forEach((button) => {
  button.addEventListener('click', function() {
    const step = button.closest('.order-step');
    const header = step.querySelector('.order-step__header');
    const inputs = step.querySelectorAll('[data-key]');

    const html = document.createElement('div');
    html.className = 'order-step__personal';

    inputs.forEach((input) => {
      const key = input.getAttribute('data-key');

      if (input.type === 'radio' && !input.checked) {
        return;
      }

      html.innerHTML += template(key, input.value);
    });

    header.appendChild(html);
    step.classList.add('completed');
  });
});
