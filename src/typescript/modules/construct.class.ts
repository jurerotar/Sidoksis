import { Configuration, State } from "./data.class.js";
import Task from "./task.class.js";

interface InstanceActions {
    DocumentType: string,
	DocumentTypeName: string,
    Steps: [Steps],
    PropertiesToShow: []
}

interface Steps {
    StepName: string,
    Actions: [Actions],
}

interface Actions {
    WorkflowGroupId: number,
    WorkflowActionId: number,
    ActionId: number,
    MustFinished: boolean,
    PlannedStartDate: Date,
    PlannedEndDate: Date,
    Actor: string,
    ActorName: string,
    Actor1: string,
    Actor1Name: string,
    ActionType: string,
    MasterDocumentId: number,
    ActionDocument: ActionDocument,
    ActionDocumentId: number,
    Description: string,
    DocumentType: string,
    ScenarioName: string,
    MasterDocument: MasterDocument
}

interface ActionDocument {
    Properties: [Properties]
}

interface MasterDocument {
    
    Properties: any,
    Pages: any,
    Comments: any
}

interface Properties {
    
}

export default class Construct {

    element: HTMLDivElement|any;

    constructor(element:HTMLDivElement|any) {
        this.element = element;
    } 
    
    constructNavigation():boolean {
        this.element.insertAdjacentHTML('afterbegin', '<nav class = "navigation"></nav>')
        return true
    }

    constructMain(state:State):boolean {
        let minHeight:number = 6;
        if(state.configuration.displayFooter === true) {
            minHeight += 6;
        }
        if(state.configuration.displayCopyrightBar === true) {
            minHeight += 4;
        }
        this.element.insertAdjacentHTML('afterbegin', `<main class = "main" style = "min-height:calc(100vh - ${minHeight}rem);"></main>`);
        return true
    }

    async constructBody(state:State) {
        const task = new Task();
        const documentTypes:[InstanceActions] = state.actions.InstanceActions;
        const language:string = state.configuration.language;
        const main = (<HTMLDivElement>this.element.querySelector('.main'));
        let output:string = '';
        let currentDocumentType:string = '';
        documentTypes.forEach((element:InstanceActions, index:number) => {
            const elementClass = (documentTypes.length - 1 === index) ? 'task__details task__details--noMarginBottom' : 'task__details';
            const steps:[Steps] = element.Steps;
            const propertiesToShow:object|null|any = element.PropertiesToShow || null;
            const documentType = (element.DocumentTypeName ?  element.DocumentTypeName:  element.DocumentType);
            let actionCount:number = 0;
            steps.forEach((element:{Actions:[Actions]}) => {actionCount += element.Actions.length});
            if(documentType !== currentDocumentType) {
                currentDocumentType = documentType;
                output += task.addDetailsElement(elementClass, actionCount, documentType, state.configuration.extendableOpenByDefault, state.appStrings[language].taskCount);
            }
            steps.forEach((el:Steps) => {
                const actions = el.Actions;
                output += task.addStep(el.StepName.toString());
                actions.forEach((e:Actions) => {
                    const pageNo:number|null = ('Pages' in e.MasterDocument) ? e.MasterDocument.Pages[0].PageNo : null;
                    let documentId:number = e.MasterDocument.Properties.find((a:{PropertyName: string, Value:number}) => a.PropertyName === '_DocumentId').Value;
                    output += task.addTaskHeader(state.appStrings[language].docTitle, e.MasterDocumentId.toString(), e.MasterDocumentId);
                    output += task.addTimeNotice(new Date(e.PlannedEndDate), state.configuration.daysUntilWarningDisplays, state.appStrings[language]);
                    output += task.addDocumentProperties(e, propertiesToShow);
                    output += task.addButtonContainer();
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Confirm', state.appStrings[language].buttonCustomLabel['Confirm'], state.configuration.buttonCustomColor['Confirm']);
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Reject', state.appStrings[language].buttonCustomLabel['Reject'], state.configuration.buttonCustomColor['Reject']);
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Opinion', state.appStrings[language].buttonCustomLabel['Opinion'], state.configuration.buttonCustomColor['Opinion']);
                    if(e.MasterDocument.Comments && e.MasterDocument.Comments.length > 0) {
                        output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Comments', state.appStrings[language].buttonCustomLabel['Comments'], state.configuration.buttonCustomColor['Comments']);
                    }
                    if((e.MasterDocument.Pages && e.MasterDocument.Pages.length > 0) && pageNo !== null) {
                        output += task.addViewAttachmentButton(pageNo.toString(), documentId.toString(), e.MasterDocumentId, 'View', state.appStrings[language].buttonCustomLabel['View'], state.configuration.buttonCustomColor['View']);
                    }

                    output += '</div></div></div>';
                })
            })
            output += '</details>';
        });
        main.insertAdjacentHTML('afterbegin', output);
        return true;
    }

    constructPopup():boolean {
        this.element.insertAdjacentHTML('afterbegin', '<div class = "popup" data-open = "closed"><div class = "popup__rel"></div></div>');
        return true;
    }
    
    constructFooter(config:Configuration, trans:any):boolean {
        this.element.insertAdjacentHTML('beforeend', `<footer class = "footer"></footer>`);
        const footer = (<HTMLDivElement>this.element.querySelector('.footer'));
        const language = config.language;
        trans[language].footer.forEach((element:any) => {
            footer.innerHTML += `
            <details class = "footer__details">
                <summary class = "footer__summary">${element.title}<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg></summary>
                <p class = "footer__text">${element.text}</p>
            </details>`;
        });
        return true
    }

    constructCopyright():boolean {
        this.element.insertAdjacentHTML('beforeend', '<div class = "footer__copyright"><p class = "title__copyright">All rights reserved @ Sidoksis d.o.o.</p></div>');
        return true;
    }
}