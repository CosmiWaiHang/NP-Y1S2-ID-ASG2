/*jshint esversion: 9 */


class Account {
    constructor(username, password) {
        this._username = username;
        this._password = password;
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
         * If {@param callback} function is provided,
         *     - the callback function will be run upon receiving a response
         *     - the request will run ASYNC mode
         *     - a NULL will be return <br />
         * If {@param callback} function is NOT provided,
         *     - the request will run in SYNC mode
         *     - the response will be return upon receiving <br />
         *
         * @param username username of the account
         * @param callback optional, callback function
         * @returns {null | result}
         */
        by_username: (username, callback = null) => {
            let result = null;

            const query = {
                'username': username,
            };

            const settings = {
                'async': !!callback,
                'crossDomain': true,
                'url': `https://npy1s2idasg2-e59d.restdb.io/rest/account?q=${JSON.stringify(query)}`,
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json', 'x-apikey': accountRepo.API, 'cache-control': 'no-cache',
                },
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => !!callback ? callback(response) : result = response[0]);

            return result;
        },

        /**
         * Get Account id by username
         * Reference {@link accountRepo.get.by_username}
         *
         * @param username username of the account
         * @param callback optional, callback function
         */
        id_by_username: (username, callback = null) => accountRepo
            .get
            .by_username(username, callback)['_id'],
    },


    post: {
        /**
         * <b> Send the data to RestDB </b> <br />
         *
         * If {@param callback} function is provided,
         *     - the callback function will be run upon receiving a response
         *     - the request will run in ASYNC mode
         *     - a NULL will be return <br />
         * If {@param callback} function is NOT provided,
         *     - the request will run in SYNC mode
         *     - the response will be return upon receiving <br />
         *
         * @param account {Account} username of the new account
         * @param callback {function} optional, callback function
         * @returns {null | result}
         */
        create: (account, callback = null) => {
            let result = null;

            const data = {
                'username': account.username,
                'password': account.password,
            };

            const settings = {
                'async': !!callback,
                'crossDomain': true,
                'url': 'https://npy1s2idasg2-e59d.restdb.io/rest/account',
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json', 'x-apikey': accountRepo.API, 'cache-control': 'no-cache',
                },
                'processData': false,
                'data': JSON.stringify(data),
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => !!callback ? callback(response) : result = response);

            return result;
        },
    },
};