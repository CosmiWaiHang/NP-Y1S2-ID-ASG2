/*jshint esversion: 9 */


class Account {
    constructor(id, username, password) {
        this._id = id;
        this._username = username;
        this._password = password;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }

    set password(value) {
        this._password = value;
    }
}


const accountRepo = {
    API: '620020386a79155501021871',


    get: {
        /**
         * <b> Get the account by username from RestDB </b> <br />
         *
         * If {@param onSuccess} function is provided,
         *     - the callback function will be run upon receiving a response
         *     - the request will run ASYNC mode
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
         * @param username {string} username of the account
         * @param onSuccess {function} optional, callback function to run when request succeed
         * @param onFailure {function} optional, callback function to run when request failed
         */
        by_username: (username, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const query = {
                'username': username,
            };

            const settings = {
                'async': !!onSuccess,
                'crossDomain': true,
                'url': `https://npy1s2idasg2-e59d.restdb.io/rest/account?q=${JSON.stringify(query)}`,
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': accountRepo.API,
                    'cache-control': 'no-cache',
                },
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
                 !!onSuccess
             .fail((xhr, status, message) =>
                 !!onFailure
                     ? onFailure(xhr, status, message)
                     : err = {xhr, status, message});

            return {res, err};
        },

        /**
         * Get Account id by username
         * Reference {@link accountRepo.get.by_username}
         */
        id_by_username: username =>
            accountRepo
                .get
    },


    post: {
        /**
         * <b> Send the data to RestDB </b> <br />
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
         * @param account {Account} username of the new account
         * @param onSuccess {function} optional, callback function to run when request succeed
         * @param onFailure {function} optional, callback function to run when request failed
         * @returns {{res: null, err: null}}
         */
        create: (account, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const data = {
                'username': account.username,
                'password': account.password,
            };

            const settings = {
                'async': !!onSuccess,
                'crossDomain': true,
                'url': 'https://npy1s2idasg2-e59d.restdb.io/rest/account',
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': accountRepo.API,
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

    delete: (accountId, onSuccess = null, onFailure = null) => {
        let res = null;
        let err = null;

        const settings = {
            'async': !!onSuccess,
            'crossDomain': true,
            'url': `https://npy1s2idasg2-e59d.restdb.io/rest/account/${accountId}`,
            'method': 'DELETE',
            'headers': {
                'content-type': 'application/json',
                'x-apikey': accountRepo.API,
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