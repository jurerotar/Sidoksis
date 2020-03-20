export default function requestPaths(development = true) {
    if (development) {
        return {
            configuration: 'assets/data/config.json',
            appStrings: 'assets/data/appstrings.json',
            actions: 'assets/data/GetMyMobileActions.json',
            translations: 'assets/data/MobileStartup.json',
            commits: 'assets/data/commitaction.json',
            attachments: 'assets/data/blob.json',
            opinion: 'assets/data/commitaction.json',
            employees: 'assets/data/UserList.json'
        };
    }
    else {
        return {
            configuration: 'assets/data/config.json',
            appStrings: 'assets/data/apptranslations.json',
            actions: 'assets/data/GetMyMobileActions.json',
            translations: 'assets/data/MobileStartup.json',
            commits: 'assets/data/commitaction.json',
            attachments: 'assets/data/blob.json',
            opinion: 'DMSDataService/requestaction',
            employees: 'assets/data/UserList.json'
        };
    }
}
