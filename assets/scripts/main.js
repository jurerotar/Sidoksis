import configuration from "./config.js";
const config = configuration();
import translations from "./translations.js";
const trans = translations();
let Translations;
async function FetchTranslations() {
    try {
        const MobileStartupJson = await (await fetch(config.translationJsonPath)).json();
        Translations = MobileStartupJson;
    }
    catch (e) {
        console.error(e);
        return Promise.resolve();
    }
}
;
let ActionsJson;
async function FetchActions() {
    try {
        const Actions = await (await fetch(config.actionJsonPath)).json();
        ActionsJson = Actions;
    }
    catch (e) {
        console.error(e);
        return Promise.resolve();
    }
}
;
function constructFooter() {
    const footer = document.getElementsByClassName('footer')[0];
    const language = config.language;
    trans[language].footer.forEach((element) => {
        footer.innerHTML += `
        <details class = "footer__details">
            <summary class = "footer__summary">
            ${element.title}
            <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg>
        </summary>
        <p class = "footer__text">
            ${element.text}
        </p>
    </details>`;
    });
}
function constructCopyright() {
    const copyright = document.getElementsByClassName('footer__copyright')[0];
    const language = config.language;
    copyright.innerHTML = `
    <p class = "title__copyright">
        ${trans[language].copyright}
    </p>`;
}
function PersonalizeNavigationBar() {
    const UsernameContainer = document.querySelector('.title__username');
    const UserTitleContainer = document.querySelector('.title__userTitle');
    const ImageContainer = document.querySelector('.navigation__imageContainer');
    const CompanyImageContainer = document.querySelector('.navigation__sectionContainer');
    const ImageExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
    const ImagePathName = Translations.DisplayName.replace(' ', '.').toLowerCase();
    document.title = (config.companyName !== '') ? config.companyName : 'Sidoksis';
    let CompanyImageContainerOutput = '';
    if (CompanyImageContainer) {
        if (config.displayCompanyLogo === true) {
            CompanyImageContainerOutput += (config.companyLogoPath !== '') ? `<img src = "assets/img/logo/${config.companyLogoPath}" class = "image__companyPhoto" alt = "${(config.companyName !== '') ? config.companyName : 'Company logo'}">` : `<img src = "assets/img/logo/sidoksisLogo.png" class = "image__companyPhoto" alt = "Sidoksis d.o.o.">`;
        }
        if (config.displayCompanyName === true) {
            CompanyImageContainerOutput += (config.companyName !== '') ? `<p class = "title__companyTitle">${config.companyName}</p>` : `<p class = "title__companyTitle">Sidoksis</p>`;
        }
    }
    if (CompanyImageContainer) {
        CompanyImageContainer.innerHTML = CompanyImageContainerOutput;
    }
    if (UsernameContainer) {
        if (config.displayUsername === true) {
            UsernameContainer.innerHTML = Translations.DisplayName;
        }
    }
    if (UserTitleContainer) {
        if (config.displayUserTitle === true) {
            UserTitleContainer.innerHTML = (Translations.DisplayName in config.customUserTitles) ? config.customUserTitles[Translations.DisplayName] : 'User';
        }
    }
    if (ImageContainer) {
        if (config.displayUserImage === true) {
            let ImageFound = false;
            for (let i = 0; i < ImageExtensions.length; i++) {
                if (async () => { return await DetermineIfImageExists(`assets/img/users/${ImagePathName + ImageExtensions[i]}`); }) {
                    ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/${ImagePathName + ImageExtensions[i]}" alt = "${Translations.DisplayName}">`;
                    ImageFound = true;
                    break;
                }
            }
            if (!ImageFound) {
                ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/default.user.png" alt = "Default user photo">`;
            }
        }
    }
}
async function DetermineIfImageExists(url) {
    return ((await fetch(url, { method: 'HEAD' })).status === 200) ? true : false;
}
function DocumentShortData(currentAction, shorData) {
    let returnString = '';
    let DocumentProperties = {};
    const properties = currentAction.MasterDocument.Properties;
    for (let i = 0; i < shorData.length; i++) {
        const prop = properties.find((x) => x.PropertyName === shorData[i].PropertyName);
        if (typeof prop !== 'undefined') {
            let Caption = shorData[i].Caption;
            DocumentProperties[Caption] = prop.Value;
            returnString += `
            <div class = "task__subgrid">
                <span class = "title__subtitle">${Caption}</span>
                <p class = "title__taskPropertyValue title__taskPropertyValue--1">${prop.Value}</p>
            </div>
            `;
        }
    }
    return [returnString, DocumentProperties];
}
async function constructBody() {
    await FetchActions();
    await FetchTranslations();
    if (typeof (ActionsJson) !== 'object' || typeof (Translations) !== 'object') {
        console.error(`Actions or Translations are not of the right type. Actions is type of ${typeof (ActionsJson)} and Translations is type of ${typeof (Translations)}.`);
        return false;
    }
    if (config.displayNavigationBar === true) {
        PersonalizeNavigationBar();
    }
    if (ActionsJson && Translations) {
        const Loader = document.querySelector('.loader');
        Loader.setAttribute('loading-finished', 'true');
        if (ActionsJson.DBCallResult === true) {
            const mainContainer = document.querySelector('.main');
            let content = '';
            const DocTypes = ActionsJson.InstanceActions;
            let currentDocumentType = '';
            const lang = trans[config.language];
            for (let i = 0; i < DocTypes.length; i++) {
                const DetailsClass = (DocTypes.length - 1 === i) ? 'task__details task__details--noMarginBottom' : 'task__details';
                let actionCount = 0;
                DocTypes[i].Steps.forEach((element) => {
                    actionCount += element.Actions.length;
                });
                let dt = (DocTypes[i].DocumentTypeName ? DocTypes[i].DocumentTypeName : DocTypes[i].DocumentType);
                if (dt !== currentDocumentType) {
                    currentDocumentType = dt;
                    content +=
                        `<details class = "${DetailsClass}" data-action-count = "${actionCount}" data-step-count = "${DocTypes[i].Steps.length}" data-doctype = "${dt}" ${(config.extendableOpenByDefault === true) ? 'open' : ''}>
                        <summary class = "summary">
                            <div class = "summary__container--1">
                                <div class = "summary__container--2">
                                    <h2 class = "title__main title__main--1">${dt}</h2>
                                    <span class = "summary__taskCount">${lang.taskCount}: <span class = "summary__count">${actionCount}</span></span>
                                </div>
                                <div class = "summary__container--3">
                                    <div class="summary__icon"></div>
                                </div>
                            </div>
                        </summary>`;
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
                    if (config.displayDocumentTypeDescription === true && (dt in lang.documentTypeDescriptions)) {
                        content += `
                        <div class = "title__container--1">
                            <p class = "title__description title__description--1">${lang.documentTypeDescriptions[dt]}</p>
                        </div>
                        `;
                    }
                    let actions = actsteps[j].Actions;
                    for (let z = 0; z < actions.length; z++) {
                        const Data = DocumentShortData(actions[z], shortData);
                        content += `<div class = "task__container" data-masterdocumentid = "${actions[z].MasterDocumentId}">
                            <div class = "task__titleContainer">
                                <div class = "task__title">
                                    <span class = "title__subtitle">${lang.docTitle}</span>
                                    <p class = "title__taskPropertyValue title__taskPropertyValue--2">${actions[z].MasterDocumentId}</p>
                                </div>
                                <div class = "task__image">
                                    ${(config.displayIcons === true) ? ((dt in config.iconCodes) ? config.iconCodes[dt] : '<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>') : ''}
                                </div>
                            </div>`;
                        if (new Date().getTime() >= new Date(actions[z].PlannedEndDate).getTime()) {
                            content += `<div class = "task__title">
                                <span class = "title__subtitle">${(lang.noticeCustomSubtitle) ? lang.noticeCustomSubtitle : 'Deadline'}</span>
                                <div class = "task__title  task__title--warning">
                                    <img src = "assets/img/icons/warning-signal.svg" class = "task__warningImage">
                                    <span class = "task__text--danger">${(lang.noticeExpiredCustomText !== '') ? `${lang.noticeExpiredCustomText}` : 'Deadline was missed'}</span>
                                </div>
                            </div>`;
                        }
                        else if ((new Date(actions[z].PlannedEndDate).getTime() - new Date().getTime()) <= (86400000 * config.daysUntilWarningDisplays)) {
                            content += `<div class = "task__title">
                                <span class = "title__subtitle">${(lang.noticeCustomSubtitle !== '') ? lang.noticeCustomSubtitle : 'Deadline'}</span>
                                <div class = "task__title  task__title--warning">
                                    <img src = "assets/img/icons/warningsign.svg" class = "task__warningImage">
                                    <span class = "task__text--warning">${((lang.noticeExpiredCustomText !== '') ? lang.noticeTimeLeftWarningCustomText : 'Notice: Remaining') + ' ' + timeRemaining(actions[z].PlannedEndDate)}</span>
                                </div>
                            </div>`;
                        }
                        else {
                            content += `<div class = "task__title">
                                <span class = "title__subtitle">${(lang.noticeCustomSubtitle) ? lang.noticeCustomSubtitle : 'Deadline'}</span>
                                <div class = "task__title  task__title--warning">
                                    <img src = "assets/img/icons/checksign.svg" class = "task__warningImage">
                                    <span class = "task__text--accept">${((lang.noticeTimeLeftCustomText !== '') ? lang.noticeTimeLeftCustomText : 'Remaining') + ' ' + timeRemaining(actions[z].PlannedEndDate)}</span>
                                </div>
                            </div>`;
                        }
                        content += `<div class = "task__grid task__grid--1">
                                ${Data[0]}
                            </div>
                            <div class = "task__grid task__grid--1">
                                <div class = "task__subgrid actions">
                                    <span class = "title__subtitle">${(lang.buttonCustomSubtitle['Confirm'] !== '') ? lang.buttonCustomSubtitle['Confirm'] : 'Approve'}</span>
                                    <button class = "button__action button__action--green" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Confirm'] !== '') ? `style="background-color:${config.buttonCustomColor['Confirm']}"` : ''} data-action = "confirm" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Confirm'] !== '') ? lang.buttonCustomLabel['Confirm'] : 'Confirm'}</button>
                                </div>
                                <div class = "task__subgrid actions">
                                    <span class = "title__subtitle">${(lang.buttonCustomSubtitle['Reject'] !== '') ? lang.buttonCustomSubtitle['Reject'] : 'Reject'}</span>
                                    <button class = "button__action button__action--red" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Reject'] !== '') ? `style="background-color:${config.buttonCustomColor['Reject']}"` : ''} data-action = "reject" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Reject'] !== '') ? lang.buttonCustomLabel['Reject'] : 'Reject'}</button>
                                </div>`;
                        content += (actions[z].MasterDocument.Comments && actions[z].MasterDocument.Comments.length > 0) ? `
                                <div class = "task__subgrid task__subgrid--button">
                                    <span class = "title__subtitle">${(lang.buttonCustomSubtitle['Comments'] !== '') ? lang.buttonCustomSubtitle['Comments'] : 'View comments'}</span>
                                    <button class = "button__action button__action--blue" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Comments'] !== '') ? `style="background-color:${config.buttonCustomColor['Comments']}"` : ''} data-action = "comments" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Comments'] !== '') ? lang.buttonCustomLabel['Comments'] : 'View comments'}</button>
                                </div>` : '';
                        let documentId = actions[z].MasterDocument.Properties.find((el) => el.PropertyName === '_DocumentId').Value;
                        let pageNo = ('Pages' in actions[z].MasterDocument) ? actions[z].MasterDocument.Pages[0].PageNo : null;
                        content += (actions[z].MasterDocument.Pages && actions[z].MasterDocument.Pages.length > 0) ?
                            `<div class = "task__subgrid task__subgrid--button">
                                <span class = "title__subtitle">${(lang.buttonCustomSubtitle['View'] !== '') ? lang.buttonCustomSubtitle['View'] : 'Attachments'}</span>
                                <button class = "button__action button__action--purple" data-documentid = "${documentId}" data-pageno = "${(pageNo !== null) ? pageNo : ''}" ${(config.buttonCustomColor['View'] !== '') ? `style="background-color:${config.buttonCustomColor['View']}"` : ''} data-action = "view">${(lang.buttonCustomLabel['View'] !== '') ? lang.buttonCustomLabel['View'] : 'View item'}</button>
                            </div>` : '';
                        content += `
                            </div>
                        </div>`;
                    }
                }
                content += '</details>';
            }
            mainContainer.innerHTML = content;
            return true;
        }
        else {
            console.error(ActionsJson.ErrorMessage);
            return false;
        }
    }
    else {
        return false;
    }
}
async function Init() {
    if (await constructBody()) {
        const PopupCloseButton = document.querySelector('.popup__close');
        PopupCloseButton.addEventListener('click', () => {
            Popup();
        });
        const DataAttributes = ['confirm', 'reject', 'comments', 'view'];
        DataAttributes.forEach(element => {
            const Elements = document.querySelectorAll(`[data-action='${element}']`);
            Elements.forEach(el => {
                const Action = el.getAttribute('data-action');
                if (Action === 'confirm' || Action === 'reject' || Action === 'comments') {
                    const ActionID = el.getAttribute('data-actionid');
                    const documentType = el.getAttribute('data-dt');
                    const stepName = el.getAttribute('data-stepname');
                    el.addEventListener('click', () => {
                        Popup({ Action: Action, ActionID: parseInt(ActionID), documentType: documentType, stepName: stepName });
                    });
                }
                else {
                    const documentId = el.getAttribute('data-documentid');
                    const pageNo = el.getAttribute('');
                    el.addEventListener("click", async () => {
                        const nonEncodedExtensions = ['.xml', '.txt'];
                        const response = await requestBlob({ DocumentId: parseInt(documentId), PageNo: parseInt(pageNo) });
                        const fileExtension = response.Documents.Pages.DataType;
                        const data = (!(fileExtension in nonEncodedExtensions)) ? window.atob(response.Documents.Pages.PageData) : response.Documents.Pages.PageData;
                        showFile(data, fileExtension);
                        function showFile(blob, fileExtension) {
                            const newBlob = new Blob([blob], {
                                type: `application/${fileExtension.replace('.', '')}`
                            });
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(newBlob);
                                return;
                            }
                            const data = window.URL.createObjectURL(newBlob);
                            const link = document.createElement('a');
                            link.href = data;
                            link.download = "file.pdf";
                            link.click();
                            setTimeout(() => {
                                window.URL.revokeObjectURL(data);
                            }, 100);
                        }
                    });
                }
            });
            return true;
        });
    }
    else {
        console.error('Cannot initiate page construction.');
        return false;
    }
}
function Popup(PopupSettings = { Action: null, ActionID: null, documentType: null, stepName: null }) {
    const commentContainer = document.getElementById('comment-container');
    const lang = trans[config.language];
    const inputContainer = document.getElementsByClassName('popup__inputContainer')[0];
    const buttonContainer = document.querySelector('.popup__buttonContainer');
    darkenAndPreventScroll();
    commentContainer.innerHTML = '';
    inputContainer.innerHTML = '';
    buttonContainer.innerHTML = '';
    if (PopupSettings.Action !== null && PopupSettings.ActionID !== null && PopupSettings.documentType !== null && PopupSettings.stepName !== null) {
        const Action = PopupSettings.Action;
        const ActionID = PopupSettings.ActionID;
        const documentType = PopupSettings.documentType;
        const stepName = PopupSettings.stepName;
        const PopupTitle = document.getElementById('popup-title');
        const popupSubtitle = document.getElementById('popup-subtitle');
        if (PopupTitle) {
            PopupTitle.innerHTML = ActionID.toString();
        }
        if (popupSubtitle) {
            popupSubtitle.innerHTML = lang.docTitle;
        }
        const taskProperties = ActionsJson.InstanceActions.find((el) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el) => el.StepName == stepName).Actions
            .find((a) => a.MasterDocumentId == ActionID).MasterDocument;
        const workflowActionId = ActionsJson.InstanceActions.find((el) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el) => el.StepName == stepName).Actions
            .find((el) => el.MasterDocumentId == ActionID).WorkflowActionId;
        commentContainer.innerHTML = displayPopupComments(('Comments' in taskProperties) ? taskProperties.Comments : []);
        if (Action === 'confirm') {
            buttonContainer.innerHTML = `<button id = "confirm-button" class = "button__action button__action--green" ${(config.buttonCustomColor['Confirm'] !== '') ? `style="background-color:${config.buttonCustomColor['Confirm']}"` : ''}>${(lang.buttonCustomLabel['Confirm'] !== '') ? lang.buttonCustomLabel['Confirm'] : 'Confirm'}</button>`;
            inputContainer.innerHTML = `<span class = "title__subtitle" id = "popup-textarea-subtitle">${lang.textarea.confirmSubtitleText}</span><textarea placeholder = "${lang.textarea.confirmPlaceholderText}" class = "popup__textarea popup__textarea--green" id = "popup-textarea" value = ""></textarea>`;
            inputContainer.style.display = 'flex';
            const btn = document.getElementById('confirm-button');
            const textarea = document.getElementById('popup-textarea');
            if (btn) {
                btn.addEventListener('click', () => {
                    if (sendData({ WorkflowActionId: workflowActionId, ActionResult: 'Commit', Comment: textarea.value })) {
                        closeAndRemove(ActionID);
                    }
                });
            }
        }
        else if (Action === 'reject') {
            buttonContainer.innerHTML = `<button disabled id = "confirm-button" class = "button__action button__action--red" ${(config.buttonCustomColor['Reject'] !== '') ? `style="background-color:${config.buttonCustomColor['Reject']}"` : ''}>${(lang.buttonCustomLabel['Reject'] !== '') ? lang.buttonCustomLabel['Reject'] : 'Reject'}</button>`;
            inputContainer.innerHTML = `<span class = "title__subtitle" id = "popup-textarea-subtitle">${lang.textarea.rejectSubtitleText}</span><textarea placeholder = "${lang.textarea.rejectPlaceholderText}" class = "popup__textarea popup__textarea--red" id = "popup-textarea" value = ""></textarea>`;
            inputContainer.style.display = 'flex';
            const btn = document.getElementById('confirm-button');
            const textarea = document.getElementById('popup-textarea');
            if (textarea) {
                textarea.addEventListener('keyup', () => {
                    if (textarea.value.length > 0) {
                        btn.removeAttribute('disabled');
                        textarea.style.borderColor = 'var(--color-green-3)';
                    }
                    else {
                        btn.setAttribute('disabled', "true");
                        textarea.style.borderColor = "var(--color-red-1)";
                    }
                });
            }
            if (btn) {
                btn.addEventListener('click', () => {
                    if (sendData({ WorkflowActionId: workflowActionId, ActionResult: 'Commit', Comment: textarea.value })) {
                        closeAndRemove(ActionID);
                    }
                });
            }
        }
        else if (Action === 'comments') {
        }
    }
}
async function sendData(message) {
    if (message.Comment == '') {
        delete message.Comment;
    }
    const response = await (await fetch(config.requestPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })).json();
    return response.DBCallResult;
}
async function requestBlob(obj) {
    const response = await (await fetch(`${config.blobPath}?documentid=${obj.DocumentId}&pageno=${obj.PageNo}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
    return response;
}
function darkenAndPreventScroll() {
    const Popup = document.querySelector('.popup');
    const Main = document.getElementsByTagName('main')[0];
    const Nav = document.querySelector('.navigation');
    const HTML = document.getElementsByTagName('html')[0];
    const footer = document.getElementsByClassName('footer')[0];
    const copyright = document.getElementsByClassName('footer__copyright')[0];
    const WidescreenContainer = document.querySelector('.widescreenSmallContainer');
    WidescreenContainer.classList.contains('prevent-scroll') ? WidescreenContainer.classList.remove('prevent-scroll') : WidescreenContainer.classList.add('prevent-scroll');
    HTML.classList.contains('prevent-scroll') ? HTML.classList.remove('prevent-scroll') : HTML.classList.add('prevent-scroll');
    Nav.classList.contains('darken-blur') ? Nav.classList.remove('darken-blur') : Nav.classList.add('darken-blur');
    Main.classList.contains('darken-blur') ? Main.classList.remove('darken-blur') : Main.classList.add('darken-blur');
    footer.classList.contains('darken-blur') ? footer.classList.remove('darken-blur') : footer.classList.add('darken-blur');
    copyright.classList.contains('darken-blur') ? copyright.classList.remove('darken-blur') : copyright.classList.add('darken-blur');
    Popup.setAttribute('data-open', (Popup.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
}
function niceTime(date) {
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}
function timeRemaining(plannedEndDate) {
    const now = new Date().getTime();
    const endDate = new Date(plannedEndDate).getTime();
    if (endDate <= now) {
        return '';
    }
    let timeDifference = (endDate - now) / 1000;
    const days = Math.floor(timeDifference / 86400);
    timeDifference -= days * 86400;
    const hours = Math.floor(timeDifference / 3600) % 24;
    timeDifference -= hours * 3600;
    const minutes = Math.floor(timeDifference / 60) % 60;
    timeDifference -= minutes * 60;
    return `${(days) ? days + 'd' : ''} ${(hours) ? hours + 'd' : ''}h ${minutes}m`;
}
function closeAndRemove(actionId) {
    Popup();
    const elementToRemove = document.querySelector(`[data-masterdocumentid="${actionId}"]`);
    if (elementToRemove) {
        const parent = elementToRemove.closest('.task__details');
        if (parent) {
            let numberOfParentChildren = parent.childElementCount;
            const titleContainer = parent.querySelector('.title__container--1') || null;
            if (titleContainer !== null) {
                numberOfParentChildren -= 3;
            }
            else {
                numberOfParentChildren -= 2;
            }
            if (numberOfParentChildren <= 0) {
                parent.remove();
            }
            else {
                const countSpan = parent.querySelector('.summary__count');
                parent.setAttribute('data-action-count', numberOfParentChildren.toString());
                if (countSpan) {
                    countSpan.innerHTML = numberOfParentChildren.toString();
                }
            }
        }
        elementToRemove.remove();
    }
}
function displayPopupComments(arrayOfCommentObjects = []) {
    const lang = trans[config.language];
    let styledComments = '';
    if (arrayOfCommentObjects.length === 0) {
        return `                        
            <div class = "popup__commentMeta">
                <div class = "popup__commentMeta--col">
                <span class = "title__subtitle">
                    ${lang.comments.comment}

                </span>
                <p class = "popup__text popup__text--comment">
                    ${lang.comments.noComments}
                </p>
            </div>
        </div>`;
    }
    arrayOfCommentObjects.forEach((el) => {
        styledComments += `<div class = "popup__commentMeta">
            <div class = "popup__commentMeta--row">
                <div class = "popup__commentMeta--col">
                    <span class = "title__subtitle">
                        ${lang.comments.author}
                    </span>
                    <p class = "popup__text popup__text--author">
                        ${el.Owner}
                    </p>
                </div>
                <div class = "popup__commentMeta--col" style = "flex:1;">
                    <span class = "title__subtitle">
                        ${lang.comments.date}

                    </span>
                    <p class = "popup__text popup__text--date">
                        ${niceTime(new Date(el.CreationDate))}
                    </p>
                </div>
            </div>
            <div class = "popup__commentMeta--col">
                <span class = "title__subtitle">
                    ${lang.comments.comment}
                </span>
                <p class = "popup__text popup__text--comment">
                    ${el.Comment}
                </p>
            </div>
        </div>`;
    });
    return styledComments;
}
(function () {
    Init();
    if (config.displayFooter === true) {
        constructFooter();
    }
    if (config.displayCopyrightBar === true) {
        constructCopyright();
    }
})();
