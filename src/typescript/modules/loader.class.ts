export default class Loader {
    element: HTMLDivElement;

    constructor(element:HTMLDivElement) {
        this.element = element;
    }

    async niceRemove(time:number) {
        setTimeout(() => {
            this.element.remove();
        }, time)
    }
    finishAnimation() {
        this.element.setAttribute('loading-finished', 'true');
    }

    setTitle(label:string) {
        const element:HTMLParagraphElement = <HTMLParagraphElement>document.querySelector('.loader__text');
        element.innerHTML = label;
    }
}