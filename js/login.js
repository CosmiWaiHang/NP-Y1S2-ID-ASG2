/*jshint esversion: 8 */

$.getScript('../js/bycrpt/bycrpt.js');
$.getScript('../js/lottie/loading.js');

$(window).on('load', () => {
    'use strict';

    // prevent form to reload when submit button being click
    $('#f-login').submit(event => event.preventDefault());

    $('#d-login').fadeIn('fast', 'swing', () => $('#d-login').css('display', 'flex'));
});


(() => {
    'use strict';

    const regex = () => {
        // 4 letters (min)
        const reUsername = /^[a-zA-Z]{4,}/g;
        // 8 characters (min), 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character.
        const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

        const username = $('#tb-username').val();
        const password = $('#tb-password').val();

        const isUsernameValid = reUsername.exec(username);
        const isPasswordValid = rePassword.exec(password);

        $('#fc-login-s-username-req').css('display', isUsernameValid ? 'none' : 'block');
        $('#fc-login-s-password-req').css('display', isPasswordValid ? 'none' : 'block');

        return isUsernameValid && isPasswordValid;
    };


    // s!O219615
    // s!O{student id last 6 digits}
    const auth = body => {
        const isUsernameExist = 0 !== body.length;

        $('#fc-login-s-username-err').css('display', isUsernameExist ? 'none' : 'block');

        if (!isUsernameExist) { return; }

        const password = $('#tb-password').val();

        checkpw(
            password,
            body[0].password,
            r => {
                if (undefined === r) { return; }

                $('#fc-login-s-password-err').css('display', r ? 'none' : 'block');

                // continue if succeed
                window.alert(r ? 'login success' : 'login not success');
            },
            p => {},
        );
    };

    $('#btn-login').click(() => {
        const hasMeetRequirement = regex();

        if (!hasMeetRequirement) { return; }

        const username = $('#tb-username').val().toLowerCase();
        const settings = {
            'async': true,
            'crossDomain': true,
            'url': `https://npy1s2idasg2-e59d.restdb.io/rest/account?q={"username":"${username}"}`,
            'method': 'GET',
            'headers': {
                'content-type': 'application/json',
                'x-apikey': '620020386a79155501021871',
                'cache-control': 'no-cache',
            },
            'beforeSend': () => showLoading(),
            'complete': () => hideLoading(),
        };

        $.ajax(settings).done(response => auth(response));
    });
})();