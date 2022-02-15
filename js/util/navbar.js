/*jshint esversion: 9 */


$(document).ready(() => setTimeout(() => navExec()));


$(window).on('resize', () => setTimeout(() => navExec(), 500));


$(window).on('load', () => {
    const accountId = sessionStorage.getItem('accountId');
    const hasAccountId = !!accountId;

    if (!hasAccountId) {
        return;
    }

    const account = new Account(accountId, null, null);

    accountRepo
        .get
        .by_id(account, response => {
            const eProfile = $('#navbar-content-profile > a');
            eProfile[0].href = '#'; // profile page is under development
            eProfile[0].innerHTML = '<i class="far fa-arrow-alt-circle-right"></i>' + capitalize(response.username);
        });
});


jQuery(document).ready($ => {
    let path = window.location.pathname.split('/').pop();

    if ('' === path) {
        path = 'index.html';
    }

    const target = $('#navbar-content ul li a[href="' + path + '"]');
    target.parent().addClass('active');
});


$('.navbar-toggler').click(() => {
    $('.navbar-collapse').slideToggle(300);
    setTimeout(() => navExec());
});


const navExec = () => {
    const eNavContent = $('#navbar-content');
    const eActive = eNavContent.find('.active');
    const height = eActive.innerHeight();
    const width = eActive.innerWidth();
    const position = eActive.position();

    $('.hori-selector').css({
        'top': position.top + 'px', 'left': position.left + 'px', 'height': height + 'px', 'width': width + 'px',
    });

    $('#navbar-content').on('click', 'li', function () {
        $('#navbar-content ul li').removeClass('active');
        $(this).addClass('active');
        const height = $(this).innerHeight();
        const width = $(this).innerWidth();
        const position = $(this).position();
        $('.hori-selector').css({
            'top': position.top + 'px', 'left': position.left + 'px', 'height': height + 'px', 'width': width + 'px',
        });
    });
};


// Add active class on another page linked
// ==========================================
// $(window).on('load',function () {
//     const current = location.pathname;
//     console.log(current);
//     $('#navbarSupportedContent ul li a').each(function(){
//         const $this = $(this);
//         // if the current path is like this link, make it active
//         if($this.attr('href').indexOf(current) !== -1){
//             $this.parent().addClass('active');
//             $this.parents('.menu-submenu').addClass('show-dropdown');
//             $this.parents('.menu-submenu').parent().addClass('active');
//         }else{
//             $this.parent().removeClass('active');
//         }
//     })
// });
