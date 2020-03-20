import Construct from "./modules/construct.class.js";
import Loader from "./modules/loader.class.js";
import Popup from "./modules/popup.class.js";
import NavigationBar from "./modules/navbar.class.js";
import Data from "./modules/data.class.js";
import requestPaths from "./requestpaths.js";
const state = {
    paths: requestPaths(true),
    actions: {},
    configuration: {},
    translations: {},
    appStrings: {},
    employees: {},
    checkedEmployees: []
};
async function initialize() {
    const construct = new Construct(document.getElementById('mainContainer'));
    const data = new Data();
    const popup = new Popup();
    const loader = new Loader(document.querySelector('.loader'));
    await data.getAppTranslations(state.paths.appStrings, state);
    await data.getConfiguration(state.paths.configuration, state);
    loader.setTitle(state.appStrings[state.configuration.language].loadingLabel.loadingData);
    await data.getActions(state.paths.actions, state);
    await data.getTranslations(state.paths.translations, state);
    await data.getEmployees(state.paths.employees, state);
    state.checkedEmployees = state.configuration.defaultCheckedEmployees;
    loader.setTitle(state.appStrings[state.configuration.language].loadingLabel.buildingApp);
    document.title = (state.configuration.companyName !== '') ? state.configuration.companyName : 'Sidoksis';
    construct.constructMain(state);
    construct.constructPopup();
    const bodyFinished = await construct.constructBody(state);
    if (bodyFinished) {
        loader.setTitle(state.appStrings[state.configuration.language].loadingLabel.finishing);
        construct.constructNavigation();
        const navigation = new NavigationBar(document.querySelector('.navigation'));
        if (state.configuration.displayCompanyLogo === true) {
            navigation.addCompanyLogo(state.configuration.companyLogo);
        }
        if (state.configuration.displayCompanyName === true) {
            navigation.addCompanyTitle(state.configuration.companyName);
        }
        navigation.addUserSection(state.translations.DisplayName, state.configuration.customTitle, state.configuration.userImage);
        popup.attachPopupHandlers(state);
        loader.finishAnimation();
        loader.niceRemove(2000);
    }
    if (state.configuration.displayFooter === true) {
        construct.constructFooter(state.configuration, state.appStrings);
    }
    if (state.configuration.displayCopyrightBar === true) {
        construct.constructCopyright();
    }
}
initialize();
