import {createSchedule, fetchSchedules} from "../../services/SchedulesServices";
import {CREATE_SCHEDULE, FETCH_SCHEDULES} from "./ScheduleTypes";

export function getSchedules(options) {
    return async function (dispatch) {
        fetchSchedules(options).then((response) => {
            dispatch({
                type: FETCH_SCHEDULES,
                payload: response.data
            })
        })
    }
}

export function newSchedule(schedule, options) {
    return async function (dispatch) {
        createSchedule(options, schedule).then((response) => {
            dispatch({
                type: CREATE_SCHEDULE,
                payload: response.data
            })
        })
    }
}
