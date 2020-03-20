import Popup from "./popup.class.js";
import Animation from "./animation.class.js";

export default class Modifier {
    /**
 * Removes specific element and it's parent if it has 0 viable children
 * @param actionId MasterDocumentId of the element we'll be removing
 */
    closeAndRemove(actionId:number) {
    const popup = new Popup();
    const animation = new Animation();
    /**
     * Close the popup
     */
    animation.darkenAndPreventScroll();
    popup.openClosePopup();
    popup.clearPopup();

    /**
     * Task container we'll remove
     */
    const elementToRemove = document.querySelector(`[data-masterdocumentid="${actionId}"]`);
    if(elementToRemove) {
        /**
         * Get parent details element
         */
        const parent = (<HTMLDetailsElement>elementToRemove.closest('.task__details'));
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
        /**
         * Remove the element
         */
        elementToRemove.remove();
    }
}
}