/*jshint esversion: 9 */


$(window).on('load', () => {
    const slider = $('#range-slider');
    const outputEl = $('.range-slider-value')[0];

    const separator = number => Number(number).toLocaleString('en-US');

    slider.on('input', function () {
        outputEl.innerText = `SGD ${separator(this.value)}`;
    });
});