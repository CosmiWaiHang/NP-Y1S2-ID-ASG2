/*jshint esversion: 9 */


function hintClick(btnId, tpId) {
    'use strict';

    const button = document.querySelector(btnId);
    const tooltip = document.querySelector(tpId);

    const popperInstance = Popper.createPopper(button, tooltip, {
        modifiers: [
            {
                name: 'offset', options: {
                    offset: [0, 8],
                },
            },
        ],
    });

    function show() {
        tooltip.setAttribute('data-show', '');

        popperInstance
            .setOptions(options => ({
                ...options, placement: 'right', modifiers: [
                    ...options.modifiers, {name: 'eventListeners', enabled: true},
                ],
            }))
            .then(/* Promise IGNORED on purpose. */);

        popperInstance
            .update()
            .then(/* Promise IGNORED on purpose. */);
    }

    function hide() {
        tooltip.removeAttribute('data-show');

        popperInstance
            .setOptions(options => ({
                ...options, modifiers: [
                    ...options.modifiers, {name: 'eventListeners', enabled: false},
                ],
            }))
            .then(/* Promise IGNORED on purpose. */);
    }

    const showEvents = ['mouseenter'];
    const hideEvents = ['mouseleave', 'blur'];

    showEvents.forEach(event => button.addEventListener(event, show));
    hideEvents.forEach(event => button.addEventListener(event, hide));
}