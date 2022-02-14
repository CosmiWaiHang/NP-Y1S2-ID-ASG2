/*jshint esversion: 9 */


class User {
    constructor(email, dob, contact, accountId, balance) {
        this._email = email;
        this._dob = dob;
        this._contact = contact;
        this._accountId = accountId;
        this._balance = balance;
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

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }
}


const userRepo = {
    API: '620020386a79155501021871',


    get: {},


    post: {
        /**
         * <b> Send the {@link User} to RestDB </b> <br />
         *
         * If {@param onSuccess} function is provided,
         *     - the callback function will be run upon receiving a response
         *     - the request will run in ASYNC mode
         *     - a NULL will be return <br />
         * If {@param onSuccess} function is NOT provided,
         *     - the request will run in SYNC mode
         *     - the response will be return upon receiving <br />
         *
         * <i> async mode will only depend on if the onSuccess is provided or not </i> <br />
         *
         * If {@param onFailure} function is provided,
         *     - the callback function will be run upon catching an error
         *     - a NULL will be return <br />
         * if {@param onFailure} function is NOT provided,
         *     - the error will be return after catching it.
         *
         * @param user {User} user object
         * @param onSuccess {function} optional, callback function to run when request succeed
         * @param onFailure {function} optional, callback function to run when request failed
         * @returns {{res: null, err: null}}
         */
        create: (user, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const data = {
                'email': user.email,
                'contact': user.contact,
                'account_id': user.accountId,
            };

            if (!!user.dob) {
                data['birthday'] = user.dob;
            }

            const settings = {
                'async': !!onSuccess,
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
             .done(response =>
                 !!onSuccess
                     ? onSuccess(response)
                     : res = response)
             .fail((xhr, status, message) =>
                 !!onFailure
                     ? onFailure(xhr, status, message)
                     : err = {xhr, status, message});

            return {res, err};
        },
    },

    delete: (userId, onSuccess = null, onFailure = null) => {
        let res = null;
        let err = null;

        const settings = {
            'async': !!onSuccess,
            'crossDomain': true,
            'url': `https://npy1s2idasg2-e59d.restdb.io/rest/member/${userId}`,
            'method': 'DELETE',
            'headers': {
                'content-type': 'application/json',
                'x-apikey': userRepo.API,
                'cache-control': 'no-cache',
            },
            'beforeSend': () => showLoading(),
            'complete': () => hideLoading(),
        };

        $.ajax(settings)
         .done(response =>
             !!onSuccess
                 ? onSuccess(response)
                 : res = response)
         .fail((xhr, status, message) =>
             !!onFailure
                 ? onFailure(xhr, status, message)
                 : err = {xhr, status, message});

        return {res, err};
    },
};