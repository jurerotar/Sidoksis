export default class Animation {
    darkenAndPreventScroll() {
        const WidescreenContainer = document.querySelector('.widescreenSmallContainer');
        const Main = WidescreenContainer.getElementsByTagName('main')[0];
        const Nav = WidescreenContainer.querySelector('.navigation');
        const HTML = document.getElementsByTagName('html')[0];
        const footer = WidescreenContainer.getElementsByClassName('footer')[0];
        const copyright = WidescreenContainer.getElementsByClassName('footer__copyright')[0];
        WidescreenContainer.classList.contains('prevent-scroll') ? WidescreenContainer.classList.remove('prevent-scroll') : WidescreenContainer.classList.add('prevent-scroll');
        HTML.classList.contains('prevent-scroll') ? HTML.classList.remove('prevent-scroll') : HTML.classList.add('prevent-scroll');
        Nav.classList.contains('darken-blur') ? Nav.classList.remove('darken-blur') : Nav.classList.add('darken-blur');
        Main.classList.contains('darken-blur') ? Main.classList.remove('darken-blur') : Main.classList.add('darken-blur');
        Main.classList.contains('no-pointer-events') ? Main.classList.remove('no-pointer-events') : Main.classList.add('no-pointer-events');
        footer.classList.contains('darken-blur') ? footer.classList.remove('darken-blur') : footer.classList.add('darken-blur');
        copyright.classList.contains('darken-blur') ? copyright.classList.remove('darken-blur') : copyright.classList.add('darken-blur');
    }
}
