/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    const swiper = new Swiper('.card-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        mousewheel: {
            invert: false,
        },
        pagination: {
            el: '.card-slider-pagination',
            clickable: true,
        }
    });
});