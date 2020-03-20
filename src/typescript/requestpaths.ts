export interface RequestPaths {
    configuration: string,
    appStrings: string,
    actions: string,
    translations: string,
    commits: string,
    attachments: string
    opinion: string,
    employees: string
}

/**
 * Configuration object exports to main.js file
 */
export default function requestPaths(development:boolean = true):RequestPaths {
    /**
     * Local development paths
     */
    if(development) {
        return <RequestPaths> {
            configuration: 'assets/data/config.json',
            appStrings: 'assets/data/appstrings.json',
            actions: 'assets/data/GetMyMobileActions.json',
            translations: 'assets/data/MobileStartup.json',
            commits: 'assets/data/commitaction.json',
            attachments: 'assets/data/blob.json',
            opinion: 'assets/data/commitaction.json',
            employees: 'assets/data/UserList.json'
        }
    }
    /**
     * Production paths here
     */
    else {
        return <RequestPaths> {
            configuration: 'assets/data/config.json',
            appStrings: 'assets/data/apptranslations.json',
            actions: 'assets/data/GetMyMobileActions.json',
            translations: 'assets/data/MobileStartup.json',
            commits: 'assets/data/commitaction.json',
            attachments: 'assets/data/blob.json',
            opinion: 'DMSDataService/requestaction',
            employees: 'assets/data/UserList.json'
        }
    }
}
