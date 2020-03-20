export default class TimeFormat {
    niceTime(date) {
        return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    }
    timeRemaining(plannedEndDate) {
        const now = new Date().getTime();
        const endDate = new Date(plannedEndDate).getTime();
        if (endDate <= now) {
            return '';
        }
        let timeDifference = (endDate - now) / 1000;
        const days = Math.floor(timeDifference / 86400);
        timeDifference -= days * 86400;
        const hours = Math.floor(timeDifference / 3600) % 24;
        timeDifference -= hours * 3600;
        const minutes = Math.floor(timeDifference / 60) % 60;
        timeDifference -= minutes * 60;
        return `${(days) ? days + 'd' : ''} ${(hours) ? hours + 'h' : ''} ${(minutes) ? minutes + 'm' : ''}`;
    }
}
