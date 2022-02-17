/*jshint esversion: 9 */


class User {
    constructor(id, email, dob, contact, accountId, balance) {
        this._id = id;
        this._email = email;
        this._dob = dob;
        this._contact = contact;
        this._accountId = accountId;
        this._balance = balance;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
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
    convert: {
        single: user => {
            const email = user['email'];
            const dob = user['birthday'];
            const contact = user['contact'];
            const accountId = user['account_id'];
            const balance = user['balance'];
            const id = user['_id'];

            return new User(id, email, dob, contact, accountId, balance);
        },

        all: userList => {
            const result = [];

            for (let i = 0, max = userList.length; i < max; i++) {
                const user = userList[i];
                const converted = userRepo.convert.single(user);

                result.push(converted);
            }

            return result;
        },
    },

    API: '620020386a79155501021871',


    get: {
        by_id: (user, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const query = {
                '_id': user.id,
            };
            const settings = {
                'async': !!onSuccess,
                'crossDomain': true,
                'url': `https://npy1s2idasg2-e59d.restdb.io/rest/member?q=${JSON.stringify(query)}`,
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': userRepo.API,
                    'cache-control': 'no-cache',
                },
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => {
                 const userList = userRepo.convert.all(response);
                 const first = userList[0];

                 !!onSuccess ? onSuccess(first) : res = first;
             })
             .fail(error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },

        by_account_id: (user, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const query = {
                'account_id': user.accountId,
            };
            const settings = {
                'async': !!onSuccess,
                'crossDomain': true,
                'url': `https://npy1s2idasg2-e59d.restdb.io/rest/member?q=${JSON.stringify(query)}`,
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': userRepo.API,
                    'cache-control': 'no-cache',
                },
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => {
                 const userList = userRepo.convert.all(response);
                 const first = userList[0];

                 !!onSuccess ? onSuccess(first) : res = first;
             })
             .fail(error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },
    },


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
                'balance': 0.0,
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
             .done(response => {
                 const user = userRepo.convert.single(response);

                 !!onSuccess ? onSuccess(user) : res = user;
             })
             .fail(error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },
    },


    put: (user, onSuccess = null, onFailure = null) => {
        let res = null;
        let err = null;

        const data = {
            'email': user.email,
            'birthday': user.dob,
            'contact': user.contact,
            'account_id': user.accountId,
            'balance': user.balance,
        };

        const settings = {
            'async': !!onSuccess,
            'crossDomain': true,
            'url': `https://npy1s2idasg2-e59d.restdb.io/rest/member/${user.id}`,
            'method': 'PUT',
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
         .done(response => {
             const user = userRepo.convert.single(response);

             !!onSuccess ? onSuccess(user) : res = user;
         })
         .fail(error => !!onFailure ? onFailure(error) : err = error);

        return {res, err};
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
         .done(response => {
             const id = response.result[0];
             const user = new User(id, null, null, null, null, null);

             !!onSuccess ? onSuccess(user) : res = user;
         })
         .fail(error => !!onFailure ? onFailure(error) : err = error);

        return {res, err};
    },
};