export default class Animation {
    /**
     * Applies blur and darken filter to footer, copyright bar and main section when popup is open
     */
    darkenAndPreventScroll():void {
        const WidescreenContainer = <HTMLHtmlElement>document.querySelector('.widescreenSmallContainer');
        const Main = <HTMLElement>WidescreenContainer.getElementsByTagName('main')[0];
        const Nav = <HTMLElement>WidescreenContainer.querySelector('.navigation');
        const HTML = <HTMLHtmlElement>document.getElementsByTagName('html')[0];
        const footer = <HTMLDivElement>WidescreenContainer.getElementsByClassName('footer')[0];
        const copyright = <HTMLDivElement>WidescreenContainer.getElementsByClassName('footer__copyright')[0];
        /**
         * Prevent scroll on mobile
         */
        WidescreenContainer.classList.contains('prevent-scroll') ? WidescreenContainer.classList.remove('prevent-scroll') : WidescreenContainer.classList.add('prevent-scroll');
        /**
         * Prevent scroll on widescreen devices
         */
        HTML.classList.contains('prevent-scroll') ? HTML.classList.remove('prevent-scroll') : HTML.classList.add('prevent-scroll');
        /**
         * Blur and darken the navigation bar
         */
        Nav.classList.contains('darken-blur') ? Nav.classList.remove('darken-blur') : Nav.classList.add('darken-blur');
        /**
         * Blur and darken the main element
         */
        Main.classList.contains('darken-blur') ? Main.classList.remove('darken-blur') : Main.classList.add('darken-blur');
        /**
         * Prevent user from clicking bottom elements
         */
        Main.classList.contains('no-pointer-events') ? Main.classList.remove('no-pointer-events') : Main.classList.add('no-pointer-events');
        /**
         * Blur and darken the main element
         */
        footer.classList.contains('darken-blur') ? footer.classList.remove('darken-blur') : footer.classList.add('darken-blur');
        /**
         * Blur and darken the main element
         */
        copyright.classList.contains('darken-blur') ? copyright.classList.remove('darken-blur') : copyright.classList.add('darken-blur');
    }
}