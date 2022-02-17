/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';

    characterRepo
        .get
        .complete(characterList => {
            let ms = 0;

            for (let i = 0, max = characterList.length; i < max; i++) {
                const character = characterList[i];
                const eCharacter = $(`
                    <div class="card${1000 < character.favourite ? ' double' : ''}" style="display: none">
                        <div class="photos">
                            <img class="photo-1" src="${character.image}" alt=""/>
                            <img class="photo-2" src="${character.image}" alt=""/>
                        </div>
                        <div class="content">
                            <div class="title">${character.firstName}</div>
                            <div class="body">${!!character.about ? character.about : ''}</div>
                        </div>
                    </div>
                `);

                eCharacter.click(() => $(location)
                    .prop('href', `html/characterprofile.html?herokuappId=${character.id}`));

                $('#grid-character').append(eCharacter);

                sleep(ms).then(() => eCharacter.fadeIn(1000, 'swing', () => {}));

                ms += 50;
            }

        }, error => console.log(error));
});

(() => {
    const tbCharacter = $('#tb-character');

    tbCharacter.on('change', function () {
        const input = tbCharacter.val().toLowerCase();

        $('#grid-character > div')
            .each((index, element) => {
                const target = $(element);
                const title = target.find('div.content > div.title')[0];
                const name = title.innerText.toLowerCase();

                if (!name.includes(input)) {
                    target.fadeOut(1500, 'swing');
                }
                else {
                    target.fadeIn(1500, 'swing');
                }
            });
    });
})();
