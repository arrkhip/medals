import Swiper from 'swiper/swiper-bundle.min';

const plyr = document.querySelector('.video-block__wrapper .plyr');
const sliderWrapper = document.querySelector('.banner__slider');
let slider;

if (sliderWrapper) {
  slider = new Swiper('.swiper', {
    loop: true,
    effect: 'fade',
    speed: 800,
    // autoplay: {
    //   delay: 5000,
    // },
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function() {
        plyr.player.pause();
      },
    },
  });
}

if (!window.sliders) window.sliders = {};
if (slider) window.sliders.banner = slider;
