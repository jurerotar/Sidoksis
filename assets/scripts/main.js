"use strict";
const Descriptions = {
    'AbsenceRequest': {
        'title': 'Dopusti',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="image__task"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"></path></svg>'
    },
    'Contracts': {
        'title': 'Pogodbe',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="image__task"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>'
    },
    'ISO': {
        'title': 'ISO',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg class = "image__task" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>'
    },
    'Prejeti račun': {
        'title': 'Prejeti računi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="image__task"><path fill="currentColor" d="M377 105L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zM64 72c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8V72zm0 80v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8H72c-4.42 0-8-3.58-8-8zm144 263.88V440c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-24.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V232c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v24.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07z"></path></svg>'
    },
    'IncomingPost': {
        'title': 'Obvestila',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="image__task"><path fill="currentColor" d="M439.39 362.29c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71zM67.53 368c21.22-27.97 44.42-74.33 44.53-159.42 0-.2-.06-.38-.06-.58 0-61.86 50.14-112 112-112s112 50.14 112 112c0 .2-.06.38-.06.58.11 85.1 23.31 131.46 44.53 159.42H67.53zM224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64z"></path></svg>'
    },
    'PurchaseOrder': {
        'title': 'Nakupi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img': '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="image__task"><path fill="currentColor" d="M310.706 413.765c-1.314-6.63-7.835-10.872-14.424-9.369-10.692 2.439-27.422 5.413-45.426 5.413-56.763 0-101.929-34.79-121.461-85.449h113.689a12 12 0 0 0 11.708-9.369l6.373-28.36c1.686-7.502-4.019-14.631-11.708-14.631H115.22c-1.21-14.328-1.414-28.287.137-42.245H261.95a12 12 0 0 0 11.723-9.434l6.512-29.755c1.638-7.484-4.061-14.566-11.723-14.566H130.184c20.633-44.991 62.69-75.03 117.619-75.03 14.486 0 28.564 2.25 37.851 4.145 6.216 1.268 12.347-2.498 14.002-8.623l11.991-44.368c1.822-6.741-2.465-13.616-9.326-14.917C290.217 34.912 270.71 32 249.635 32 152.451 32 74.03 92.252 45.075 176H12c-6.627 0-12 5.373-12 12v29.755c0 6.627 5.373 12 12 12h21.569c-1.009 13.607-1.181 29.287-.181 42.245H12c-6.627 0-12 5.373-12 12v28.36c0 6.627 5.373 12 12 12h30.114C67.139 414.692 145.264 480 249.635 480c26.301 0 48.562-4.544 61.101-7.788 6.167-1.595 10.027-7.708 8.788-13.957l-8.818-44.49z"></path></svg>'
    },
};
let DocumentProperties = {};
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
    document.title = UserInfoObject.company;
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
        const prop = properties.find((x) => x.PropertyName === shorData[i].PropertyName);
        if (typeof prop !== 'undefined') {
            let Caption = shorData[i].Caption;
            returnString += `
            <div class = "task__subgrid">
                <span class = "title__subtitle">${Caption}</span>
                <p class = "title__taskPropertyValue title__taskPropertyValue--1">${prop.Value}</p>
            </div>
            `;
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
                    content +=
                        `<details class = "${DetailsClass}" data-doctype = "${dt}">
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
                        const Data = DocumentShortData(actions[z], shortData);
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
                                <div class = "task__titleContainer">
                                    <div class = "task__title">
                                        <span class = "title__subtitle">Naslov dokumenta</span>
                                        <p class = "title__taskPropertyValue title__taskPropertyValue--2">${actions[z].MasterDocumentId}</p>
                                    </div>
                                    <div class = "task__image">
                                        ${Descriptions[dt]['img']}
                                    </div>
                                </div>
                                <div class = "task__grid task__grid--1">
                                    ${Data}
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
const Popup = (PopupSettings = {}) => {
    const Popup = document.querySelector('.popup');
    const Main = document.getElementsByTagName('main')[0];
    const Nav = document.querySelector('.navigation');
    const HTML = document.getElementsByTagName('html')[0];
    const WidescreenContainer = document.querySelector('.widescreenSmallContainer');
    WidescreenContainer.classList.contains('prevent-scroll') ? WidescreenContainer.classList.remove('prevent-scroll') : WidescreenContainer.classList.add('prevent-scroll');
    HTML.classList.contains('prevent-scroll') ? HTML.classList.remove('prevent-scroll') : HTML.classList.add('prevent-scroll');
    Nav.classList.contains('darken-blur') ? Nav.classList.remove('darken-blur') : Nav.classList.add('darken-blur');
    Main.classList.contains('darken-blur') ? Main.classList.remove('darken-blur') : Main.classList.add('darken-blur');
    Popup.setAttribute('data-open', (Popup.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
    if (Object.entries(PopupSettings).length !== 0) {
        const Action = PopupSettings.Action;
        const ActionID = PopupSettings.ActionID;
        const PopupTitle = document.getElementById('popup-title');
        if (PopupTitle) {
            PopupTitle.innerHTML = ActionID;
        }
        const CommentRequired = PopupSettings.CommentRequired;
    }
};
(function () {
    AttachEventHandlers();
})();
