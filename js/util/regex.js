/*jshint esversion: 9 */


/* PREFIX 'e' stand for element, css selector */
const regex = {
    /**
     * Check if the username meet the minimum requirement
     *
     * @param eUsername {jQuery} HTML element containing the username
     * @param eHint {jQuery} HTML element containing the error hint for the username
     * @returns {boolean} true if the value of the {@param eUsername} meet the minimum requirement else false
     */
    username: (eUsername, eHint) => {
        const expression = /^[a-z]{4,}/g;
        const username = eUsername.val().toLowerCase();

        const isValid = !!expression.exec(username);

        eHint.css('display', isValid ? 'none' : 'block');

        return isValid;
    },

    /**
     * Check if the password meet the minimum requirement
     *
     * @param ePassword {jQuery} HTML element containing the password
     * @param eHint {jQuery} HTML element containing the error hint for the password
     * @returns {boolean} true if the value of the {@param ePassword} meet the minimum requirement else false
     */
    password: (ePassword, eHint) => {
        const expression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
        const password = ePassword.val();

        const isValid = !!expression.exec(password);

        eHint.css('display', isValid ? 'none' : 'block');

        return isValid;
    },

    /**
     * Check if the confirmation password match with the password
     *
     * @param ePassword {jQuery} HTML element containing the password
     * @param eConfirm {jQuery} HTML element containing the confirmation password
     * @param eHint {jQuery} HTML element containing the error hint for the confirmation password
     * @returns {boolean} true if the value of the {@param eConfirm} match with the {@param ePassword} else false
     */
    passwordConfirm: (ePassword, eConfirm, eHint) => {
        const password = ePassword.val();
        const confirm = eConfirm.val();

        const isValid = password === confirm;

        eHint.css('display', isValid ? 'none' : 'block');

        return isValid;
    },

    /**
     * Check if the email meet the RFC 5322 Official Standard format.
     *
     * @param eEmail {jQuery} HTML element containing the email
     * @param eHint {jQuery} HTML element containing the error hint for the email
     * @returns {boolean} true if the value of the {@param eEmail} meet the requirement for RFC 5322 standard else false
     */
    email: (eEmail, eHint) => {
        // General
        const expression = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/g;
        const email = eEmail.val().toLowerCase();

        const isValid = !!expression.exec(email);

        eHint.css('display', isValid ? 'none' : 'block');

        return isValid;
    },

    /**
     * Check if the contact number meet the tel format provided by the Info-communications Media Development Authority (IMDA)
     *
     * @param eContact {jQuery} HTML element containing the contact number
     * @param eHint {jQuery} HTML element containing the error hint for the contact number
     * @returns {boolean} true if the value of the {@param eContact} meet the requirement else false
     */
    contact: (eContact, eHint) => {
        const expression = /^([689])\d{7}/g;
        const contact = eContact.val();

        const isValid = !!expression.exec(contact);

        eHint.css('display', isValid ? 'none' : 'block');

        return isValid;
    },
};