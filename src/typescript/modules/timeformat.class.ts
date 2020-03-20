export default class TimeFormat {
    /**
     * Returns human readable date
     * @param date unix time
     */
    niceTime(date:Date):string {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
    
    /**
     * Retuns human readable remaing time
     * @param plannedEndDate unix time
     */
    timeRemaining(plannedEndDate:string):string {
        const now:number = new Date().getTime();
        const endDate:number = new Date(plannedEndDate).getTime();
        if(endDate <= now) {
            return '';
        }
        let timeDifference:number = (endDate - now) / 1000;
        const days = Math.floor(timeDifference / 86400);
        timeDifference -= days * 86400;
        const hours = Math.floor(timeDifference / 3600) % 24;
        timeDifference -= hours * 3600;
        const minutes = Math.floor(timeDifference / 60) % 60;
        timeDifference -= minutes * 60;    
        return `${(days) ? days + 'd' : ''} ${(hours) ? hours + 'h' : ''} ${(minutes) ? minutes + 'm' : ''}`;
    }

}