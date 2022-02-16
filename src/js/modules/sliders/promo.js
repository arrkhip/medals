import Swiper from 'swiper/swiper-bundle.min';

const sliderWrapper = document.querySelector('.promo__slider');
let slider;

if (sliderWrapper) {
  slider = new Swiper('.swiper', {
    effect: 'fade',
    speed: 800,
    watchOverflow: true,
    // autoplay: {
    //   delay: 5000,
    // },
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

if (!window.sliders) window.sliders = {};
if (slider) window.sliders.banner = slider;
