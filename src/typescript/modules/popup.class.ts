import TimeFormat from "./timeformat.class.js";
import Animation from "./animation.class.js";
import Attachment from "./attachments.class.js";
import { State } from "./data.class.js";
import Modifier from "./modifier.class.js";
import Notifications from "./notification.class.js";

interface SendData {
    workflowActionId: number,
    comment: string,
    actionResult: string
}

interface Blob {
    Documents?: [Documents]
}
interface Documents {
    Pages: [Pages];
}
interface Pages {
    PageText: string;
    PageNo: number,
    Description: string,
    DataType: string,
    PageData: string,
    LastChanged: string
}

interface TaskProperties {
    Comments?: [object]
}

export default class Popup {

    addHeader(subtitle:string, actionId:string):string {
        return `<div class = "popup__header">
            <div class = "popup__close">
                <svg version="1.1" class = "popup__close--icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="414.298px" height="414.299px" viewBox="0 0 414.298 414.299" style="enable-background:new 0 0 414.298 414.299;" xml:space="preserve"><path d="M3.663,410.637c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l185.809-185.81l185.81,185.811 c2.44,2.44,5.641,3.661,8.84,3.661c3.198,0,6.397-1.221,8.839-3.661c4.881-4.881,4.881-12.796,0-17.679l-185.811-185.81 l185.811-185.81c4.881-4.882,4.881-12.796,0-17.678c-4.882-4.882-12.796-4.882-17.679,0l-185.81,185.81L21.34,3.663 c-4.882-4.882-12.796-4.882-17.678,0c-4.882,4.881-4.882,12.796,0,17.678l185.81,185.809L3.663,392.959 C-1.219,397.841-1.219,405.756,3.663,410.637z"/></svg>
            </div>
            <p class = "title__subtitle">${subtitle}</p>
            <p class = "popup__title">${actionId}</p>
        </div>`;
    }

    addComments(arrayOfCommentObjects:object[] = [], translations:string):string {
        return `<div class = "popup__commentContainer">
            ${this.formatComments(arrayOfCommentObjects, translations)}    
        </div>`
    }

    addTextarea(subtitleText:string, textareaPlaceholder:string, subclass:string):string {
        return `<div class = "popup__inputContainer">
            <span class = "title__subtitle">${subtitleText}</span>
            <textarea placeholder = "${textareaPlaceholder}" class = "popup__textarea popup__textarea--${subclass}" value = ""></textarea>
            </div>`;
    }

    addSendActionButton(customLabel:string = '', defaultLabel:string, customColor:string = '', subclass:string):string {
        return `<div class = "popup__buttonContainer">
            <button class = "button__action button__action--${subclass}" ${(customColor !== '') ? `style="background-color:${customColor}"` : ''}>${(customLabel !== '') ? customLabel : defaultLabel }</button>
        </div>`;
    }

    filterEmployees(employeeList:any, filter:string = '', checkedEmployees:string[] = [], target:HTMLDivElement|any = document.querySelector('.popup__employeeContainer')) {
        let returnString:string = '';
        employeeList.forEach((el:{Properties:any}) => {
            let currentName:string = el.Properties.find((name: {PropertyName:string}) => (name.PropertyName === 'Name')).Value;
            const currentUsername:string = el.Properties.find((name: {PropertyName:string}) => (name.PropertyName === 'Username')).Value;
            if((currentName.toLowerCase()).indexOf(filter) != -1) {
                currentName = this.highlightSearchQuery(currentName.toLowerCase(), filter)
                returnString += `<div class = "popup__checkboxContainer">
                    <input type = "checkbox" class = "popup__checkbox" id = "${currentUsername}" ${((checkedEmployees.indexOf(currentUsername) != -1)) ? 'checked' : 'unchecked'}>
                    <label for = "${currentUsername}" class = "popup__label"><p class = "popup__name">${currentName}</p></label>
                </div>`;
            }
        });
        returnString += '</div>';
        target.innerHTML = returnString;
        setTimeout(()=>{this.checkboxHandler(checkedEmployees)}, 0);
    }

    /**
     * Returns word with query sorounded with '<span>' tags
     * @param word word we're searching for the query in
     * @param query query we're searching for
     */
    highlightSearchQuery(word:string, query:string) {
        return (typeof(word) !== 'string') ? word : `${word.slice(0, word.indexOf(query))}<span class = "popup__highlight">${query}</span>${word.slice(word.indexOf(query) + query.length)}`;
    }

    addFilterInput(subtitle:string = 'Filter', placeholder:string = 'Name Surname'):string {
        return `<div class = "popup__searchContainer">
            <span class = "title__subtitle">${subtitle}</span>
            <input type = "text" id = "employeeSearch" class = "popup__input" placeholder = "${placeholder}">
        </div>`;
    }
    searchFilterHandler(employeeList:any, checkedEmployees:any):void {
        const input = (<HTMLInputElement>document.getElementById('employeeSearch'));
        input.addEventListener('keyup', () => {
            this.filterEmployees(employeeList, input.value.toLowerCase(), checkedEmployees);
        }, {passive:true})
    }

    checkboxHandler(stateHandler:any) {
        const employeeContainer = (<HTMLDivElement>document.querySelector('.popup__employeeContainer'));
        employeeContainer.querySelectorAll('.popup__checkbox').forEach((el:any) => {
            el.addEventListener('change', () => {
                const id = (el.getAttribute('id'));
                if(el.checked) {
                    if(id !== null) {
                        stateHandler.push(id);
                    }
                }
                else {
                    if(id !== null) {
                        if(stateHandler.indexOf(id) != -1) {
                            stateHandler.filter((item:string) => item !== id);
                        }
                    }
                }   
            }, {passive:true}
        )})
    }

    addEmployees():string {
        return '<div class = "popup__employeeContainer"></div>';
    }

    addAttachmentList():string {
        return `<div class = "popup__attachmentContainer"></div>`;
    }

    clearPopup():void {
        const popup = <HTMLDivElement>document.querySelector('.popup__rel');
        const popupChildren = Array.from(popup.children);
        popupChildren.forEach((el) => {
            el.remove();
        })
    }

    openClosePopup():void {
        const popup = <HTMLDivElement>document.querySelector('.popup');
        popup.setAttribute('data-open', (popup.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
    }

    closeButtonHandler():void {
        const animation = new Animation();
        const popupCloseButton= <HTMLButtonElement>document.querySelector('.popup__close');
        popupCloseButton.addEventListener('click', () => {
            animation.darkenAndPreventScroll();
            this.openClosePopup();
            this.clearPopup();
        }, {passive:true});
    }

    getTaskProperties(actions:any, documentType:string, stepName:string, actionId:number):object {
        return actions.InstanceActions.find(
            (el: {DocumentType:string, DocumentTypeName:string}) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el: {StepName:string}) => el.StepName == stepName).Actions
            .find((a: {MasterDocumentId:number}) => a.MasterDocumentId == actionId).MasterDocument;
    }

    getWorkflowActionId(actions:any, documentType:string, stepName:string, actionId:number):number {
        return actions.InstanceActions.find((el: {DocumentType:string, DocumentTypeName:string}) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
        .find((el: {StepName:string}) => el.StepName == stepName).Actions
        .find((el: {MasterDocumentId:number}) => el.MasterDocumentId == actionId).WorkflowActionId;
    }

    async requestBlob(documentId:number, pageNo: number, requestPath:string):Promise<object> {
        return await(await fetch(`${requestPath}?documentid=${documentId}&pageno=${pageNo}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })).json();
    }

    async getAttachmentList(documentId:number, pageNo: number, requestPath:string, target:string, lang:any):Promise<string> {
        const attachment = new Attachment();
        const blob:Blob = await this.requestBlob(documentId, pageNo, requestPath);
        let output:string = '';
        blob.Documents!.forEach((element:Documents) => {
            element.Pages!.forEach((el:Pages) => {
                const blob = attachment.showFile((el.hasOwnProperty('PageData')) ? attachment.b64toBlob(el.PageData) : el.PageText, el.DataType);
                output += `<div class = "task__grid task__grid--1 task__grid--popup">
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobExtension}</span>
                    <p class = "popup__title  popup__title--blob">${el.DataType.replace('.', '')}</p>
                </div>
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobSize}</span>
                    <p class = "popup__title popup__title--blob">${attachment.fileSize(blob!.size)}</p>
                </div>
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${lang.blobTitle}</span>
                    <p class = "popup__title  popup__title--blob">${el.Description}</p>
                </div>
                <div></div>
                <a href = "${blob!.data}" target = "${target}"  class = "button__action button__action--green">${lang.blobView}</a>

            </div>`
            })
        });
        return output;
    }

    /**
     * returns formated comments in popup
     * @param arrayOfCommentObjects array of objects containing comment meta and text
     */
    formatComments(arrayOfCommentObjects:object[] = [], translations:any):string {
        const time = new TimeFormat();
        const lang = translations;
        let styledComments:string = '';
    
        /**
         * If there are no comments, return 'no comment' template
         */
        if(arrayOfCommentObjects.length === 0) {
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
            /**
             * For each comment, format it and add to output string
             */
            arrayOfCommentObjects.forEach((el:any) => {
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
                })
            return styledComments;
        }
    }

    textareaHandler(textarea:HTMLTextAreaElement|null, button:HTMLButtonElement|null):void {
        if(!(textarea && button)) {
            return;
        }
        button.setAttribute('disabled', 'true');
        textarea.addEventListener('keyup', () => {
            if(textarea.value.length > 0) {
                button.removeAttribute('disabled');
                textarea.style.borderColor = 'var(--color-green-3)';
            }
            else {
                button.setAttribute('disabled', "true");
                textarea.style.borderColor = "var(--color-red-1)";
            }
        }, {passive:true})    
    }
    /**
     * Sends a post request to link specified in config file, returns true if successful and false if not
     * @param message json object we'll send
     */
    async sendData(message: SendData, requestPath:string):Promise<boolean> {
        /**
         * If no comment has been added, remove the property
         */
        if(message.comment == '') {
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
        /**
         * Returns either true/false
         */
        return response.DBCallResult;
    }

    async demandOpinion(employees:string[], requestPath:string):Promise<boolean> {
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
    attachPopupHandlers(state:State):boolean {
        const animation:Animation = new Animation();
        const modifier:Modifier = new Modifier();
        const notification:Notifications = new Notifications();
        const mainContainer = <HTMLDivElement>document.getElementById('mainContainer');
        const userSettings =  (<HTMLDivElement>mainContainer.querySelector('.navigation__userContainer'));
        const lang = state.appStrings[state.configuration.language];
        userSettings.addEventListener('click', async () => {
            const popupContainer = (<HTMLDivElement>mainContainer.querySelector('.popup__rel'));
            animation.darkenAndPreventScroll();
            this.openClosePopup();
            popupContainer.insertAdjacentHTML('afterbegin', this.addHeader('User settings', state.translations.DisplayName));
            this.closeButtonHandler();
        }, {passive:true})
        const dataAttributes = ['confirm', 'reject', 'comments', 'opinion', 'view'];
        dataAttributes.forEach(element => {
            const elements = mainContainer.querySelectorAll(`[data-action='${element}']`);
            elements.forEach((el:Element) => {
                //const attachment = new Attachments();
                const action:string = el.getAttribute('data-action') || '';
                const actionId:number = parseInt(el.getAttribute('data-actionid') || '0');
                const documentType:string = el.getAttribute('data-documenttype')  || '';
                const stepName:string = el.getAttribute('data-stepname')  || '';
                el.addEventListener('click', async () => {
                    const popupContainer = (<HTMLDivElement>mainContainer.querySelector('.popup__rel'));
                    animation.darkenAndPreventScroll();
                    this.openClosePopup();
                    const taskProperties:TaskProperties = (['confirm', 'reject', 'comments', 'opinion'].indexOf(action) !== -1) ? this.getTaskProperties(state.actions, documentType, stepName, actionId) : [];
                    const workflowActionId:number = (['confirm', 'reject', 'comments', 'opinion'].indexOf(action) !== -1) ? this.getWorkflowActionId(state.actions, documentType, stepName, actionId) : 0;
                    popupContainer.insertAdjacentHTML('afterbegin', this.addHeader(lang.docTitle, actionId.toString()));
                    switch(action) {
                        case 'confirm':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments: [], lang));
                            popupContainer.insertAdjacentHTML('beforeend', this.addTextarea(lang.textarea.confirmSubtitleText, lang.textarea.confirmPlaceholderText, 'green'));
                            popupContainer.insertAdjacentHTML('beforeend', this.addSendActionButton(lang.buttonCustomLabel.Confirm, 'Confirm', state.configuration.buttonCustomColor.Confirm, 'green'));
                            (<HTMLButtonElement>popupContainer.querySelector('.button__action')).addEventListener('click', async ():Promise<void> => {
                                if(await this.sendData({workflowActionId: workflowActionId, comment: (<HTMLTextAreaElement>popupContainer.querySelector('.popup__textarea')).value, actionResult: action}, state.paths.commits)) {
                                    modifier.closeAndRemove(actionId);
                                    notification.createNotification(true, lang.responses.successTask);
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorTask);
                                }
                            })
                            break;
                        case 'reject':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments: [], lang));
                            popupContainer.insertAdjacentHTML('beforeend',this.addTextarea(lang.textarea.rejectSubtitleText, lang.textarea.rejectPlaceholderText, 'red'));
                            popupContainer.insertAdjacentHTML('beforeend',this.addSendActionButton(lang.buttonCustomLabel.Reject, 'Reject', state.configuration.buttonCustomColor.Reject, 'red'));
                            this.textareaHandler(popupContainer.querySelector('.popup__textarea'), popupContainer.querySelector('.button__action'));
                            (<HTMLButtonElement>popupContainer.querySelector('.button__action')).addEventListener('click', async ():Promise<void> => {
                                if(await this.sendData({workflowActionId: workflowActionId, comment: (<HTMLTextAreaElement>popupContainer.querySelector('.popup__textarea')).value, actionResult: action}, state.paths.commits)) {
                                    modifier.closeAndRemove(actionId);
                                    notification.createNotification(true, lang.responses.successTask);
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorTask);
                                }
                            })
                            break;
                        case 'comments':
                            popupContainer.insertAdjacentHTML('beforeend', this.addComments(('Comments' in taskProperties) ? taskProperties.Comments: [], lang));
                            break;
                        case 'opinion':
                            popupContainer.insertAdjacentHTML('beforeend',this.addComments(('Comments' in taskProperties) ? taskProperties.Comments: [], lang));
                            popupContainer.insertAdjacentHTML('beforeend', this.addFilterInput());
                            popupContainer.insertAdjacentHTML('beforeend',this.addEmployees());
                            this.filterEmployees(state.employees.Documents, '', state.checkedEmployees);
                            this.searchFilterHandler(state.employees.Documents, state.checkedEmployees);
                            this.checkboxHandler(state.checkedEmployees)
                            popupContainer.insertAdjacentHTML('beforeend',this.addSendActionButton(lang.buttonCustomLabel.Opinion, 'Opinion', state.configuration.buttonCustomColor.Opinion, 'darkBlue'));
                            (<HTMLButtonElement>popupContainer.querySelector('.button__action')).addEventListener('click', async ():Promise<void> => {
                                if(await this.demandOpinion(state.checkedEmployees, state.paths.opinion)) {
                                    animation.darkenAndPreventScroll();
                                    this.openClosePopup();
                                    this.clearPopup();
                                    notification.createNotification(true, lang.responses.successOpinion);
                                    state.checkedEmployees = state.configuration.defaultCheckedEmployees;
                                }
                                else {
                                    notification.createNotification(false, lang.responses.errorOpinion);
                                }
                            })
                            break;
                        case 'view':
                            const documentId:number = parseInt(el.getAttribute('data-documentid')  || '');
                            const pageNo:number = parseInt(el.getAttribute('data-pageno')  || '');
                            popupContainer.insertAdjacentHTML('beforeend', this.addAttachmentList());
                            const attachmentList = (<HTMLDivElement>popupContainer.querySelector('.popup__attachmentContainer'));
                            attachmentList.insertAdjacentHTML('afterbegin', await this.getAttachmentList(documentId, pageNo, state.paths.attachments, state.configuration.linksTarget, lang));
                            break;
                    }
                    this.closeButtonHandler();
                }, {passive:true})
            })
        });
        return true;
    }
}