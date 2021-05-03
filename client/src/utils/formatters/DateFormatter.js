import moment from "moment";
import localization from "moment/locale/ru";

moment.updateLocale("ru", localization);

class DateFormatter {
    constructor (date = moment()) {
        this.date = date;
    }

    formatByPattern (
        pattern = "D MMMM YYYY"
    ) {
        return moment(this.date)
            .locale("ru")
            .format(pattern);
    }
}

export default DateFormatter;
