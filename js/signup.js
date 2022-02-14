/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    /* Prevent page to reload when submit button being click */
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

    const validator = {
        username: () => {
            const eUsername = $('#tb-username');
            const eHint = $('#fc-signup-s-username-req');

            return regex.username(eUsername, eHint);
        },

        password: () => {
            const ePassword = $('#tb-password');
            const eHint = $('#fc-signup-s-password-req');

            return regex.password(ePassword, eHint);
        },

        passwordConfirm: () => {
            const ePassword = $('#tb-password');
            const eConfirm = $('#tb-password-cfm');
            const eHint = $('#fc-signup-s-password-err');

            return regex.passwordConfirm(ePassword, eConfirm, eHint);
        },

        email: () => {
            const eEmail = $('#tb-email');
            const eHint = $('#fc-signup-s-email-req');

            return regex.email(eEmail, eHint);
        },

        contact: () => {
            const eContact = $('#tb-contact');
            const eHint = $('#fc-signup-s-contact-req');

            return regex.contact(eContact, eHint);
        },

        exec: () =>
            validator.username()
            && validator.password()
            && validator.passwordConfirm()
            && validator.email()
            && validator.contact(),
    };

    const handler = {
        error: {
            account: xhr => {
                const list = xhr['responseJSON']['list'];
                const fieldList = [];

                for (let i = 0, max = list.length; i < max; i++) {
                    fieldList.push(list[i].field);
                }

                $('#fc-signup-s-username-err')
                    .css('display', fieldList.includes('username') ? 'block' : 'none');
            },

            user: xhr => {
                const list = xhr['responseJSON']['list'];
                const fieldList = [];

                for (let i = 0, max = list.length; i < max; i++) {
                    fieldList.push(list[i].field);
                }

                $('#fc-signup-s-email-err')
                    .css('display', fieldList.includes('email') ? 'block' : 'none');

                $('#fc-signup-s-contact-err')
                    .css('display', fieldList.includes('contact') ? 'block' : 'none');
            },
        },

        success: {
            account: () =>
                $('#fc-signup-s-username-err')
                    .css('display', 'none'),

            user: () => {
                $('#fc-signup-s-email-err')
                    .css('display', 'none');

                $('#fc-signup-s-contact-err')
                    .css('display', 'none');
            },
        },
    };

    const create = {
        account: () => {
            const username = $('#tb-username').val().toLowerCase();
            const password = $('#tb-password').val();
            const salt = gensalt(8);

            hashpw(password, salt, hash => {
                const account = new Account(null, username, hash);

                accountRepo
                    .post
                    .create(account,
                        response => {
                            handler.success.account();
                            create.user(response.id);
                        },
                        error => handler.error.account(error));
            });
        },

        user: accountId => {
            const username = $('#tb-username').val().toLowerCase();
            const email = $('#tb-email').val().toLowerCase();
            const dob = $('#tb-dob').val();
            const contact = $('#tb-contact').val();

            const user = new User(null, email, dob, contact, accountId);

            userRepo
                .post
                .create(user,
                    response => {
                        /* If successfully save both account and user to RestDB, redirect them to main page */
                        handler.success.user();
                        sessionStorage.setItem('accountId', accountId);
                        sessionStorage.setItem('userId', response['_id']);
                        $(location).prop('href', 'mainpage.html');
                    },
                    error => {
                        handler.error.user(error);
                        accountRepo
                            .delete(accountId,
                                () => {},
                                () => console.log('WARN: deletion of account failed.'));
                    });
        },

        all: () => {
            create.account(); // will automatically create user if successfully created account
        },
    };

    $('#btn-signup')
        .click(() => {
            const hasMeetRequirement = validator.exec();

            if (hasMeetRequirement) {
                create.all();
            }
        });
})();
