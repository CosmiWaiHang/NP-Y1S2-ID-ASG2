/*jshint esversion: 6 */


$(document).ready(() => {
    'use strict';

    $('#lp-loading')
        .attr('autoplay', true)
        .attr('background', '#0A0000')
        .attr('loop', true)
        .attr('mode', 'bounce')
        .attr('speed', '0.75')
        .attr('src', './asset/lottie/loading-morandi-50.json');
});


$(window).on('load', () => {
    'use strict';

    setTimeout(() => $('#lp-loading')
        .fadeOut(1500, 'swing', () => $('#lp-loading').remove()), 5000);
});