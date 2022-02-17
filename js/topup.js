/*jshint esversion: 9 */


$(window).on('load', () => 'use stict');


(() => {
    const getUser = userId => {
        const user = new User(userId);

        return userRepo.get.by_id(user).res;
    };

    $('#btn-pay')
        .click(() => {
            const eSlider = $('#range-slider');
            const amount = parseInt(eSlider.val());

            const userId = sessionStorage.getItem('userId');

            if(!!!userId) {
                window.alert('Please login first, meow :(');
                return;
            }

            const user = getUser(userId);

            user.balance += amount;

            userRepo.put(user, user => {
                $('#range-slider-hint')[0]
                    .innerText = `Add balance successfully, you have SGD ${user.balance} in your account.`;

            }, e => console.log(e));
        });
})();