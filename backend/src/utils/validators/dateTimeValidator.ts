import moment from "moment";
import {error} from "../constants/ErrorConstants";

export function validateDate(startDate: Date, endDate: Date) {
    if(startDate && endDate){
        const date = moment().utc().startOf("d").toDate();
        if (moment(startDate).isBefore(date)) {
            throw { status: error.bad_request, message: error.invalid_date };
        }
        if (startDate === endDate || moment(startDate).isAfter(endDate)) {
            throw { status: error.bad_request, message: error.invalid_date };
        }
    }
}
