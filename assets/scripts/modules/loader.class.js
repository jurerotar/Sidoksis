export default class Loader {
    constructor(element) {
        this.element = element;
    }
    async niceRemove(time) {
        setTimeout(() => {
            this.element.remove();
        }, time);
    }
    finishAnimation() {
        this.element.setAttribute('loading-finished', 'true');
    }
    setTitle(label) {
        const element = document.querySelector('.loader__text');
        element.innerHTML = label;
    }
}
