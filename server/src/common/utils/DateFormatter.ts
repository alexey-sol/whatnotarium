import moment, { Moment } from "moment";

class DateFormatter {
    constructor (private date: Date | Moment = moment()) {
        this.date = date;
    }

    formatByPattern (
        pattern: string = "YYYY-MM-DD"
    ): string {
        return moment(this.date).format(pattern);
    }
}

export default DateFormatter;
