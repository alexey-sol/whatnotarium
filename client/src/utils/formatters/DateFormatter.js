import moment from "moment";

class DateFormatter {
    constructor (date = moment()) {
        this.date = date;
    }

    formatByPattern (
        pattern = "YYYY-MM-DD"
    ) {
        return moment(this.date)
            .locale("ru")
            .format(pattern);
    }
}

export default DateFormatter;
