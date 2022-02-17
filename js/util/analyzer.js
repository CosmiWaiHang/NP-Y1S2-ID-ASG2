/*jshint esversion: 9 */


const analyzer = {
    number_of_owned: transactionList => {
        const result = {};

        for (let i = 0, max = transactionList.length; i < max; i++) {
            const transaction = transactionList[i];
            const herokuappId = transaction.herokuappId;

            if (!(herokuappId in result)) {
                result[herokuappId] = 0;
            }

            result[herokuappId] += 1;
        }

        const label = [];
        const data = [];

        for (const key in result) {
            label.push(key);
            data.push(result[key]);
        }

        return {label, data};
    },
};