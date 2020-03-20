export default class Data {
    async getConfiguration(url, global) {
        global.configuration = await (await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })).json();
    }
    async getActions(url, global) {
        global.actions = await (await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })).json();
    }
    async getAppTranslations(url, global) {
        global.appStrings = await (await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })).json();
    }
    async getTranslations(url, global) {
        global.translations = await (await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })).json();
    }
    async getEmployees(url, global) {
        global.employees = await (await fetch(url, { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } })).json();
    }
}
