export default class Task {
    addDocumentProperties(currentAction, propertiesToShow) {
        if (propertiesToShow === null) {
            propertiesToShow = [
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
        let returnString = '<div class = "task__grid task__grid--1">';
        const properties = currentAction.MasterDocument.Properties;
        for (let i = 0; i < propertiesToShow.length; i++) {
            const prop = properties.find((x) => x.PropertyName === (propertiesToShow[i].PropertyName));
            if (typeof prop !== 'undefined') {
                let Caption = propertiesToShow[i].Caption;
                returnString += `
                <div class = "task__subgrid">
                    <span class = "title__subtitle">${Caption}</span>
                    <p class = "title__taskPropertyValue title__taskPropertyValue--1">${prop.Value}</p>
                </div>
                `;
            }
        }
        returnString += '</div>';
        return returnString;
    }
    addDetailsElement(detailsClass, actionCount, documentType, openByDefault, taskCountSubtitle) {
        return `<details class = "${detailsClass}" data-action-count = "${actionCount}" data-doctype = "${documentType}" ${(openByDefault === true) ? 'open' : ''}>
            <summary class = "summary">
                <div class = "summary__container--1">
                    <div class = "summary__container--2">
                        <h2 class = "title__main title__main--1">${documentType}</h2>
                        <span class = "summary__taskCount">${taskCountSubtitle}: <span class = "summary__count">${actionCount}</span></span>
                    </div>
                    <div class = "summary__container--3">
                        <div class="summary__icon"></div>
                    </div>
                </div>
            </summary>`;
    }
    addStep(stepName) {
        return `<div class = "title__container--1">
            <p class = "title__description title__description--1">${stepName}</p>
        </div>`;
    }
    addTaskHeader(docTitle, documentId, actionId) {
        return `<div class = "task__container" data-masterdocumentid = "${actionId}">
            <div class = "task__titleContainer">
                <div class = "task__title">
                    <span class = "title__subtitle">${docTitle}</span>
                    <p class = "title__taskPropertyValue title__taskPropertyValue--2">${documentId}</p>
                </div>
                <div class = "task__image">
                    <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" ><path fill="currentColor" d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"></path></svg>
                </div>
            </div>`;
    }
    addTimeNotice(plannedEndDate, timeLimit, appString) {
        const plannedEndUnixTime = plannedEndDate.getTime();
        const currentTime = new Date().getTime();
        const dateOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        };
        let output = `<div class = "task__title">
            <span class = "title__subtitle">${(appString.noticeCustomSubtitle) ? appString.noticeCustomSubtitle : 'Deadline'}</span>
            <div class = "task__title  task__title--warning">`;
        if (currentTime >= plannedEndUnixTime) {
            output += `<img src = "assets/img/icons/warning-signal.svg" class = "task__warningImage">
            <span class = "task__text--danger">${plannedEndDate.toLocaleDateString(undefined, dateOptions)}</span>`;
        }
        else if ((plannedEndUnixTime - currentTime) <= (86400000 * timeLimit)) {
            output += `<img src = "assets/img/icons/warningsign.svg" class = "task__warningImage">
            <span class = "task__text--warning">${plannedEndDate.toLocaleDateString(undefined, dateOptions)}</span>`;
        }
        else {
            output += `<img src = "assets/img/icons/checksign.svg" class = "task__warningImage">
            <span class = "task__text--accept">${plannedEndDate.toLocaleDateString(undefined, dateOptions)}}</span>`;
        }
        output += `</div></div>`;
        return output;
    }
    addButtonContainer() {
        return '<div class = "task__grid task__grid--1">';
    }
    addActionButton(stepName, documentType, actionId, type, customLabel = '', customColor = '') {
        const defaultClasses = {
            Confirm: 'green',
            Reject: 'red',
            Comments: 'blue',
            Opinion: 'darkBlue',
            View: 'purple'
        };
        let output = '';
        const buttonTemplate = `<div class = "task__subgrid actions">
            <button class = "button__action button__action--${defaultClasses[type]}" data-stepname = "${stepName}" data-documenttype = "${documentType}" ${(customColor !== '') ? `style="background-color:${customColor}"` : ''} data-action = "${type.toLowerCase()}" data-actionid = "${actionId}">${(customLabel !== '') ? customLabel : type}</button>
        </div>`;
        output += buttonTemplate + '';
        return output;
    }
    addViewAttachmentButton(pageNo, documentId, actionId, type, customLabel = '', customColor = '') {
        const defaultClasses = {
            Confirm: 'green',
            Reject: 'red',
            Comments: 'blue',
            Opinion: 'darkBlue',
            View: 'purple'
        };
        let output = '<div class = "task__grid task__grid--1">';
        const buttonTemplate = `<div class = "task__subgrid actions">
            <button class = "button__action button__action--${defaultClasses[type]}" data-pageno = "${pageNo}" data-documentid = "${documentId}" ${(customColor !== '') ? `style="background-color:${customColor}"` : ''} data-action = "${type.toLowerCase()}" data-actionid = "${actionId}">${(customLabel !== '') ? customLabel : type}</button>
        </div>`;
        output += buttonTemplate + '</div>';
        return output;
    }
}
