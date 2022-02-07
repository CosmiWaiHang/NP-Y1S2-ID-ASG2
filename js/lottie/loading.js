/*jshint esversion: 6 */


const lpLoading = '#lp-loading';

const showLoading = () => {
    'use strict';

    $(lpLoading)
        .fadeIn(1500, 'swing', () => {});
};

const hideLoading = () => {
    'use strict';

    $(lpLoading)
        .fadeOut(1500, 'swing', () => {});
};


$(document).ready(() => {
    'use strict';

    const source = `${window.location.origin}/NP-Y1S2-ID-ASG2/asset/lottie/loading-morandi-50.json`;

    $(lpLoading)
        .attr('autoplay', true)
        .attr('loop', true)
        .attr('mode', 'bounce')
        .attr('speed', '0.75')
        .attr('src', source);
});


$(window).on('load', () => {
    'use strict';

    hideLoading();
});