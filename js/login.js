/*jshint esversion: 6 */


$(window).on('load', () => {
    'use strict';

    $('#d-login')
        .fadeIn('fast', 'swing', () => {
            $('#d-login').css('display', 'flex');
        });
});