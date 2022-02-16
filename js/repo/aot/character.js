/*jshint esversion: 9 */


class AotCharacter {
    constructor(id, firstName, lastName, species, age, height, residence, status, alias, malId, url, image, favourite, about) {
        /* https://api-attack-on-titan.herokuapp.com */
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._species = species;
        this._age = age;
        this._height = height;
        this._residence = residence;
        this._status = status;
        this._alias = alias;

        /* https://docs.api.jikan.moe/ */
        this._malId = malId;
        this._url = url;
        this._image = image;
        this._favourite = favourite;
        this._about = about;

        /* RestDB */
        this._rating = 0.0;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get malId() {
        return this._malId;
    }

    set malId(value) {
        this._malId = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get favourite() {
        return this._favourite;
    }

    set favourite(value) {
        this._favourite = value;
    }

    get about() {
        return this._about;
    }

    set about(value) {
        this._about = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get species() {
        return this._species;
    }

    set species(value) {
        this._species = value;
    }

    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get residence() {
        return this._residence;
    }

    set residence(value) {
        this._residence = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get alias() {
        return this._alias;
    }

    set alias(value) {
        this._alias = value;
    }
}


const characterRepo = {
    convert: {
        kerokuapp: content => {
            const resultList = [];
            const characterList = JSON.parse(content);

            for (let i = 0, max = characterList.length; i < max; i++) {
                const character = characterList[i];

                const id = character['id'];
                const firstName = character['first_name'];
                const lastName = character['last_name'];
                const species = character['species'];
                const age = character['age'];
                const height = character['height'];
                const residence = character['residence'];
                const status = character['status'];
                const alias = character['alias'];

                const result = new AotCharacter(id, firstName, lastName, species, age, height, residence, status, alias);

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

            const url = 'https://api-attack-on-titan.herokuapp.com/api/v1/characters';

            proxy.getJSON(url, response => {
                const characterList = characterRepo
                    .convert
                    .kerokuapp(response.contents);

                !!onSuccess ? onSuccess(characterList) : res = characterList;
            });

            return {res, err};
        },

        complete: (onSuccess = null, onFailure = null) => characterRepo
            .get
            .all(characterList => {
                const extractor = herokuappId => {
                    for (let i = 0, max = characterList.length; i < max; i++) {
                        const character = characterList[i];

                        if (character.id === herokuappId) {
                            return character;
                        }
                    }

                    return undefined;
                };

                const updator = (json, character) => {
                    if (!!!character) {
                        return;
                    }

                    const wikiUrl = json['wiki_url'];
                    const imageUrl = json['image_url'];
                    const favourite = json['favourite'];
                    const about = json['about'];
                    const rating = json['rating'];
                    const jikanId = json['jikan_id'];

                    character.url = wikiUrl;
                    character.image = imageUrl;
                    character.favourite = favourite;
                    character.about = about;
                    character.rating = rating;
                    character.malId = jikanId;
                };

                const settings = {
                    'async': true,
                    'crossDomain': true,
                    'url': 'https://npy1s2idasg2-e59d.restdb.io/rest/attack-on-titan',
                    'method': 'GET',
                    'headers': {
                        'content-type': 'application/json',
                        'x-apikey': characterRepo.API,
                        'cache-control': 'no-cache',
                    },
                    'beforeSend': () => showLoading(),
                    'complete': () => hideLoading(),
                };

                $.ajax(settings)
                 .done(infoList => {
                     for (let i = 0, max = infoList.length; i < max; i++) {
                         const info = infoList[i];
                         const character = extractor(info['herokuapp_id']);

                         updator(info, character);
                     }

                     console.log(characterList);
                     onSuccess(characterList);
                 })
                 .fail(error => onFailure(error));
            }, onFailure),
    },
};


