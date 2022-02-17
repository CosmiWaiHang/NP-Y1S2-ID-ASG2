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

// Backup code
// <div className="card">
//     <div className="photos"><img className="photo-1"
//                                  src="https://picsum.photos/id/10/200/400" /><img className="photo-2"
//                                                                                   src="https://picsum.photos/id/12/200/400" />
//     </div>
//     <div className="content">
//         <div className="title">Title</div>
//         <div className="body">My description</div>
//     </div>
// </div>
// <div className="card double">
//     <div className="photos"><img className="photo-1"
//                                  src="https://picsum.photos/id/14/400/800" /><img className="photo-2"
//                                                                                   src="https://picsum.photos/id/16/400/800" />
//     </div>
//     <div className="content">
//         <div className="title">Title</div>
//         <div className="body">My description</div>
//     </div>
// </div>