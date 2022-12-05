const btnScrollTop = document.querySelector('.scroll__top');

window.onscroll = () => {
    if (window.scrollY > 600) {
        btnScrollTop.classList.add('scroll__top--show');
    } else if (window.scrollY < 600) {
        btnScrollTop.classList.remove('scroll__top--show');
    }
}

btnScrollTop.onclick = () => {
    window.scrollTo(0, 0);
}