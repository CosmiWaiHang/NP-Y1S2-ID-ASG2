/*jshint esversion: 9 */


$(window).on('load', () => {
    const eSlider = $('#range-slider');
    const eDisplay = $('.range-slider-value')[0];

    const separator = number => Number(number).toLocaleString('en-US');

    const max = parseInt(eSlider.attr('max'));

    eSlider.on('input change', function () {
        const value = parseInt(this.value);

        if (value < max) {
            $('#range-slider-hint')[0].innerText = 'Please give me your angbao money ;)';
        }

        eDisplay.innerText = `SGD ${separator(this.value)}`;
    });

    $('#btn-amt-holder .btn-cute.cute')
        .each((index, element) => {
            const button = $(element);

            button.click(() => {
                const value = button.attr('value');
                const amount = parseInt(eSlider.val()) + parseInt(value);

                if (max < amount) {
                    $('#range-slider-hint')[0].innerText = 'Meow, my wallet is too small to fit so much money at once :(';
                }

                eSlider.val(amount).change();
            });
        });
});