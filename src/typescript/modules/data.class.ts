import { RequestPaths } from "../requestpaths";

export interface State {
    paths: RequestPaths |any,
    configuration: Configuration | any,
    translations: Translations | any,
    employees: Employees | any,
    appStrings: AppStrings | any,
    actions: Actions | any,
    checkedEmployees: Array<string> | any
}

export interface AppStrings {

}

export interface Actions {

}

export interface Employees {

}

export interface Translations {

}

export interface Configuration {
    /**
     * Language used in additional translations
     */
    language: string,
    /**
     * Determines if navigation bar will be displayed
     */
    displayNavigationBar: true,
    /**
     * Determines if footer with extendables will be displayed
     */
    displayFooter: true,
    /**
     * Determines if copyright bar with copyright notice will be displayed
     */
    displayCopyrightBar: true,
    /**
     * Determines if company name in navigation bar will be displayed
     */
    displayCompanyName: true,
    /**
     * Custom company name, defaults to if empty "Sidoksis"
     */
    companyName: string,
    /**
     * Determines if company logo diplays in the navigation bar
     */
    displayCompanyLogo: true,
    /**
     * Custom logo image, defaults to "sidoksisLogo.png" if empty
     */
    companyLogo: string,
    /**
     * Base 64 encoded image 
     */
    userImage: string,
    /**
     * User image background position among x axis
     */
    userImageBackgroundPositionX: number,
    /**
     * User image background position among y axis
     */
    userImageBackgroundPositionY: number,
    /**
     * Sets custom titles for users
     */
    customUserTitles: object,
    /**
     * Whether or not to display console errors to user
     */
    displayConsoleErrors: boolean,
    /**
     * Controls if extendables should be open by default
     */
    extendableOpenByDefault: boolean,
    /**
     * Whether or not to display decorative icons on actions
     */
    displayIcons: boolean,
    /**
     * HTML SVG code that will be displayed for each document type if displayIcons is true
     */
    iconCodes: object,
    /**
     * Show custom description on each document type
     */
    displayDocumentTypeDescription: boolean,
    /**
     * Changes the limit on how many properties to display on each step
     * set 0 to display all
     */
    propertyDisplayLimit: number,
    /**
     * Set custom colors for buttons
     */
    buttonCustomColor: {
        Confirm: string,
        Reject: string,
        Comments: string,
        View: string
    },
    /**
     * Determines whether or not to display expiration or time left notices on tasks
     */
    displayNotices: boolean,
    /**
     * Determines how many days until task end the user will receive a warning
     */
    daysUntilWarningDisplays: number,
}

export default class Data {
    async getConfiguration(url:string, global:State):Promise<void> {
        global.configuration = await(await fetch(url, {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'}})).json();
    }
    async getActions(url:string, global:State):Promise<void> {
        global.actions = await(await fetch(url, {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'}})).json();
    }
    async getAppTranslations(url:string, global:State):Promise<void> {
        global.appStrings = await(await fetch(url, {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'}})).json();
        
        /*
        const systt = state.translations.Translations.find( (x:{Name:string}) => x.Name === 'System');
        const lang = state.translations[state.configuration.language];
        if (systt) {
            let prevod = systt.Translations.find( x => x.Key === '_DocumentId');
            if (prevod) {
                lang.docTitle = prevod.Text;
            }
            
                prevod = systt.Translations.find( x => x.Key === '_CountOfTasks');
            if (prevod) {
                lang.taskCount = prevod.Text;
            }

            prevod = systt.Translations.find( x => x.Key === '_CommentOwner');
            if (prevod) {
                lang.comments.author = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === '_datum');
            if (prevod) {
                lang.comments.date = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'Comment');
            if (prevod) {
                lang.comments.comment = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'NoComments');
            if (prevod) {
                lang.comments.noComments = prevod.Text;
            }

            prevod = systt.Translations.find( x => x.Key === 'Confirm');
            if (prevod) {
                lang.textarea.confirmSubtitleText = prevod.Text;
                lang.buttonCustomLabel.Confirm = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'Reject');
            if (prevod) {
                lang.textarea.rejectSubtitleText = prevod.Text;
                lang.buttonCustomLabel.Reject = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'ConfirmCommentPlaceholder');
            if (prevod) {
                lang.textarea.confirmPlaceholderText = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'RejectCommentPlaceholder');
            if (prevod) {
                lang.textarea.rejectPlaceholderText = prevod.Text;
            }

            prevod = systt.Translations.find( x => x.Key === 'ViewComments');
            if (prevod) {
                lang.buttonCustomLabel.Comments = prevod.Text;
            }
            prevod = systt.Translations.find( x => x.Key === 'ViewPage');
            if (prevod) {
                lang.buttonCustomLabel.View = prevod.Text;
            }
        }
        */
    }
    async getTranslations(url:string, global:State):Promise<void> {
        global.translations = await(await fetch(url, {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'}})).json();
    }
    async getEmployees(url:string, global:State):Promise<void> {
        global.employees = await(await fetch(url, {method: 'GET',headers: {'Accept': 'application/json','Content-Type': 'application/json'}})).json();
    }
}