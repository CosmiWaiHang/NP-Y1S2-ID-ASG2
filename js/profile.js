/*jshint esversion: 9 */


$(window).on('load', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');

    if (!!name) {
        $('#tb-search').val(name);
        $('#ico-search').trigger('click');
    }
});


const get_by_id = (id, characterList) => {
    let res = null;

    for (let i = 0, max = characterList.length; i < max; i++) {
        const character = characterList[i];

        if (character.id === id) {
            res = character;
            break;
        }
    }

    return res;
};


const get_by_name = (name, characterList) => {
    let res = null;

    for (let i = 0, max = characterList.length; i < max; i++) {
        const character = characterList[i];

        if (character.firstName.toLowerCase().includes(name)) {
            res = character;
            break;
        }
    }

    return res;
};


(() => $('#ico-search').click(() => {
    $('#tb-search').toggleClass('show');

    const hasShow = $('#tb-search').hasClass('show');

    if (!hasShow) {
        return;
    }

    const input = $('#tb-search').val();
    const isNumber = !!/^[0-9]+$/g.exec(input);

    characterRepo
        .get
        .complete(characterList => {
            let character;

            if (isNumber) {
                const take = parseInt(input);
                character = get_by_id(take, characterList);
            }
            else {
                character = get_by_name(input.toLowerCase(), characterList);
            }

            if (!!!character) {
                window.alert('No such character :(');
                return;
            }

            const name = `${character.firstName}${!!character.lastName ? ' ' + character.lastName : ''}`;
            const description = `${!!character.alias ? character.alias : ''}` + `${!!character.residence ? ' | ' + character.residence : ''}`;
            const about = `${!!character.about ? character.about : 'No about :('}`;
            const rating = !!character.rating ? character.rating : 'X';
            const age = !!character.age ? character.age : 'X';
            const favourite = !!character.favourite ? character.favourite : 'X';

            $('#txt-name')[0].innerText = name;
            $('#txt-alias')[0].innerText = description;
            $('#txt-about')[0].innerText = about;
            $('#txt-rating')[0].innerText = rating;
            $('#txt-age')[0].innerText = age;
            $('#txt-favourite')[0].innerText = favourite;
            $('#img-character')[0].src = character.image;
            $('#link-character')[0].href = character.url;
        });
}))();