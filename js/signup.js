/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    /* Prevent form to reload when submit button being click */
    $('#f-signup')
        .submit(() => false);

    $('#d-signup')
        .fadeIn('fast', 'swing', () => $('#d-signup').css('display', 'flex'));

    /* Prevent user from copying the password */
    $('#tb-password, #tb-password-cfm')
        .on('cut copy paste', () => false);

    hintClick('#btn-signup', '#btn-click-tp');
});

(() => {
    'use strict';

    const regex = {
        username: () => {
            const reUsername = /^[a-zA-Z]{4,}/g;
            const username = $('#tb-username').val();

            const isValid = reUsername.exec(username);

            $('#fc-signup-s-username-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        password: () => {
            const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
            const password = $('#tb-password').val();

            const isValid = rePassword.exec(password);

            $('#fc-signup-s-password-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        passwordConfirm: () => {
            const password = $('#tb-password').val();
            const confirm = $('#tb-password-cfm').val();

            const isValid = password === confirm;

            $('#fc-signup-s-password-err')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        contact: () => {
            const reContact = /^([689])\d{7}/g;
            const contact = $('#tb-contact').val();

            const isValid = reContact.exec(contact);

            $('#fc-signup-s-contact-req')
                .css('display', isValid ? 'none' : 'block');

            return isValid;
        },

        exec: () => regex.username() && regex.password() && regex.passwordConfirm() && regex.contact(),
    };

    const create = {
        account: () => {
            const username = $('#tb-username').val();
            const password = $('#tb-password').val();
            const salt = gensalt(8);

            hashpw(
                password,
                salt,
                hash =>
                    accountRepo
                        .post
                        .create(username, hash, response => console.log(response)),
                () => {},
            );
        },

        user: () => {
            const username = $('#tb-username').val();
            const accountId =
                accountRepo
                    .get
                    .id_by_username(username);

            const email = $('#tb-email').val();
            const dob = $('#tb-dob').val();
            const contact = $('#tb-contact').val();

            const user = new User(email, dob, contact, accountId);

            userRepo
                .post
                .create(user, response => console.log(response));
        },

        all: () => {
            create.account();

            sleep(5000)
                .then(() => create.user());
        },
    };

    $('#btn-signup')
        .click(() => {
            const hasMeetRequirement = regex.exec();

            if (hasMeetRequirement) {
                create.all();
            }
        });
})();

console.log('s!O219615');
console.log('Cosmiwaihangx');
console.log('98765432');

$('#tb-username').val('Cosmiwaihangx');
$('#tb-password #tb-password-cfm').val('s!O219615');
$('#tb-contact').val('98765432');
$('#tb-email').val('S12345678A@connect.np.edu.sg');