/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    // prevent form to reload when submit button being click
    $('#f-signup').submit(event => event.preventDefault());

    $('#d-signup').fadeIn('fast', 'swing', () => $('#d-signup').css('display', 'flex'));

    hintClick('#btn-signup', '#btn-click-tp');
});

(() => {
    const regex = {
        username: () => {
            'use strict';

            const reUsername = /^[a-zA-Z]{4,}/g;
            const username = $('#tb-username').val();

            const isValid = reUsername.exec(username);

            $('#fc-signup-s-username-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        password: () => {
            'use strict';

            const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
            const password = $('#tb-password').val();

            const isValid = rePassword.exec(password);

            $('#fc-signup-s-password-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        passwordConfirm: () => {
            'use strict';

            const password = $('#tb-password').val();
            const confirm = $('#tb-password-cfm').val();

            const isValid = password === confirm;

            $('#fc-signup-s-password-err')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        contact: () => {
            'use strict';

            const reContact = /^([689])\d{7}/g;
            const contact = $('#tb-contact').val();

            const isValid = reContact.exec(contact);

            $('#fc-signup-s-contact-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        exec: () =>
            regex.username()
            && regex.password()
            && regex.passwordConfirm()
            && regex.contact(),
    };

    $('#btn-signup')
        .click(() => {
            const hasMeetRequirement = regex.exec();

            if (!hasMeetRequirement) {
                return;
            }

            console.log('passed');
        });
})();