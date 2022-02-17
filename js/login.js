/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    /* Prevent page to reload when submit button being click */
    $('#f-login')
        .submit(() => false);

    $('#d-login')
        .fadeIn('fast', 'swing', () => $('#d-login').css('display', 'flex'));

    $('#tb-password')
        .on('cut copy paste', () => false);

    hintClick('#btn-login', '#btn-click-tp');
});


(() => {
    'use strict';

    const validator = {
        username: () => {
            const eUsername = $('#tb-username');
            const eHint = $('#fc-login-s-username-req');

            return regex.username(eUsername, eHint);
        },

        password: () => {
            const ePassword = $('#tb-password');
            const eHint = $('#fc-login-s-password-req');

            return regex.password(ePassword, eHint);
        },

        exec: () => validator.username() && validator.password(),
    };


    // s!O219615
    // s!O{student id last 6 digits}
    const auth = account => {
        const hasAccount = !!account;

        $('#fc-login-s-username-err')
            .css('display', hasAccount ? 'none' : 'block');

        if (!hasAccount) { return; }

        const password = $('#tb-password').val();
        const hash = account.password;

        checkpw(password, hash, isValid => {
            $('#fc-login-s-password-err')
                .css('display', isValid ? 'none' : 'block');

            if (!isValid) {
                return;
            }

            // Handle success login.
            const user = userRepo.get.by_account_id(account.id).res;

            sessionStorage.setItem('accountId', account.id);
            sessionStorage.setItem('userId', user.id);
            $(location).prop('href', 'summon.html');
        });
    };

    $('#btn-login').click(() => {
        const hasMeetRequirement = validator.exec();

        if (!hasMeetRequirement) { return; }

        const username = $('#tb-username').val().toLowerCase();

        accountRepo
            .get
            .by_username(username,
                response => auth(response));
    });
})();
