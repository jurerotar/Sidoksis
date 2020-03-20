import TimeFormat from "./timeformat.class.js";
import Animation from "./animation.class.js";
import Attachment from "./attachments.class.js";
import Modifier from "./modifier.class.js";
import Notifications from "./notification.class.js";
export default class Popup {
    addHeader(subtitle, actionId) {
        return `<div class = "popup__header">
            <div class = "popup__close">
                <svg version="1.1" class = "popup__close--icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="414.298px" height="414.299px" viewBox="0 0 414.298 414.299" style="enable-background:new 0 0 414.298 414.299;" xml:space="preserve"><path d="M3.663,410.637c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l185.809-185.81l185.81,185.811 c2.44,2.44,5.641,3.661,8.84,3.661c3.198,0,6.397-1.221,8.839-3.661c4.881-4.881,4.881-12.796,0-17.679l-185.811-185.81 l185.811-185.81c4.881-4.882,4.881-12.796,0-17.678c-4.882-4.882-12.796-4.882-17.679,0l-185.81,185.81L21.34,3.663 c-4.882-4.882-12.796-4.882-17.678,0c-4.882,4.881-4.882,12.796,0,17.678l185.81,185.809L3.663,392.959 C-1.219,397.841-1.219,405.756,3.663,410.637z"/></svg>
            </div>
            <p class = "title__subtitle">${subtitle}</p>
            <p class = "popup__title">${actionId}</p>
        </div>`;
    }
    addComments(arrayOfCommentObjects = [], translations) {
        return `<div class = "popup__commentContainer">
            ${this.formatComments(arrayOfCommentObjects, translations)}    
        </div>`;
    }
    addTextarea(subtitleText, textareaPlaceholder, subclass) {
        return `<div class = "popup__inputContainer">
            <span class = "title__subtitle">${subtitleText}</span>
            <textarea placeholder = "${textareaPlaceholder}" class = "popup__textarea popup__textarea--${subclass}" value = ""></textarea>
            </div>`;
    }
    addSendActionButton(customLabel = '', defaultLabel, customColor = '', subclass) {
        return `<div class = "popup__buttonContainer">
            <button class = "button__action button__action--${subclass}" ${(customColor !== '') ? `style="background-color:${customColor}"` : ''}>${(customLabel !== '') ? customLabel : defaultLabel}</button>
        </div>`;
    }
    filterEmployees(employeeList, filter = '', checkedEmployees = [], target = document.querySelector('.popup__employeeContainer')) {
        let returnString = '';
        employeeList.forEach((el) => {
            let currentName = el.Properties.find((name) => (name.PropertyName === 'Name')).Value;
            const currentUsername = el.Properties.find((name) => (name.PropertyName === 'Username')).Value;
            if ((currentName.toLowerCase()).indexOf(filter) != -1) {
                currentName = this.highlightSearchQuery(currentName.toLowerCase(), filter);
                returnString += `<div class = "popup__checkboxContainer">
                    <input type = "checkbox" class = "popup__checkbox" id = "${currentUsername}" ${((checkedEmployees.indexOf(currentUsername) != -1)) ? 'checked' : 'unchecked'}>
                    <label for = "${currentUsername}" class = "popup__label"><p class = "popup__name">${currentName}</p></label>
                </div>`;
            }
        });
        returnString += '</div>';
        target.innerHTML = returnString;
        setTimeout(() => { this.checkboxHandler(checkedEmployees); }, 0);
    }
    highlightSearchQuery(word, query) {
        return (typeof (word) !== 'string') ? word : `${word.slice(0, word.indexOf(query))}<span class = "popup__highlight">${query}</span>${word.slice(word.indexOf(query) + query.length)}`;
    }
    addFilterInput(subtitle = 'Filter', placeholder = 'Name Surname') {
        return `<div class = "popup__searchContainer">
            <span class = "title__subtitle">${subtitle}</span>
            <input type = "text" id = "employeeSearch" class = "popup__input" placeholder = "${placeholder}">
        </div>`;
    }
    searchFilterHandler(employeeList, checkedEmployees) {
        const input = document.getElementById('employeeSearch');
        input.addEventListener('keyup', () => {
            this.filterEmployees(employeeList, input.value.toLowerCase(), checkedEmployees);
        }, { passive: true });
    }
    checkboxHandler(stateHandler) {
        const employeeContainer = document.querySelector('.popup__employeeContainer');
        employeeContainer.querySelectorAll('.popup__checkbox').forEach((el) => {
            el.addEventListener('change', () => {
                const id = (el.getAttribute('id'));
                if (el.checked) {
                    if (id !== null) {
                        stateHandler.push(id);
                    }
                }
                else {
                    if (id !== null) {
                        if (stateHandler.indexOf(id) != -1) {
                            stateHandler.filter((item) => item !== id);
                        }
                    }
                }
            }, { passive: true });
        });
    }
    addEmployees() {
        return '<div class = "popup__employeeContainer"></div>';
    }
    addAttachmentList() {
        return `<div class = "popup__attachmentContainer"></div>`;
    }
    clearPopup() {
        const popup = document.querySelector('.popup__rel');
        const popupChildren = Array.from(popup.children);
        popupChildren.forEach((el) => {
            el.remove();
        });
    }
    openClosePopup() {
        const popup = document.querySelector('.popup');
        popup.setAttribute('data-open', (popup.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
    }
    closeButtonHandler() {
        const animation = new Animation();
        const popupCloseButton = document.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {
            animation.darkenAndPreventScroll();
            this.openClosePopup();
            this.clearPopup();
        }, { passive: true });
    }
    getTaskProperties(actions, documentType, stepName, actionId) {
        return actions.InstanceActions.find((el) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el) => el.StepName == stepName).Actions
            .find((a) => a.MasterDocumentId == actionId).MasterDocument;
    }
    getWorkflowActionId(actions, documentType, stepName, actionId) {
        return actions.InstanceActions.find((el) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el) => el.StepName == stepName).Actions
            .find((el) => el.MasterDocumentId == actionId).WorkflowActionId;
    }
    async requestBlob(documentId, pageNo, requestPath) {
        return await (await fetch(`${requestPath}?documentid=${documentId}&pageno=${pageNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })).json();
    }
    async getAttachmentList(documentId, pageNo, requestPath, target, lang) {
        const attachment = new Attachment();
        const blob = await this.requestBlob(documentId, pageNo, requestPath);
        let output = '';
        blob.Documents.forEach((element) => {
            element.Pages.forEach((el) => {
                const blob = attachment.showFile(attachment.b64toBlob(el.PageData), el.DataType);
                output += `<div class = "task__grid task__grid--1 task__grid--popup">
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobExtension}</span>
                    <p class = "popup__title  popup__title--blob">${el.DataType.replace('.', '')}</p>
                </div>
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobSize}</span>
                    <p class = "popup__title popup__title--blob">${attachment.fileSize(blob.size)}</p>
                </div>
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobTitle}</span>
                    <p class = "popup__title  popup__title--blob">${el.Description}</p>
                </div>
                <div></div>
                <a href = "${blob.data}" target = "${target}"  class = "button__action button__action--green">${lang.blobView}</a>

            </div>`;
            });
        });
        return output;
    }
    formatComments(arrayOfCommentObjects = [], translations) {
        const time = new TimeFormat();
        const lang = translations;
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
        else {
            arrayOfCommentObjects.forEach((el) => {
                styledComments += `<div class = "popup__commentMeta">
                    <div class = "popup__commentMeta--row">
                        <div class = "popup__commentMeta--col">
                            <span class = "title__subtitle">
                                ${lang.comments.author}
                            </span>
                            <p class = "popup__text popup__text--author">
                                ${el.OwnerName}
                            </p>
                        </div>
                        <div class = "popup__commentMeta--col" style = "flex:1;">
                            <span class = "title__subtitle">
                                ${lang.comments.date}
        
                            </span>
                            <p class = "popup__text popup__text--date">
                                ${time.niceTime(new Date(el.CreationDate))}
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
    }
    textareaHandler(textarea, button) {
        if (!(textarea && button)) {
            return;
        }
        button.setAttribute('disabled', 'true');
        textarea.addEventListener('keyup', () => {
            if (textarea.value.length > 0) {
                button.removeAttribute('disabled');
                textarea.style.borderColor = 'var(--color-green-3)';
            }
            else {
                button.setAttribute('disabled', "true");
                textarea.style.borderColor = "var(--color-red-1)";
            }
        }, { passive: true });
    }
    async sendData(message, requestPath) {
        if (message.comment == '') {
            delete message.comment;
        }
        const response = await (await fetch(requestPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })).json();
        return response.DBCallResult;
    }
    async demandOpinion(employees, requestPath) {
        const response = await (await fetch(requestPath, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employees)
        })).json();
        return response.DBCallResult;
    }
    attachPopupHandlers(state) {
        const animation = new Animation();
        const modifier = new Modifier();
        const notification = new Notifications();
        const mainContainer = document.getElementById('mainContainer');
        const userSettings = mainContainer.querySelector('.navigation__userContainer');
        const lang = state.appStrings[state.configuration.language];
        userSettings.addEventListener('click', async () => {
            const popupContainer = mainContainer.querySelector('.popup__rel');
            animation.darkenAndPreventScroll();
            this.openClosePopup();
            popupContainer.insertAdjacentHTML('afterbegin', this.addHeader('User settings', state.translations.DisplayName));
            this.closeButtonHandler();
        }, { passive: true });
        const dataAttributes = ['confirm', 'reject', 'comments', 'opinion', 'view'];
        dataAttributes.forEach(element => {
            const elements = mainContainer.querySelectorAll(`[data-action='${element}']`);
            elements.forEach((el) => {
                const action = el.getAttribute('data-action') || '';
                const actionId = parseInt(el.getAttribute('data-actionid') || '0');
                const documentType = el.getAttribute('data-documenttype') || '';
                const stepName = el.getAttribute('data-stepname') || '';
                el.addEventListener('click', async () => {
                    const popupContainer = mainContainer.querySelector('.popup__rel');
                    animation.darkenAndPreventScroll();
                    this.openClosePopup();
                    const taskProperties = (['confirm', 'reject', 'comments', 'opinion'].indexOf(action) !== -1) ? this.getTaskProperties(state.actions, documentType, stepName, actionId) : [];
                    const workflowActionId = (['confirm', 'reject', 'comments', 'opinion'].indexOf(action) !== -1) ? this.getWorkflowActionId(state.actions, documentType, stepName, actionId) : 0;
                    popupContainer.insertAdjacentHTML('afterbegin', this.addHeader(lang.docTitle, actionId.toString()));
                    switch (action) {
                        case 'confirm':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments : [], lang));
                            popupContainer.insertAdjacentHTML('beforeend', this.addTextarea(lang.textarea.confirmSubtitleText, lang.textarea.confirmPlaceholderText, 'green'));
                            popupContainer.insertAdjacentHTML('beforeend', this.addSendActionButton(lang.buttonCustomLabel.Confirm, 'Confirm', state.configuration.buttonCustomColor.Confirm, 'green'));
                            popupContainer.querySelector('.button__action').addEventListener('click', async () => {
                                if (await this.sendData({ workflowActionId: workflowActionId, comment: popupContainer.querySelector('.popup__textarea').value, actionResult: action }, state.paths.commits)) {
                                    modifier.closeAndRemove(actionId);
                                    notification.createNotification(true, lang.responses.successTask);
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorTask);
                                }
                            });
                            break;
                        case 'reject':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments : [], lang));
                            popupContainer.insertAdjacentHTML('beforeend', this.addTextarea(lang.textarea.rejectSubtitleText, lang.textarea.rejectPlaceholderText, 'red'));
                            popupContainer.insertAdjacentHTML('beforeend', this.addSendActionButton(lang.buttonCustomLabel.Reject, 'Reject', state.configuration.buttonCustomColor.Reject, 'red'));
                            this.textareaHandler(popupContainer.querySelector('.popup__textarea'), popupContainer.querySelector('.button__action'));
                            popupContainer.querySelector('.button__action').addEventListener('click', async () => {
                                if (await this.sendData({ workflowActionId: workflowActionId, comment: popupContainer.querySelector('.popup__textarea').value, actionResult: action }, state.paths.commits)) {
                                    modifier.closeAndRemove(actionId);
                                    notification.createNotification(true, lang.responses.successTask);
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorTask);
                                }
                            });
                            break;
                        case 'comments':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments : [], lang));
                            break;
                        case 'opinion':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments : [], lang));
                            popupContainer.insertAdjacentHTML('beforeend', this.addFilterInput());
                            popupContainer.insertAdjacentHTML('beforeend', this.addEmployees());
                            this.filterEmployees(state.employees.Documents, '', state.checkedEmployees);
                            this.searchFilterHandler(state.employees.Documents, state.checkedEmployees);
                            this.checkboxHandler(state.checkedEmployees);
                            popupContainer.insertAdjacentHTML('beforeend', this.addSendActionButton(lang.buttonCustomLabel.Opinion, 'Opinion', state.configuration.buttonCustomColor.Opinion, 'darkBlue'));
                            popupContainer.querySelector('.button__action').addEventListener('click', async () => {
                                if (await this.demandOpinion(state.checkedEmployees, state.paths.opinion)) {
                                    animation.darkenAndPreventScroll();
                                    this.openClosePopup();
                                    this.clearPopup();
                                    notification.createNotification(true, lang.responses.successOpinion);
                                    state.checkedEmployees = state.configuration.defaultCheckedEmployees;
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorOpinion);
                                }
                            });
                            break;
                        case 'view':
                            const documentId = parseInt(el.getAttribute('data-documentid') || '');
                            const pageNo = parseInt(el.getAttribute('data-pageno') || '');
                            popupContainer.insertAdjacentHTML('beforeend', this.addAttachmentList());
                            const attachmentList = popupContainer.querySelector('.popup__attachmentContainer');
                            attachmentList.insertAdjacentHTML('afterbegin', await this.getAttachmentList(documentId, pageNo, state.paths.attachments, state.configuration.linksTarget, lang));
                            break;
                    }
                    this.closeButtonHandler();
                }, { passive: true });
            });
        });
        return true;
    }
}
