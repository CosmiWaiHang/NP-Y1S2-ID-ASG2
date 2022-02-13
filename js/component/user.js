/*jshint esversion: 9 */


class User {
    constructor(email, dob, contact, accountId) {
        this._email = email;
        this._dob = dob;
        this._contact = contact;
        this._accountId = accountId;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get dob() {
        return this._dob;
    }

    set dob(value) {
        this._dob = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get accountId() {
        return this._accountId;
    }

    set accountId(value) {
        this._accountId = value;
    }
}


const userRepo = {
    API: '620020386a79155501021871',


    get: {},


    post: {
        /**
         * <b> Send the {@link User} to RestDB </b> <br />
         *
         * If {@param callback} function is provided,
         *     - the callback function will be run upon receiving a response
         *     - the request will run in ASYNC mode
         *     - a NULL will be return <br />
         * If {@param callback} function is NOT provided,
         *     - the request will run in SYNC mode
         *     - the response will be return upon receiving <br />
         *
         * @param user {User} user object
         * @param callback {function} optional, callback function
         * @returns {null | result}
         */
        create: (user, callback = null) => {
            let result = null;

            const data = {
                'email': user.email,
                'contact': user.contact,
                'account_id': user.accountId,
            };

            if (!!user.dob) {
                data['birthday'] = user.dob;
            }


            const settings = {
                'async': !!callback,
                'crossDomain': true,
                'url': 'https://npy1s2idasg2-e59d.restdb.io/rest/member',
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': userRepo.API,
                    'cache-control': 'no-cache',
                },
                'processData': false,
                'data': JSON.stringify(data),
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => !!callback ? callback(response) : result = response)
             .fail((xhr, status, message) =>
                 console.log({
                     'XHR': xhr,
                     'STATUS': status,
                     'MESSAGE': message,
                 }),
             );

            return result;
        },
    },
};