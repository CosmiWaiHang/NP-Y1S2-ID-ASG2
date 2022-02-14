/*jshint esversion: 9 */


class AttackOnTitan {
    constructor(id, name, image, about, rating, height, type, inheritorList, abilityList, aliasList) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._about = about;
        this._rating = rating;
        this._height = height;
        this._type = type;
        this._inheritorList = inheritorList;
        this._abilityList = abilityList;
        this._aliasList = aliasList;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get image() {
        return this._image;
    }

    set image(value) {
        this._image = value;
    }

    get about() {
        return this._about;
    }

    set about(value) {
        this._about = value;
    }

    get rating() {
        return this._rating;
    }

    set rating(value) {
        this._rating = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get inheritorList() {
        return this._inheritorList;
    }

    set inheritorList(value) {
        this._inheritorList = value;
    }

    get abilityList() {
        return this._abilityList;
    }

    set abilityList(value) {
        this._abilityList = value;
    }

    get aliasList() {
        return this._aliasList;
    }

    set aliasList(value) {
        this._aliasList = value;
    }
}


const aotRepo = {
    convert: content => {
        const json = JSON.parse(content);
        const titanList = json['titans'];

        const aotList = [];

        for (let i = 0, max = titanList.length; i < max; i++) {
            const titan = titanList[i];
            const id = titan['id'];
            const name = titan['name'];
            const image = `https://attack-on-titan-server.herokuapp.com${titan['image']}`;
            const about = titan ['about'];
            const rating = titan ['rating'];
            const height = titan ['height'];
            const type = titan ['type'];
            const inheritorList = titan['inheritors'];
            const abilityList = titan['abilities'];
            const aliasList = titan['otherNames'];

            const aot = new AttackOnTitan(id, name, image, about, rating, height, type, inheritorList, abilityList, aliasList);

            aotList.push(aot);
        }

        return aotList;
    },

    get: {
        all: (limit = 10, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const url = `https://attack-on-titan-server.herokuapp.com/titans?limit=${limit}`;

            proxy.getJSON(url, response => {
                const aotList = aotRepo.convert(response.contents);
                !!onSuccess ? onSuccess(aotList) : res = aotList;
            }, error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },

        by_name: (name, onSuccess = null, onFailure = null) => {
            let res = null;
            let err = null;

            const url = `https://attack-on-titan-server.herokuapp.com/titans/search?name=${name}`;

            proxy.getJSON(url, response => {
                const aotList = aotRepo.convert(response.contents);
                !!onSuccess ? onSuccess(aotList) : res = aotList;
            }, error => !!onFailure ? onFailure(error) : err = error);

            return {res, err};
        },
    },
};
