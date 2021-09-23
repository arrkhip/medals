import Swiper from 'swiper/swiper-bundle.min';

const sliderWrapper = document.querySelector('.banner__slider');
let slider;

if (sliderWrapper) {
  slider = new Swiper('.swiper', {
    loop: true,
    effect: 'fade',
    speed: 800,
    autoplay: {
      delay: 5000,
    },
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
