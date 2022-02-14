/*jshint esversion: 9 */


const proxy = {
    default: 'https://api.allorigins.win',

    getJSON: (url, onDone, onFail) => {
        const source = encodeURIComponent(url);

        $.getJSON(`${proxy.default}/get?url=${source}`)
         .done(response => onDone(response))
         .fail(error => onFail(error));
    }
}