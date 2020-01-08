/**
 * Descriptions used on the extendables
 */
const Descriptions = {
    'AbsenceRequest': {
        'title': 'Dopusti',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
    'Contracts': {
        'title': 'Pogodbe',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
    'ISO': {
        'title': 'ISO',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
    'Prejeti račun': {
        'title': 'Prejeti računi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
    'IncomingPost': {
        'title': 'Obvestila',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
    'PurchaseOrder': {
        'title': 'Nakupi',
        'desc': 'Potrdite ali zavrnite prošnje za dopust.',
        'img' : ''
    },
}

/**
 * User information should be generated dynamically for each user based on his login
 * credentials
 */
const userInfo:object = {
    name: 'Janez Ovsenik',
    title: 'Administrator',
    company: 'Sidoksis',
    companyImage: 'sidoksisLogo.png',
}

/**
 *  Fetch translations and save them to the 'Translations' variable
 */
let Translations:object[];

async function FetchTranslations() {
    try {
        const MobileStartupJson = await (await fetch('assets/data/MobileStartup.json')).json();
        Translations = MobileStartupJson.Translations;
    }
    catch(e) {
        console.error(e);
        return Promise.resolve();
    }
};

/**
 * Fetch actions and save them to the 'Actions' variable
 */
let Actions:object[];

async function FetchActions() {
    try {
        const ActionsJson = await (await fetch('assets/data/GetMyMobileActions.json')).json();
        Actions = ActionsJson;
    }
    catch(e) {
        console.error(e);
        return Promise.resolve();
    }
};


/**
 * Proposed layout for comments
 */
/*
Comments:object = {
    Action: '',
    ActionID: '',
    Comments: [
        {
            OwnerID: '',
            OwnerName: '',
            CommentTime: '',
            Comment: ''
        }
    ],

}
*/

/**
 * Fetch comments and save them to the 'Comments' variable
 */
let Comments:object[];

async function FetchComments() {
    try {
        const CommentsJson = await (await fetch('assets/data/Comments.json')).json();
        Comments = CommentsJson.Comments;
    }
    catch(e) {
        console.error(e);
        return Promise.resolve();
    }
};

/**
 * 
 * @param UserInfoObject object with personalization info.
 * Note: image is determined from the username, it must follow name.surname.extension pattern
 */
function PersonalizeNavigationBar(UserInfoObject:any):void {
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
    const ImageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    /**
     * 'Jure Rotar' -> jure.rotar
     */
    const ImagePathName = UserInfoObject.name.replace(' ', '.').toLowerCase();
    if(CompanyImageContainer) {

        /**
         * String we'll be outputting
         */
        let CompanyImageContainerOutput:string = '';

        /**
         * Check if company image name has been set, else return sidoksis logo
         */
        if('companyImage' in UserInfoObject && UserInfoObject.companyImage !== '') {
            CompanyImageContainerOutput += `<img src = "assets/img/logo/${UserInfoObject.companyImage}" class = "image__companyPhoto" alt = "${UserInfoObject.companyImage}">`;
        }
        else {
            CompanyImageContainerOutput += `<img src = "assets/img/logo/sidoksisLogo.png" class = "image__companyPhoto" alt = "Neznano podjetje">`;
        }
        /**
         * Check if company name has been set, else return 'Sidoksis'
         */
        if('company' in UserInfoObject && UserInfoObject.company !== '') {
            CompanyImageContainerOutput += `<p class = "title__companyTitle">${UserInfoObject.company}</p>`;
        }
        else {
            CompanyImageContainerOutput += `<p class = "title__companyTitle">Neznano podjetje</p>`;
        }
        /**
         * Output in to image container
         */
        CompanyImageContainer.innerHTML = CompanyImageContainerOutput;
    }
    if(UsernameContainer) {
        /**
         * Check if current user has been set, else return default
         */
        if('name' in UserInfoObject && UserInfoObject.name !== '') {
            UsernameContainer!.innerHTML = UserInfoObject.name;
        }
        else {
            UsernameContainer!.innerHTML = 'Neznan uporabnik';
        }
    }
    if(UserTitleContainer) {
        /**
         * Check if current user title has been set, else return default
         */
        if('title' in UserInfoObject && UserInfoObject.title !== '') {
            UserTitleContainer.innerHTML = UserInfoObject.title;
        }
        else {
            UsernameContainer!.innerHTML = 'Uporabnik';
        }
    }
    if(ImageContainer) {
        let ImageFound = false;
        /**
         * Check if photo exists for any of the extensions
         * Warning: returns console errors if not found
         */
        for(let i:number = 0; i < ImageExtensions.length; i++) {
            if(DetermineIfImageExists(`assets/img/users/${ImagePathName}${ImageExtensions[i]}`)) {
                ImageContainer.innerHTML = `<img class = "image__userPhoto" src = "assets/img/users/${ImagePathName + ImageExtensions[i]}" alt = "${UserInfoObject.name}">`;
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

/**
 * Determines if image file exists by sending HEAD requests and returns true if yes
 * @param url path to the image
 */
function DetermineIfImageExists(url:string):any {
    const HttpRequest = new XMLHttpRequest();
    HttpRequest.open('HEAD', url, false);
    HttpRequest.send();
    if(HttpRequest.status === 200) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 
 * @param currentAction - Trenutna naloga, za katero se dela pregled podatkov
 * @param translations - Spisek lastnosti za prikaz
 */
function DocumentShortData(currentAction:any, shorData:any ):string {
    /**
     * json path to properties
     */
    const properties = currentAction.MasterDocument.Properties;
    /**
     * Unix timestamp in miliseconds
     */
    const UnixStartTime = new Date(currentAction.PlannedStartDate)

    const UnixEndTime = new Date(currentAction.PlannedEndDate);
    /**
     * String with html we're returning to the page
     */
    /**
     *  Prejemnik naloge in čas, do kdaj naj se naloga zaključi
     */
    let returnString:string = `
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

    /**
     *  Za vsako lastnost iz spiska shorData prikaži vrednost podatka
     */
    for (let i:number = 0; i < shorData.length; i++) {
        let prop = properties.find( 
            (x: {PropertyName:string }) => x.PropertyName === shorData[i].PropertyName
        );
        if (typeof prop !== 'undefined') {
            // Na dokumentu je ta lastnost
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
    if(typeof(Actions) !== 'object' || typeof(Translations) !== 'object') {
        console.error('Actions or Translations are not of the right type.')
        return false;
    }

    /**
     * Fill the personalized data
     */
    PersonalizeNavigationBar(userInfo);

    /**
     * If response, translations and comments are not falsy, execute parsing
     */
    if(Actions && Translations /*&& Comments*/) {

        /**
         * Remove loading animation
         */
        const Loader = <HTMLDivElement>document.querySelector('.loader');
        Loader.setAttribute('loading-finished', 'true');
        /**
         * Check if database call is true
         */
        if(Actions.DBCallResult) {

            /**
             * Container we'll be writing in
             */
            const mainContainer = <HTMLElement>document.querySelector('.main');

            /**
             * string variabla, v katero se kreira html tekst za prikaz
             */
            let content : string = '';

            /**
             *  Shrani spisek nalog v globalno variablo, da so doegljive drugod iz kode
             */
            const DocTypes = Actions.InstanceActions;
            //console.log(JSON.stringify(DocTypes));

            /**
             *  Obdelaj vsak tip dokumenta
             */
            for (let i:number = 0; i < DocTypes.length; i++) {
                let DetailsClass = 'task__details';
                /**
                 * Apply the noMarginBottom to the last element
                 */
                if(i === DocTypes.length - 1) {
                    DetailsClass = 'task__details task__details--noMarginBottom';
                }
                /**
                 *  Prikaži ime tipa dokumenta na ekran
                 */
                let dt = (DocTypes[i].DocumentTypeName ?  DocTypes[i].DocumentTypeName:  DocTypes[i].DocumentType);
                if(dt in Descriptions) {
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
                    //content += `<div class = "c3" data-doctype = "${dt}"><p class = "p2">${dt}</p></div>`;
                }
                /**
                 *  Shrani spisek lastnosti za prikaz podatkov na posamezni nalogi
                 */
                let shortData = DocTypes[i].PropertiesToShow;

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
                    let desc = actsteps[j].StepName;
                    content += `
                        <div class = "title__container--1">
                            <p class = "title__main title__main--2">${desc}</p>
                            <p class = "title__description title__description--1">${Descriptions[dt]['desc']}</p>
                        </div>
                        `

                    /**
                     * Vsak korak vsebuje naloge
                     */
                    let actions = actsteps[j].Actions;

                    /**
                     * Obdelaj vsako nalogo znotraj koraka
                     */
                    for (let z:number = 0; z < actions.length; z++) {
                        /***
                         * Naj se pokaže ukaz za prikaz slike
                         */
                        let pdfclass = 'invisible';
                        let cmtclass = 'invisible';
                        
                        /**
                         * Link na pdf je aktiven le, če dokument ima kak  blob, drugače pa ne
                         */
                        if (actions[z].MasterDocument.Pages && actions[z].MasterDocument.Pages.length > 0) {
                            pdfclass = 'task__subgrid task__subgrid--button';
                        }
                        if (actions[z].MasterDocument.Comments && actions[z].MasterDocument.Comments.length > 0) {
                            cmtclass = 'task__subgrid task__subgrid--button';                            
                        }
                        /**
                         *   Piši podatke o nalogi in prikaži gumbe za ukaze
                         */
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
            console.error(Actions.ErrorMessage);
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

async function AttachEventHandlers() {
    /**
     * Wait until Init creates basic html structure and constucts the dynamic part of the application
     */
    if(await Init() ){
        const PopupCloseButton = <HTMLButtonElement>document.querySelector('.popup__close');
        PopupCloseButton.addEventListener('click', () => {
            /**
             * If Popup() is called without argument, its meant only to close the popup
             */
            Popup();
        });
        /**
         * Array of possible user actions
         * approve - user can approve of the document with or without a comment
         * deny - user can deny the document
         * comments - user can read previous comments
         * pdf - user can see actual document
         */
        const DataAttributes = ['confirm', 'deny', 'comments', 'info'];
        DataAttributes.forEach(element => {
            const Elements = document.querySelectorAll(`[data-action='${element}']`);
            Elements.forEach(el => {
                const Action = el.getAttribute('data-action');
                const ActionID = el.getAttribute('data-actionid');
                switch(Action) {
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
                        })
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
                        })
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
                        })
                        break;
                    case 'info':
                        el.addEventListener("click", () => {
                            fetch(`DMSDataService.svc/getdocument?documentid=${ActionID}&positionlevel=0&includetasks=false` /* Add credentials here */)
                            .then(
                                
                            );
                        });
                        break;
                }
            })
        });
    }
    else {
        console.error('Cannot initiate page construction.');
    }
}

/**
 * Opens the popup and hides the background
 */
const Popup = (Comments:object = {}):void => {
    const CommentContainer = <HTMLDivElement>document.querySelector('.popup');
    const Main = <HTMLElement>document.getElementsByTagName('main')[0];
    const Nav = <HTMLElement>document.querySelector('.navigation');
    const HTML = <HTMLHtmlElement>document.getElementsByTagName('html')[0];
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
     * Displaying the popup
     */
    CommentContainer.setAttribute('data-open', (CommentContainer.getAttribute('data-open') === 'closed') ? 'open' : 'closed');

    /**
     * Check if settings are not empty
     */
    if(Object.entries(Comments).length === 0 && Comments.constructor === Object) {
        //todo parse object
    }
}

(function() {
    AttachEventHandlers();
})();

