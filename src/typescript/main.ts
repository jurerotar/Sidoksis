/**
 * Import user configuration from config.js file
 */
import configuration from "./config.js";

/**
 * Save configuration to global config variable
 */
const config:any = configuration();

/**
 * Import additional translations
 */
import translations from "./translations.js";

/**
 * Save additional translations to global trans variable
 */
const trans:any = translations();


interface Translations {
    DisplayName: string
}
/**
 *  Fetch translations and save them to the 'Translations' variable
 */
let Translations:Translations;

/**
 * Fetches translations file
 */
async function FetchTranslations() {
    try {
        const MobileStartupJson = await (await fetch(config.translationJsonPath)).json();
        Translations = MobileStartupJson;
    }
    catch(e) {
        console.error(e);
        return Promise.resolve();
    }
};

interface Actions {
    DBCallResult: boolean,
    InstanceActions: any,
    ErrorMessage: string
}
/**
 * Fetch actions and save them to the 'Actions' variable
 */
let ActionsJson:Actions;

/**
 * Fetches actions file
 */
async function FetchActions():Promise<object|any> {
    try {
        const Actions = await (await fetch(config.actionJsonPath)).json();
        ActionsJson = Actions;
    }
    catch(e) {
        console.error(e);
        return Promise.resolve();
    }
};

/**
 * Adds content to footer
 */
function constructFooter():void {
    const footer = document.getElementsByClassName('footer')[0];
    const language = config.language;
    trans[language].footer.forEach((element:any) => {
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

/**
 * Adds content to copyright bar
 */
function constructCopyright():void {
    const copyright = document.getElementsByClassName('footer__copyright')[0];
    const language = config.language;
    copyright.innerHTML = `
    <p class = "title__copyright">
        ${trans[language].copyright}
    </p>`;
}
/**
 * 
 * @param UserInfoObject object with personalization info.
 * Note: image is determined from the username, it must follow name.surname.extension pattern
 */
function PersonalizeNavigationBar():void {
    /**
     * Containers we'll be populating
     */
    const UsernameContainer = document.querySelector('.title__username');
    const UserTitleContainer = document.querySelector('.title__userTitle');
    const ImageContainer = document.querySelector('.navigation__imageContainer');
    const CompanyImageContainer = document.querySelector('.navigation__sectionContainer');

    /**
     * Possible image extensions, add additional if required
     */
    const ImageExtensions = ['.jpg', '.png', '.jpeg', '.gif'];
    /**
     * 'Rotar Jure' -> rotar.jure
     */
    const ImagePathName = Translations.DisplayName.replace(' ', '.').toLowerCase();

    /**
     * Change the title to company name if one has been set, default to Sidoksis
     */
    document.title = (config.companyName !== '') ? config.companyName : 'Sidoksis';
    
    /**
     * String we'll be outputting
     */
    let CompanyImageContainerOutput:string = '';

    /**
     * Check if container has been created
     */
    if(CompanyImageContainer) {

        /**
         * Check if user wants to display company logo
         */
        if(config.displayCompanyLogo === true) {
            /**
             * Check if company image name has been set, else return sidoksis logo
             */
            CompanyImageContainerOutput += (config.companyLogoPath !== '') ? `<img src = "assets/img/logo/${config.companyLogoPath}" class = "image__companyPhoto" alt = "${(config.companyName !== '') ? config.companyName : 'Company logo'}">` : `<img src = "assets/img/logo/sidoksisLogo.png" class = "image__companyPhoto" alt = "Sidoksis d.o.o.">`;
        }

        /**
         * Check if user wants to display company name
         */
        if(config.displayCompanyName === true) {
            CompanyImageContainerOutput += (config.companyName !== '') ? `<p class = "title__companyTitle">${config.companyName}</p>` : `<p class = "title__companyTitle">Sidoksis</p>`;
        }
    }

    /**
     * Output in to image container
     */
    if(CompanyImageContainer) {
        CompanyImageContainer.innerHTML = CompanyImageContainerOutput;
    }
    /**
     * Check if username container was created
     */
    if(UsernameContainer) {
        /**
         * Check if current user has been set, else return default
         */
        if(config.displayUsername === true) {
            UsernameContainer.innerHTML = Translations.DisplayName;
        }
    }
    /**
     * Check if user title container has been created
     */
    if(UserTitleContainer) {
        /**
         * Check if current user title has been set, else return default
         */
        if(config.displayUserTitle === true) {
            UserTitleContainer.innerHTML = (Translations.DisplayName in config.customUserTitles) ? config.customUserTitles[Translations.DisplayName] : 'User';
        }
    }
    /**
     * Check if image container has been created
     */
    if(ImageContainer) {
        if(config.displayUserImage === true) {
            let ImageFound = false;
            /**
             * Check if photo exists for any of the extensions
             * Warning: returns console errors if not found
             */
            for(let i:number = 0; i < ImageExtensions.length; i++) {
                if(async () => {return await DetermineIfImageExists(`assets/img/users/${ImagePathName + ImageExtensions[i]}`)}) {
                    ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/${ImagePathName + ImageExtensions[i]}" alt = "${Translations.DisplayName}">`;
                    ImageFound = true;
                    break;
                }
            }
            /**
             * If image has not been found, insert default image instead
             */
            if(!ImageFound) {
                ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/default.user.png" alt = "Default user photo">`;
            }
        }
    }
}

/**
 * Determines if image file exists by sending HEAD requests and returns true if yes
 * @param url path to the image
 */
async function DetermineIfImageExists(url:string):Promise<boolean> {
    return ((await fetch(url, { method: 'HEAD' })).status === 200) ? true : false;
}

/**
 * 
 * @param currentAction - Trenutna naloga, za katero se dela pregled podatkov
 * @param translations - Spisek lastnosti za prikaz
 */
function DocumentShortData(currentAction:any, shorData:any ):any {

    /**
     * If task was missed, return a notice
     */
    let returnString:string = '';

    let DocumentProperties:any = {};

    /**
     * Path to properties
     */
    const properties = currentAction.MasterDocument.Properties;

    /**
     *  Za vsako lastnost iz spiska shorData prikaži vrednost podatka
     */
    for (let i:number = 0; i < shorData.length; i++) {

        /**
         * Find first property that fits
         */
        const prop:any = properties.find((x: {PropertyName:string }) => x.PropertyName === shorData[i].PropertyName);

        /**
         * Check if property exists
         */
        if (typeof prop !== 'undefined') {
            let Caption:string = shorData[i].Caption;
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

async function constructBody():Promise<boolean> {
    /**
     * Get my actions which are available in 'Actions' variable
     */
    await FetchActions();

    /**
     * Get translations which are available in 'Translations' variable
     */
    await FetchTranslations();

    /**
     * End the function if Actions or Translations aren't objects
     */
    if(typeof(ActionsJson) !== 'object' || typeof(Translations) !== 'object') {
        console.error(`Actions or Translations are not of the right type. Actions is type of ${typeof(ActionsJson)} and Translations is type of ${typeof(Translations)}.`);
        return false;
    }

    /**
     * Fill the personalized data if displayNavigationBar has been set to true in config file
     */
    if(config.displayNavigationBar === true) {
        PersonalizeNavigationBar();
    }

    /**
     * If response, translations and comments are not falsy, execute parsing
     */
    if(ActionsJson && Translations) {

        /**
         * Remove loading animation
         */
        const Loader = <HTMLDivElement>document.querySelector('.loader');
        Loader.setAttribute('loading-finished', 'true');
        /**
         * Check if database call is true
         */
        if(ActionsJson.DBCallResult === true) {

            /**
             * Container we'll be writing in
             */
            const mainContainer = <HTMLElement>document.querySelector('.main');

            /**
             * string variabla, v katero se kreira html tekst za prikaz
             */
            let content:string = '';

            /**
             *  Shrani spisek nalog v globalno variablo, da so doegljive drugod iz kode
             */
            const DocTypes = ActionsJson.InstanceActions;

            /**
             * Current document type
             */
            let currentDocumentType:string = '';

            const lang = trans[config.language];


            /**
             *  Obdelaj vsak tip dokumenta
             */
            for (let i:number = 0; i < DocTypes.length; i++) {

                const DetailsClass:string = (DocTypes.length - 1 === i) ? 'task__details task__details--noMarginBottom' : 'task__details';
                let actionCount:number = 0;
                DocTypes[i].Steps.forEach((element:{Actions:object[]}) => {
                    actionCount += element.Actions.length
                });
                /**
                 *  Prikaži ime tipa dokumenta na ekran
                 */
                let dt = (DocTypes[i].DocumentTypeName ?  DocTypes[i].DocumentTypeName:  DocTypes[i].DocumentType);
                /**
                 * If document type has changed, begin new details element
                 */
                if(dt !== currentDocumentType) {
                    /**
                     * Update current document type
                     */
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
                /**
                 *  Shrani spisek lastnosti za prikaz podatkov na posamezni nalogi
                 */
                let shortData:object = DocTypes[i].PropertiesToShow;
        
                /**
                 * Če ni definiranih podatkov za prikaz, naredi default
                 */
                if (typeof shortData === "undefined") {
                    shortData = [
                        {
                            PropertyName:"_Name", 
                            Caption : "Ime"
                        },
                        {
                            PropertyName:"StatusDoc", 
                            Caption : "Status"
                        },
                        { 
                            PropertyName:"_DocumentOwnerName", 
                            Caption : "Skrbnik"
                        },
                        { 
                            PropertyName:"_DocumentId", 
                            Caption : "ID dokumenta"
                        }
                        ,
                        { 
                            PropertyName:"_CustomerName", 
                            Caption : "Kupec"
                        },
                    ]
                }

                /**
                 * Vsak tip dokumenta vsebuje korake z nalogami
                 */
                let actsteps = DocTypes[i].Steps;

                /**
                 * Obdelaj za vsak korak znotraj tipa dokumenta
                 * koraki so v accordionu, ki je po defaultu zaprt, tako da se vidi le tip dokumenta
                 */
                for (let j:number = 0; j < actsteps.length; j++ ) {

                    /**
                     *  Piši ime koraka na ekran 
                     */
                    //let desc = actsteps[j].StepName;
                    if(config.displayDocumentTypeDescription === true && (dt in lang.documentTypeDescriptions)) {
                        content += `
                        <div class = "title__container--1">
                            <p class = "title__description title__description--1">${lang.documentTypeDescriptions[dt]}</p>
                        </div>
                        `;
                    }

                    /**
                     * Vsak korak vsebuje naloge
                     */
                    let actions = actsteps[j].Actions;

                    /**
                     * Obdelaj vsako nalogo znotraj koraka
                     */
                    for (let z:number = 0; z < actions.length; z++) {
                        /**
                         * Save properties to Data variable
                         */
                        const Data = DocumentShortData(actions[z], shortData);

                        /**
                         *   Piši podatke o nalogi in prikaži gumbe za ukaze
                         */
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
                        /**
                         * If task end date has already passed, return red warning sign
                         */
                        if(new Date().getTime() >= new Date(actions[z].PlannedEndDate).getTime()) {
                            content += `<div class = "task__title">
                                <span class = "title__subtitle">${(lang.noticeCustomSubtitle) ? lang.noticeCustomSubtitle : 'Deadline'}</span>
                                <div class = "task__title  task__title--warning">
                                    <img src = "assets/img/icons/warning-signal.svg" class = "task__warningImage">
                                    <span class = "task__text--danger">${(lang.noticeExpiredCustomText !== '') ? `${lang.noticeExpiredCustomText}` : 'Deadline was missed'}</span>
                                </div>
                            </div>`;
                        }
                        /**
                         * If the number of days until task end is less than number of days set in daysUntilWarningDisplays config variable, display yellow warning
                         */
                        else if((new Date(actions[z].PlannedEndDate).getTime() - new Date().getTime()) <= (86400000 * config.daysUntilWarningDisplays)) {
                            content += `<div class = "task__title">
                                <span class = "title__subtitle">${(lang.noticeCustomSubtitle !== '') ? lang.noticeCustomSubtitle : 'Deadline'}</span>
                                <div class = "task__title  task__title--warning">
                                    <img src = "assets/img/icons/warningsign.svg" class = "task__warningImage">
                                    <span class = "task__text--warning">${((lang.noticeExpiredCustomText !== '') ? lang.noticeTimeLeftWarningCustomText : 'Notice: Remaining') + ' ' + timeRemaining(actions[z].PlannedEndDate)}</span>
                                </div>
                            </div>`;
                        }
                        /**
                         * If task hasn't passed and it still has enough time, display green sign
                         */
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
                                    <button class = "button__action button__action--green" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Confirm'] !== '') ? `style="background-color:${config.buttonCustomColor['Confirm']}"` : ''} data-action = "confirm" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Confirm'] !== '') ? lang.buttonCustomLabel['Confirm'] : 'Confirm' }</button>
                                </div>
                                <div class = "task__subgrid actions">
                                    <span class = "title__subtitle">${(lang.buttonCustomSubtitle['Reject'] !== '') ? lang.buttonCustomSubtitle['Reject'] : 'Reject'}</span>
                                    <button class = "button__action button__action--red" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Reject'] !== '') ? `style="background-color:${config.buttonCustomColor['Reject']}"` : ''} data-action = "reject" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Reject'] !== '') ? lang.buttonCustomLabel['Reject'] : 'Reject' }</button>
                                </div>`;
                        /**
                         * View comments button displays only if any comments exist
                         */
                        content += (actions[z].MasterDocument.Comments && actions[z].MasterDocument.Comments.length > 0) ? `
                                <div class = "task__subgrid task__subgrid--button">
                                    <span class = "title__subtitle">${(lang.buttonCustomSubtitle['Comments'] !== '') ? lang.buttonCustomSubtitle['Comments'] : 'View comments'}</span>
                                    <button class = "button__action button__action--blue" data-stepname = "${actsteps[j].StepName}" data-dt = "${dt}" ${(config.buttonCustomColor['Comments'] !== '') ? `style="background-color:${config.buttonCustomColor['Comments']}"` : ''} data-action = "comments" data-actionID = "${actions[z].MasterDocumentId}">${(lang.buttonCustomLabel['Comments'] !== '') ? lang.buttonCustomLabel['Comments'] : 'View comments' }</button>
                                </div>` : '';
                        /**
                         * We add diffent data to this button, we need a document id and pageNo
                         */
                        let documentId:number = actions[z].MasterDocument.Properties.find((el:{PropertyName: string, Value:number}) => el.PropertyName === '_DocumentId').Value;
                        /**
                         * Page number is null if its not defined
                         */
                        let pageNo:number|null = ('Pages' in actions[z].MasterDocument) ? actions[z].MasterDocument.Pages[0].PageNo : null;
                        /**
                         * Add view document button if any document exists
                         */
                        content += (actions[z].MasterDocument.Pages && actions[z].MasterDocument.Pages.length > 0) ? 
                            `<div class = "task__subgrid task__subgrid--button">
                                <span class = "title__subtitle">${(lang.buttonCustomSubtitle['View'] !== '') ? lang.buttonCustomSubtitle['View'] : 'Attachments'}</span>
                                <button class = "button__action button__action--purple" data-documentid = "${documentId}" data-pageno = "${(pageNo !== null) ? pageNo : ''}" ${(config.buttonCustomColor['View'] !== '') ? `style="background-color:${config.buttonCustomColor['View']}"` : ''} data-action = "view">${(lang.buttonCustomLabel['View'] !== '') ? lang.buttonCustomLabel['View'] : 'View item' }</button>
                            </div>` : '';
                        content+= `
                            </div>
                        </div>`;
                    }
                }
                /**
                 * End the details element
                 */
                content += '</details>';
            }
            mainContainer.innerHTML = content;
            return true;
        }
        /**
         * Raise an error
         */
        else {
            console.error(ActionsJson.ErrorMessage);
            return false;
        }
    }
    /**
     * If response is null make user know something is wrong
     */
    else {
        return false;
    }
}

async function Init():Promise<boolean|undefined> {
    /**
     * Wait until Init creates basic html structure and constucts the dynamic part of the application
     */
    if(await constructBody()){
        const PopupCloseButton = <HTMLButtonElement>document.querySelector('.popup__close');
        PopupCloseButton.addEventListener('click', () => {
            /**
             * If Popup() is called without argument or with empty object, its meant only to close the popup
             */
            Popup();
        });
        /**
         * Possible actions
         */
        const DataAttributes = ['confirm', 'reject', 'comments', 'view'];
        DataAttributes.forEach(element => {
            const Elements = document.querySelectorAll(`[data-action='${element}']`);
            Elements.forEach(el => {
                const Action = el.getAttribute('data-action');
                /**
                 * Open popup on 'confirm', 'reject' or 'comments' buttons
                 */
                if(Action === 'confirm' || Action === 'reject' || Action === 'comments') {
                    /**
                     * Specific attributes for these action buttons
                     */
                    const ActionID = el.getAttribute('data-actionid');
                    const documentType = el.getAttribute('data-dt');
                    const stepName = el.getAttribute('data-stepname');
                    el.addEventListener('click', () => {
                        Popup({Action: Action, ActionID: parseInt(ActionID!), documentType: documentType, stepName: stepName})
                    });
                }
                /**
                 * Request blob on view document
                 */
                else {
                    const documentId = el.getAttribute('data-documentid');
                    const pageNo = el.getAttribute('data-pageno')
                    el.addEventListener("click", async () => {
                        /**
                         * unencoded extensions
                         */
                        const nonEncodedExtensions:string[] = ['.xml', '.txt']; 
                        /**
                         * Save whole object to response variable
                         */
                        const response:any = await requestBlob({DocumentId: parseInt(documentId!), PageNo: parseInt(pageNo!)});
                        const fileExtension = response.Documents.Pages.DataType;
                        const description = response.Documents.Pages.Description;
                        const data:any = (!(fileExtension in nonEncodedExtensions)) ? window.atob(response.Documents.Pages.PageData) : response.Documents.Pages.PageData;
                        showFile(data, fileExtension, description);

                        function showFile(blob:Blob, fileExtension:string, description:string) {

                            const newBlob = new Blob([blob], {
                                type: `application/${fileExtension.replace('.', '')}`
                            })
                        
                            // IE doesn't allow using a blob object directly as link href
                            // instead it is necessary to use msSaveOrOpenBlob
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                window.navigator.msSaveOrOpenBlob(newBlob);
                                return;
                            } 
                        
                            // For other browsers: 
                            // Create a link pointing to the ObjectURL containing the blob.
                            const data = window.URL.createObjectURL(newBlob);
                            const link = document.createElement('a');
                            link.href = data;
                            link.download= description + fileExtension;
                            link.click();
                            setTimeout(() => {
                            // For Firefox it is necessary to delay revoking the ObjectURL
                                window.URL.revokeObjectURL(data);
                            }, 100);
                        }
                    });
                }
            })
            return true;
        });
    }
    else {
        console.error('Cannot initiate page construction.');
        return false;
    }
}

/**
 * Opens the popup and hides the background
 */
function Popup(PopupSettings:{Action:string|null, ActionID: number|null,documentType: string|null,stepName: string|null} = {Action: null, ActionID: null,documentType: null,stepName: null}):void {
    const commentContainer = <HTMLDivElement>document.getElementById('comment-container');
    const lang = trans[config.language];
    const inputContainer = <HTMLDivElement>document.getElementsByClassName('popup__inputContainer')[0];
    const buttonContainer = <HTMLDivElement>document.querySelector('.popup__buttonContainer');

    darkenAndPreventScroll();

    /**
     * First clear the comment container of any previous entries
     */
    commentContainer.innerHTML = '';
    /**
     * Clear the textarea to remove custom attributes and event handlers
     */
    inputContainer.innerHTML = '';
    /**
     * Remove the submit button to remove custom attributes and event handlers
     */
    buttonContainer.innerHTML = '';

    /**
     * Check if settings are not null
     */
    if(PopupSettings.Action !== null && PopupSettings.ActionID !== null && PopupSettings.documentType !== null && PopupSettings.stepName !== null) {
        /**
         * approve, reject, comments, pdf
         */
        const Action = PopupSettings.Action;
        const ActionID = PopupSettings.ActionID;
        const documentType = PopupSettings.documentType;
        const stepName = PopupSettings.stepName;
        const PopupTitle = <HTMLParagraphElement>document.getElementById('popup-title');
        const popupSubtitle = <HTMLParagraphElement>document.getElementById('popup-subtitle');
        /**
         * Show document id on the popup
         */
        if(PopupTitle) {
            PopupTitle.innerHTML = ActionID.toString();
        }
        /**
         * Show translated subtitle on the popup above action id
         */
        if(popupSubtitle) {
            popupSubtitle.innerHTML = lang.docTitle;
        }
        /**
         * Includes task properties
         */
        const taskProperties = ActionsJson.InstanceActions.find(
            (el: {DocumentType:string, DocumentTypeName:string}) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el: {StepName:string}) => el.StepName == stepName).Actions
            .find((a: {MasterDocumentId:number}) => a.MasterDocumentId == ActionID).MasterDocument;
        /**
         * Get the WorkflowActionID value from json file
         */
        const workflowActionId = ActionsJson.InstanceActions.find(
            (el: {DocumentType:string, DocumentTypeName:string}) => (el.DocumentType === documentType || el.DocumentTypeName === documentType)).Steps
            .find((el: {StepName:string}) => el.StepName == stepName).Actions
            .find((el: {MasterDocumentId:number}) => el.MasterDocumentId == ActionID).WorkflowActionId;

        commentContainer.innerHTML = displayPopupComments(('Comments' in taskProperties) ? taskProperties.Comments : []);

        if(Action === 'confirm') {
            /** 
             * Add submit button
             */
            buttonContainer.innerHTML = `<button id = "confirm-button" class = "button__action button__action--green" ${(config.buttonCustomColor['Confirm'] !== '') ? `style="background-color:${config.buttonCustomColor['Confirm']}"` : ''}>${(lang.buttonCustomLabel['Confirm'] !== '') ? lang.buttonCustomLabel['Confirm'] : 'Confirm' }</button>`;
            inputContainer.innerHTML = `<span class = "title__subtitle" id = "popup-textarea-subtitle">${lang.textarea.confirmSubtitleText}</span><textarea placeholder = "${lang.textarea.confirmPlaceholderText}" class = "popup__textarea popup__textarea--green" id = "popup-textarea" value = ""></textarea>`;
            inputContainer.style.display = 'flex';
            const btn = <HTMLButtonElement>document.getElementById('confirm-button');
            const textarea = <HTMLTextAreaElement>document.getElementById('popup-textarea');
            if(btn) {
                btn.addEventListener('click', () => {
                    /**
                     * If server responds with true, hide popup, remove action and decrease count on parent
                     */
                    if(sendData({WorkflowActionId: workflowActionId, ActionResult: 'Commit', Comment: textarea.value})) {
                        closeAndRemove(ActionID);
                    }
                });
            }
        }
        else if(Action === 'reject') {
            /** 
             * Add submit button
             */
            buttonContainer.innerHTML = `<button disabled id = "confirm-button" class = "button__action button__action--red" ${(config.buttonCustomColor['Reject'] !== '') ? `style="background-color:${config.buttonCustomColor['Reject']}"` : ''}>${(lang.buttonCustomLabel['Reject'] !== '') ? lang.buttonCustomLabel['Reject'] : 'Reject' }</button>`;
            inputContainer.innerHTML = `<span class = "title__subtitle" id = "popup-textarea-subtitle">${lang.textarea.rejectSubtitleText}</span><textarea placeholder = "${lang.textarea.rejectPlaceholderText}" class = "popup__textarea popup__textarea--red" id = "popup-textarea" value = ""></textarea>`;
            inputContainer.style.display = 'flex';
            const btn = <HTMLButtonElement>document.getElementById('confirm-button');
            const textarea = <HTMLButtonElement>document.getElementById('popup-textarea');
            /**
             * If textarea is filled, remove 'disabled' from button
             */
            if(textarea) {
                textarea.addEventListener('keyup', () => {
                    if(textarea.value.length > 0) {
                        btn.removeAttribute('disabled');
                        textarea.style.borderColor = 'var(--color-green-3)';
                    }
                    else {
                        btn.setAttribute('disabled', "true");
                        textarea.style.borderColor = "var(--color-red-1)";
                    }
                })
            }
            if(btn) {
                btn.addEventListener('click', () => {
                    /**
                     * If server responds with true, hide popup, remove action and decrease count on parent
                     */
                    if(sendData({WorkflowActionId: workflowActionId, ActionResult: 'Commit', Comment: textarea.value})) {
                        closeAndRemove(ActionID!);
                    }
                });
            }
        }
        else if(Action === 'comments') {

        }
    }
}

/**
 * Sends a post request to link specified in config file, returns true if successful and false if not
 * @param message json object we'll send
 */
async function sendData(message: {WorkflowActionId:number, ActionResult:string, Comment: string}):Promise<boolean> {
    /**
     * If no comment has been added, remove the property
     */
    if(message.Comment == '') {
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
    /**
     * Returns either true/false
     */
    return response.DBCallResult;
}

async function requestBlob(obj: {DocumentId:number, PageNo: number}):Promise<object> {
    const response = await(await fetch(`${config.blobPath}?documentid=${obj.DocumentId}&pageno=${obj.PageNo}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })).json();
    return response;
}

/**
 * Applies blur and darken filter to footer, copyright bar and main section when popup is open
 */
function darkenAndPreventScroll():void {
    const Popup = <HTMLDivElement>document.querySelector('.popup');
    const Main = <HTMLElement>document.getElementsByTagName('main')[0];
    const Nav = <HTMLElement>document.querySelector('.navigation');
    const HTML = <HTMLHtmlElement>document.getElementsByTagName('html')[0];
    const footer = <HTMLDivElement>document.getElementsByClassName('footer')[0];
    const copyright = <HTMLDivElement>document.getElementsByClassName('footer__copyright')[0];
    const WidescreenContainer = <HTMLHtmlElement>document.querySelector('.widescreenSmallContainer');
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
     * Blur and darken the main element
     */
    footer.classList.contains('darken-blur') ? footer.classList.remove('darken-blur') : footer.classList.add('darken-blur');
    /**
     * Blur and darken the main element
     */
    copyright.classList.contains('darken-blur') ? copyright.classList.remove('darken-blur') : copyright.classList.add('darken-blur');
    /**
     * Displaying the popup
     */
    Popup.setAttribute('data-open', (Popup.getAttribute('data-open') === 'closed') ? 'open' : 'closed');
}

/**
 * Returns human readable date
 * @param date unix time
 */
function niceTime(date:Date):string {
    /**
     * ~ 26.6.2020
     */
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
}

/**
 * Retuns human readable remaing time
 * @param plannedEndDate unix time
 */
function timeRemaining(plannedEndDate:string):string {
    const now:number = new Date().getTime();
    const endDate:number = new Date(plannedEndDate).getTime();
    if(endDate <= now) {
        return '';
    }
    let timeDifference:number = (endDate - now) / 1000;
    const days = Math.floor(timeDifference / 86400);
    timeDifference -= days * 86400;
    const hours = Math.floor(timeDifference / 3600) % 24;
    timeDifference -= hours * 3600;
    const minutes = Math.floor(timeDifference / 60) % 60;
    timeDifference -= minutes * 60;    
    return `${(days) ? days + 'd' : ''} ${(hours) ? hours + 'h' : ''} ${(minutes) ? minutes + 'm' : ''}`;
}

/**
 * Removes specific element and it's parent if it has 0 viable children
 * @param actionId MasterDocumentId of the element we'll be removing
 */
function closeAndRemove(actionId:number) {
    /**
     * Close the popup
     */
    Popup();
    /**
     * Task container we'll remove
     */
    const elementToRemove = document.querySelector(`[data-masterdocumentid="${actionId}"]`);
    if(elementToRemove) {
        /**
         * Get parent details element
         */
        const parent = <HTMLDetailsElement>elementToRemove.closest('.task__details');
        if(parent) {
            /**
             * Get the nubmer of chidl elements, those can include <summary> and title container + all task containers
             */
            let numberOfParentChildren:number = parent.childElementCount;
            /**
             * Check if title container exists in the parent
             */
            const titleContainer = <HTMLDivElement>parent.querySelector('.title__container--1') || null;
            /**
             * If title container exists, we need to reduce the number by 3, else by 2 (summary and element we're removing)
             */
            if(titleContainer !== null) {
                numberOfParentChildren -= 3;
            }
            else {
                numberOfParentChildren -= 2;
            }
            /**
             * If parent has 0 children left, remove parent
             */
            if(numberOfParentChildren <= 0) {
                parent.remove();
            }
            /**
             * If parent still has non summary & title children, reduce the displayed number
             */
            else {
                const countSpan = parent.querySelector('.summary__count');
                parent.setAttribute('data-action-count', numberOfParentChildren.toString());
                if(countSpan) {
                    countSpan.innerHTML = numberOfParentChildren.toString();
                }
            }
        }
        /**
         * Remove the element
         */
        elementToRemove.remove();
    }
}
/**
 * returns formated comments in popup
 * @param arrayOfCommentObjects array of objects containing comment meta and text
 */
function displayPopupComments(arrayOfCommentObjects:object[] = []):string {
    /**
     * Current language
     */
    const lang = trans[config.language];
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
        })
    return styledComments;
}

(function() {
    Init();
    /**
     * If user wants footer displayed, construct it
     */
    if(config.displayFooter === true) {
        constructFooter();
    }
    /**
     * If user wants copyright displayed, construct it
     */
    if(config.displayCopyrightBar === true) {
        constructCopyright();
    }
})();

