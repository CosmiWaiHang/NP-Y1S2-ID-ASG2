/*jshint esversion: 9 */


class Transaction {
    constructor(id, herokuappId, accountId) {
        this._id = id;
        this._herokuappId = herokuappId;
        this._accountId = accountId;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get herokuappId() {
        return this._herokuappId;
    }

    set herokuappId(value) {
        this._herokuappId = value;
    }

    get accountId() {
        return this._accountId;
    }

    set accountId(value) {
        this._accountId = value;
    }
}


const transactionRepo = {
    convert: {
        single: transaction => {
            const id = transaction['_id'];
            const herokuappId = transaction['herokuapp_id'];
            const acccountId = transaction['account_id'];

            return new Transaction(id, herokuappId, acccountId);
        },

        all: transactionList => {
            const resultList = [];

            for (let i = 0, max = transactionList.length; i < max; i++) {
                const transaction = transactionList[i];
                const result = transactionRepo.convert.single(transaction);

                resultList.push(result);
            }

            return resultList;
        },
    },


    API: '620020386a79155501021871',


    get: {
        all: (onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const settings = {
                'async': !!onSuccess,
                'crossDomain': true,
                'url': 'https://npy1s2idasg2-e59d.restdb.io/rest/transaction',
                'method': 'GET',
                'headers': {
                    'content-type': 'application/json',
                    'x-apikey': transactionRepo.API,
                    'cache-control': 'no-cache',
                },
                'beforeSend': () => showLoading(),
                'complete': () => hideLoading(),
            };

            $.ajax(settings)
             .done(response => {
                 const transactionList = transactionRepo.convert.all(response);

                 !!onSuccess ? onSuccess(transactionList) : res = transactionList;
             })
             .fail(error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },
    },
};