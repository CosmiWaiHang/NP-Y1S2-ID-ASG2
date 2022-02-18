/*jshint esversion: 9 */


$(window).on('load', () => {
    'use strict';
    $("#card-summon-container-section")
    .fadeOut(0)

    $('#btn-summon-one')
    .click(() => {
        summon.single();
        payment.single();
        $("#main-summon-container-section")
        .fadeOut(0)
        $("#balance-display")
        .fadeOut(0)
        $("#card-summon-container-section")
        .fadeIn(1500)
        
    })
    $('#btn-summon-multi')
    .click(() => {
        summon.many(10);
        payment.many();
        $("#main-summon-container-section")
        .fadeOut(0)
        $("#balance-display")
        .fadeOut(0)
        $("#card-summon-container-section")
        .fadeIn(1500)
    })
});


const summon = {
    single: () => {
        const aotPicker = aotList => {
            const random = Math.random();
            const max = aotList.length;
            const n = Math.floor(random * max);

            return aotList[n];
        };

        const get_random_rating = () => {
            const rand = Math.random();

            const stats = {
                // Rating -> Chance
                '5.0': 1 / 21,
                '4.5': 3 / 21,
                '4.0': 6 / 21,
                '3.5': 10 / 21,
                '3.0': 15 / 21,
                '2.5': 21 / 21, // The luckiest person in the world will get this, confirm give them 1 worst one if they didn't get anything, FK ME BAD GUY HA HA HA HA HA.
            };

            for (let key in stats) {
                const chance = stats[key];

                if (chance >= rand) {
                    return key;
                }
            }

            return '2.5';
        };

        const appendCard = aot =>
            $('#card-summon-items')
                .append(`<div class="card-slider-item swiper-slide">
                             <div class="card-slider-img">
                                 <img alt="" src="${aot.image}">
                             </div>
                             <div class="card-slider-content">
                                 <span class="card-slider-code">${aot.rating}</span>
                                 <div class="card-slider-title">${aot.name}</div>
                                 <div class="card-slider-text">${aot.about}</div>
                                 <a class="card-slider-button" href="summon.html">Return</a>
                             </div>
                         </div>`);

        const updateCardSlider = () =>
            new Swiper('.card-slider', {
                spaceBetween: 30,
                effect: 'fade',
                loop: true,
                mousewheel: {
                    invert: false,
                },
                pagination: {
                    el: '.card-slider-pagination',
                    clickable: true,
                },
            });

        const rating = get_random_rating();

        aotRepo
            .get
            .all_by_rating_smaller_or_equal(rating, aotList => {
                const aot = aotPicker(aotList);

                appendCard(aot);
                updateCardSlider();
            });
    },

    many: (count = 10) => {
        for (let i = 0, max = count; i < max; i++) {
            summon.single();
        }
    },
};
const payment = {
    single: () => {
        const userId = sessionStorage.getItem('userId');
        const tmp = new User(userId);
        const user = userRepo.get.by_id(tmp).res;
        user.balance -= 100;
        userRepo.put(user);
        console.log(user.balance);
        $('#txt-balance')[0].innerText = user ? user?.balance: 0;
    },
    many: () => {
        const userId = sessionStorage.getItem('userId');
        const tmp = new User(userId);
        const user = userRepo.get.by_id(tmp).res;
        user.balance -= 1000;
        userRepo.put(user);
        console.log(user.balance);
        $('#txt-balance')[0].innerText = user ? user?.balance: 0;
    },
};
var slides = document.querySelectorAll('.slide');
var btns = document.querySelectorAll('.btn');
let currentSlide = 1;

// Javascript for image slider manual navigation
var manualNav = function(manual){
    slides.forEach((slide) => {
    slide.classList.remove('active');

    btns.forEach((btn) => {
        btn.classList.remove('active');
    });
    });

    slides[manual].classList.add('active');
    btns[manual].classList.add('active');
}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
    });
});

/* Get balance */

(() => {
    const userId = sessionStorage.getItem('userId');
    const tmp = new User(userId);
    const user = userRepo.get.by_id(tmp).res;
    console.log(user);
    console.log(user?.balance);
    $('#txt-balance')[0].innerText = user ? user?.balance: 0;
})();


// Backup code.
// `
// <div class="card-slider-item swiper-slide">
//     <div class="card-slider-img">
//         <img alt=""
//              src="https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?size=626&ext=jpg">
//     </div>
//     <div class="card-slider-content">
//         <span class="card-slider-code">I am code 2</span>
//         <div class="card-slider-title">I am title 2</div>
//         <div class="card-slider-text">I am text 2
//         </div>
//         <a class="card-slider-button" href="#">I am button 2</a>
//     </div>
// </div>
// `
// `
// <div class="card-slider-item swiper-slide">
//     <div class="card-slider-img">
//
//         <img alt=""
//              src="https://img.freepik.com/free-vector/cute-rabbit-with-duck-working-laptop-cartoon-illustration_56104-471.jpg?size=626&ext=jpg">
//     </div>
//     <div class="card-slider-content">
//         <span class="card-slider-code">I am code 1</span>
//         <div class="card-slider-title">I am title 1</div>
//         <div class="card-slider-text">I am text 1
//         </div>
//         <a class="card-slider-button" href="#">I am button 1</a>
//     </div>
// </div>
// `
// `
// <li class="nav-item">
//     <a class="nav-link" href="javascript:void 0;"><i class="fas fa-tachometer-alt"></i>Dashboard</a>
// </li>
// <li class="nav-item active">
//     <a class="nav-link" href="javascript:void 0;"><i class="far fa-address-book"></i>Address
//                                                                                      Book</a>
// </li>
// <li class="nav-item">
//     <a class="nav-link" href="javascript:void 0;"><i class="far fa-clone"></i>Components</a>
// </li>
// <li class="nav-item">
//     <a class="nav-link" href="javascript:void 0;"><i class="far fa-calendar-alt"></i>Calendar</a>
// </li>
// <li class="nav-item">
//     <a class="nav-link" href="javascript:void 0;"><i class="far fa-chart-bar"></i>Charts</a>
// </li>
// <li class="nav-item">
//     <a class="nav-link" href="javascript:void 0;"><i class="far fa-copy"></i>Documents</a>
// </li>
// `

