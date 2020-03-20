import Task from "./task.class.js";
export default class Construct {
    constructor(element) {
        this.element = element;
    }
    constructNavigation() {
        this.element.insertAdjacentHTML('afterbegin', '<nav class = "navigation"></nav>');
        return true;
    }
    constructMain(state) {
        let minHeight = 6;
        if (state.configuration.displayFooter === true) {
            minHeight += 6;
        }
        if (state.configuration.displayCopyrightBar === true) {
            minHeight += 4;
        }
        this.element.insertAdjacentHTML('afterbegin', `<main class = "main" style = "min-height:calc(100vh - ${minHeight}rem);"></main>`);
        return true;
    }
    async constructBody(state) {
        const task = new Task();
        const documentTypes = state.actions.InstanceActions;
        const language = state.configuration.language;
        const main = this.element.querySelector('.main');
        let output = '';
        let currentDocumentType = '';
        documentTypes.forEach((element, index) => {
            const elementClass = (documentTypes.length - 1 === index) ? 'task__details task__details--noMarginBottom' : 'task__details';
            const steps = element.Steps;
            const propertiesToShow = element.PropertiesToShow || null;
            const documentType = (element.DocumentTypeName ? element.DocumentTypeName : element.DocumentType);
            let actionCount = 0;
            steps.forEach((element) => { actionCount += element.Actions.length; });
            if (documentType !== currentDocumentType) {
                currentDocumentType = documentType;
                output += task.addDetailsElement(elementClass, actionCount, documentType, state.configuration.extendableOpenByDefault, state.appStrings[language].taskCount);
            }
            steps.forEach((el) => {
                const actions = el.Actions;
                output += task.addStep(el.StepName.toString());
                actions.forEach((e) => {
                    const pageNo = ('Pages' in e.MasterDocument) ? e.MasterDocument.Pages[0].PageNo : null;
                    let documentId = e.MasterDocument.Properties.find((a) => a.PropertyName === '_DocumentId').Value;
                    output += task.addTaskHeader(state.appStrings[language].docTitle, e.MasterDocumentId.toString(), e.MasterDocumentId);
                    output += task.addTimeNotice(new Date(e.PlannedEndDate), state.configuration.daysUntilWarningDisplays, state.appStrings[language]);
                    output += task.addDocumentProperties(e, propertiesToShow);
                    output += task.addButtonContainer();
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Confirm', state.appStrings[language].buttonCustomLabel['Confirm'], state.configuration.buttonCustomColor['Confirm']);
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Reject', state.appStrings[language].buttonCustomLabel['Reject'], state.configuration.buttonCustomColor['Reject']);
                    output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Opinion', state.appStrings[language].buttonCustomLabel['Opinion'], state.configuration.buttonCustomColor['Opinion']);
                    if (e.MasterDocument.Comments && e.MasterDocument.Comments.length > 0) {
                        output += task.addActionButton(el.StepName, documentType, e.MasterDocumentId, 'Comments', state.appStrings[language].buttonCustomLabel['Comments'], state.configuration.buttonCustomColor['Comments']);
                    }
                    if ((e.MasterDocument.Pages && e.MasterDocument.Pages.length > 0) && pageNo !== null) {
                        output += task.addViewAttachmentButton(pageNo.toString(), documentId.toString(), e.MasterDocumentId, 'View', state.appStrings[language].buttonCustomLabel['View'], state.configuration.buttonCustomColor['View']);
                    }
                    output += '</div></div></div>';
                });
            });
            output += '</details>';
        });
        main.insertAdjacentHTML('afterbegin', output);
        return true;
    }
    constructPopup() {
        this.element.insertAdjacentHTML('afterbegin', '<div class = "popup" data-open = "closed"><div class = "popup__rel"></div></div>');
        return true;
    }
    constructFooter(config, trans) {
        this.element.insertAdjacentHTML('beforeend', `<footer class = "footer"></footer>`);
        const footer = this.element.querySelector('.footer');
        const language = config.language;
        trans[language].footer.forEach((element) => {
            footer.innerHTML += `
            <details class = "footer__details">
                <summary class = "footer__summary">${element.title}<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" ><path fill="currentColor" d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path></svg></summary>
                <p class = "footer__text">${element.text}</p>
            </details>`;
        });
        return true;
    }
    constructCopyright() {
        this.element.insertAdjacentHTML('beforeend', '<div class = "footer__copyright"><p class = "title__copyright">All rights reserved @ Sidoksis d.o.o.</p></div>');
        return true;
    }
}
