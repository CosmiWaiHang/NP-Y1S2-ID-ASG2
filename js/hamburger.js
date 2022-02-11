document.querySelector('.hamburger-menu-btn').onclick = function (e) {
    var menu = document.querySelector('.hamburger-menu-wrapper');
    var btn = document.querySelector('.hamburger-menu-btn');

    menu.classList.toggle('active');
    btn.classList.toggle('open');

    e.preventDefault();
}