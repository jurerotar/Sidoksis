export default class Notifications {

    createNotification(taskFinished:boolean, label:string) {
        const image:string = (taskFinished) ? 'assets/img/icons/valider-png-3.png' : 'assets/img/icons/times-circle-regular.svg';
        const mainContainer = <HTMLDivElement>document.getElementById('mainContainer');
        const output = `<div class = "notification">
            <img src = "${image}" class = "notification__image">
            <p class = "notification__text">${label}</p>
        </div>`;
        mainContainer.insertAdjacentHTML('afterbegin', output);
        const notification = <HTMLDivElement>document.querySelector('.notification');
        setTimeout(()=> {
            notification.style.transform = 'translateX(0)';
        },500);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(()=> {
                this.removeNotification();
            }, 2000)
        }, 6000)
    }

    removeNotification() {
        const notification = <HTMLDivElement>document.querySelector('.notification');
        notification.remove();
    }
}