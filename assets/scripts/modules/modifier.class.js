import Popup from "./popup.class.js";
import Animation from "./animation.class.js";
export default class Modifier {
    closeAndRemove(actionId) {
        const popup = new Popup();
        const animation = new Animation();
        animation.darkenAndPreventScroll();
        popup.openClosePopup();
        popup.clearPopup();
        const elementToRemove = document.querySelector(`[data-masterdocumentid="${actionId}"]`);
        if (elementToRemove) {
            const parent = elementToRemove.closest('.task__details');
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
            elementToRemove.remove();
        }
    }
}
