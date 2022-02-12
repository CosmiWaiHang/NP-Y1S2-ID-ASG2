/*jshint esversion: 9 */


const accountRepo = {
    API: '620020386a79155501021871',
    // <BLANK>
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
            };

            $.ajax(settings)
             .done(response => !!callback ? callback(response) : result = response);

            return result;
        },
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
         * @param username username of the new account
         * @param password hashed password of the new account
         * @param callback optional, callback function
         * @returns {null | result}
         */
        create: (username, password, callback = null) => {
            let result = null;

            const data = {
                'username': username, 'password': password,
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
            };

            $.ajax(settings)
             .done(response => !!callback ? callback(response) : result = response);

            return result;
        },
    },
};