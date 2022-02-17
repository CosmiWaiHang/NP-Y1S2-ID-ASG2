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
        // console.log(character);
        // $('#character-name')[0].innerText = character['_firstName'];
        // $('#character-species')[0].innerText = character['_species'];
        // $('#character-image')[0].src = character['_image'];
        // $('#character-wiki').attr('href', character['_url']);
        // $('#character-age')[0].innerText = !!character['_age'] ? character['_age'] : 'Y';
        // $('#character-favourite')[0].innerText = !!character['_favourite'] ? character['_favourite'] : 'Y';
        // $('#character-rating')[0].innerText = !!character['_rating'] ? character['_rating'] : 'Y';
    },

    chart: character => {
        const transactionList = transactionRepo.get.all().res;
        const analyzed = analyzer.number_of_owned(transactionList);

        characterRepo.get.complete(
            characterList => {
                const label = [];
                const herokuappIdList = analyzed.label;

                for (let i = 0, maxI = herokuappIdList.length; i < maxI; i++) {
                    const herokuappId = parseInt(herokuappIdList[i]);

                    for (let j = 0, maxJ = characterList.length; j < maxJ; j++) {
                        const character = characterList[j];

                        if (herokuappId === character.id) {
                            label.push(character.firstName);
                            break;
                        }
                    }
                }

                const data = {
                    labels: label,
                    datasets: [
                        {
                            label: 'Titan vs Owned',
                            data: analyzed.data,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(75, 192, 192)',
                                'rgb(255, 205, 86)',
                                'rgb(201, 203, 207)',
                                'rgb(54, 162, 235)',
                            ],
                        },
                    ],
                };

                const plugin = {
                    id: 'custom_canvas_background_color',
                    beforeDraw: chart => {
                        const ctx = chart.canvas.getContext('2d');
                        ctx.save();
                        ctx.globalCompositeOperation = 'destination-over';
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                        ctx.fillRect(0, 0, chart.width, chart.height);
                        ctx.restore();
                    },
                };

                const config = {
                    type: 'polarArea',
                    data: data,
                    options: {},
                    plugins: [plugin],
                };

                new Chart(document.getElementById('character-chart'), config);
            },
        );
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

