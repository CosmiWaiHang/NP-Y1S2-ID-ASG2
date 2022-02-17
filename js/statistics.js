/*jshint esversion: 9 */


(() => characterRepo.get.complete(characterList => sessionStorage.setItem('characterList', JSON.stringify(characterList))))();


const getCharacter = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('character-herokuapp-id');
    const characterList = JSON.parse(sessionStorage.getItem('characterList'));
    let target = null;

    for (let i = 0, max = characterList.length; i < max; i++) {
        const character = characterList[i];

        if (character.id === id) {
            target = character;
            break;
        }
    }
    return !!target ? target : characterList[0];
};


const render = {
    all: () => {
        const character = getCharacter();
        render.profile(character);
        render.chart(character);
    },

    profile: character => {
        console.log(character);
        $('#character-name')[0].innerText = character['_firstName'];
        $('#character-species')[0].innerText = character['_species'];
        $('#character-image')[0].src = character['_image'];
        $('#character-wiki').attr('href', character['_url']);
        $('#character-age')[0].innerText = !!character['_age'] ? character['_age'] : 'Y';
        $('#character-favourite')[0].innerText = !!character['_favourite'] ? character['_favourite'] : 'Y';
        $('#character-rating')[0].innerText = !!character['_rating'] ? character['_rating'] : 'Y';
    },

    chart: character => {

    },
};


$(window).on('load', () => {
    const chkCharacterList = setInterval(() => {
        const characterList = sessionStorage.getItem('characterList');
        const hasCharacterList = !!characterList;

        if (hasCharacterList) {
            render.all();
            clearInterval(chkCharacterList);
        }
    }, 1500);
});

