export default class NavigationBar {

    element: HTMLDivElement|any;

    constructor(element:HTMLDivElement|any) {
        this.element = element;
    }

    addCompanyLogo(image:string) {
        let container = (<HTMLDivElement>this.element.querySelector('.navigation__companyContainer'));
        if(container === null) {
            this.element.insertAdjacentHTML('afterbegin', '<div class = "navigation__companyContainer">')
        }
        container = (<HTMLDivElement>this.element.querySelector('.navigation__companyContainer'));
        container.insertAdjacentHTML('afterbegin', `<img src = "${image}" class = "navigation__companyPhoto">`);
    }

    addCompanyTitle(companyName:string) {
        let container = (<HTMLDivElement>this.element.querySelector('.navigation__companyContainer'));
        if(container === null) {
            this.element.insertAdjacentHTML('afterbegin', '<div class = "navigation__companyContainer">')
        }
        container = (<HTMLDivElement>this.element.querySelector('.navigation__companyContainer'));
        container.insertAdjacentHTML('beforeend', `<p class = "navigation__companyTitle">${companyName}</p>`);
    }
    addUserSection(name:string, title:string = 'Employee', image:string) {
        const output:string = `<div class = "navigation__userContainer">
            <div class = "navigation__imageContainer" style = "background-image:url('${image}')"></div>
            <div class = "navigation__userAndTitleContainer">
                <p class = "title__username">${name}</p>
                <p class = "title__userTitle">${title}</p>
            </div>
        </div>`;
        this.element.insertAdjacentHTML('beforeend', output);
    }
}