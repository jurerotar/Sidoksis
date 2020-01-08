"use strict";
const Descriptions = {
    'AbsenceRequest': {
        'title': 'Dopusti',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
    'Contracts': {
        'title': 'Pogodbe',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
    'ISO': {
        'title': 'ISO',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
    'Prejeti račun': {
        'title': 'Prejeti računi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
    'IncomingPost': {
        'title': 'Obvestila',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
    'PurchaseOrder': {
        'title': 'Nakupi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': ''
    },
};
const userInfo = {
    name: 'Janez Ovsenik',
    title: 'Administrator',
    company: 'Sidoksis',
    companyImage: 'sidoksisLogo.png',
};
let Translations;
async function FetchTranslations() {
    try {
        const MobileStartupJson = await (await fetch('assets/data/MobileStartup.json')).json();
        Translations = MobileStartupJson.Translations;
    }
    catch (e) {
        console.error(e);
        return Promise.resolve();
    }
}
;
let Actions;
async function FetchActions() {
    try {
        const ActionsJson = await (await fetch('assets/data/GetMyMobileActions.json')).json();
        Actions = ActionsJson;
    }
    catch (e) {
        console.error(e);
        return Promise.resolve();
    }
}
;
let Comments;
async function FetchComments() {
    try {
        const CommentsJson = await (await fetch('assets/data/Comments.json')).json();
        Comments = CommentsJson.Comments;
    }
    catch (e) {
        console.error(e);
        return Promise.resolve();
    }
}
;
function PersonalizeNavigationBar(UserInfoObject) {
    const UsernameContainer = document.querySelector('.title__username');
    const UserTitleContainer = document.querySelector('.title__userTitle');
    const ImageContainer = document.querySelector('.navigation__imageContainer');
    const CompanyImageContainer = document.querySelector('.navigation__sectionContainer');
    const ImageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const ImagePathName = UserInfoObject.name.replace(' ', '.').toLowerCase();
    if (CompanyImageContainer) {
        let CompanyImageContainerOutput = '';
        if ('companyImage' in UserInfoObject && UserInfoObject.companyImage !== '') {
            CompanyImageContainerOutput += `<img src = "assets/img/logo/${UserInfoObject.companyImage}" class = "image__companyPhoto" alt = "${UserInfoObject.companyImage}">`;
        }
        else {
            CompanyImageContainerOutput += `<img src = "assets/img/logo/sidoksisLogo.png" class = "image__companyPhoto" alt = "Neznano podjetje">`;
        }
        if ('company' in UserInfoObject && UserInfoObject.company !== '') {
            CompanyImageContainerOutput += `<p class = "title__companyTitle">${UserInfoObject.company}</p>`;
        }
        else {
            CompanyImageContainerOutput += `<p class = "title__companyTitle">Neznano podjetje</p>`;
        }
        CompanyImageContainer.innerHTML = CompanyImageContainerOutput;
    }
    if (UsernameContainer) {
        if ('name' in UserInfoObject && UserInfoObject.name !== '') {
            UsernameContainer.innerHTML = UserInfoObject.name;
        }
        else {
            UsernameContainer.innerHTML = 'Neznan uporabnik';
        }
    }
    if (UserTitleContainer) {
        if ('title' in UserInfoObject && UserInfoObject.title !== '') {
            UserTitleContainer.innerHTML = UserInfoObject.title;
        }
        else {
            UsernameContainer.innerHTML = 'Uporabnik';
        }
    }
    if (ImageContainer) {
        let ImageFound = false;
        for (let i = 0; i < ImageExtensions.length; i++) {
            if (DetermineIfImageExists(`assets/img/users/${ImagePathName}${ImageExtensions[i]}`)) {
                ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/${ImagePathName + ImageExtensions[i]}" alt = "${UserInfoObject.name}">`;
                ImageFound = true;
                break;
            }
        }
        if (!ImageFound) {
            ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/default.user.png" alt = "Default user photo">`;
        }
    }
}
function DetermineIfImageExists(url) {
    const HttpRequest = new XMLHttpRequest();
    HttpRequest.open('HEAD', url, false);
    HttpRequest.send();
    if (HttpRequest.status === 200) {
        return true;
    }
    else {
        return false;
    }
}
function DocumentShortData(currentAction, shorData) {
    const properties = currentAction.MasterDocument.Properties;
    const UnixStartTime = new Date(currentAction.PlannedStartDate);
    const UnixEndTime = new Date(currentAction.PlannedEndDate);
    let returnString = `
    <div class = "task__subgrid">
        <span class = "title__subtitle">Izvajalec</span>
        <p class = "title__taskPropertyValue title__taskPropertyValue--1">${currentAction.ActorName}</p>
    </div>
    <div class = "task__subgrid">
        <span class = "title__subtitle">Rok</span>
        <p class = "title__taskPropertyValue title__taskPropertyValue--1">${UnixEndTime.getDate()}.${UnixEndTime.getMonth()}.${UnixEndTime.getFullYear()} ${UnixEndTime.getHours()}:${UnixEndTime.getMinutes()}</p>
    </div>
    <div class = "task__subgrid">
        <span class = "title__subtitle">Ustvarjeno</span>
        <p class = "title__taskPropertyValue title__taskPropertyValue--1">${UnixStartTime.getDate()}.${UnixStartTime.getMonth()}.${UnixStartTime.getFullYear()} ${UnixStartTime.getHours()}:${UnixStartTime.getMinutes()}</p>
    </div>
    `;
    for (let i = 0; i < shorData.length; i++) {
        let prop = properties.find((x) => x.PropertyName === shorData[i].PropertyName);
        if (typeof prop !== 'undefined') {
            returnString += `
            <div class = "task__subgrid">
                <span class = "title__subtitle">${shorData[i].Caption}</span>
                <p class = "title__taskPropertyValue title__taskPropertyValue--1">${prop.Value}</p>
            </div>`;
        }
    }
    return returnString;
}
async function Init() {
    await FetchActions();
    await FetchTranslations();
    if (typeof (Actions) !== 'object' || typeof (Translations) !== 'object') {
        console.error('Actions or Translations are not of the right type.');
        return false;
    }
    PersonalizeNavigationBar(userInfo);
    if (Actions && Translations) {
        const Loader = document.querySelector('.loader');
        Loader.setAttribute('loading-finished', 'true');
        if (Actions.DBCallResult) {
            const mainContainer = document.querySelector('.main');
            let content = '';
            const DocTypes = Actions.InstanceActions;
            for (let i = 0; i < DocTypes.length; i++) {
                let DetailsClass = 'task__details';
                if (i === DocTypes.length - 1) {
                    DetailsClass = 'task__details task__details--noMarginBottom';
                }
                let dt = (DocTypes[i].DocumentTypeName ? DocTypes[i].DocumentTypeName : DocTypes[i].DocumentType);
                if (dt in Descriptions) {
                    content += `<details class = "${DetailsClass}" data-doctype = "${dt}">
                                    <summary class = "summary">
                                        <div class = "summary__container--1">
                                            <div class = "summary__container--2">
                                                <h2 class = "title__main title__main--1">${Descriptions[dt]['title']}</h2>
                                            </div>
                                            <div class = "summary__container--3">
                                                <div class="summary__icon"></div>
                                            </div>
                                        </div>
                                    </summary>`;
                }
                else {
                }
                let shortData = DocTypes[i].PropertiesToShow;
                if (typeof shortData === "undefined") {
                    shortData = [
                        {
                            PropertyName: "_Name",
                            Caption: "Ime"
                        },
                        {
                            PropertyName: "StatusDoc",
                            Caption: "Status"
                        },
                        {
                            PropertyName: "_DocumentOwnerName",
                            Caption: "Skrbnik"
                        },
                        {
                            PropertyName: "_DocumentId",
                            Caption: "ID dokumenta"
                        },
                        {
                            PropertyName: "_CustomerName",
                            Caption: "Kupec"
                        },
                    ];
                }
                let actsteps = DocTypes[i].Steps;
                for (let j = 0; j < actsteps.length; j++) {
                    let desc = actsteps[j].StepName;
                    content += `
                        <div class = "title__container--1">
                            <p class = "title__main title__main--2">${desc}</p>
                            <p class = "title__description title__description--1">${Descriptions[dt]['desc']}</p>
                        </div>
                        `;
                    let actions = actsteps[j].Actions;
                    for (let z = 0; z < actions.length; z++) {
                        let pdfclass = 'invisible';
                        let cmtclass = 'invisible';
                        if (actions[z].MasterDocument.Pages && actions[z].MasterDocument.Pages.length > 0) {
                            pdfclass = 'task__subgrid task__subgrid--button';
                        }
                        if (actions[z].MasterDocument.Comments && actions[z].MasterDocument.Comments.length > 0) {
                            cmtclass = 'task__subgrid task__subgrid--button';
                        }
                        content += `
                            <div class = "task__container">
                                <div class = "task__grid task__grid--1">
                                    ${DocumentShortData(actions[z], shortData)}
                                </div>
                                <div class = "task__grid task__grid--1">
                                    <div class = "task__subgrid actions">
                                        <span class = "title__subtitle">Potrdi</span>
                                        <button class = "button__action button__action--green" data-action = "confirm" data-actionID = "${actions[z].WorkflowActionId}">Potrdi</button>
                                    </div>
                                    <div class = "task__subgrid actions">
                                        <span class = "title__subtitle">Zavrni</span>
                                        <button class = "button__action button__action--red" data-action = "deny" data-actionID = "${actions[z].WorkflowActionId}">Zavrni</button>
                                    </div>
                                    <div class = "${cmtclass}">
                                        <span class = "title__subtitle">Komentarji</span>
                                        <button class = "button__action button__action--blue" data-action = "comments" data-actionID = "${actions[z].WorkflowActionId}">Komentarji</button>
                                    </div>
                                    <div class = "${pdfclass}">
                                        <span class = "title__subtitle">Predogled</span>
                                        <button class = "button__action button__action--purple" data-action = "info" data-actionID = "${actions[z].WorkflowActionId}">Prikaži PDF</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }
                content += '</details>';
            }
            mainContainer.innerHTML = content;
            return true;
        }
        else {
            console.error(Actions.ErrorMessage);
            return false;
        }
    }
    else {
        return false;
    }
}
async function AttachEventHandlers() {
    if (await Init()) {
        const PopupCloseButton = document.querySelector('.popup__close');
        PopupCloseButton.addEventListener('click', () => {
            Popup();
        });
        const DataAttributes = ['confirm', 'deny', 'comments', 'info'];
        DataAttributes.forEach(element => {
            const Elements = document.querySelectorAll(`[data-action='${element}']`);
            Elements.forEach(el => {
                const Action = el.getAttribute('data-action');
                const ActionID = el.getAttribute('data-actionid');
                switch (Action) {
                    case 'confirm':
                        el.addEventListener('click', () => {
                            Popup({
                                Action: Action,
                                ActionID: ActionID,
                                Comments: [
                                    {
                                        OwnerID: '',
                                        OwnerName: '',
                                        CommentTime: '',
                                        Comment: ''
                                    }
                                ]
                            });
                        });
                        break;
                    case 'deny':
                        el.addEventListener('click', () => {
                            Popup({
                                Action: Action,
                                ActionID: ActionID,
                                Comments: [
                                    {
                                        OwnerID: '',
                                        OwnerName: '',
                                        CommentTime: '',
                                        Comment: ''
                                    }
                                ]
                            });
                        });
                        break;
                    case 'comments':
                        el.addEventListener('click', () => {
                            Popup({
                                Action: Action,
                                ActionID: ActionID,
                                Comments: [
                                    {
                                        OwnerID: '',
                                        OwnerName: '',
                                        CommentTime: '',
                                        Comment: ''
                                    }
                                ]
                            });
                        });
                        break;
                    case 'info':
                        el.addEventListener("click", () => {
                            fetch(`DMSDataService.svc/getdocument?documentid=${ActionID}&positionlevel=0&includetasks=false`)
                                .then();
                        });
                        break;
                }
            });
        });
    }
    else {
        console.error('Cannot initiate page construction.');
    }
}
const Popup = (Comments = {}) => {
    const CommentContainer = document.querySelector('.popup');
    const Main = document.getElementsByTagName('main')[0];
    const Nav = document.querySelector('.navigation');
    const HTML = document.getElementsByTagName('html')[0];
    const WidescreenContainer = document.querySelector('.widescreenSmallContainer');
    WidescreenContainer.classList.contains('prevent-scroll') ? WidescreenContainer.classList.remove('prevent-scroll') : WidescreenContainer.classList.add('prevent-scroll');
    HTML.classList.contains('prevent-scroll') ? HTML.classList.remove('prevent-scroll') : HTML.classList.add('prevent-scroll');
    Nav.classList.contains('darken-blur') ? Nav.classList.remove('darken-blur') : Nav.classList.add('darken-blur');
    Main.classList.contains('darken-blur') ? Main.classList.remove('darken-blur') : Main.classList.add('darken-blur');
    CommentContainer.setAttribute('data-open', (CommentContainer.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
    if (Object.entries(Comments).length === 0 && Comments.constructor === Object) {
    }
};
(function () {
    AttachEventHandlers();
})();
